import { Spacer } from "@nextui-org/react"

import { siteConfig, SITE_NAME } from "@/config/site"
import { ogs, xHeaders } from "@/components/home/Images"

export default function Hero() {
  return (
    <nav className="mx-auto mt-20 flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="relative mb-2 text-2xl font-medium sm:text-3xl">
          <span className="inline-flex items-center">
            <span className="mr-2 animate-pulse text-blue-500">✦</span>
            <span className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text px-4 py-2 text-transparent transition-all duration-300 hover:from-purple-600 hover:to-blue-600">
              {SITE_NAME}
            </span>
            <span className="ml-2 animate-pulse text-blue-500">✦</span>
          </span>{" "}
          <span className="mb-4 block text-4xl font-bold leading-[1.2] text-gray-900 sm:text-6xl">
            {siteConfig.name}
          </span>
        </h1>
        <p className="mb-8 text-base text-gray-500 sm:text-xl">
          {siteConfig.description}
        </p>
        <div className="relative overflow-hidden">
          <div className="flex flex-nowrap items-center justify-center gap-4">
            {ogs.map(({ key, item }) => (
              <div key={key} className="flex-shrink-0">
                {item}
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white to-transparent" />
        </div>
        <Spacer y={4} />
        <div className="relative overflow-hidden">
          <div className="flex flex-nowrap items-center justify-center gap-4">
            {xHeaders.map(({ key, item }) => (
              <div key={key} className="flex-shrink-0">
                {item}
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white to-transparent" />
        </div>
      </div>
    </nav>
  )
}
