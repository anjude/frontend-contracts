import type { PaginationData } from './base'

export namespace UserApi {
  export type LoginType = 1 | 2 | 3 | 4 | 5
  export type VerifyType = 0 | 1 | 2
  export type SubscribeMsgType = 1 | 2

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
