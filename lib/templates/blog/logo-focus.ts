import { z } from "zod"

import { backgroundSchema } from "../elements/background"
import { canvasSchema } from "../elements/canvas"
import { imageSchema } from "../elements/image"
import { textSchema } from "../elements/text"

export const logoFocusTemplateSchema = z.object({
  name: z.literal("blog:logo-focus"),
  params: z.object({
    logo: imageSchema,
    title: textSchema,
    description: textSchema,
    logoSize: z.enum(["small", "medium", "large"]),
    layout: z.enum(["vertical", "horizontal"]),
    alignment: z.enum(["left", "center"]),
    brandColor: z.string(),
    textColor: z.string(),
    spacing: z.enum(["compact", "normal", "relaxed"]),
    borderColor: z.string(),
  }),
  background: backgroundSchema,
  canvas: canvasSchema,
})
export type LogoFocusTemplate = z.infer<typeof logoFocusTemplateSchema>

export const logoFocusTemplateDefault: LogoFocusTemplate = {
  name: "blog:logo-focus",
  params: {
    logo: {
      url: "https://myogimage.com/logo.png",
    },
    title: {
      text: "Create beautiful OG images for free.",
      fontFamily: "inter",
      fontWeight: 600,
      fontSize: 48,
      color: "#111827",
    },
    description: {
      text: "With countless Next.js templates available today, finding the right one for your project can be challenging.",
      fontFamily: "inter",
      fontWeight: 400,
      fontSize: 22,
      color: "#4b5563",
    },
    logoSize: "medium",
    layout: "vertical",
    alignment: "center",
    brandColor: "#2563eb",
    textColor: "#111827",
    spacing: "normal",
    borderColor: "#e5e7eb",
  },
  background: {
    type: "linear-gradient",
    direction: "to top right",
    colorStops: ["#ffffff", "#f8fafc", "#f1f5f9"],
    noise: 0.15,
  },
  canvas: {
    width: 1200,
    height: 630,
  },
}
