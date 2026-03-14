import { z } from "zod"

import { backgroundSchema } from "../elements/background"
import { canvasSchema } from "../elements/canvas"
import { imageSchema } from "../elements/image"
import { textSchema } from "../elements/text"

const ratingSchema = z.object({
  score: z.number(),
  total: z.number(),
  show: z.boolean(),
})

export const productShowcaseTemplateSchema = z.object({
  name: z.literal("og:product-showcase"),
  params: z.object({
    productName: textSchema,
    price: textSchema,
    originalPrice: textSchema,
    rating: ratingSchema,
    features: z.array(textSchema),
    badge: textSchema,
    productImage: imageSchema,
    brandLogo: imageSchema,
    accentColor: z.string(),
  }),
  background: backgroundSchema,
  canvas: canvasSchema,
})
export type ProductShowcaseTemplate = z.infer<
  typeof productShowcaseTemplateSchema
>

export const productShowcaseTemplateDefault: ProductShowcaseTemplate = {
  name: "og:product-showcase",
  params: {
    productName: {
      text: "Premium Wireless Headphones",
      fontFamily: "inter",
      fontWeight: 700,
      fontSize: 42,
      color: "#1f2937",
    },
    price: {
      text: "$199",
      fontFamily: "inter",
      fontWeight: 600,
      fontSize: 32,
      color: "#10b981",
    },
    originalPrice: {
      text: "$299",
      fontFamily: "inter",
      fontWeight: 400,
      fontSize: 24,
      color: "#9ca3af",
    },
    rating: {
      score: 4.8,
      total: 256,
      show: true,
    },
    features: [
      {
        text: "Active Noise Cancellation",
        fontFamily: "inter",
        fontWeight: 400,
        fontSize: 20,
        color: "#4b5563",
      },
      {
        text: "30-hour Battery Life",
        fontFamily: "inter",
        fontWeight: 400,
        fontSize: 20,
        color: "#4b5563",
      },
      {
        text: "Premium Sound Quality",
        fontFamily: "inter",
        fontWeight: 400,
        fontSize: 20,
        color: "#4b5563",
      },
    ],
    badge: {
      text: "BESTSELLER",
      fontFamily: "inter",
      fontWeight: 700,
      fontSize: 16,
      color: "#ffffff",
    },
    productImage: {
      url: "https://myogimage.com/samples/placeholder-product.png",
    },
    brandLogo: {
      url: "https://myogimage.com/logo.png",
    },
    accentColor: "#10b981",
  },
  background: {
    type: "linear-gradient",
    direction: "to bottom right",
    colorStops: ["#ffffff", "#f9fafb", "#f3f4f6"],
    noise: 0.02,
    gridOverlay: {
      pattern: "dots",
      color: "#e5e7eb",
      opacity: 0.3,
      blurRadius: 40,
    },
  },
  canvas: {
    width: 1200,
    height: 630,
  },
}
