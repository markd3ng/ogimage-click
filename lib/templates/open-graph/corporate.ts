import { z } from "zod"

import { backgroundSchema } from "../elements/background"
import { canvasSchema } from "../elements/canvas"
import { imageSchema } from "../elements/image"
import { textSchema } from "../elements/text"

export const corporateTemplateSchema = z.object({
  name: z.literal("og:corporate"),
  params: z.object({
    companyName: textSchema,
    tagline: textSchema,
    title: textSchema,
    subtitle: textSchema,
    logo: imageSchema,
    brandColor: z.string(),
  }),
  background: backgroundSchema,
  canvas: canvasSchema,
})
export type CorporateTemplate = z.infer<typeof corporateTemplateSchema>

export const corporateTemplateDefault: CorporateTemplate = {
  name: "og:corporate",
  params: {
    companyName: {
      text: "myogimage.com",
      fontFamily: "inter",
      fontWeight: 700,
      fontSize: 36,
      color: "#1e40af",
    },
    tagline: {
      text: "Free • Fast • Professional",
      fontFamily: "inter",
      fontWeight: 400,
      fontSize: 20,
      color: "#64748b",
    },
    title: {
      text: "Create beautiful OG images for free.",
      fontFamily: "inter",
      fontWeight: 600,
      fontSize: 42,
      color: "#0f172a",
    },
    subtitle: {
      text: "A static blog template built with Astro.",
      fontFamily: "inter",
      fontWeight: 400,
      fontSize: 24,
      color: "#475569",
    },
    logo: {
      url: "https://myogimage.com/logo.png",
    },
    brandColor: "#2563eb",
  },
  background: {
    type: "linear-gradient",
    direction: "to bottom right",
    colorStops: ["#f8fafc", "#e2e8f0", "#cbd5e1"],
    noise: 0.05,
    gridOverlay: {
      pattern: "grid",
      color: "#94a3b8",
      opacity: 0.15,
      blurRadius: 30,
    },
  },
  canvas: {
    width: 1200,
    height: 630,
  },
}
