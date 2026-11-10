/** 通用实时房间协议。游戏业务数据由调用方定义。 */
export const REALTIME_ROOM_PATH = '/api/so/realtime-room/ws'
export type RoomJson = null | boolean | number | string | RoomJson[] | { [key: string]: RoomJson }
export type RoomAction = 'create' | 'join' | 'snapshot' | 'compare_set' | 'owner_set' | 'private_set' | 'event' | 'leave' | 'ping'
export interface RoomRequest {
  id: string
  action: RoomAction
  roomId?: string
  maxMembers?: number
  anonymousMembers?: boolean
  ownerData?: RoomJson
  ttlSeconds?: number
  expectedVersion?: number
  data?: RoomJson
  eventType?: string
}
export interface RoomSnapshot {
  roomId: string
  version: number
  members: string[]
  maxMembers: number
  expiresAt: number
  data: RoomJson
  privateData?: RoomJson
  ownerId?: string
  selfId?: string
  ownerData?: RoomJson
}
export interface RoomResponse {
  id?: string
  type: 'response' | 'changed' | 'event'
  action?: RoomAction
  code?: string
  message?: string
  snapshot?: RoomSnapshot
  roomId?: string
  version?: number
  sender?: string
  eventType?: string
  data?: RoomJson
}
