# uni-app 客户端接入共享契约

本指南说明如何在 uni-app 微信小程序中接入 `frontend-contracts`，以及如何复用本仓的请求层模板。新项目只复制请求运行时代码；OpenAPI、共享 API 工厂和类型始终通过 Git 子仓引用，不复制到客户端。

## 目录职责

| 路径 | 用途 | 客户端处理方式 |
| --- | --- | --- |
| `openapi/` | 后端接口唯一描述 | 只读引用；协议变更回到本仓维护 |
| `apis/` | 根据契约生成的 API 路径和 client factory | 通过子仓导入，不复制 |
| `types/` | 共享请求、响应、枚举和模型 | 通过子仓导入，不复制 |
| `request/client.ts` | API factory 所依赖的 `HttpClient` 接口 | 通过子仓导入 |
| `templates/uni-app/src/` | uni-app request 运行时接入模板 | 复制到新客户端后按项目调整 |

模板里的 `src/contract.ts` 负责把共享 API factory 绑定到客户端 `HttpClient`；`src/utils/request.ts` 负责请求语义与错误处理；`src/utils/adapt/http.ts` 只负责将 `uni.request` 归一为 Promise。`contract.ts` 是共享协议域的组合入口，不是每个项目都必须整体使用的业务 API 汇总。模板不会引入某个产品的页面、登录流程或 token 存储。

## 新项目接入步骤

### 1. 挂载协议子仓

在 uni-app 项目根目录执行：

```bash
git submodule add -b release git@github.com:anjude/frontend-contracts.git src/contracts
```

已有项目检出后初始化：

```bash
git submodule update --init --recursive
```

客户端应跟随 `release` 分支。父仓提交记录的是契约子仓的固定提交，克隆或 CI 构建时使用该固定版本。
新客户端应从包含 `templates/uni-app/` 的 `release` 修订复制模板；已有客户端若模板尚未出现在已锁定的子仓版本，先将子仓更新到包含该模板的修订。

### 2. 复制请求运行时模板

从 uni-app 项目根目录把 `src/contracts/templates/uni-app/src/` 下的通用运行时文件复制合并进项目的 `src/`。模板不提供 `src/apis/index.ts`：它属于项目自己的业务 API 入口，应由项目决定从 `@/contract` 导出哪些 API，或在现有 API barrel 中合并导出。目标项目若已有同名文件，应人工合并；不要覆盖整个 `App.vue`、项目自己的 API 入口或业务 request 配置。

模板当前包含：

- `src/constant/config.ts`：API 基地址、环境映射和请求超时。
- `src/utils/adapt/http.ts`：`uni.request` 适配器与替换入口。
- `src/utils/param-converter.ts`：递归 snake_case / camelCase 转换。
- `src/utils/request.ts`：URL 拼接、查询参数、请求拦截器、HTTP 和业务错误处理。
- `src/contract.ts`：共享 `HttpClient` 与契约 API factories 绑定；项目可按实际需要删减 API factory 绑定。

uni-app 的 `@` 别名需要指向 `src/`。模板以 `@/contracts` 访问子仓，不应为模板再复制 `apis/` 或 `types/`。

### 3. 初始化小程序环境

将模板配置函数接到现有 `App.vue` 的 `onLaunch`，确保页面发请求前已经选定基地址：

```ts
import { configureApiBaseURL } from '@/constant/config'

export default defineComponent({
  onLaunch() {
    configureApiBaseURL()
  },
})
```

模板默认采用当前共用后端的地址映射：

| 微信环境 | 后端地址 |
| --- | --- |
| `debug` | `http://so.proxy.beanflow.top:82` |
| `develop` | `https://api.beanflow.top:8080` |
| `trial` | `https://api.beanflow.top:8080` |
| `release` | `https://api.beanflow.top` |

如某个项目使用不同环境地址，应在该项目 `src/constant/config.ts` 调整 `apiUrlMap`，并确认域名已加入微信公众平台的 request 合法域名。

### 4. 使用契约 API

先在项目自己的 API 入口中选择要暴露的 client，例如：

```ts
// src/apis/index.ts
export { userApi } from '@/contract'
export { ApiError, request } from '@/utils/request'
```

页面再从 `@/apis` 使用它；请求和响应类型直接从 `@/contracts` 导入：

```ts
import { userApi } from '@/apis'
import type { UserApi } from '@/contracts/types/user'

const response = await userApi.getUserList({ offset: 0, size: 20 })
const users: UserApi.GetUserListResp = response.data
```

API factory 成功时返回契约 `ApiResponse<T>`。HTTP 状态异常、业务 `errCode` 非零、网络失败或响应信封格式错误时，request 层抛出 `ApiError`。页面和 Composable 应消费 API/Repo 输出，不直接调用 `uni.request`。

### 5. 接入认证

认证属于具体应用策略，不放进协议仓的通用模板。确定登录流程后，在 `request.interceptors.request.use(...)` 中读取项目自己的 token 并设置 `Authorization` 请求头；只有服务端明确过期码及刷新流程后，再实现 token 续期和请求重放。

## 更新与同步

1. API 路径、请求/响应类型或枚举变化：在对应后端实现确认后更新本仓 `openapi/`、`apis/`、`types/`，提交并推送 `release`。
2. 客户端更新契约版本：在客户端仓执行 `git submodule update --remote src/contracts`，检查 API/type 使用变化，提交新的子仓指针。
3. 请求模板逻辑变化：先更新 `templates/uni-app/src/`，再逐个对照客户端复制/合并。子仓指针更新不会自动覆盖客户端已复制的运行时代码。
4. 新客户端接入后运行项目自己的 `npm run type-check` 和目标平台构建，例如 `npm run build:mp-weixin`。

## 鹅懂个啥接入实例

`uni-gknow` 的完整接入实现位于工作台 `business-repo/uni-gknow/`：`src/contracts/` 为子仓，通用 request 运行时代码按模板复制；其 `src/apis/index.ts` 是 gknow 自己选择的 API 汇总层，不属于通用模板。`App.vue` 在 `onLaunch` 中选择环境地址。该项目暂未接入实际业务 API 和认证流程。
