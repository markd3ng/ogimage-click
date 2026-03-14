import { z } from "zod"

import * as blog from "./blog"
import * as og from "./open-graph"
import * as x from "./x"

const templateNameSchema = z.union([
  // Open Graph
  z.literal("og:image-right"),
  z.literal("og:basic"),
  z.literal("og:hero"),
  z.literal("og:notice"),
  z.literal("og:logos"),
  z.literal("og:corporate"),
  z.literal("og:testimonial"),
  z.literal("og:product-showcase"),

  // X Header templates
  z.literal("x:header-basic"),
  z.literal("x:header-minimalist"),
  z.literal("x:header-logo"),

  // Blog
  z.literal("blog:basic"),
  z.literal("blog:minimal"),
  z.literal("blog:logo-focus"),
  z.literal("blog:magazine"),
  z.literal("blog:rich"),
])
export type TemplateName = z.infer<typeof templateNameSchema>

export const templateSchema = z.discriminatedUnion("name", [
  // Open Graph
  og.imageRightTemplateSchema,
  og.basicTemplateSchema,
  og.heroTemplateSchema,
  og.noticeTemplateSchema,
  og.logosTemplateSchema,
  og.corporateTemplateSchema,
  og.testimonialTemplateSchema,
  og.productShowcaseTemplateSchema,

  // X Header templates
  x.header.basicTemplateSchema,
  x.header.minimalistTemplateSchema,
  x.header.logoTemplateSchema,

  // Blog
  blog.basicTemplateSchema,
  blog.minimalTemplateSchema,
  blog.logoFocusTemplateSchema,
  blog.magazineTemplateSchema,
  blog.richTemplateSchema,
])
export type Template = z.infer<typeof templateSchema>

export const templateDefaults: Record<TemplateName, Template> = {
  // Open Graph
  "og:image-right": og.imageRightTemplateDefault,
  "og:basic": og.basicTemplateDefault,
  "og:hero": og.heroTemplateDefault,
  "og:notice": og.noticeTemplateDefault,
  "og:logos": og.logosTemplateDefault,
  "og:corporate": og.corporateTemplateDefault,
  "og:testimonial": og.testimonialTemplateDefault,
  "og:product-showcase": og.productShowcaseTemplateDefault,

  // X Header templates
  "x:header-basic": x.header.basicTemplateDefault,
  "x:header-minimalist": x.header.minimalistTemplateDefault,
  "x:header-logo": x.header.logoTemplateDefault,

  // Blog
  "blog:basic": blog.basicTemplateDefault,
  "blog:minimal": blog.minimalTemplateDefault,
  "blog:logo-focus": blog.logoFocusTemplateDefault,
  "blog:magazine": blog.magazineTemplateDefault,
  "blog:rich": blog.richTemplateDefault,
}
