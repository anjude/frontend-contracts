function convertKeys(value: unknown, convertKey: (key: string) => string): unknown {
  if (value === null || value === undefined || typeof value !== 'object') return value
  if (Array.isArray(value)) return value.map((item) => convertKeys(item, convertKey))
  if (value instanceof Date) return value

  const result: Record<string, unknown> = {}
  Object.entries(value).forEach(([key, item]) => {
    result[convertKey(key)] = convertKeys(item, convertKey)
  })
  return result
}

export const ParamConverter = {
  toSnakeCase(value: unknown): unknown {
    return convertKeys(value, (key) => key.replace(/([A-Z])/g, '_$1').toLowerCase())
  },
  toCamelCase(value: unknown): unknown {
    return convertKeys(value, (key) => key.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase()))
  },
}
