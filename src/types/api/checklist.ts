import type { PaginationData } from './base'

export namespace ChecklistApi {
  export type ExecutionMode = 0 | 1
  export type ExecutionStatus = 0 | 1

  export interface ChecklistExecutionStepEntity {
    itemId: number
    summaryMd: string
    confirmTime?: number
    isSkipped?: boolean
  }

  export interface ChecklistExecutionRecordEntity {
    id: number
    openid: string
    createTime: number
    updateTime: number
    checklistId: number
    title?: string
    mode: ExecutionMode
    overallSummaryMd?: string
    stepSummaries?: ChecklistExecutionStepEntity[]
    startTime: number
    finishTime?: number
    status: ExecutionStatus
  }

  export interface ChecklistExecutionForm {
    checklistId: number
    mode: ExecutionMode
    title?: string
    overallSummaryMd?: string
    stepSummaries?: ChecklistExecutionStepEntity[]
    startTime: number
    finishTime?: number
    status: ExecutionStatus
  }

  export interface GetExecutionListReq {
    checklistId?: number
    offset?: number
    size?: number
    status?: ExecutionStatus
  }

  export interface GetExecutionListResp extends PaginationData<ChecklistExecutionRecordEntity> {}

  export interface GetExecutionDetailReq {
    id: number
  }

  export interface GetExecutionDetailResp extends ChecklistExecutionRecordEntity {}

  export interface CreateExecutionReq extends ChecklistExecutionForm {}
  export interface CreateExecutionResp extends ChecklistExecutionRecordEntity {}

  export interface UpdateExecutionReq extends ChecklistExecutionForm {
    id: number
  }

  export interface UpdateExecutionResp extends ChecklistExecutionRecordEntity {}

  export interface DeleteExecutionReq {
    id: number
  }

  export interface DeleteExecutionResp {
    success: boolean
  }

  export interface GetExecutionHistoryReq {
    checklistId: number
    offset?: number
    size?: number
    startTime?: number
    endTime?: number
  }

  export interface GetExecutionHistoryResp extends PaginationData<ChecklistExecutionRecordEntity> {}
}
