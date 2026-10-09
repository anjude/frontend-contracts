import type { ApiResponse } from '@/contracts'
import config from '@/constant/config'
import { getHttpAdapter } from '@/utils/adapt/http'
import type { HttpMethod } from '@/utils/adapt/http'
import { ParamConverter } from '@/utils/param-converter'

export interface RequestConfig {
  url: string
  method: HttpMethod
  data?: unknown
  params?: unknown
  headers?: Record<string, string>
  timeout?: number
}

export interface ApiError extends Error {
  errCode: number
  statusCode: number
  raw: unknown
}

type RequestInterceptor = (config: RequestConfig) => RequestConfig | Promise<RequestConfig>

function createApiError(errMsg: string, errCode: number, statusCode: number, raw: unknown): ApiError {
  const error = new Error(errMsg) as ApiError
  error.name = 'ApiError'
  error.errCode = errCode
  error.statusCode = statusCode
  error.raw = raw
  return error
}

function buildUrl(path: string, params?: unknown): string {
  const isAbsoluteUrl = /^https?:\/\//i.test(path)
  if (!isAbsoluteUrl && !config.baseURL) {
    throw createApiError('未配置 API 基地址，暂不能请求后端接口', -1, 0, { path })
  }

  const url = isAbsoluteUrl ? path : `${config.baseURL}${path.startsWith('/') ? '' : '/'}${path}`
  if (!params || typeof params !== 'object' || Array.isArray(params)) return url

  const query: string[] = []
  Object.entries(params as Record<string, unknown>).forEach(([key, value]) => {
    if (value === null || value === undefined) return
    const values = Array.isArray(value) ? value : [value]
    values.forEach((item) => {
      if (item === null || item === undefined) return
      const queryValue = typeof item === 'object' ? JSON.stringify(item) : String(item)
      query.push(`${encodeURIComponent(key)}=${encodeURIComponent(queryValue)}`)
    })
  })
  const queryString = query.join('&')
  if (!queryString) return url
  return `${url}${url.includes('?') ? '&' : '?'}${queryString}`
}

function isApiResponse(value: unknown): value is ApiResponse<unknown> {
  if (!value || typeof value !== 'object') return false
  const response = value as Partial<ApiResponse<unknown>>
  return typeof response.errCode === 'number' && 'data' in response
}

export class Request {
  private requestInterceptors: RequestInterceptor[] = []
  readonly interceptors = {
    request: {
      use: (interceptor: RequestInterceptor) => this.requestInterceptors.push(interceptor),
    },
  }

  get<T>(url: string, params?: unknown, options?: Partial<RequestConfig>) {
    return this.request<T>({ url, method: 'GET', params, ...options })
  }

  post<T>(url: string, data?: unknown, options?: Partial<RequestConfig>) {
    return this.request<T>({ url, method: 'POST', data, ...options })
  }

  put<T>(url: string, data?: unknown, options?: Partial<RequestConfig>) {
    return this.request<T>({ url, method: 'PUT', data, ...options })
  }

  delete<T>(url: string, params?: unknown, options?: Partial<RequestConfig>) {
    return this.request<T>({ url, method: 'DELETE', params, ...options })
  }

  async request<T>(initialConfig: RequestConfig): Promise<{ statusCode: number; headers?: Record<string, string>; data: ApiResponse<T> }> {
    let requestConfig = initialConfig
    for (const interceptor of this.requestInterceptors) requestConfig = await interceptor(requestConfig)

    const params = requestConfig.method === 'GET' || requestConfig.method === 'DELETE'
      ? ParamConverter.toSnakeCase(requestConfig.params)
      : undefined
    const data = requestConfig.method === 'GET' || requestConfig.method === 'DELETE'
      ? undefined
      : ParamConverter.toSnakeCase(requestConfig.data)
    const url = buildUrl(requestConfig.url, params)

    let response
    try {
      response = await getHttpAdapter().request<unknown>({
        url,
        method: requestConfig.method,
        data,
        headers: requestConfig.headers,
        timeout: requestConfig.timeout ?? config.requestTimeout,
      })
    } catch (error) {
      throw createApiError('网络请求失败，请稍后再试', -1, 0, error)
    }

    const body = ParamConverter.toCamelCase(response.data)
    if (response.statusCode < 200 || response.statusCode >= 300) {
      const message = isApiResponse(body) ? body.msg : `请求失败（HTTP ${response.statusCode}）`
      const errCode = isApiResponse(body) ? body.errCode : -1
      throw createApiError(message || `请求失败（HTTP ${response.statusCode}）`, errCode, response.statusCode, body)
    }
    if (!isApiResponse(body)) {
      throw createApiError('接口响应格式不正确', -1, response.statusCode, body)
    }
    if (body.errCode !== 0) {
      throw createApiError(body.msg || '请求未成功', body.errCode, response.statusCode, body)
    }

    return {
      statusCode: response.statusCode,
      headers: response.headers,
      data: body as ApiResponse<T>,
    }
  }
}

export const request = new Request()
export default request
