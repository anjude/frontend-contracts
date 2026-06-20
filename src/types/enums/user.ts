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
