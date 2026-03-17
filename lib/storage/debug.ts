export const isDebugEnabled = () => process.env.DEBUG_R2 === "true"

export const debugLog = (message: string, data?: Record<string, unknown>) => {
  if (isDebugEnabled()) {
    const timestamp = new Date().toISOString()
    const prefix = `[DEBUG_R2 ${timestamp}]`
    if (data) {
      console.log(prefix, message, JSON.stringify(data, null, 2))
    } else {
      console.log(prefix, message)
    }
  }
}
