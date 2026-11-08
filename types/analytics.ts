export namespace AnalyticsApi {
  export type EventName = 'feature_open' | 'feature_start' | 'feature_complete' | 'feature_share_intent'
  export type Source = 'home' | 'catalog' | 'daily_challenge' | 'share' | 'unknown'

  export interface FeatureEvent {
    eventId: string
    visitId: string
    attemptId?: string
    eventName: EventName
    businessKey: string
    featureKey: string
    itemKey: string
    source: Source
    contentVersion?: number
    appVersion: string
    occurredAt: number
  }

  export interface BatchReq {
    projectKey: string
    schemaVersion: 1
    events: FeatureEvent[]
  }

  export interface Result {
    index: number
    status: 'accepted' | 'rejected'
    reason?: 'invalid_event' | 'unknown_business' | 'unknown_feature_item' | 'invalid_time'
  }

  export interface BatchResp {
    collectionEnabled: boolean
    results: Result[]
  }
}
