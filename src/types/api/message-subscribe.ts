import type { PaginationData } from './base'

export namespace MessageSubscribeApi {
  export type MessageType = 1 | 2

  export interface MessageSubscribe {
    id: number
    openid: string
    messageTmpId: string
    content: string
    subTimes: number
    triggerTime: number
    lastTriggerTime: number
    msgType: MessageType
    enterPage: string
    relationId?: number
    createTime: number
    updateTime: number
  }

  export interface GetMessageSubscribeListReq {
    offset?: number
    size?: number
    msgType?: MessageType
    relationId?: number
  }

  export interface GetMessageSubscribeListResp extends PaginationData<MessageSubscribe> {}

  export interface GetMessageSubscribeDetailReq {
    id: number
  }

  export interface GetMessageSubscribeDetailResp extends MessageSubscribe {}

  export interface CreateMessageSubscribeReq {
    messageTmpId: string
    content: string
    msgType: MessageType
    triggerTime?: number
    enterPage?: string
    relationId?: number
  }

  export interface CreateMessageSubscribeResp extends MessageSubscribe {}

  export interface UpdateMessageSubscribeReq {
    id: number
    messageTmpId?: string
    content?: string
    triggerTime?: number
    enterPage?: string
  }

  export interface UpdateMessageSubscribeResp extends MessageSubscribe {}

  export interface DeleteMessageSubscribeReq {
    id: number
  }

  export interface DeleteMessageSubscribeResp {
    success: boolean
  }
}
