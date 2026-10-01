// plan 域类型：目标（Goal）/ 关键结果（KeyResult）/ 近期任务（RecentTask）。
// 来源是 backend-superone 的 internal/domain/plan/plan_dto 与 constant/plan.go，
// 枚举取值与后端 Go 常量一一对应，改动前先对后端，别在前端自己造值。

import type { PaginationData } from './base'

/** 任务优先级 */
export const TaskPriority = {
  Low: 1,
  Medium: 2,
  High: 3,
} as const
export type TaskPriority = (typeof TaskPriority)[keyof typeof TaskPriority]

/** 任务状态 */
export const TaskStatus = {
  Pending: 1,
  InProgress: 2,
  Completed: 3,
  Cancelled: 4,
} as const
export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus]

/** 目标状态（同时用于关键结果） */
export const GoalStatus = {
  NotStarted: 1,
  InProgress: 2,
  Completed: 3,
  AtRisk: 4,
} as const
export type GoalStatus = (typeof GoalStatus)[keyof typeof GoalStatus]

/** 目标优先级 */
export const GoalPriority = {
  Low: 1,
  Medium: 2,
  High: 3,
} as const
export type GoalPriority = (typeof GoalPriority)[keyof typeof GoalPriority]

/** 目标类型 */
export const GoalType = {
  Quarterly: 1,
  Annual: 2,
} as const
export type GoalType = (typeof GoalType)[keyof typeof GoalType]

/** 季度（0 表示年度目标） */
export const Quarter = {
  Annual: 0,
  Q1: 1,
  Q2: 2,
  Q3: 3,
  Q4: 4,
} as const
export type Quarter = (typeof Quarter)[keyof typeof Quarter]

export namespace PlanApi {
  /** 关键结果表单 */
  export interface KeyResultForm {
    title: string
    description: string
    status: GoalStatus
    /** 进度百分比 0-100 */
    progress: number
  }

  /** 关键结果详情 */
  export interface KeyResultDetail {
    title: string
    description: string
    status: GoalStatus
    progress: number
  }

  /** 目标详情 */
  export interface GoalDetail {
    id: number
    openid: string
    title: string
    description: string
    year: number
    /** 所属季度，年度目标为 0，后端 omitempty 可能不返回 */
    quarter?: Quarter
    status: GoalStatus
    priority: GoalPriority
    type: GoalType
    archived: boolean
    deadline: number
    keyResults: KeyResultDetail[]
    top: number
    createTime: number
    updateTime: number
  }

  export interface GetGoalListReq {
    offset: number
    size: number
    keyword: string
    year?: number
    quarter?: Quarter
    type?: GoalType
    status?: GoalStatus
    priority?: GoalPriority
  }
  export interface GetGoalListResp extends PaginationData<GoalDetail> {}

  export interface GetGoalDetailReq {
    id: number
  }
  export interface GetGoalDetailResp extends GoalDetail {}

  export interface CreateGoalReq {
    title: string
    description: string
    year: number
    /** 年度目标传 0 */
    quarter: Quarter
    priority: GoalPriority
    keyResults: KeyResultForm[]
    deadline: number
  }
  export interface CreateGoalResp extends GoalDetail {}

  /** 部分更新：只传要改的字段 */
  export interface UpdateGoalReq {
    id: number
    title?: string
    description?: string
    year?: number
    quarter?: Quarter
    priority?: GoalPriority
    keyResults?: KeyResultForm[]
    deadline?: number
    top?: number
    archived?: boolean
  }
  export interface UpdateGoalResp extends GoalDetail {}

  export interface DeleteGoalReq {
    id: number
  }
  export interface DeleteGoalResp {
    success: boolean
  }

  /** 近期任务详情 */
  export interface RecentTaskDetail {
    id: number
    openid: string
    title: string
    description: string
    status: TaskStatus
    priority: TaskPriority
    deadline: number
    top: number
    createTime: number
    updateTime: number
  }

  export interface GetRecentTaskListReq {
    keyword: string
    offset: number
    size: number
    statusList: TaskStatus[]
    priority?: TaskPriority
  }
  export interface GetRecentTaskListResp extends PaginationData<RecentTaskDetail> {}

  export interface GetRecentTaskDetailReq {
    id: number
  }
  export interface GetRecentTaskDetailResp extends RecentTaskDetail {}

  export interface CreateRecentTaskReq {
    title: string
    description: string
    priority: TaskPriority
    deadline: number
  }
  export interface CreateRecentTaskResp extends RecentTaskDetail {}

  /** 部分更新：只传要改的字段 */
  export interface UpdateRecentTaskReq {
    id: number
    title?: string
    description?: string
    status?: TaskStatus
    priority?: TaskPriority
    deadline?: number
    top?: number
  }
  export interface UpdateRecentTaskResp extends RecentTaskDetail {}

  export interface DeleteRecentTaskReq {
    id: number
  }
  export interface DeleteRecentTaskResp {
    success: boolean
  }
}
