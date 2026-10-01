import type { WechatApi } from '../types/wechat'
import type { HttpClient, RequestOptions } from '../request/client'

export const WechatApiPaths = {
  createWechatDraft: '/api/so/wechat/article/draft',
  uploadWechatMaterial: '/api/so/wechat/material/image',
} as const

export const createWechatApi = (http: HttpClient) => ({
  createWechatDraft: (data: WechatApi.CreateWechatDraftReq, opts?: RequestOptions) =>
    http.post<WechatApi.CreateWechatDraftResp>(WechatApiPaths.createWechatDraft, data, opts),
  uploadWechatMaterial: (data?: unknown, opts?: RequestOptions) =>
    http.post<WechatApi.UploadWechatMaterialResp>(WechatApiPaths.uploadWechatMaterial, data, opts),
})
