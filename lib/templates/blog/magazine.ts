import { z } from "zod"

import { backgroundSchema } from "../elements/background"
import { canvasSchema } from "../elements/canvas"
import { imageSchema } from "../elements/image"
import { textSchema } from "../elements/text"

export const magazineTemplateSchema = z.object({
  name: z.literal("blog:magazine"),
  params: z.object({
    title: textSchema,
    subtitle: textSchema,
    category: textSchema,
    author: textSchema,
    publishDate: textSchema,
    readTime: textSchema,
    featuredImage: imageSchema,
    logo: imageSchema,
    accentColor: z.string(),
    layoutStyle: z.enum(["left-content", "right-content"]),
  }),
  background: backgroundSchema,
  canvas: canvasSchema,
})
export type MagazineTemplate = z.infer<typeof magazineTemplateSchema>

export const magazineTemplateDefault: MagazineTemplate = {
  name: "blog:magazine",
  params: {
    title: {
      text: "Create beautiful OG images for free.",
      fontFamily: "inter",
      fontWeight: 800,
      fontSize: 48,
      color: "#111827",
    },
    subtitle: {
      text: "A static blog template built with Astro.",
      fontFamily: "inter",
      fontWeight: 400,
      fontSize: 24,
      color: "#4b5563",
    },
    category: {
      text: "TECHNOLOGY",
      fontFamily: "inter",
      fontWeight: 600,
      fontSize: 16,
      color: "#2563eb",
    },
    author: {
      text: "Alex Chen",
      fontFamily: "inter",
      fontWeight: 500,
      fontSize: 18,
      color: "#374151",
    },
    publishDate: {
      text: "Jan 10, 2026",
      fontFamily: "inter",
      fontWeight: 400,
      fontSize: 16,
      color: "#6b7280",
    },
    readTime: {
      text: "8 min read",
      fontFamily: "inter",
      fontWeight: 400,
      fontSize: 16,
      color: "#6b7280",
    },
    featuredImage: {
      url: "https://myogimage.com/samples/blog-featured.png",
    },
    logo: {
      url: "https://myogimage.com/logo.png",
    },
    accentColor: "#2563eb",
    layoutStyle: "left-content",
  },
  background: {
    type: "linear-gradient",
    direction: "to bottom right",
    colorStops: ["#ffffff", "#f8fafc", "#f1f5f9"],
    noise: 0.02,
    gridOverlay: {
      pattern: "dots",
      color: "#e2e8f0",
      opacity: 0.3,
      blurRadius: 60,
    },
  },
  canvas: {
    width: 1200,
    height: 630,
  },
}
