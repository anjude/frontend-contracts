import type { TopicApi } from '../types/topic'
import type { HttpClient, RequestOptions } from '../request/client'

export const TopicApiPaths = {
  getTopicList: '/api/so/topic/list',
  getTopicDetail: '/api/so/topic/detail',
  createTopic: '/api/so/topic/create',
  updateTopic: '/api/so/topic/update',
  deleteTopic: '/api/so/topic/delete',
  getTopicLogList: '/api/so/topic/log/list',
  getTopicLogDetail: '/api/so/topic/log/detail',
  createTopicLog: '/api/so/topic/log/create',
  updateTopicLog: '/api/so/topic/log/update',
  deleteTopicLog: '/api/so/topic/log/delete',
} as const

export const createTopicApi = (http: HttpClient) => ({
  getTopicList: (data: TopicApi.GetTopicListReq, opts?: RequestOptions) =>
    http.post<TopicApi.GetTopicListResp>(TopicApiPaths.getTopicList, data, opts),
  getTopicDetail: (params: TopicApi.GetTopicDetailReq, opts?: RequestOptions) =>
    http.get<TopicApi.GetTopicDetailResp>(TopicApiPaths.getTopicDetail, params, opts),
  createTopic: (data: TopicApi.CreateTopicReq, opts?: RequestOptions) =>
    http.post<TopicApi.CreateTopicResp>(TopicApiPaths.createTopic, data, opts),
  updateTopic: (data: TopicApi.UpdateTopicReq, opts?: RequestOptions) =>
    http.post<TopicApi.UpdateTopicResp>(TopicApiPaths.updateTopic, data, opts),
  deleteTopic: (data: TopicApi.DeleteTopicReq, opts?: RequestOptions) =>
    http.post<TopicApi.DeleteTopicResp>(TopicApiPaths.deleteTopic, data, opts),
  getTopicLogList: (data: TopicApi.GetTopicLogListReq, opts?: RequestOptions) =>
    http.post<TopicApi.GetTopicLogListResp>(TopicApiPaths.getTopicLogList, data, opts),
  getTopicLogDetail: (params: TopicApi.GetTopicLogDetailReq, opts?: RequestOptions) =>
    http.get<TopicApi.GetTopicLogDetailResp>(TopicApiPaths.getTopicLogDetail, params, opts),
  createTopicLog: (data: TopicApi.CreateTopicLogReq, opts?: RequestOptions) =>
    http.post<TopicApi.CreateTopicLogResp>(TopicApiPaths.createTopicLog, data, opts),
  updateTopicLog: (data: TopicApi.UpdateTopicLogReq, opts?: RequestOptions) =>
    http.post<TopicApi.UpdateTopicLogResp>(TopicApiPaths.updateTopicLog, data, opts),
  deleteTopicLog: (data: TopicApi.DeleteTopicLogReq, opts?: RequestOptions) =>
    http.post<TopicApi.DeleteTopicLogResp>(TopicApiPaths.deleteTopicLog, data, opts),
})
