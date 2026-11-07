// Skill API 的 TypeScript 字段为 camelCase；HTTP 传输层负责与 snake_case 转换。
import type { PaginationData } from './base'

export const SkillCategory = { Personal: 'personal', Team: 'team', Public: 'public' } as const
export type SkillCategory = (typeof SkillCategory)[keyof typeof SkillCategory]

export namespace SkillApi {
  export interface Scope { category: SkillCategory; organizationId?: number }
  export interface SkillInfo {
    skillId: number
    skillName: string
    category: SkillCategory
    organizationId: number
    ownerId: number
    ownerName: string
    digest: string
    revision: number
  }
  export interface ListReq extends Scope { offset?: number; size?: number }
  export interface ListResp extends PaginationData<SkillInfo> {}
  export interface DetailReq { skillId: number }
  export interface DetailResp extends SkillInfo { files: Record<string, string> }
  export interface CreateReq extends Scope { skillName: string; files: Record<string, string> }
  export interface CreateResp extends SkillInfo {}
  export interface UpdateResp extends SkillInfo {}
  export interface UpdateReq extends Scope { skillId: number; revision: number; files: Record<string, string> }
  export interface DeleteReq { skillId: number; revision: number }
  export interface DeleteResp { skillId: number }
}
