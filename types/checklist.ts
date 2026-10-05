import type { PaginationData } from './base'

/**
 * 枚举取值以 backend-superone constant/checklist.go 的 iota+1 为准（1-based），
 * DTO 注释里的 0-based 是过期描述。create 接口对 mode/status 有 binding:"required"，
 * int 的 required 即非 0——传 0 会被参数校验直接拒绝。
 */
export const ExecutionMode = {
  Normal: 1,
  StepByStep: 2,
} as const
export type ExecutionMode = (typeof ExecutionMode)[keyof typeof ExecutionMode]

export const ExecutionStatus = {
  InProgress: 1,
  Completed: 2,
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

  /** 部分更新：后端字段全是指针（nil 不更新），只传要改的字段即可。
   * 对应 execution_dto.go 注释示例：{"id": 1, "status": 1} 也是合法请求 */
  export interface UpdateExecutionReq {
    id: number
    checklistId?: number
    mode?: ExecutionMode
    title?: string
    overallSummaryMd?: string
    stepSummaries?: ChecklistExecutionStepEntity[]
    startTime?: number
    finishTime?: number
    status?: ExecutionStatus
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
