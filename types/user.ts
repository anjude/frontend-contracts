import type { PaginationData } from './base'

export const LoginType = {
  MpCode: 1,
  QrCode: 2,
  Phone: 3,
  Sms: 4,
  Account: 5,
} as const
export type LoginType = (typeof LoginType)[keyof typeof LoginType]

export const VerifyType = {
  Unknown: 0,
  Pass: 1,
  Reject: 2,
} as const
export type VerifyType = (typeof VerifyType)[keyof typeof VerifyType]

export const SubscribeMsgType = {
  WeeklyCheckin: 1,
  ItemRemind: 2,
  CarbonSpaceRecover: 3,
} as const
export type SubscribeMsgType = (typeof SubscribeMsgType)[keyof typeof SubscribeMsgType]


export namespace UserApi {
  export interface UserInfoView {
    openid: string
    admin: 0 | 1
    nickName: string
    avatarUrl: string
    inviterOpenid?: string
    permission: number
    invitationCount: number
    createTime: number
    updateTime: number
    hasSub: boolean
  }

  export interface UserSubView {
    flowOpenid: string
    flowAvatarUrl: string
    flowNickName: string
  }

  export interface GetCodeReq {
    uniqueId: string
  }

  export interface GetCodeResp {
    code: string
    qrCode: string
  }

  export interface SetJwtReq {
    code: string
  }

  export interface SetJwtResp {}

  export interface GetJwtReq {
    code: string
  }

  export interface GetJwtResp {
    jwtToken: string
  }

  export interface LoginReq {
    loginType: LoginType
    mpCode?: string
    qrCodeParam?: string
    appId: string
    account?: string
    password?: string
  }

  export interface LoginResp {
    token: string
    openid: string
  }

  export interface GetUserReq {}

  export interface GetUserResp extends UserInfoView {}

  export interface GetByOpenidReq {
    openid: string
  }

  export interface GetByOpenidResp extends UserInfoView {}

  export interface GetUserListReq {
    offset?: number
    size?: number
  }

  export interface GetUserListResp extends PaginationData<UserInfoView> {}

  export interface UpdateUserReq {
    nickName?: string
    avatarUrl?: string
    inviterOpenid?: string
    account?: string
    password?: string
  }

  export interface GetSubUserReq {
    openid?: string
  }

  export interface GetSubUserResp {
    list: UserSubView[]
    total: number
  }

  export interface AddSubUserReq {
    flowOpenid: string
  }

  export interface DelSubUserReq {
    flowOpenid: string
  }

  export interface GenerateAccountReq {
    appId: string
  }

  export interface GenerateAccountResp {
    account: string
    password: string
    token: string
    openid: string
  }

  export interface RegisterAccountReq {
    account: string
    password: string
    appId: string
  }

  export interface RegisterAccountResp {
    token: string
    openid: string
  }

  export interface CheckAccountReq {
    account: string
  }

  export interface CheckAccountResp {
    available: boolean
    message: string
  }

  export interface SubscribeMsgReq {
    messageTmpId: string
    content: string
    msgType: SubscribeMsgType
    triggerTime?: number
    enterPage?: string
    relationId?: number
  }
}
