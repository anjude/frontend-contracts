import type { PaginationData } from './base'
import type { AddressApi } from './address'

export namespace TripApi {
  export type TripStatus = 1 | 2 | 3 | 4
  export type PlanTripStreamV2Type = 1 | 2

  export interface TravelPreference {
    type?: string
    content?: string
  }

  export interface CreateTripSpotItem {
    spotId?: number
    spotName: string
    description?: string
    dayNumber: number
    sortOrder?: number
    visitTime?: number
    notes?: string
  }

  export interface TripDetail {
    id: number
    openid: string
    name: string
    addressCode: string
    startTime: number
    endTime: number
    dayCount: number
    travelPreference?: TravelPreference
    status: TripStatus
    top: number
    createTime: number
    updateTime: number
  }

  export interface TripListItem {
    id: number
    name: string
    addressCode: string
    startTime: number
    endTime: number
    dayCount: number
    status: TripStatus
    top: number
    createTime: number
    updateTime: number
  }

  export interface TripSpotDetail {
    id: number
    tripId: number
    spotId: number
    spotName: string
    description?: string
    dayNumber: number
    sortOrder: number
    visitTime?: number
    notes?: string
    createTime: number
    updateTime: number
  }

  export interface TripSpotListItem {
    id: number
    tripId: number
    spotId: number
    spotName: string
    description?: string
    dayNumber: number
    sortOrder: number
    visitTime?: number
    createTime: number
  }

  export interface GetTripListReq {
    status?: TripStatus
    offset?: number
    size?: number
  }

  export interface GetTripListResp extends PaginationData<TripListItem> {}

  export interface GetTripDetailReq {
    id: number
  }

  export interface GetTripDetailResp {
    trip: TripDetail
  }

  export interface CreateTripReq {
    name: string
    addressCode: string
    startTime: number
    endTime: number
    dayCount: number
    travelPreference?: TravelPreference
    status?: TripStatus
    top?: number
    spots?: CreateTripSpotItem[]
  }

  export interface CreateTripResp {
    trip: TripDetail
  }

  export interface UpdateTripReq {
    id: number
    name?: string
    addressCode?: string
    startTime?: number
    endTime?: number
    dayCount?: number
    travelPreference?: TravelPreference
    status?: TripStatus
    top?: number
  }

  export interface UpdateTripResp {
    trip: TripDetail
  }

  export interface DeleteTripReq {
    id: number
  }

  export interface DeleteTripResp {
    success: boolean
  }

  export interface GetTripSpotListReq {
    tripId: number
    dayNumber?: number
    offset?: number
    size?: number
  }

  export interface GetTripSpotListResp extends PaginationData<TripSpotListItem> {}

  export interface CreateTripSpotReq {
    tripId: number
    spotId?: number
    spotName: string
    description?: string
    dayNumber: number
    sortOrder?: number
    visitTime?: number
    notes?: string
  }

  export interface CreateTripSpotResp {
    tripSpot: TripSpotDetail
  }

  export interface UpdateTripSpotReq {
    id: number
    spotId?: number
    spotName?: string
    description?: string
    dayNumber?: number
    sortOrder?: number
    visitTime?: number
    notes?: string
  }

  export interface UpdateTripSpotResp {
    tripSpot: TripSpotDetail
  }

  export interface DeleteTripSpotReq {
    id: number
  }

  export interface DeleteTripSpotResp {
    success: boolean
  }

  export interface BatchUpdateTripSpotSortReq {
    tripId: number
    items: Array<{
      id: number
      dayNumber: number
      sortOrder: number
    }>
  }

  export interface BatchUpdateTripSpotSortResp {
    success: boolean
  }

  export interface PlanTripReq {
    addressCode: string
    dayCount: number
    travelPreference?: TravelPreference
  }

  export interface PlanTripSpotItem {
    dayNumber?: number
    spotId?: number
    spot?: AddressApi.SpotListItem
  }

  export interface PlanTripStreamV2Item {
    type?: PlanTripStreamV2Type
    spot?: string
    dayNum?: number
    spotDesc?: string
    thinkingContent?: string
  }

  export interface SpotListItem {
    id: number
    districtCode: string
    cityCode: string
    provinceCode: string
    name: string
    shortName: string
    description: string
    category: number
    longitude: number
    latitude: number
    coverImage: string
  }
}
