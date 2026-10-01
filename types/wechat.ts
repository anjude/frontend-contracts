// WeChat 公众号相关接口契约（草稿箱 / 永久素材）。
// 字段对应后端 common_dto.CreateWechatDraftReq 等 DTO，json tag 转 camelCase。
// 枚举/常量无需（wechat 域暂无可枚举字段），仅放请求与响应内层类型。
export namespace WechatApi {
  // POST /api/so/wechat/article/draft 请求体
  export interface CreateWechatDraftReq {
    title: string
    author?: string
    digest?: string
    content?: string
    contentMarkdown?: string
    contentSourceUrl?: string
    coverUrl?: string
    thumbMediaId?: string
    needOpenComment?: number
    onlyFansCanComment?: number
    autoUploadImages?: boolean
  }

  // POST /api/so/wechat/article/draft 响应 data
  export interface CreateWechatDraftResp {
    mediaId?: string
  }

  // POST /api/so/wechat/material/image 响应 data
  export interface UploadWechatMaterialResp {
    mediaId?: string
    url?: string
  }
}
