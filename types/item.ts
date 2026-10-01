// item 域类型：物品与物品分类。
// 来源是 backend-superone 的 internal/domain/item/item_dto 与 constant/item.go，
// 枚举取值与后端 iota 常量一一对应，改动前先对后端。

import type { PaginationData } from './base'

/** 物品状态 */
export const ItemStatus = {
  InUse: 1,
  Stored: 2,
  Broken: 3,
  Lost: 4,
  Sold: 5,
  GivenAway: 6,
  Recycled: 7,
} as const
export type ItemStatus = (typeof ItemStatus)[keyof typeof ItemStatus]

/** 物品分类 */
export const ItemCategory = {
  /** 默认分类（后端 0 值兜底） */
  Default: 0,
  Electronics: 1,
  Clothing: 2,
  Books: 3,
  Home: 4,
  Sports: 5,
  Beauty: 6,
  Food: 7,
  Tools: 8,
  Other: 9,
} as const
export type ItemCategory = (typeof ItemCategory)[keyof typeof ItemCategory]

export namespace ItemApi {
  /** 物品详情 */
  export interface ItemDetail {
    id: number
    openid: string
    name: string
    category: ItemCategory
    status: ItemStatus
    tags: string[]
    startTime: number
    description: string
    logo: string
    /** 价格用字符串承载：后端是 decimal.Decimal，走 JSON 会序列化成字符串 */
    price?: string
    remindTime: number
    remindContent: string
    createTime: number
    updateTime: number
    top: number
  }

  /** 物品分类 */
  export interface ItemCategoryView {
    id: number
    name: string
    icon: string
    color: string
  }

  export interface GetItemListReq {
    offset: number
    size: number
    keyword: string
    category?: ItemCategory
    status?: ItemStatus
    tags: string[]
  }
  export interface GetItemListResp extends PaginationData<ItemDetail> {}

  export interface GetItemDetailReq {
    id: number
  }
  export interface GetItemDetailResp extends ItemDetail {}

  export interface CreateItemReq {
    name: string
    category: ItemCategory
    status: ItemStatus
    tags: string[]
    startTime: number
    description: string
    logo: string
    price?: string
    remindTime: number
    remindContent: string
  }
  export interface CreateItemResp extends ItemDetail {}

  /** 部分更新：只传要改的字段 */
  export interface UpdateItemReq {
    id: number
    name?: string
    category?: ItemCategory
    status?: ItemStatus
    tags?: string[]
    startTime?: number
    description?: string
    logo?: string
    price?: string
    remindTime?: number
    remindContent?: string
    top?: number
  }
  export interface UpdateItemResp extends ItemDetail {}

  export interface DeleteItemReq {
    id: number
  }
  export interface DeleteItemResp {
    success: boolean
  }

  /** 分类列表无需入参 */
  export interface GetItemCategoryListReq {}
  export interface GetItemCategoryListResp {
    list: ItemCategoryView[]
  }
}
