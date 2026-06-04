import type { TopicApi } from '../types/api/topic'

export const topicApiPaths = {
  getTopicList: 'POST /api/so/topic/list',
  getTopicDetail: 'GET /api/so/topic/detail',
  createTopic: 'POST /api/so/topic/create',
  updateTopic: 'POST /api/so/topic/update',
  deleteTopic: 'POST /api/so/topic/delete',
  getTopicLogList: 'POST /api/so/topic/log/list',
  getTopicLogDetail: 'GET /api/so/topic/log/detail',
  createTopicLog: 'POST /api/so/topic/log/create',
  updateTopicLog: 'POST /api/so/topic/log/update',
  deleteTopicLog: 'POST /api/so/topic/log/delete',
} as const

export type TopicListItem = TopicApi.TopicListItem
export type TopicLogListItem = TopicApi.TopicLogListItem
