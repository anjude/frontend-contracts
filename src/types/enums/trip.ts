export const TripStatus = {
  Draft: 1,
  Planning: 2,
  Ongoing: 3,
  Finished: 4,
} as const
export type TripStatus = (typeof TripStatus)[keyof typeof TripStatus]

export const PlanTripStreamV2Type = {
  Text: 1,
  Spot: 2,
} as const
export type PlanTripStreamV2Type = (typeof PlanTripStreamV2Type)[keyof typeof PlanTripStreamV2Type]
