import type { OrganizationApi } from '../types/organization'
import type { HttpClient, RequestOptions } from '../request/client'

export const OrganizationApiPaths = {
  create: '/api/so/mcp/organization/create', list: '/api/so/mcp/organization/list',
  members: '/api/so/mcp/organization/member/list', invite: '/api/so/mcp/organization/invite/create', accept: '/api/so/mcp/organization/invite/accept',
} as const
export const createOrganizationApi = (http: HttpClient) => ({
  create: (data: OrganizationApi.CreateReq, opts?: RequestOptions) => http.post<OrganizationApi.CreateResp>(OrganizationApiPaths.create, data, opts),
  list: (data: OrganizationApi.PageReq, opts?: RequestOptions) => http.post<OrganizationApi.ListResp>(OrganizationApiPaths.list, data, opts),
  members: (data: OrganizationApi.MembersReq, opts?: RequestOptions) => http.post<OrganizationApi.MembersResp>(OrganizationApiPaths.members, data, opts),
  invite: (data: OrganizationApi.OrganizationIdReq, opts?: RequestOptions) => http.post<OrganizationApi.InviteResp>(OrganizationApiPaths.invite, data, opts),
  accept: (data: OrganizationApi.AcceptReq, opts?: RequestOptions) => http.post<OrganizationApi.AcceptResp>(OrganizationApiPaths.accept, data, opts),
})
