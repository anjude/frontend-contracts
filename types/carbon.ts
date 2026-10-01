export const CarbonSpaceStatus = {
  Active: 1,
  Dormant: 2,
  Deleted: 3,
} as const
export type CarbonSpaceStatus = (typeof CarbonSpaceStatus)[keyof typeof CarbonSpaceStatus]

export const CarbonSpaceMemberRole = {
  Owner: 1,
  Member: 2,
} as const
export type CarbonSpaceMemberRole = (typeof CarbonSpaceMemberRole)[keyof typeof CarbonSpaceMemberRole]

export const CarbonInviteStatus = {
  Pending: 1,
  Accepted: 2,
  Expired: 3,
  Canceled: 4,
} as const
export type CarbonInviteStatus = (typeof CarbonInviteStatus)[keyof typeof CarbonInviteStatus]

export const CarbonMomentStatus = {
  Normal: 1,
  Deleted: 2,
} as const
export type CarbonMomentStatus = (typeof CarbonMomentStatus)[keyof typeof CarbonMomentStatus]

export const CarbonAgreementStatus = {
  Pending: 1,
  Agreed: 2,
  Doing: 3,
  Done: 4,
  Paused: 5,
} as const
export type CarbonAgreementStatus = (typeof CarbonAgreementStatus)[keyof typeof CarbonAgreementStatus]

export const CarbonScaleSourceType = {
  Manual: 1,
  Agreement: 2,
  Moment: 3,
} as const
export type CarbonScaleSourceType = (typeof CarbonScaleSourceType)[keyof typeof CarbonScaleSourceType]

export const CarbonSparkBadgeTone = {
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger',
  Neutral: 'neutral',
} as const
export type CarbonSparkBadgeTone = (typeof CarbonSparkBadgeTone)[keyof typeof CarbonSparkBadgeTone]

export namespace CarbonApi {
  export interface UserLiteView {
    openid: string
    nickName: string
    avatarUrl: string
  }

  export interface SpaceView {
    id: number
    creatorOpenid: string
    name: string
    status: CarbonSpaceStatus
    dormantTime: number
    dissolvedTime: number
    dissolvedByOpenid: string
    memberCount: number
    extraData?: Record<string, unknown>
    createTime: number
    updateTime: number
  }

  export interface MemberView {
    id: number
    spaceId: number
    openid: string
    role: CarbonSpaceMemberRole
    status: number
    isDefault: number
    joinedAt: number
    lastVisitTime: number
    user?: UserLiteView | null
    createTime: number
    updateTime: number
  }

  export interface MomentReactionView {
    openid: string
    emoji: string
  }

  export interface MomentView {
    id: number
    spaceId: number
    openid: string
    emoji: string
    content: string
    imageUrls: string[]
    reactions: MomentReactionView[]
    status: CarbonMomentStatus
    user?: UserLiteView | null
    createTime: number
    updateTime: number
  }

  export interface AgreementView {
    id: number
    spaceId: number
    creatorOpenid: string
    title: string
    note: string
    status: CarbonAgreementStatus
    statusText: string
    agreedByOpenid: string
    creator?: UserLiteView | null
    agreedBy?: UserLiteView | null
    agreedTime: number
    startedTime: number
    completedTime: number
    targetTime: number
    hasUnreadLog: boolean
    createTime: number
    updateTime: number
  }

  export interface ScaleView {
    id: number
    spaceId: number
    creatorOpenid: string
    title: string
    date: string
    note: string
    imageUrls: string[]
    sourceType: CarbonScaleSourceType
    sourceId: number
    creator?: UserLiteView | null
    createTime: number
    updateTime: number
  }

  export interface SpaceSummaryView {
    space: SpaceView
    members: MemberView[]
    latestMoment?: MomentView | null
    isDefault: boolean
    lastVisitTime: number
  }

  export interface SparkStatusView {
    level: number
    levelName: string
    score: number
    nextLevelScore: number
    streakDays: number
    longestStreakDays: number
    successToday: boolean
    badgeText: string
    badgeIcon: string
    badgeColor: string
    badgeTone: CarbonSparkBadgeTone
    lastSuccessDate: string
    missedDays: number
    daysUntilDegrade: number
    degradeAfterDays: number
  }

  export interface GetCurrentSpaceResp {
    hasSpace: boolean
    space?: SpaceView | null
    members: MemberView[]
    recentMoments: MomentView[]
    recentAgreements?: AgreementView[]
    recentScales?: ScaleView[]
    sparkStatus?: SparkStatusView | null
  }

  export interface GetSpaceListReq {
    offset?: number
    size?: number
  }

  export interface GetSpaceListResp {
    offset: number
    size: number
    total: number
    list: SpaceSummaryView[]
  }

  export interface CreateSpaceReq {
    name?: string
  }

  export interface CreateSpaceResp {
    space: SpaceView
    members: MemberView[]
  }

  export interface UpdateSpaceReq {
    spaceId: number
    name: string
  }

  export interface UpdateSpaceResp {
    space: SpaceView
  }

  export interface DeleteSpaceReq {
    spaceId: number
  }

  export interface DeleteSpaceResp {
    spaceId: number
  }

  export interface RecoverSpaceReq {
    spaceId: number
  }

  export interface RecoverSpaceResp {
    spaceId: number
  }

  export interface SetDefaultSpaceReq {
    spaceId: number
  }

  export interface SetDefaultSpaceResp {
    spaceId: number
  }

  export interface GetSpaceDetailReq {
    spaceId: number
  }

  export interface GetSpaceDetailResp extends GetCurrentSpaceResp {}

  export interface CreateInviteReq {
    spaceId: number
  }

  export interface CreateInviteResp {
    inviteCode: string
    spaceId: number
    inviterOpenid: string
    expireTime: number
    sharePath: string
    shareScene: string
  }

  export interface GetInviteDetailReq {
    inviteCode: string
    spaceId?: number
    inviterOpenid?: string
  }

  export interface GetInviteDetailResp {
    inviteCode: string
    space: SpaceView
    members: MemberView[]
    inviter?: UserLiteView | null
    expireTime: number
    expired: boolean
    alreadyMember: boolean
  }

  export interface AcceptInviteReq extends GetInviteDetailReq {}

  export interface AcceptInviteResp {
    space: SpaceView
    members: MemberView[]
  }

  export interface GetMomentListReq {
    spaceId: number
    offset?: number
    size?: number
  }

  export interface GetMomentListResp {
    offset: number
    size: number
    total: number
    list: MomentView[]
  }

  export interface CreateMomentReq {
    spaceId: number
    emoji: string
    content?: string
    imageUrls?: string[]
  }

  export interface CreateMomentResp {
    moment: MomentView
  }

  export interface DeleteMomentReq {
    momentId: number
  }

  export interface DeleteMomentResp {}

  export interface ReactMomentReq {
    momentId: number
    emoji?: string
  }

  export interface ReactMomentResp {
    moment: MomentView
  }

  export interface GetAgreementListReq {
    spaceId: number
    offset?: number
    size?: number
  }

  export interface GetAgreementListResp {
    offset: number
    size: number
    total: number
    list: AgreementView[]
  }

  export interface CreateAgreementReq {
    spaceId: number
    title: string
    note?: string
  }

  export interface CreateAgreementResp {
    agreement: AgreementView
  }

  export interface AgreementIDReq {
    agreementId: number
  }

  export interface GetAgreementDetailReq extends AgreementIDReq {}

  export interface GetAgreementDetailResp {
    agreement: AgreementView
  }

  export interface UpdateAgreementReq extends AgreementIDReq {
    title: string
    note?: string
  }

  export interface UpdateAgreementResp {
    agreement: AgreementView
  }

  export interface UpdateAgreementStatusResp {
    agreement: AgreementView
  }

  export interface PauseAgreementReq extends AgreementIDReq {}

  export interface ResumeAgreementReq extends AgreementIDReq {}

  export interface MarkAgreementReadReq extends AgreementIDReq {}

  export interface MarkAgreementReadResp {
    agreement: AgreementView
  }

  export interface DeleteAgreementResp {}

  export interface GetScaleListReq {
    spaceId: number
    offset?: number
    size?: number
  }

  export interface GetScaleListResp {
    offset: number
    size: number
    total: number
    list: ScaleView[]
  }

  export interface CreateScaleReq {
    spaceId: number
    title?: string
    date?: string
    note?: string
    imageUrls?: string[]
    sourceType?: CarbonScaleSourceType
    sourceId?: number
  }

  export interface CreateScaleResp {
    scale: ScaleView
  }

  export interface GetScaleDetailReq {
    id?: number
    spaceId?: number
    sourceType?: 1 | 2 | 3
    sourceId?: number
  }

  export interface GetScaleDetailResp {
    scale?: ScaleView | null
  }

  export interface UpdateScaleReq {
    id: number
    title: string
    date: string
    note?: string
    imageUrls?: string[]
  }

  export interface UpdateScaleResp {
    scale: ScaleView
  }

  export interface DeleteScaleReq {
    id: number
  }

  export interface DeleteScaleResp {}
}
