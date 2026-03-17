/// <reference types="node" />

declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_BASE_URL: string
    NEXT_PUBLIC_API_URL: string
    ENABLE_R2_STORAGE?: string
    R2_ENDPOINT?: string
    R2_REGION?: string
    R2_BUCKET?: string
    R2_ACCESS_KEY_ID?: string
    R2_SECRET_ACCESS_KEY?: string
    R2_PUBLIC_BASE_URL?: string
  }
}

