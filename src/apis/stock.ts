export const stockApiPaths = {
  getStockList: 'POST /api/so/stock/list',
  getStockDetail: 'POST /api/so/stock/detail',
  createStock: 'POST /api/so/stock/create',
  updateStock: 'POST /api/so/stock/update',
  deleteStock: 'POST /api/so/stock/delete',
} as const

export type {
  GetStockListReq,
  GetStockListResp,
  GetStockDetailReq,
  GetStockDetailResp,
  CreateStockReq,
  CreateStockResp,
  UpdateStockReq,
  UpdateStockResp,
  DeleteStockReq,
  DeleteStockResp,
} from '../types/api/stock'
