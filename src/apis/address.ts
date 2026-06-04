export const addressApiPaths = {
  searchAddress: 'GET /api/so/address/search',
  createSpot: 'POST /api/so/address/spot/create',
  updateSpot: 'POST /api/so/address/spot/update',
  deleteSpot: 'POST /api/so/address/spot/delete',
  getSpotDetail: 'GET /api/so/address/spot/detail',
  getSpotDetailV2: 'GET /api/so/address/spot/detail/v2',
  searchSpot: 'GET /api/so/address/spot/search',
} as const

export type {
  SearchAddressReq,
  SearchAddressResp,
  AddressListItem,
  CreateSpotReq,
  UpdateSpotReq,
  DeleteSpotReq,
  SearchSpotReq,
  SearchSpotResp,
  SpotDetail,
  SpotListItem,
  SpotExtraData,
  GetSpotDetailReq,
  GetSpotDetailResp,
  GetSpotDetailV2Req,
  GetSpotDetailV2Resp,
} from '../types/api/address'
