import type { MessageSubscribeApi } from '../types/message-subscribe'
import type { HttpClient, RequestOptions } from '../request/client'

export const MessageSubscribeApiPaths = {
  getMessageSubscribeList: '/api/so/message_subscribe/list',
  getMessageSubscribeDetail: '/api/so/message_subscribe/detail',
  createMessageSubscribe: '/api/so/message_subscribe/create',
  updateMessageSubscribe: '/api/so/message_subscribe/update',
  deleteMessageSubscribe: '/api/so/message_subscribe/delete',
} as const

export const createMessageSubscribeApi = (http: HttpClient) => ({
  getMessageSubscribeList: (data: MessageSubscribeApi.GetMessageSubscribeListReq, opts?: RequestOptions) =>
    http.post<MessageSubscribeApi.GetMessageSubscribeListResp>(MessageSubscribeApiPaths.getMessageSubscribeList, data, opts),
  getMessageSubscribeDetail: (params: MessageSubscribeApi.GetMessageSubscribeDetailReq, opts?: RequestOptions) =>
    http.get<MessageSubscribeApi.GetMessageSubscribeDetailResp>(MessageSubscribeApiPaths.getMessageSubscribeDetail, params, opts),
  createMessageSubscribe: (data: MessageSubscribeApi.CreateMessageSubscribeReq, opts?: RequestOptions) =>
    http.post<MessageSubscribeApi.CreateMessageSubscribeResp>(MessageSubscribeApiPaths.createMessageSubscribe, data, opts),
  updateMessageSubscribe: (data: MessageSubscribeApi.UpdateMessageSubscribeReq, opts?: RequestOptions) =>
    http.post<MessageSubscribeApi.UpdateMessageSubscribeResp>(MessageSubscribeApiPaths.updateMessageSubscribe, data, opts),
  deleteMessageSubscribe: (data: MessageSubscribeApi.DeleteMessageSubscribeReq, opts?: RequestOptions) =>
    http.post<MessageSubscribeApi.DeleteMessageSubscribeResp>(MessageSubscribeApiPaths.deleteMessageSubscribe, data, opts),
})
