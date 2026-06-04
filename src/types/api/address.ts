import type { PaginationData } from './base'

export namespace AddressApi {
  export type AddressLevel = 1 | 2 | 3 | 4
  export type SpotCategory = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 99

  export interface AddressListItem {
    id: number
    parentCode: string
    name: string
    shortName: string
    code: string
    level: AddressLevel
    pinyin: string
    pinyinShort: string
    fullPath: string
    status: number
  }

  export interface SpotExtraData {
    openingHours?: string
    closingHours?: string
    ticketPrice?: number
    contactPhone?: string
    contactAddress?: string
    website?: string
    rating?: number
    visitDuration?: number
    bestSeason?: string
    tags?: string[]
  }

  export interface SpotListItem {
    id: number
    districtCode: string
    cityCode: string
    provinceCode: string
    name: string
    shortName: string
    description: string
    category: SpotCategory
    longitude: number
    latitude: number
    coverImage: string
  }

  export interface SpotDetail extends SpotListItem {
    pinyin: string
    pinyinShort: string
    images: string[]
    extraData?: SpotExtraData
    createTime: number
    updateTime: number
  }

  export interface SearchAddressReq {
    keyword: string
    offset?: number
    size?: number
    level?: AddressLevel
  }

  export interface SearchAddressResp extends PaginationData<AddressListItem> {}

  export interface CreateSpotReq {
    districtCode: string
    name: string
    shortName?: string
    description?: string
    category: SpotCategory
    longitude?: number
    latitude?: number
    pinyin?: string
    pinyinShort?: string
    coverImage?: string
    images?: string[]
    extraData?: SpotExtraData
  }

  export interface UpdateSpotReq {
    id: number
    districtCode?: string
    name?: string
    shortName?: string
    description?: string
    category?: SpotCategory
    longitude?: number
    latitude?: number
    pinyin?: string
    pinyinShort?: string
    coverImage?: string
    images?: string[]
    extraData?: SpotExtraData
  }

  export interface DeleteSpotReq {
    id: number
  }

  export interface SearchSpotReq {
    keyword?: string
    provinceCode?: string
    cityCode?: string
    districtCode?: string
    category?: SpotCategory
    longitude?: number
    latitude?: number
    radius?: number
    offset?: number
    size?: number
  }

  export interface SearchSpotResp extends PaginationData<SpotListItem> {}

  export interface GetSpotDetailReq {
    id?: number
    districtCode?: string
    cityCode?: string
    provinceCode?: string
  }

  export interface GetSpotDetailResp extends SpotDetail {}

  export interface GetSpotDetailV2Req {
    addressCode: string
    spotName: string
  }

  export interface GetSpotDetailV2Resp {
    introduction?: string
    isReservation?: boolean
    officialUrl?: string
    openingHours?: string
    rating?: string
    spotAddress?: string
    spotPicUrl?: string
    spotType?: SpotCategory
    suggestPlayTime?: string
    ticketPrice?: string
  }
}
