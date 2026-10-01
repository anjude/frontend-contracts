import type { PaginationData } from './base'

export const ExecutionMode = {
  Normal: 0,
  Recursive: 1,
} as const
export type ExecutionMode = (typeof ExecutionMode)[keyof typeof ExecutionMode]

export const ExecutionStatus = {
  Draft: 0,
  Finished: 1,
} as const
export type ExecutionStatus = (typeof ExecutionStatus)[keyof typeof ExecutionStatus]


export namespace ChecklistApi {
  export interface ChecklistItem {
    id: number
    contentMd: string
  }

  export interface ChecklistEntity {
    id: number
    openid: string
    title: string
    items: ChecklistItem[]
    top: number
    createTime: number
    updateTime: number
  }

  export interface GetChecklistListReq {
    offset: number
    size: number
    keyword: string
  }
  export interface GetChecklistListResp extends PaginationData<ChecklistEntity> {}

  export interface GetChecklistDetailReq {
    id: number
  }
  export interface GetChecklistDetailResp extends ChecklistEntity {}

  export interface CreateChecklistReq {
    title: string
    items: ChecklistItem[]
  }
  export interface CreateChecklistResp extends ChecklistEntity {}

  /** 部分更新：只传要改的字段（title / items / top 都可省） */
  export interface UpdateChecklistReq {
    id: number
    title?: string
    items?: ChecklistItem[]
    top?: number
  }
  export interface UpdateChecklistResp extends ChecklistEntity {}

  export interface DeleteChecklistReq {
    id: number
  }
  export interface DeleteChecklistResp {}

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

  /** 后端是空响应（执行记录软删，不返回内容） */
  export interface DeleteExecutionResp {}

  export interface GetExecutionHistoryReq {
    checklistId: number
    offset?: number
    size?: number
    startTime?: number
    endTime?: number
  }

  export interface GetExecutionHistoryResp extends PaginationData<ChecklistExecutionRecordEntity> {}
}
