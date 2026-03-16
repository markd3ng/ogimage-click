import { z } from "zod"

import { backgroundSchema } from "../elements/background"
import { canvasSchema } from "../elements/canvas"
import { imageSchema } from "../elements/image"
import { textSchema } from "../elements/text"

export const minimalTemplateSchema = z.object({
  name: z.literal("blog:minimal"),
  params: z.object({
    title: textSchema,
    subtitle: textSchema,
    author: textSchema,
    date: textSchema,
    logo: imageSchema,
    accentElement: z.enum(["line", "dot", "none"]),
    accentColor: z.string(),
    layout: z.enum(["centered", "left"]),
    spacing: z.enum(["compact", "normal", "relaxed"]),
  }),
  background: backgroundSchema,
  canvas: canvasSchema,
})
export type MinimalTemplate = z.infer<typeof minimalTemplateSchema>

export const minimalTemplateDefault: MinimalTemplate = {
  name: "blog:minimal",
  params: {
    title: {
      text: "Create beautiful OG images for free.",
      fontFamily: "inter",
      fontWeight: 300,
      fontSize: 56,
      color: "#111827",
    },
    subtitle: {
      text: "A static blog template built with Astro.",
      fontFamily: "inter",
      fontWeight: 300,
      fontSize: 20,
      color: "#6b7280",
    },
    author: {
      text: "Jordan Smith",
      fontFamily: "inter",
      fontWeight: 400,
      fontSize: 16,
      color: "#374151",
    },
    date: {
      text: "Jan 10, 2026",
      fontFamily: "inter",
      fontWeight: 300,
      fontSize: 14,
      color: "#9ca3af",
    },
    logo: {
      url: "https://myogimage.com/logo.png",
    },
    accentElement: "line",
    accentColor: "#000000",
    layout: "centered",
    spacing: "normal",
  },
  background: {
    type: "color",
    color: "#ffffff",
    noise: 0,
  },
  canvas: {
    width: 1200,
    height: 630,
  },
}
