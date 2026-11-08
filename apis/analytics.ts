import type { HttpClient, RequestOptions } from '../request/client'
import type { AnalyticsApi } from '../types/analytics'

export const AnalyticsApiPaths = { collect: '/api/so/analytics/events/batch' } as const

export const createAnalyticsApi = (http: HttpClient) => ({
  collect: (data: AnalyticsApi.BatchReq, opts?: RequestOptions) =>
    http.post<AnalyticsApi.BatchResp>(AnalyticsApiPaths.collect, data, opts),
})
