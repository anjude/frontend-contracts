import type { ApiResponse, HttpClient, RequestOptions } from '@/contracts'
import {
  createChecklistApi,
  createCommonApi,
  createItemApi,
  createMessageSubscribeApi,
  createPlanApi,
  createTopicApi,
  createUserApi,
  createWechatApi,
} from '@/contracts'
import { request } from '@/utils/request'

function requestOptions(options?: RequestOptions) {
  return {
    timeout: typeof options?.timeout === 'number' ? options.timeout : undefined,
  }
}

/** 把项目 request 层适配成共享协议要求的 HttpClient。 */
export const contractHttpClient: HttpClient = {
  get: <T>(path: string, params?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> =>
    request.get<T>(path, params, requestOptions(options)).then((response) => response.data),
  post: <T>(path: string, data?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> =>
    request.post<T>(path, data, requestOptions(options)).then((response) => response.data),
  put: <T>(path: string, data?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> =>
    request.put<T>(path, data, requestOptions(options)).then((response) => response.data),
  delete: <T>(path: string, params?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> =>
    request.delete<T>(path, params, requestOptions(options)).then((response) => response.data),
}

/** 共享契约生成的 API client 均绑定到当前小程序 request 实现。 */
export const userApi = createUserApi(contractHttpClient)
export const commonApi = createCommonApi(contractHttpClient)
export const checklistApi = createChecklistApi(contractHttpClient)
export const itemApi = createItemApi(contractHttpClient)
export const messageSubscribeApi = createMessageSubscribeApi(contractHttpClient)
export const planApi = createPlanApi(contractHttpClient)
export const topicApi = createTopicApi(contractHttpClient)
export const wechatApi = createWechatApi(contractHttpClient)
