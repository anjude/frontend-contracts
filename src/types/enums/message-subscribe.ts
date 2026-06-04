export const MessageType = {
  Subscription: 1,
  Service: 2,
} as const
export type MessageType = (typeof MessageType)[keyof typeof MessageType]
