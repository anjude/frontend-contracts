export const AddressLevel = {
  Province: 1,
  City: 2,
  District: 3,
  Street: 4,
} as const
export type AddressLevel = (typeof AddressLevel)[keyof typeof AddressLevel]

export const SpotCategory = {
  Scenic: 1,
  Food: 2,
  Hotel: 3,
  Shopping: 4,
  Entertainment: 5,
  Museum: 6,
  Park: 7,
  Transit: 8,
  Service: 9,
  Activity: 10,
  Other: 99,
} as const
export type SpotCategory = (typeof SpotCategory)[keyof typeof SpotCategory]
