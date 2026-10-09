export const apiUrlMap = {
  debug: 'http://so.proxy.beanflow.top:82',
  develop: 'https://api.beanflow.top:8080',
  trial: 'https://api.beanflow.top:8080',
  release: 'https://api.beanflow.top',
} as const

export const config = {
  /** 各产品共用后端；小程序启动时按微信环境切换。 */
  baseURL: apiUrlMap.release as string,
  apiUrlMap,
  requestTimeout: 10000,
}

export type MiniProgramEnv = keyof typeof apiUrlMap

export function configureApiBaseURL(envVersion?: string): string {
  const version = envVersion ?? uni.getAccountInfoSync().miniProgram.envVersion
  const resolvedEnv = version in apiUrlMap ? version as MiniProgramEnv : 'develop'
  config.baseURL = apiUrlMap[resolvedEnv]
  return config.baseURL
}

export default config
