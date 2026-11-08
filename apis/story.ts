import type { StoryApi } from '../types/story'
import type { HttpClient, RequestOptions } from '../request/client'
export const StoryApiPaths = { getList: '/api/so/gknow/story/list', getDetail: '/api/so/gknow/story/detail', create: '/api/so/gknow/story/create', update: '/api/so/gknow/story/update' } as const
export const createStoryApi = (http: HttpClient) => ({
  getList: (data: StoryApi.GetListReq, opts?: RequestOptions) => http.post<StoryApi.GetListResp>(StoryApiPaths.getList, data, opts),
  getDetail: (params: StoryApi.GetDetailReq, opts?: RequestOptions) => http.get<StoryApi.GetDetailResp>(StoryApiPaths.getDetail, params, opts),
  create: (data: StoryApi.CreateReq, opts?: RequestOptions) => http.post<StoryApi.WriteResp>(StoryApiPaths.create, data, opts),
  update: (data: StoryApi.UpdateReq, opts?: RequestOptions) => http.post<StoryApi.WriteResp>(StoryApiPaths.update, data, opts),
})
