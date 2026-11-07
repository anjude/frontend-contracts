import type { AssessmentApi } from '../types/assessment'
import type { HttpClient, RequestOptions } from '../request/client'

export const AssessmentApiPaths = {
  getList: '/api/so/gknow/assessment/list', getDetail: '/api/so/gknow/assessment/detail',
  create: '/api/so/gknow/assessment/create', update: '/api/so/gknow/assessment/update',
} as const

export const createAssessmentApi = (http: HttpClient) => ({
  getList: (data: AssessmentApi.GetListReq, opts?: RequestOptions) => http.post<AssessmentApi.GetListResp>(AssessmentApiPaths.getList, data, opts),
  getDetail: (params: AssessmentApi.GetDetailReq, opts?: RequestOptions) => http.get<AssessmentApi.GetDetailResp>(AssessmentApiPaths.getDetail, params, opts),
  create: (data: AssessmentApi.CreateReq, opts?: RequestOptions) => http.post<AssessmentApi.CreateResp>(AssessmentApiPaths.create, data, opts),
  update: (data: AssessmentApi.UpdateReq, opts?: RequestOptions) => http.post<AssessmentApi.UpdateResp>(AssessmentApiPaths.update, data, opts),
})
