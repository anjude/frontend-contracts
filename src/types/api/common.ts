import type { HotDataPlatform } from '../enums/common'
export namespace CommonApi {
  export interface AutoReplyReq {
    toUserName: string
    fromUserName: string
    createTime: number
    msgType: string
    event?: string
    eventKey?: string
    ticket?: string
    content?: string
    msgId?: number
    msgDataId?: number
    idx?: number
    picUrl?: string
    mediaId?: string
    format?: string
    thumbMediaId?: string
    locationX?: string
    locationY?: string
    scale?: string
    label?: string
    title?: string
    description?: string
    url?: string
  }

  export interface AutoReplyResp {
    toUserName: string
    fromUserName: string
    createTime: number
    msgType: string
    content: string
  }

  export interface WxUploadResp {
    url: string
  }

  export interface MpQrcodeReq {
    path: string
    scene: string
    checkPath?: boolean
    envVersion: string
  }

  export interface MpQrcodeResp {
    baseCode: string
  }

  export interface GetWxAccessTokenResp {
    accessToken?: string
    expiresIn?: number
    errcode?: number
    errmsg?: string
  }

  export interface GetAccessTokenByIdSecretReq {
    appId: string
    appSecret: string
  }

  export interface GetAccessTokenByIdSecretResp {
    errcode: number
    errmsg: string
    accessToken: string
    expiresIn: number
  }

  export interface ClearQuotaResp {}

  export interface GetCsdnConfigReq {}

  export interface LinkMenu {
    name: string
    url: string
  }

  export interface SystemInfoView {
    linkMenu: LinkMenu[]
    redEnvelope: string
    wbbb?: number
    ivIntroduceLink: string
  }

  export interface UpdateSystemInfoReq {
    wbbb?: number
    linkMenuIndex?: number
    linkMenuName?: string
    linkMenuUrl?: string
  }

  export interface CsdnCommentReq {
    prompt?: string
    userName?: string
    userToken?: string
    commentSuffix?: string
    openid?: string
    articleNum?: number
  }

  export interface GetCsdnConfigResp {
    userName: string
    userToken: string
    commentPrompt: string
    commentSuffix: string
    hotArticleNum: number
  }

  export interface UpdateCsdnConfigReq {
    userName: string
    userToken: string
  }

  export interface TriggerCommentReq {}

  export interface AiReplyReq {
    question: string
    target?: number
    userId: string
  }

  export interface AiReplyResp {
    answer: string
  }

  export interface AiReplyMemoryErasureReq {
    userId: string
  }

  export interface AiReplyMemoryErasureResp {}

  export interface AiWechatArticleReq {
    url: string
  }

  export interface AiWechatArticleResp {
    answer: string
    title: string
    originContent: string
  }

  export interface AiReplyStreamResp {
    content: string
  }

  export interface ParseWebViewReq {
    url: string
  }

  export interface ParseWebViewResp {
    url: string
    title: string
    content: string
  }

  export interface GetHotDataReq {
    lastXDay?: number
  }

  export interface HotDataView {
    platform: HotDataPlatform
    category: string
    title: string
    url: string
    description: string
    rank: number
    createTime: number
  }

  export interface GetHotDataResp {
    list: HotDataView[]
  }

  export interface GetFeRedisReq {
    redisKey: string
  }

  export interface GetFeRedisResp {
    redisKey: string
    redisValue: string
  }

  export interface SetFeRedisReq {
    redisKey: string
    redisValue: string
  }

  export interface DelFeRedisReq {
    redisKey: string
  }

  export interface GetUserBehaviorStatsReq {
    lastNDays?: number
  }

  export interface TableStats {
    tableName: string
    displayName: string
    createCount: number
    updateCount: number
    createUserCount: number
    updateUserCount: number
  }

  export interface DayStats {
    date: string
    tableStats: Record<string, TableStats>
  }

  export interface GetUserBehaviorStatsResp {
    days: DayStats[]
  }
}
