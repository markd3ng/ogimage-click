import { z } from "zod"

import { backgroundSchema } from "../elements/background"
import { canvasSchema } from "../elements/canvas"
import { imageSchema } from "../elements/image"
import { textSchema } from "../elements/text"

const authorSchema = z.object({
  name: textSchema,
  title: textSchema,
  avatar: imageSchema,
})

const statsSchema = z.object({
  views: z.string(),
  likes: z.string(),
  comments: z.string(),
})

export const richTemplateSchema = z.object({
  name: z.literal("blog:rich"),
  params: z.object({
    title: textSchema,
    subtitle: textSchema,
    category: textSchema,
    tags: z.array(z.string()),
    author: authorSchema,
    publishDate: textSchema,
    readTime: textSchema,
    stats: statsSchema,
    featuredImage: imageSchema,
    logo: imageSchema,
    primaryColor: z.string(),
    secondaryColor: z.string(),
    layout: z.enum(["card", "split"]),
    showStats: z.boolean(),
    showTags: z.boolean(),
  }),
  background: backgroundSchema,
  canvas: canvasSchema,
})
export type RichTemplate = z.infer<typeof richTemplateSchema>

export const richTemplateDefault: RichTemplate = {
  name: "blog:rich",
  params: {
    title: {
      text: "Create beautiful OG images for free.",
      fontFamily: "inter",
      fontWeight: 700,
      fontSize: 44,
      color: "#111827",
    },
    subtitle: {
      text: "A static blog template built with Astro.",
      fontFamily: "inter",
      fontWeight: 400,
      fontSize: 20,
      color: "#4b5563",
    },
    category: {
      text: "DEVELOPMENT",
      fontFamily: "inter",
      fontWeight: 600,
      fontSize: 14,
      color: "#3b82f6",
    },
    tags: ["React", "Next.js", "TypeScript", "Web Dev"],
    author: {
      name: {
        text: "Sarah Johnson",
        fontFamily: "inter",
        fontWeight: 500,
        fontSize: 16,
        color: "#111827",
      },
      title: {
        text: "Senior Frontend Engineer",
        fontFamily: "inter",
        fontWeight: 400,
        fontSize: 14,
        color: "#6b7280",
      },
      avatar: {
        url: "https://myogimage.com/samples/placeholder-avatar.jpg",
      },
    },
    publishDate: {
      text: "Dec 15, 2024",
      fontFamily: "inter",
      fontWeight: 400,
      fontSize: 14,
      color: "#6b7280",
    },
    readTime: {
      text: "12 min read",
      fontFamily: "inter",
      fontWeight: 400,
      fontSize: 14,
      color: "#6b7280",
    },
    stats: {
      views: "2.4K",
      likes: "156",
      comments: "23",
    },
    featuredImage: {
      url: "https://myogimage.com/samples/blog-featured.png",
    },
    logo: {
      url: "https://myogimage.com/logo.png",
    },
    primaryColor: "#3b82f6",
    secondaryColor: "#8b5cf6",
    layout: "card",
    showStats: true,
    showTags: true,
  },
  background: {
    type: "linear-gradient",
    direction: "to bottom right",
    colorStops: ["#f8fafc", "#f1f5f9", "#e2e8f0"],
    noise: 0.03,
    gridOverlay: {
      pattern: "dots",
      color: "#cbd5e1",
      opacity: 0.4,
      blurRadius: 80,
    },
  },
  canvas: {
    width: 1200,
    height: 630,
  },
}
