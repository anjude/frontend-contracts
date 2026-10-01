import type { ItemApi } from '../types/item'
import type { HttpClient, RequestOptions } from '../request/client'

export const ItemApiPaths = {
  getItemList: '/api/so/item/list',
  getItemDetail: '/api/so/item/detail',
  createItem: '/api/so/item/create',
  updateItem: '/api/so/item/update',
  deleteItem: '/api/so/item/delete',
  getItemCategoryList: '/api/so/item/category/list',
} as const

export const createItemApi = (http: HttpClient) => ({
  getItemList: (data: ItemApi.GetItemListReq, opts?: RequestOptions) =>
    http.post<ItemApi.GetItemListResp>(ItemApiPaths.getItemList, data, opts),
  getItemDetail: (params: ItemApi.GetItemDetailReq, opts?: RequestOptions) =>
    http.get<ItemApi.GetItemDetailResp>(ItemApiPaths.getItemDetail, params, opts),
  createItem: (data: ItemApi.CreateItemReq, opts?: RequestOptions) =>
    http.post<ItemApi.CreateItemResp>(ItemApiPaths.createItem, data, opts),
  updateItem: (data: ItemApi.UpdateItemReq, opts?: RequestOptions) =>
    http.post<ItemApi.UpdateItemResp>(ItemApiPaths.updateItem, data, opts),
  deleteItem: (data: ItemApi.DeleteItemReq, opts?: RequestOptions) =>
    http.post<ItemApi.DeleteItemResp>(ItemApiPaths.deleteItem, data, opts),
  getItemCategoryList: (params?: unknown, opts?: RequestOptions) =>
    http.get<ItemApi.GetItemCategoryListResp>(ItemApiPaths.getItemCategoryList, params, opts),
})
