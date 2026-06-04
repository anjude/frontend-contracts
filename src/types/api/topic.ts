export namespace TopicApi {
  export interface TopicListItem {
    id: number
    openid: string
    topicName: string
    description: string
    createTime: number
    updateTime: number
    top: number
  }

  export interface TopicDetailView extends TopicListItem {}

  export interface TopicLogExtraData {
    imageUrls?: string[]
    feedbackAnswer?: string
    feedbackAnswerImageUrls?: string[]
    answer?: string
  }

  export interface TopicLogListItem {
    id: number
    openid: string
    topicType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
    topicId: number
    content: string
    preview: string
    extraData?: TopicLogExtraData
    mark: number
    top: number
    createTime: number
    updateTime: number
  }

  export interface TopicLogDetailView {
    id: number
    openid: string
    topicType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
    topicId: number
    content: string
    extraData?: TopicLogExtraData
    mark: number
    top: number
    createTime: number
    updateTime: number
  }

  export interface GetTopicListReq {
    offset?: number
    size?: number
    keyword?: string
  }

  export interface GetTopicListResp {
    offset: number
    size: number
    total: number
    list: TopicListItem[]
  }

  export interface GetTopicDetailReq {
    id: number
  }

  export interface GetTopicDetailResp extends TopicDetailView {}

  export interface CreateTopicReq {
    topicName: string
    description?: string
  }

  export interface CreateTopicResp extends TopicDetailView {}

  export interface UpdateTopicReq {
    id: number
    topicName?: string
    description?: string
    top?: number
  }

  export interface UpdateTopicResp extends TopicDetailView {}

  export interface DeleteTopicReq {
    id: number
  }

  export interface DeleteTopicResp {}

  export interface GetTopicLogListReq {
    topicIds: number[]
    topicTypes: Array<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11>
    offset?: number
    size?: number
  }

  export interface GetTopicLogListResp {
    offset: number
    size: number
    total: number
    list: TopicLogListItem[]
  }

  export interface GetTopicLogDetailReq {
    id: number
  }

  export interface GetTopicLogDetailResp extends TopicLogDetailView {}

  export interface CreateTopicLogReq {
    topicType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
    topicId: number
    content?: string
    extraData?: TopicLogExtraData
    mark?: number
  }

  export interface CreateTopicLogResp {
    id: number
    openid: string
    topicType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
    topicId: number
    content: string
    extraData?: TopicLogExtraData
    mark: number
    createTime: number
    updateTime: number
  }

  export interface UpdateTopicLogReq {
    id: number
    topicId?: number
    content?: string
    extraData?: TopicLogExtraData
    mark?: number
    top?: number
  }

  export interface UpdateTopicLogResp extends TopicLogDetailView {}

  export interface DeleteTopicLogReq {
    id: number
  }

  export interface DeleteTopicLogResp {}
}
