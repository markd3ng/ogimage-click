import { z } from "zod"

import { backgroundSchema } from "../elements/background"
import { canvasSchema } from "../elements/canvas"
import { imageSchema } from "../elements/image"
import { textSchema } from "../elements/text"

const ratingSchema = z.object({
  score: z.number(),
  show: z.boolean(),
})

export const testimonialTemplateSchema = z.object({
  name: z.literal("og:testimonial"),
  params: z.object({
    quote: textSchema,
    authorName: textSchema,
    authorTitle: textSchema,
    authorCompany: textSchema,
    productName: textSchema,
    authorAvatar: imageSchema,
    rating: ratingSchema,
    quoteStyle: z.enum(["modern", "classic", "minimal"]),
    accentColor: z.string(),
  }),
  background: backgroundSchema,
  canvas: canvasSchema,
})
export type TestimonialTemplate = z.infer<typeof testimonialTemplateSchema>

export const testimonialTemplateDefault: TestimonialTemplate = {
  name: "og:testimonial",
  params: {
    quote: {
      text: "myogimage.com has revolutionized how we create social media images. It's incredibly fast and the templates are beautiful!",
      fontFamily: "inter",
      fontWeight: 400,
      fontSize: 36,
      color: "#1f2937",
    },
    authorName: {
      text: "Alex Chen",
      fontFamily: "inter",
      fontWeight: 600,
      fontSize: 24,
      color: "#111827",
    },
    authorTitle: {
      text: "Frontend Developer",
      fontFamily: "inter",
      fontWeight: 400,
      fontSize: 18,
      color: "#6b7280",
    },
    authorCompany: {
      text: "StartupCo",
      fontFamily: "inter",
      fontWeight: 500,
      fontSize: 18,
      color: "#3b82f6",
    },
    productName: {
      text: "myogimage.com",
      fontFamily: "inter",
      fontWeight: 700,
      fontSize: 20,
      color: "#3b82f6",
    },
    authorAvatar: {
      url: "https://myogimage.com/samples/placeholder-avatar.jpg",
    },
    rating: {
      score: 5,
      show: true,
    },
    quoteStyle: "modern",
    accentColor: "#3b82f6",
  },
  background: {
    type: "linear-gradient",
    direction: "to bottom right",
    colorStops: ["#ffffff", "#f8fafc", "#f1f5f9"],
    noise: 0.03,
    gridOverlay: {
      pattern: "grid",
      color: "#e2e8f0",
      opacity: 0.2,
      blurRadius: 50,
    },
  },
  canvas: {
    width: 1200,
    height: 630,
  },
}
