export const messageSubscribeApiPaths = {
  getMessageSubscribeList: 'GET /api/so/message_subscribe/list',
  getMessageSubscribeDetail: 'GET /api/so/message_subscribe/detail',
  createMessageSubscribe: 'POST /api/so/message_subscribe/create',
  updateMessageSubscribe: 'POST /api/so/message_subscribe/update',
  deleteMessageSubscribe: 'POST /api/so/message_subscribe/delete',
} as const

export type {
  GetMessageSubscribeListReq,
  GetMessageSubscribeListResp,
  GetMessageSubscribeDetailReq,
  GetMessageSubscribeDetailResp,
  CreateMessageSubscribeReq,
  CreateMessageSubscribeResp,
  UpdateMessageSubscribeReq,
  UpdateMessageSubscribeResp,
  DeleteMessageSubscribeReq,
  DeleteMessageSubscribeResp,
} from '../types/api/message-subscribe'
