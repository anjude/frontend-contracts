import type { PaginationData } from './base'

export namespace StockApi {
  export type StockType = 1 | 2 | 3 | 4 | 5

  export interface StockListItem {
    id: number
    openid: string
    name: string
    code: string
    type: StockType
    top: number
    createTime: number
    updateTime: number
  }

  export interface StockDetail extends StockListItem {}

  export interface GetStockListReq {
    offset?: number
    size: number
    type?: StockType
    keyword?: string
  }

  export interface GetStockListResp extends PaginationData<StockListItem> {}

  export interface GetStockDetailReq {
    stockId: number
  }

  export interface GetStockDetailResp {
    stock: StockDetail
  }

  export interface CreateStockReq {
    name: string
    code: string
    type: StockType
    top: number
  }

  export interface CreateStockResp {
    stockId: number
  }

  export interface UpdateStockReq {
    stockId: number
    name?: string
    code?: string
    type?: StockType
    top?: number
  }

  export interface UpdateStockResp {
    success: boolean
  }

  export interface DeleteStockReq {
    stockId: number
  }

  export interface DeleteStockResp {
    success: boolean
  }
}
