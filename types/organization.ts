// 组织 API 的 TypeScript 字段为 camelCase；HTTP 传输层负责与 snake_case 转换。
import type { PaginationData } from './base'

export const OrganizationMemberRole = { Owner: 1, Member: 2 } as const
export type OrganizationMemberRole = (typeof OrganizationMemberRole)[keyof typeof OrganizationMemberRole]

export namespace OrganizationApi {
  export interface PageReq { offset?: number; size?: number }
  export interface ListReq extends PageReq {}
  export interface InviteReq extends OrganizationIdReq {}
  export interface OrganizationIdReq { organizationId: number }
  export interface CreateReq { organizationName: string }
  export interface CreateResp { organizationId: number; organizationName: string }
  export interface OrganizationInfo { organizationId: number; organizationName: string; memberRole: OrganizationMemberRole }
  export interface ListResp extends PaginationData<OrganizationInfo> {}
  export interface MembersReq extends OrganizationIdReq, PageReq {}
  export interface MemberInfo { userId: number; nickName: string; memberRole: OrganizationMemberRole }
  export interface MembersResp extends PaginationData<MemberInfo> {}
  /** expireTime 为 Unix 秒。 */
  export interface InviteResp { inviteToken: string; expireTime: number }
  export interface AcceptReq { inviteToken: string }
  export interface AcceptResp { organizationId: number; memberRole: OrganizationMemberRole }
}
