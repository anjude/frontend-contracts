export const ExecutionMode = {
  Normal: 0,
  Recursive: 1,
} as const
export type ExecutionMode = (typeof ExecutionMode)[keyof typeof ExecutionMode]

export const ExecutionStatus = {
  Draft: 0,
  Finished: 1,
} as const
export type ExecutionStatus = (typeof ExecutionStatus)[keyof typeof ExecutionStatus]
