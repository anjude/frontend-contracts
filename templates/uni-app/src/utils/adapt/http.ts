export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export interface HttpRequestOptions {
  url: string
  method: HttpMethod
  data?: unknown
  headers?: Record<string, string>
  timeout?: number
}

export interface HttpResponse<T = unknown> {
  statusCode: number
  data: T
  headers?: Record<string, string>
}

export interface HttpAdapter {
  request<T = unknown>(options: HttpRequestOptions): Promise<HttpResponse<T>>
}

/** uni.request 的微信小程序适配；上层 request 不依赖平台回调格式。 */
export class UniHttpAdapter implements HttpAdapter {
  request<T = unknown>(options: HttpRequestOptions): Promise<HttpResponse<T>> {
    return new Promise((resolve, reject) => {
      uni.request({
        url: options.url,
        method: options.method,
        data: options.data as string | Record<string, unknown> | ArrayBuffer | undefined,
        header: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        timeout: options.timeout ?? 10000,
        success: (result) => resolve({
          statusCode: result.statusCode,
          data: result.data as T,
          headers: result.header as Record<string, string>,
        }),
        fail: reject,
      })
    })
  }
}

let activeAdapter: HttpAdapter = new UniHttpAdapter()

export function getHttpAdapter(): HttpAdapter {
  return activeAdapter
}

export function setHttpAdapter(adapter: HttpAdapter): void {
  activeAdapter = adapter
}
