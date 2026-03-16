import { notFound } from "next/navigation"

import { siteConfig } from "@/config/site"

import { CustomMDX } from "../mdx"
import { formatDate, getBlogPosts } from "../utils"

const baseUrl = siteConfig.url

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  let posts = await getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params
  const post = await getBlogPosts().find((post) => post.slug === slug)
  return {
    ...siteConfig,
    title: `${post?.metadata.title} | ${siteConfig.name}`,
    description: post?.metadata.summary,
    openGraph: {
      ...siteConfig.openGraph,
      url: `${baseUrl}/guides/${post?.slug}`,
    },
    twitter: {
      ...siteConfig.twitter,
      url: `${baseUrl}/guides/${post?.slug}`,
    },
  }
}

export default async function Blog({ params }: { params: Params }) {
  const { slug } = await params
  let post = await getBlogPosts().find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <section>
      <h1 className="title text-2xl font-semibold tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="mb-8 mt-2 flex items-center justify-between text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  )
}
