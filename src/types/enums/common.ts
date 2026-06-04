export const HotDataPlatform = {
  Weibo: 1,
  Zhihu: 2,
  Douyin: 3,
  Tieba: 4,
} as const
export type HotDataPlatform = (typeof HotDataPlatform)[keyof typeof HotDataPlatform]
