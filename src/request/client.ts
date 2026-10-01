import type { ApiResponse } from '../types/base'

// 框架无关的 HTTP 客户端契约。
// 各前端（superone / carbon）用自己的 request 层实现它，
// 把自身业务信封（errCode/data/msg）塞进 ApiResponse<T> 返回。
// 生成出来的 apis/*.ts 只依赖这个接口，不依赖任何具体框架。
export interface RequestOptions {
  noRetry?: boolean
  [key: string]: unknown
}

export interface HttpClient {
  get<T>(path: string, params?: unknown, opts?: RequestOptions): Promise<ApiResponse<T>>
  post<T>(path: string, data?: unknown, opts?: RequestOptions): Promise<ApiResponse<T>>
  put<T>(path: string, data?: unknown, opts?: RequestOptions): Promise<ApiResponse<T>>
  delete<T>(path: string, params?: unknown, opts?: RequestOptions): Promise<ApiResponse<T>>
}
