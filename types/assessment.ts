/** 鹅懂个啥的测试类型，数据库以文本存储，代码按此枚举校验。 */
export const AssessmentType = {
  Personality: 'personality',
  Finance: 'finance',
} as const
export type AssessmentType = (typeof AssessmentType)[keyof typeof AssessmentType]

/** 测试发布状态。 */
export const AssessmentStatus = { Unpublished: 0, Published: 1 } as const
export type AssessmentStatus = (typeof AssessmentStatus)[keyof typeof AssessmentStatus]

export namespace AssessmentApi {
  export interface AssessmentSummary {
    testKey: string; assessmentType: AssessmentType | string; title: string; summary: string
    coverUrl: string; logoUrl: string; displayOrder: number; testStatus: AssessmentStatus; contentVersion: number
  }
  export interface GetListReq { assessmentType?: string; offset?: number; size?: number }
  export interface GetListResp { offset: number; size: number; total: number; types: string[]; list: AssessmentSummary[] }
  export interface AssessmentDetail extends AssessmentSummary { content: ConfiguredAssessment }
  export interface GetDetailReq { testKey: string }
  export interface GetDetailResp { assessment: AssessmentDetail }
  export interface CreateReq { testKey: string; assessmentType: AssessmentType | string; title: string; summary: string; coverUrl: string; displayOrder: number; content: ConfiguredAssessment }
  export interface CreateResp { testKey: string; contentVersion: number }
  export interface UpdateReq {
    testKey: string; contentVersion: number; assessmentType?: string; title?: string; summary?: string
    coverUrl?: string; displayOrder?: number; testStatus?: AssessmentStatus; content?: ConfiguredAssessment
  }
  export interface UpdateResp { testKey: string; contentVersion: number }
}

export interface ConfiguredAssessment {
  schemaVersion: number
  scoringVersion: number
  testKey: string
  title: string
  logoUrl?: string
  resultNote?: string
  shareImageUrl?: string
  navigation: { allowPrevious: boolean; allowSkip: boolean }
  dimensions: string[]
  questions: Array<{
    id: string
    blocks: Array<{ type: 'text'; text: string; title?: string } | { type: 'image'; src: string; caption: string } | { type: 'chat'; title: string; messages: Array<{ id: string; name: string; text: string; side: 'left' | 'right' | 'system' }> } | { type: 'market'; title: string; text: string; name: string; change: string; down?: boolean; chart?: string }>
    prompt: string
    options: Array<{ id: string; text: string; scores: Record<string, number>; evidence: string }>
  }>
  results: Array<{ id: string; title: string; weights: Record<string, number>; description: string; considerations?: string; share?: string; imageUrl?: string }>
}
