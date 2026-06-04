export const checklistApiPaths = {
  getExecutionList: 'POST /api/so/checklist/execution/list',
  getExecutionDetail: 'GET /api/so/checklist/execution/detail',
  createExecution: 'POST /api/so/checklist/execution/create',
  updateExecution: 'POST /api/so/checklist/execution/update',
  deleteExecution: 'POST /api/so/checklist/execution/delete',
  getExecutionHistory: 'POST /api/so/checklist/execution/history',
} as const

export type {
  GetExecutionListReq,
  GetExecutionListResp,
  GetExecutionDetailReq,
  GetExecutionDetailResp,
  CreateExecutionReq,
  CreateExecutionResp,
  UpdateExecutionReq,
  UpdateExecutionResp,
  DeleteExecutionReq,
  DeleteExecutionResp,
  GetExecutionHistoryReq,
  GetExecutionHistoryResp,
} from '../types/api/checklist'
