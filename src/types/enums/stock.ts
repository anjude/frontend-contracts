export const StockType = {
  US: 1,
  HK: 2,
  CN: 3,
  ETF: 4,
  Other: 5,
} as const
export type StockType = (typeof StockType)[keyof typeof StockType]
