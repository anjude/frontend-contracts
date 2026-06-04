export const CarbonSpaceStatus = {
  Active: 1,
  Dormant: 2,
  Deleted: 3,
} as const

export const CarbonSpaceMemberRole = {
  Owner: 1,
  Member: 2,
} as const

export const CarbonInviteStatus = {
  Pending: 1,
  Accepted: 2,
  Expired: 3,
  Canceled: 4,
} as const

export const CarbonMomentStatus = {
  Normal: 1,
  Deleted: 2,
} as const

export const CarbonAgreementStatus = {
  Pending: 1,
  Agreed: 2,
  Doing: 3,
  Done: 4,
  Paused: 5,
} as const

export const CarbonScaleSourceType = {
  Manual: 1,
  Agreement: 2,
  Moment: 3,
} as const
