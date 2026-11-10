import type { GknowWheelApi } from '../types/gknow-wheel'
import type { HttpClient, RequestOptions } from '../request/client'

export const GknowWheelApiPaths = {
  getList: '/api/so/gknow/wheel/list',
  getDetail: '/api/so/gknow/wheel/detail',
  searchOptions: '/api/so/gknow/wheel/option/search',
  upsertOption: '/api/so/gknow/wheel/option/upsert',
  deleteOption: '/api/so/gknow/wheel/option/delete',
  batchOptions: '/api/so/gknow/wheel/option/batch',
  create: '/api/so/gknow/wheel/create',
  update: '/api/so/gknow/wheel/update',
  delete: '/api/so/gknow/wheel/delete',
} as const

export const createGknowWheelApi = (http: HttpClient) => ({
  getList: (data: GknowWheelApi.GetListReq, opts?: RequestOptions) =>
    http.post<GknowWheelApi.GetListResp>(GknowWheelApiPaths.getList, data, opts),
  getDetail: (params: GknowWheelApi.GetDetailReq, opts?: RequestOptions) =>
    http.get<GknowWheelApi.GetDetailResp>(GknowWheelApiPaths.getDetail, params, opts),
  searchOptions: (data: GknowWheelApi.SearchOptionsReq, opts?: RequestOptions) =>
    http.post<GknowWheelApi.SearchOptionsResp>(GknowWheelApiPaths.searchOptions, data, opts),
  upsertOption: (data: GknowWheelApi.UpsertOptionReq, opts?: RequestOptions) =>
    http.post<GknowWheelApi.WriteResp>(GknowWheelApiPaths.upsertOption, data, opts),
  deleteOption: (data: GknowWheelApi.DeleteOptionReq, opts?: RequestOptions) =>
    http.post<GknowWheelApi.WriteResp>(GknowWheelApiPaths.deleteOption, data, opts),
  batchOptions: (data: GknowWheelApi.BatchOptionsReq, opts?: RequestOptions) =>
    http.post<GknowWheelApi.WriteResp>(GknowWheelApiPaths.batchOptions, data, opts),
  create: (data: GknowWheelApi.CreateReq, opts?: RequestOptions) =>
    http.post<GknowWheelApi.WriteResp>(GknowWheelApiPaths.create, data, opts),
  update: (data: GknowWheelApi.UpdateReq, opts?: RequestOptions) =>
    http.post<GknowWheelApi.WriteResp>(GknowWheelApiPaths.update, data, opts),
  delete: (data: GknowWheelApi.DeleteReq, opts?: RequestOptions) =>
    http.post<GknowWheelApi.WriteResp>(GknowWheelApiPaths.delete, data, opts),
})
