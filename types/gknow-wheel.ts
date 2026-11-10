export const WheelSortMode = { Recommended: 'recommended', Random: 'random' } as const
export type WheelSortMode = typeof WheelSortMode[keyof typeof WheelSortMode]
export interface WheelOption { id: string; name: string; tags: Record<string, string[]>; displayOrder: number; recommendationScore?: number; [key: string]: unknown }
export interface FilterDimension { key: string; title: string; selection?: 'single' | 'multiple'; values: string[]; displayOrder?: number }
export namespace GknowWheelApi {
  export interface Summary { wheelKey: string; title: string; summary: string; iconUrl: string; displayOrder: number; wheelStatus: number; optionMode: number; optionTotal: number; contentVersion: number }
  export interface GetListReq { offset?: number; size?: number; includeUnpublished?: boolean }
  export interface GetListResp { total: number; list: Summary[] }
  export interface GetDetailReq { wheelKey: string }
  export interface GetDetailResp { wheelKey: string; wheelStatus: number; contentVersion: number; optionMode: number; optionTotal: number; contentJson: string; options: WheelOption[]; filterDimensions: FilterDimension[] }
  export interface SearchOptionsReq { wheelKey: string; filters: Record<string, string[]>; offset?: number; size?: number; sortMode?: WheelSortMode }
  export interface SearchOptionsResp { total: number; options: WheelOption[] }
  export interface UpsertOptionReq { wheelKey: string; expectedVersion: number; optionId: string; option: WheelOption }
  export interface DeleteOptionReq { wheelKey: string; expectedVersion: number; optionId: string }
  export interface BatchOptionsReq { wheelKey: string; expectedVersion: number; upsertOptions?: WheelOption[]; deleteOptionIds?: string[] }
  export interface CreateReq { wheelKey: string; title: string; summary?: string; iconUrl?: string; displayOrder?: number; optionMode?: number; contentJson: string; options?: WheelOption[] }
  export interface UpdateReq { wheelKey: string; expectedVersion: number; title?: string; summary?: string; iconUrl?: string; displayOrder?: number; optionMode?: number; contentJson?: string; wheelStatus?: number }
  export interface DeleteReq { wheelKey: string; expectedVersion: number }
  export interface WriteResp { wheelKey: string; contentVersion: number }
}
