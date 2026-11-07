import type { SkillApi } from '../types/skill'
import type { HttpClient, RequestOptions } from '../request/client'

export const SkillApiPaths = {
  list: '/api/so/mcp/skill/list', detail: '/api/so/mcp/skill/detail',
  create: '/api/so/mcp/skill/create', update: '/api/so/mcp/skill/update', delete: '/api/so/mcp/skill/delete',
} as const
export const createSkillApi = (http: HttpClient) => ({
  list: (data: SkillApi.ListReq, opts?: RequestOptions) => http.post<SkillApi.ListResp>(SkillApiPaths.list, data, opts),
  detail: (params: SkillApi.DetailReq, opts?: RequestOptions) => http.get<SkillApi.DetailResp>(SkillApiPaths.detail, params, opts),
  create: (data: SkillApi.CreateReq, opts?: RequestOptions) => http.post<SkillApi.SkillInfo>(SkillApiPaths.create, data, opts),
  update: (data: SkillApi.UpdateReq, opts?: RequestOptions) => http.post<SkillApi.SkillInfo>(SkillApiPaths.update, data, opts),
  delete: (data: SkillApi.DeleteReq, opts?: RequestOptions) => http.post<SkillApi.DeleteResp>(SkillApiPaths.delete, data, opts),
})
