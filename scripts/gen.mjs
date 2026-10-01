// 从 openapi/*.yaml 生成 src/apis/*.ts 的可调用 client。
//
// 设计约束（由 yaml 现状决定）：
//   - yaml 的 200 响应统一是 StandardResponse 信封，内层 data 只声明
//     oneOf[object,array,null]，**不带具体类型**。所以泛型生成器会丢精度。
//   - 真正精确的内层类型在手写 types/api/* 的命名空间里（UserApi.LoginResp 等）。
// 因此本生成器只从 yaml 抽取「路径 + HTTP 方法 + operationId + 请求体 schema 名」，
// 响应/请求类型按约定绑定回手写的 Namespace.XxxReq / XxxResp；
// 绑定不上的退化为 unknown（仍可调用，只是没类型）。
//
// 产物：
//   - <domain>ApiPaths：路径常量（path-only 字符串），杜绝路径漂移。
//   - create<Domain>Api(http)：注入 HttpClient 后得到可调用 client。
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import yaml from 'js-yaml'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OPENAPI_DIR = path.join(ROOT, 'openapi')
const TYPES_API_DIR = path.join(ROOT, 'src', 'types')
const APIS_DIR = path.join(ROOT, 'src', 'apis')

// operationId -> 非约定命名的响应类型（yaml 信封层无法表达，手写覆盖）
const OVERRIDES = {
  'user.getUser': 'UserInfoView',
  'user.getByOpenid': 'UserInfoView',
  'user.getSubUser': 'UserSubView',
}

// user_api.yaml -> user ; message_subscribe_api.yaml -> message-subscribe
function domainFromFile(name) {
  return name.replace(/_api\.yaml$/, '').replace(/_/g, '-')
}

// 去掉分隔符并 Pascal 化，用作合法标识符：message-subscribe -> MessageSubscribe
function ident(d) {
  return d.replace(/(^|[-_ ])([a-zA-Z])/g, (_, __, c) => c.toUpperCase())
}

function pascal(s) {
  return s.replace(/(^|[^a-zA-Z])([a-zA-Z])/g, (_, __, c) => c.toUpperCase())
}

// 扫描手写 types/api/<domain>.ts，拿到命名空间名 + 所有导出类型名
function scanHandTypes(domain) {
  const file = path.join(TYPES_API_DIR, `${domain}.ts`)
  const names = new Set()
  let ns = null
  if (fs.existsSync(file)) {
    const src = fs.readFileSync(file, 'utf8')
    const nsMatch = src.match(/export\s+namespace\s+(\w+)/)
    if (nsMatch) ns = nsMatch[1]
    const re = /export\s+(?:interface|type)\s+(\w+)/g
    let m
    while ((m = re.exec(src))) names.add(m[1])
  }
  return { ns, names }
}

// 把 schema 名解析成 `Ns.Name` 类型引用，找不到返回 unknown
function resolveType(hand, name) {
  if (!name) return 'unknown'
  if (hand.names.has(name)) return `${hand.ns}.${name}`
  return 'unknown'
}

const SKIP_METHOD_KEYS = new Set(['parameters', 'summary', 'description', 'servers'])

function genOne(domain) {
  const yamlFile = path.join(OPENAPI_DIR, `${domain.replace(/-/g, '_')}_api.yaml`)
  if (!fs.existsSync(yamlFile)) return null
  // 没有手写类型文件的域（如 wechat）跳过，避免生成引用不存在命名空间的代码
  if (!fs.existsSync(path.join(TYPES_API_DIR, `${domain}.ts`))) return null

  const doc = yaml.load(fs.readFileSync(yamlFile, 'utf8'))
  const base = (doc.servers && doc.servers[0] && doc.servers[0].url) || ''
  const hand = scanHandTypes(domain)
  const ns = hand.ns || `${ident(domain)}Api`
  const paths = doc.paths || {}
  const entries = []

  for (const [p, methods] of Object.entries(paths)) {
    for (const [method, op] of Object.entries(methods)) {
      if (!op || typeof op !== 'object') continue
      if (SKIP_METHOD_KEYS.has(method)) continue
      const opId = op.operationId
      if (!opId) continue
      const fullPath = (base + p).replace(/\/+/g, '/')

      // 请求类型
      let reqType = undefined
      if (op.requestBody) {
        const ref = op.requestBody?.content?.['application/json']?.schema?.$ref
        if (ref) reqType = resolveType(hand, ref.split('/').pop())
      } else if (op.parameters && op.parameters.length) {
        const cand = `${pascal(opId)}Req`
        const t = resolveType(hand, cand)
        if (t !== 'unknown') reqType = t
      }

      // 响应类型
      let respName = OVERRIDES[`${domain}.${opId}`]
      if (!respName) {
        const cand = `${pascal(opId)}Resp`
        const t = resolveType(hand, cand)
        respName = t === 'unknown' ? null : cand
      }
      const respType = respName ? `${ns}.${respName}` : 'unknown'

      entries.push({
        opId,
        method: method.toUpperCase(),
        path: fullPath,
        reqType,
        respType,
      })
    }
  }

  return { domain, ns, entries }
}

function emitApi(domain, ns, entries) {
  const constName = `${ident(domain)}ApiPaths`
  const factoryName = `create${ident(domain)}Api`
  const L = []
  L.push(`import type { ${ns} } from '../types/${domain}'`)
  L.push(`import type { HttpClient, RequestOptions } from '../request/client'`)
  L.push('')
  L.push(`export const ${constName} = {`)
  for (const e of entries) L.push(`  ${e.opId}: '${e.path}',`)
  L.push(`} as const`)
  L.push('')
  L.push(`export const ${factoryName} = (http: HttpClient) => ({`)
  for (const e of entries) {
    const verb = e.method.toLowerCase()
    if (e.method === 'GET' || e.method === 'DELETE') {
      const param = e.reqType ? `params: ${e.reqType}` : `params?: unknown`
      L.push(`  ${e.opId}: (${param}, opts?: RequestOptions) =>`)
      L.push(`    http.${verb}<${e.respType}>(${constName}.${e.opId}, params, opts),`)
    } else {
      const param = e.reqType ? `data: ${e.reqType}` : `data?: unknown`
      L.push(`  ${e.opId}: (${param}, opts?: RequestOptions) =>`)
      L.push(`    http.${verb}<${e.respType}>(${constName}.${e.opId}, data, opts),`)
    }
  }
  L.push(`})`)
  L.push('')
  fs.writeFileSync(path.join(APIS_DIR, `${domain}.ts`), L.join('\n'))
}

function main() {
  // 当前只落地 user 一条链路，避免一次性铺开全部域。
  // 后续要扩展时把 'user_api.yaml' 换成需要生成的 yaml 列表即可。
  const files = ['user_api.yaml']
  const apiExports = []
  for (const f of files) {
    const domain = domainFromFile(f)
    const r = genOne(domain)
    if (!r) continue
    emitApi(r.domain, r.ns, r.entries)
    apiExports.push({ domain: r.domain, ns: r.ns })
  }
  const L = []
  for (const { domain } of apiExports) {
    L.push(`export { ${ident(domain)}ApiPaths, create${ident(domain)}Api } from './${domain}'`)
  }
  L.push('')
  fs.writeFileSync(path.join(APIS_DIR, 'index.ts'), L.join('\n'))
  console.log(
    `generated ${apiExports.length} api modules:`,
    apiExports.map((x) => x.domain).join(', '),
  )
}

main()
