import * as blog from "./blog"
import * as og from "./open-graph"
import * as x from "./x"

export const skeletons = {
  // Open Graph
  "og:basic": og.Basic,
  "og:notice": og.Notice,
  "og:hero": og.Hero,
  "og:image-right": og.ImageRight,
  "og:logos": og.Logos,
  "og:corporate": og.Corporate,
  "og:testimonial": og.Testimonial,
  "og:product-showcase": og.ProductShowcase,

  // X Header templates
  "x:header-basic": x.header.Basic,
  "x:header-minimalist": x.header.Minimalist,
  "x:header-logo": x.header.Logo,

  // Blog Cover Image
  "blog:basic": blog.Basic,
  "blog:minimal": blog.Minimal,
  "blog:logo-focus": blog.LogoFocus,
  "blog:magazine": blog.Magazine,
  "blog:rich": blog.Rich,
}
