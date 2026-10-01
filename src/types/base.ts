export interface ApiResponse<T = unknown> {
  errCode: number
  msg: string
  detail: string
  data: T
}

export interface PaginationParams {
  offset: number
  size: number
}

export interface PaginationData<T = unknown> {
  list: T[]
  total: number
  offset: number
  size: number
}
