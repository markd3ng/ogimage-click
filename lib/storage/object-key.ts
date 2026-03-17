import { createHash } from "node:crypto"

const stableNormalize = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map(stableNormalize)
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, nested]) => [key, stableNormalize(nested)])
    )
  }

  return value
}

export const buildImageObjectKey = (templateData: unknown) => {
  const normalized = stableNormalize(templateData)
  const serialized = JSON.stringify(normalized)
  const hash = createHash("sha256").update(serialized).digest("hex")

  let templateName = "unknown"
  if (templateData && typeof templateData === "object" && "name" in templateData) {
    templateName = String((templateData as { name?: unknown }).name ?? "unknown").replace(/[^a-zA-Z0-9:_-]/g, "-")
  }

  const safeName = templateName.replace(/:/g, "-")
  return `og/${safeName}/${hash}.png`
}
