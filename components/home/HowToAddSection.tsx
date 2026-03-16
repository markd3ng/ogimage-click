import Link from "next/link"

import { BASE_URL } from "@/config/site"
import { HtmlCodeBlock, NextjsCodeBlock } from "./howToAddSection/CodeBlock"
import { TabsWrapper } from "./howToAddSection/TabsWrapper"

export default function HowToAddSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          How to Add Open Graph Image
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-500 sm:mt-4">
          Add social media preview images to your website in minutes. Choose
          your preferred method below (HTML or Next.js App Router).
        </p>
      </div>

      <div className="mt-12">
        <TabsWrapper
          htmlContent={<HtmlCodeBlock />}
          nextjsContent={<NextjsCodeBlock />}
        />
      </div>

      <div className="mt-8 rounded-lg bg-gray-50 p-6 dark:bg-gray-900">
        <h3 className="text-lg font-medium">Pro Tips</h3>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-gray-600 dark:text-gray-300">
          <li>
            Always provide fallback images in case the OG image fails to load
          </li>
          <li>Test your OG images using social media debugging tools</li>
          <li>Use descriptive alt text for better accessibility</li>
          <li>
            Consider using dynamic OG images for content that changes frequently
          </li>
        </ul>
        <h3 className="mt-4 text-lg font-medium">Learn More</h3>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-gray-600 dark:text-gray-300">
          <li>
            <Link
              href={`${BASE_URL}/guides/the-free-open-gragh-image-generator`}
              prefetch={false}
              title="The Free Open Graph Image Generator"
              className="inline-block w-full whitespace-normal break-words text-sm underline"
            >
              The Free Open Graph Image Generator
            </Link>
          </li>
          <li>
            <Link
              href={`${BASE_URL}/guides/og-image-tips-2025-social-sharing-guide`}
              prefetch={false}
              title="The Best OG Image Tips for 2025: Maximize Social Shares"
              className="inline-block w-full whitespace-normal break-words text-sm underline"
            >
              The Best OG Image Tips for 2025: Maximize Social Shares
            </Link>
          </li>
          <li>
            <Link
              href={`${BASE_URL}/guides/og-image-design-principles`}
              prefetch={false}
              title="OG Image Design 2025: Create Social Previews That Convert"
              className="inline-block w-full whitespace-normal break-words text-sm underline"
            >
              OG Image Design 2025: Create Social Previews That Convert
            </Link>
          </li>
        </ul>
      </div>
    </section>
  )
}
