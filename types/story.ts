export const StoryType = { Life: 'life', Love: 'love', Finance: 'finance' } as const
export type StoryType = (typeof StoryType)[keyof typeof StoryType]
export const StoryStatus = { Unpublished: 0, Published: 1 } as const
export type StoryStatus = (typeof StoryStatus)[keyof typeof StoryStatus]
export namespace StoryApi {
  export interface Summary { storyKey: string; storyType: StoryType; title: string; summary: string; coverUrl: string; displayOrder: number; status: StoryStatus; contentVersion: number }
  export interface GetListReq { storyType: StoryType; offset?: number; size?: number; includeUnpublished?: boolean }
  export interface GetListResp { total: number; list: Summary[] }
  export interface GetDetailReq { storyKey: string }
  export interface GetDetailResp { storyKey: string; status: StoryStatus; contentVersion: number; contentJson: string }
  export interface CreateReq { storyKey: string; storyType: StoryType; title: string; summary: string; coverUrl: string; displayOrder: number; contentJson: string }
  export interface UpdateReq { storyKey: string; expectedVersion: number; storyType?: StoryType; title?: string; summary?: string; coverUrl?: string; displayOrder?: number; status?: StoryStatus; contentJson?: string }
  export interface WriteResp { storyKey: string; contentVersion: number }
}
