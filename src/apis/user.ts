import type { UserApi } from '../types/api/user'
import type { HttpClient, RequestOptions } from '../request/client'

export const UserApiPaths = {
  getCode: '/api/so/user/code',
  setJwt: '/api/so/user/set_jwt',
  getJwt: '/api/so/user/get_jwt',
  login: '/api/so/user/login',
  getUser: '/api/so/user/get',
  getUserByOpenid: '/api/so/user/get_by_openid',
  getUserList: '/api/so/user/list',
  updateUser: '/api/so/user/update',
  getSubUser: '/api/so/user/sub/get',
  addSubUser: '/api/so/user/sub/add',
  delSubUser: '/api/so/user/sub/del',
  generateAccount: '/api/so/user/account/generate',
  registerAccount: '/api/so/user/account/register',
  checkAccount: '/api/so/user/account/check',
  subscribeMsg: '/api/so/user/message/sub',
} as const

export const createUserApi = (http: HttpClient) => ({
  getCode: (params: UserApi.GetCodeReq, opts?: RequestOptions) =>
    http.get<UserApi.GetCodeResp>(UserApiPaths.getCode, params, opts),
  setJwt: (data: UserApi.SetJwtReq, opts?: RequestOptions) =>
    http.post<UserApi.SetJwtResp>(UserApiPaths.setJwt, data, opts),
  getJwt: (params: UserApi.GetJwtReq, opts?: RequestOptions) =>
    http.get<UserApi.GetJwtResp>(UserApiPaths.getJwt, params, opts),
  login: (params: UserApi.LoginReq, opts?: RequestOptions) =>
    http.get<UserApi.LoginResp>(UserApiPaths.login, params, opts),
  getUser: (params?: unknown, opts?: RequestOptions) =>
    http.get<UserApi.UserInfoView>(UserApiPaths.getUser, params, opts),
  getUserByOpenid: (params?: unknown, opts?: RequestOptions) =>
    http.get<unknown>(UserApiPaths.getUserByOpenid, params, opts),
  getUserList: (params: UserApi.GetUserListReq, opts?: RequestOptions) =>
    http.get<UserApi.GetUserListResp>(UserApiPaths.getUserList, params, opts),
  updateUser: (data: UserApi.UpdateUserReq, opts?: RequestOptions) =>
    http.post<unknown>(UserApiPaths.updateUser, data, opts),
  getSubUser: (params?: unknown, opts?: RequestOptions) =>
    http.get<UserApi.UserSubView>(UserApiPaths.getSubUser, params, opts),
  addSubUser: (data: UserApi.AddSubUserReq, opts?: RequestOptions) =>
    http.post<unknown>(UserApiPaths.addSubUser, data, opts),
  delSubUser: (data: UserApi.DelSubUserReq, opts?: RequestOptions) =>
    http.post<unknown>(UserApiPaths.delSubUser, data, opts),
  generateAccount: (params: UserApi.GenerateAccountReq, opts?: RequestOptions) =>
    http.get<UserApi.GenerateAccountResp>(UserApiPaths.generateAccount, params, opts),
  registerAccount: (data: UserApi.RegisterAccountReq, opts?: RequestOptions) =>
    http.post<UserApi.RegisterAccountResp>(UserApiPaths.registerAccount, data, opts),
  checkAccount: (params: UserApi.CheckAccountReq, opts?: RequestOptions) =>
    http.get<UserApi.CheckAccountResp>(UserApiPaths.checkAccount, params, opts),
  subscribeMsg: (data: UserApi.SubscribeMsgReq, opts?: RequestOptions) =>
    http.post<unknown>(UserApiPaths.subscribeMsg, data, opts),
})
