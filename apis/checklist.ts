import type { ChecklistApi } from '../types/checklist'
import type { HttpClient, RequestOptions } from '../request/client'

export const ChecklistApiPaths = {
  getChecklistList: '/api/so/checklist/list',
  getChecklistDetail: '/api/so/checklist/detail',
  createChecklist: '/api/so/checklist/create',
  updateChecklist: '/api/so/checklist/update',
  deleteChecklist: '/api/so/checklist/delete',
  getExecutionList: '/api/so/checklist/execution/list',
  getExecutionDetail: '/api/so/checklist/execution/detail',
  createExecution: '/api/so/checklist/execution/create',
  updateExecution: '/api/so/checklist/execution/update',
  deleteExecution: '/api/so/checklist/execution/delete',
  getExecutionHistory: '/api/so/checklist/execution/history',
} as const

export const createChecklistApi = (http: HttpClient) => ({
  getChecklistList: (data: ChecklistApi.GetChecklistListReq, opts?: RequestOptions) =>
    http.post<ChecklistApi.GetChecklistListResp>(ChecklistApiPaths.getChecklistList, data, opts),
  getChecklistDetail: (params: ChecklistApi.GetChecklistDetailReq, opts?: RequestOptions) =>
    http.get<ChecklistApi.GetChecklistDetailResp>(ChecklistApiPaths.getChecklistDetail, params, opts),
  createChecklist: (data: ChecklistApi.CreateChecklistReq, opts?: RequestOptions) =>
    http.post<ChecklistApi.CreateChecklistResp>(ChecklistApiPaths.createChecklist, data, opts),
  updateChecklist: (data: ChecklistApi.UpdateChecklistReq, opts?: RequestOptions) =>
    http.post<ChecklistApi.UpdateChecklistResp>(ChecklistApiPaths.updateChecklist, data, opts),
  deleteChecklist: (data: ChecklistApi.DeleteChecklistReq, opts?: RequestOptions) =>
    http.post<ChecklistApi.DeleteChecklistResp>(ChecklistApiPaths.deleteChecklist, data, opts),
  getExecutionList: (data: ChecklistApi.GetExecutionListReq, opts?: RequestOptions) =>
    http.post<ChecklistApi.GetExecutionListResp>(ChecklistApiPaths.getExecutionList, data, opts),
  getExecutionDetail: (params: ChecklistApi.GetExecutionDetailReq, opts?: RequestOptions) =>
    http.get<ChecklistApi.GetExecutionDetailResp>(ChecklistApiPaths.getExecutionDetail, params, opts),
  createExecution: (data: ChecklistApi.CreateExecutionReq, opts?: RequestOptions) =>
    http.post<ChecklistApi.CreateExecutionResp>(ChecklistApiPaths.createExecution, data, opts),
  updateExecution: (data: ChecklistApi.UpdateExecutionReq, opts?: RequestOptions) =>
    http.post<ChecklistApi.UpdateExecutionResp>(ChecklistApiPaths.updateExecution, data, opts),
  deleteExecution: (data: ChecklistApi.DeleteExecutionReq, opts?: RequestOptions) =>
    http.post<ChecklistApi.DeleteExecutionResp>(ChecklistApiPaths.deleteExecution, data, opts),
  getExecutionHistory: (data: ChecklistApi.GetExecutionHistoryReq, opts?: RequestOptions) =>
    http.post<ChecklistApi.GetExecutionHistoryResp>(ChecklistApiPaths.getExecutionHistory, data, opts),
})
