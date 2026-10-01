import type { PlanApi } from '../types/plan'
import type { HttpClient, RequestOptions } from '../request/client'

export const PlanApiPaths = {
  getRecentTaskList: '/api/so/plan/recent_task/list',
  getRecentTaskDetail: '/api/so/plan/recent_task/detail',
  createRecentTask: '/api/so/plan/recent_task/create',
  updateRecentTask: '/api/so/plan/recent_task/update',
  deleteRecentTask: '/api/so/plan/recent_task/delete',
  getGoalList: '/api/so/plan/goal/list',
  getGoalDetail: '/api/so/plan/goal/detail',
  createGoal: '/api/so/plan/goal/create',
  updateGoal: '/api/so/plan/goal/update',
  deleteGoal: '/api/so/plan/goal/delete',
} as const

export const createPlanApi = (http: HttpClient) => ({
  getRecentTaskList: (data: PlanApi.GetRecentTaskListReq, opts?: RequestOptions) =>
    http.post<PlanApi.GetRecentTaskListResp>(PlanApiPaths.getRecentTaskList, data, opts),
  getRecentTaskDetail: (params: PlanApi.GetRecentTaskDetailReq, opts?: RequestOptions) =>
    http.get<PlanApi.GetRecentTaskDetailResp>(PlanApiPaths.getRecentTaskDetail, params, opts),
  createRecentTask: (data: PlanApi.CreateRecentTaskReq, opts?: RequestOptions) =>
    http.post<PlanApi.CreateRecentTaskResp>(PlanApiPaths.createRecentTask, data, opts),
  updateRecentTask: (data: PlanApi.UpdateRecentTaskReq, opts?: RequestOptions) =>
    http.post<PlanApi.UpdateRecentTaskResp>(PlanApiPaths.updateRecentTask, data, opts),
  deleteRecentTask: (data: PlanApi.DeleteRecentTaskReq, opts?: RequestOptions) =>
    http.post<PlanApi.DeleteRecentTaskResp>(PlanApiPaths.deleteRecentTask, data, opts),
  getGoalList: (data: PlanApi.GetGoalListReq, opts?: RequestOptions) =>
    http.post<PlanApi.GetGoalListResp>(PlanApiPaths.getGoalList, data, opts),
  getGoalDetail: (params: PlanApi.GetGoalDetailReq, opts?: RequestOptions) =>
    http.get<PlanApi.GetGoalDetailResp>(PlanApiPaths.getGoalDetail, params, opts),
  createGoal: (data: PlanApi.CreateGoalReq, opts?: RequestOptions) =>
    http.post<PlanApi.CreateGoalResp>(PlanApiPaths.createGoal, data, opts),
  updateGoal: (data: PlanApi.UpdateGoalReq, opts?: RequestOptions) =>
    http.post<PlanApi.UpdateGoalResp>(PlanApiPaths.updateGoal, data, opts),
  deleteGoal: (data: PlanApi.DeleteGoalReq, opts?: RequestOptions) =>
    http.post<PlanApi.DeleteGoalResp>(PlanApiPaths.deleteGoal, data, opts),
})
