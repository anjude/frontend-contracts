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
