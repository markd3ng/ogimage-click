import * as blog from "./blog"
import * as og from "./open-graph"
import * as x from "./x"

export const templates = {
  // Open Graph
  "og:basic": og.basic,
  "og:notice": og.notice,
  "og:hero": og.hero,
  "og:image-right": og.imageRight,
  "og:logos": og.logos,
  "og:corporate": og.corporate,
  "og:testimonial": og.testimonial,
  "og:product-showcase": og.productShowcase,

  // X Header templates
  "x:header-basic": x.header.basic,
  "x:header-minimalist": x.header.minimalist,
  "x:header-logo": x.header.logo,

  // Blog
  "blog:basic": blog.basic,
  "blog:minimal": blog.minimal,
  "blog:logo-focus": blog.logoFocus,
  "blog:magazine": blog.magazine,
  "blog:rich": blog.rich,
}
