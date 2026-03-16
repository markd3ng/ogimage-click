import { Skeleton } from "../skeleton"

export function Basic() {
  return (
    <div className="flex aspect-video h-full w-full flex-col items-center justify-center">
      <Skeleton className="h-4 w-4 rounded-full md:h-8 md:w-8" />
      <Skeleton className="mt-2 h-3 w-1/2 md:mt-3 md:h-4" />
      <Skeleton className="mt-1 h-2 w-3/4 md:mt-2 md:h-3" />
    </div>
  )
}

export function Minimal() {
  return (
    <div className="flex aspect-video h-full w-full flex-col items-center justify-center space-y-2">
      <Skeleton className="h-2 w-10" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-2/3" />
      <Skeleton className="h-2 w-1/3" />
    </div>
  )
}

export function LogoFocus() {
  return (
    <div className="flex aspect-video h-full w-full items-center justify-center p-3">
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-md border p-2">
        <Skeleton className="h-8 w-8 rounded-lg" />
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-2 w-3/4" />
      </div>
    </div>
  )
}

export function Magazine() {
  return (
    <div className="flex aspect-video h-full w-full gap-2 p-2">
      <div className="w-3/5 space-y-2">
        <Skeleton className="h-2 w-1/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-4/5" />
        <Skeleton className="h-2 w-2/3" />
      </div>
      <Skeleton className="h-full w-2/5 rounded-md" />
    </div>
  )
}

export function Rich() {
  return (
    <div className="flex aspect-video h-full w-full flex-col gap-2 p-2">
      <div className="flex gap-1">
        <Skeleton className="h-2 w-12 rounded-full" />
        <Skeleton className="h-2 w-10 rounded-full" />
      </div>
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-3 w-2/3" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-2 w-24" />
      </div>
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  )
}

export function CodeBlock() {
  return (
    <div className="flex aspect-video h-full w-full flex-col justify-center p-8">
      <div className="flex w-2/3 flex-col space-y-2">
        <Skeleton className="h-2 w-1/2 md:h-3" />
        <Skeleton className="h-2 w-3/4 md:h-3" />
        <Skeleton className="h-2 w-1/3 md:h-3" />
      </div>
      <div className="absolute right-8 top-8 text-right">
        <Skeleton className="h-4 w-48 md:h-6" />
        <Skeleton className="mt-2 h-2 w-32 md:h-3" />
      </div>
    </div>
  )
}

export function Terminal() {
  return (
    <div className="flex aspect-video h-full w-full flex-col p-6">
      <div className="flex h-full w-full flex-col rounded-lg border border-neutral-200">
        <div className="flex h-8 items-center space-x-2 border-b border-neutral-200 px-4">
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-3 w-3 rounded-full" />
        </div>
        <div className="flex-1 p-4">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="mt-2 h-3 w-1/2" />
          <Skeleton className="mt-4 h-4 w-2/3" />
        </div>
      </div>
    </div>
  )
}

export function TechGrid() {
  return (
    <div className="flex aspect-video h-full w-full flex-col items-center justify-center p-8">
      <Skeleton className="h-5 w-2/3 md:h-8" />
      <div className="mt-8 grid grid-cols-4 gap-4 md:gap-6">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-8 w-8 rounded-lg md:h-12 md:w-12" />
        ))}
      </div>
      <Skeleton className="mt-6 h-3 w-1/3 md:h-4" />
    </div>
  )
}

export function Architecture() {
  return (
    <div className="flex aspect-video h-full w-full items-center justify-center p-8">
      <div className="flex w-full max-w-2xl flex-col">
        <div className="flex justify-center space-x-4">
          <Skeleton className="h-8 w-24 rounded-lg md:h-12" />
          <Skeleton className="h-8 w-24 rounded-lg md:h-12" />
        </div>
        <Skeleton className="mx-auto my-4 h-8 w-1 md:h-12" />
        <div className="flex justify-center space-x-4">
          <Skeleton className="h-8 w-32 rounded-lg md:h-12" />
        </div>
        <Skeleton className="mx-auto my-4 h-8 w-1 md:h-12" />
        <div className="flex justify-center space-x-4">
          <Skeleton className="h-8 w-24 rounded-lg md:h-12" />
          <Skeleton className="h-8 w-24 rounded-lg md:h-12" />
          <Skeleton className="h-8 w-24 rounded-lg md:h-12" />
        </div>
      </div>
    </div>
  )
}
