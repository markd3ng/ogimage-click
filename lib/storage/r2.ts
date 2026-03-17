import { HeadObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3"

const getRequiredEnv = (name: keyof NodeJS.ProcessEnv) => {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

const endpoint = () => getRequiredEnv("R2_ENDPOINT")
const bucket = () => getRequiredEnv("R2_BUCKET")
const accessKeyId = () => getRequiredEnv("R2_ACCESS_KEY_ID")
const secretAccessKey = () => getRequiredEnv("R2_SECRET_ACCESS_KEY")
const region = () => process.env.R2_REGION || "auto"

const getClient = (() => {
  let client: S3Client | null = null
  return () => {
    if (!client) {
      client = new S3Client({
        endpoint: endpoint(),
        region: region(),
        credentials: {
          accessKeyId: accessKeyId(),
          secretAccessKey: secretAccessKey(),
        },
        forcePathStyle: true,
      })
    }
    return client
  }
})()

export const objectExists = async (key: string) => {
  try {
    await getClient().send(
      new HeadObjectCommand({
        Bucket: bucket(),
        Key: key,
      })
    )
    return true
  } catch {
    return false
  }
}

type UploadObjectInput = {
  key: string
  body: Buffer
  contentType: string
  cacheControl: string
}

export const uploadObject = async ({ key, body, contentType, cacheControl }: UploadObjectInput) => {
  await getClient().send(
    new PutObjectCommand({
      Bucket: bucket(),
      Key: key,
      Body: body,
      ContentType: contentType,
      CacheControl: cacheControl,
    })
  )
}

export const getPublicObjectUrl = (key: string) => {
  const baseUrl = getRequiredEnv("R2_PUBLIC_BASE_URL").replace(/\/$/, "")
  return `${baseUrl}/${key}`
}
