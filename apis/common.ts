import type { CommonApi } from '../types/common'
import type { HttpClient, RequestOptions } from '../request/client'

export const CommonApiPaths = {
  wxAutoReply: '/api/so/common/wx_auto_reply',
  wxUpload: '/api/so/common/wx_upload',
  getWxAccessToken: '/api/so/common/wx_access_token',
  mpQrcode: '/api/so/common/mp_qrcode',
  mpQrcodeJson: '/api/so/common/mp_qrcode_json',
  getAccessTokenByIdSecret: '/api/so/common/get_access_token_by_id_secret',
  clearQuota: '/api/so/common/clear_quota',
  getSystemInfo: '/api/so/common/system/get',
  updateSystemInfo: '/api/so/common/system/update',
  hotArticleComment: '/api/so/common/csdn/hot_article_comment',
  getCsdnConfig: '/api/so/common/csdn/config/get',
  updateCsdnConfig: '/api/so/common/csdn/config/update',
  triggerComment: '/api/so/common/csdn/trigger_comment',
  getAiReply: '/api/so/common/ai/reply',
  aiReplyMemoryErasure: '/api/so/common/ai/reply/memory_erasure',
  getAiWechatArticleReply: '/api/so/common/ai/wechat_article',
  aiReplyStream: '/api/so/common/ai/reply/stream',
  parseWebView: '/api/so/common/web_view/parse',
  getHotData: '/api/so/common/hot_data/get',
  getFeRedis: '/api/so/common/fe_redis/get',
  setFeRedis: '/api/so/common/fe_redis/set',
  delFeRedis: '/api/so/common/fe_redis/del',
  getUserBehaviorStats: '/api/so/common/user_behavior_stats',
} as const

export const createCommonApi = (http: HttpClient) => ({
  wxAutoReply: (data?: unknown, opts?: RequestOptions) =>
    http.post<unknown>(CommonApiPaths.wxAutoReply, data, opts),
  wxUpload: (data?: unknown, opts?: RequestOptions) =>
    http.post<CommonApi.WxUploadResp>(CommonApiPaths.wxUpload, data, opts),
  getWxAccessToken: (params?: unknown, opts?: RequestOptions) =>
    http.get<CommonApi.GetWxAccessTokenResp>(CommonApiPaths.getWxAccessToken, params, opts),
  mpQrcode: (data: CommonApi.MpQrcodeReq, opts?: RequestOptions) =>
    http.post<CommonApi.MpQrcodeResp>(CommonApiPaths.mpQrcode, data, opts),
  mpQrcodeJson: (data: CommonApi.MpQrcodeReq, opts?: RequestOptions) =>
    http.post<unknown>(CommonApiPaths.mpQrcodeJson, data, opts),
  getAccessTokenByIdSecret: (params: CommonApi.GetAccessTokenByIdSecretReq, opts?: RequestOptions) =>
    http.get<CommonApi.GetAccessTokenByIdSecretResp>(CommonApiPaths.getAccessTokenByIdSecret, params, opts),
  clearQuota: (params?: unknown, opts?: RequestOptions) =>
    http.get<CommonApi.ClearQuotaResp>(CommonApiPaths.clearQuota, params, opts),
  getSystemInfo: (params?: unknown, opts?: RequestOptions) =>
    http.get<unknown>(CommonApiPaths.getSystemInfo, params, opts),
  updateSystemInfo: (data: CommonApi.UpdateSystemInfoReq, opts?: RequestOptions) =>
    http.post<unknown>(CommonApiPaths.updateSystemInfo, data, opts),
  hotArticleComment: (data: CommonApi.CsdnCommentReq, opts?: RequestOptions) =>
    http.post<unknown>(CommonApiPaths.hotArticleComment, data, opts),
  getCsdnConfig: (params?: unknown, opts?: RequestOptions) =>
    http.get<CommonApi.GetCsdnConfigResp>(CommonApiPaths.getCsdnConfig, params, opts),
  updateCsdnConfig: (data: CommonApi.UpdateCsdnConfigReq, opts?: RequestOptions) =>
    http.post<unknown>(CommonApiPaths.updateCsdnConfig, data, opts),
  triggerComment: (data?: unknown, opts?: RequestOptions) =>
    http.post<unknown>(CommonApiPaths.triggerComment, data, opts),
  getAiReply: (data: CommonApi.AiReplyReq, opts?: RequestOptions) =>
    http.post<unknown>(CommonApiPaths.getAiReply, data, opts),
  aiReplyMemoryErasure: (params: CommonApi.AiReplyMemoryErasureReq, opts?: RequestOptions) =>
    http.get<CommonApi.AiReplyMemoryErasureResp>(CommonApiPaths.aiReplyMemoryErasure, params, opts),
  getAiWechatArticleReply: (data: CommonApi.AiWechatArticleReq, opts?: RequestOptions) =>
    http.post<unknown>(CommonApiPaths.getAiWechatArticleReply, data, opts),
  aiReplyStream: (params?: unknown, opts?: RequestOptions) =>
    http.get<CommonApi.AiReplyStreamResp>(CommonApiPaths.aiReplyStream, params, opts),
  parseWebView: (params: CommonApi.ParseWebViewReq, opts?: RequestOptions) =>
    http.get<CommonApi.ParseWebViewResp>(CommonApiPaths.parseWebView, params, opts),
  getHotData: (params: CommonApi.GetHotDataReq, opts?: RequestOptions) =>
    http.get<CommonApi.GetHotDataResp>(CommonApiPaths.getHotData, params, opts),
  getFeRedis: (params: CommonApi.GetFeRedisReq, opts?: RequestOptions) =>
    http.get<CommonApi.GetFeRedisResp>(CommonApiPaths.getFeRedis, params, opts),
  setFeRedis: (data: CommonApi.SetFeRedisReq, opts?: RequestOptions) =>
    http.post<unknown>(CommonApiPaths.setFeRedis, data, opts),
  delFeRedis: (data: CommonApi.DelFeRedisReq, opts?: RequestOptions) =>
    http.post<unknown>(CommonApiPaths.delFeRedis, data, opts),
  getUserBehaviorStats: (params: CommonApi.GetUserBehaviorStatsReq, opts?: RequestOptions) =>
    http.get<CommonApi.GetUserBehaviorStatsResp>(CommonApiPaths.getUserBehaviorStats, params, opts),
})
