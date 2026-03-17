import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"
import { ZodError } from "zod"

import { templates } from "@/components/templates"
import { FontFamily, FontWeight, getFontUrl, getFontsFromTemplate } from "@/lib/fonts"
import { TemplateName, templateDefaults, templateSchema } from "@/lib/templates"
import { buildImageObjectKey } from "@/lib/storage/object-key"
import { getPublicObjectUrl, objectExists, uploadObject } from "@/lib/storage/r2"

export const runtime = "nodejs"

const CACHE_MAX_AGE = 60 * 60 * 24 * 7
const API_CACHE_CONTROL = `public, max-age=0, s-maxage=${CACHE_MAX_AGE}, stale-while-revalidate=${CACHE_MAX_AGE}`
const OBJECT_CACHE_CONTROL = `public, max-age=${CACHE_MAX_AGE}, immutable`

const isR2Enabled = () => process.env.ENABLE_R2_STORAGE === "true"

type ResponseMode = "json" | "redirect"

const additionalFonts: { family: FontFamily; weight: FontWeight }[] = [{ family: "noto-sans", weight: 400 }]

const parseResponseMode = (request: NextRequest): ResponseMode => {
  const mode = request.nextUrl.searchParams.get("mode")
  return mode === "redirect" ? "redirect" : "json"
}

const applyApiCacheHeader = (response: Response) => {
  response.headers.set("Cache-Control", API_CACHE_CONTROL)
  return response
}

const jsonResponse = (payload: Record<string, unknown>, status: number = 200) => {
  return applyApiCacheHeader(
    new Response(JSON.stringify(payload), {
      status,
      headers: { "Content-Type": "application/json" },
    })
  )
}

const redirectResponse = (url: string) => {
  return applyApiCacheHeader(Response.redirect(url, 302))
}

const imageSuccessResponse = (url: string, key: string, cached: boolean, mode: ResponseMode) => {
  if (mode === "redirect") {
    return redirectResponse(url)
  }

  return jsonResponse({ url, key, cached })
}

const toTemplateDataFromGet = (request: NextRequest) => {
  const { searchParams } = request.nextUrl
  const templateName = searchParams.get("template") as TemplateName

  if (!templateName || !templateDefaults[templateName]) {
    throw new Error("INVALID_TEMPLATE")
  }

  const templateData = JSON.parse(JSON.stringify(templateDefaults[templateName]))

  searchParams.forEach((value, key) => {
    if (key === "template" || key === "mode") return

    const keys = key.split(".")
    let current: any = templateData.params

    for (let i = 0; i < keys.length - 1; i++) {
      if (current[keys[i]] !== undefined) {
        current = current[keys[i]]
      }
    }

    const lastKey = keys[keys.length - 1]
    if (current !== undefined && current[lastKey] !== undefined) {
      if (lastKey === "fontSize" || lastKey === "fontWeight" || lastKey === "width" || lastKey === "height") {
        current[lastKey] = parseInt(value, 10)
      } else if (lastKey === "noise" || lastKey === "opacity" || lastKey === "blurRadius") {
        current[lastKey] = parseFloat(value)
      } else {
        current[lastKey] = value
      }
    }
  })

  return templateData
}

const renderImageBuffer = async (templateData: unknown) => {
  const template = templateSchema.parse(templateData)
  const fontsFromParams = getFontsFromTemplate(template.params)

  const fonts = [...fontsFromParams]
  for (const additional of additionalFonts) {
    if (!fonts.find(f => f.family === additional.family && f.weight === additional.weight)) {
      fonts.push(additional)
    }
  }

  const fontsResponses = await Promise.all(fonts.map(f => fetch(getFontUrl({ family: f.family, weight: f.weight }))))
  const fontBuffers = await Promise.all(fontsResponses.map(res => res.arrayBuffer()))

  const { Template } = templates[template.name]
  const imageResponse = new ImageResponse(
    (
      <Template
        // @ts-ignore
        template={template}
        renderWatermark={false}
      />
    ),
    {
      width: template.canvas.width,
      height: template.canvas.height,
      fonts: fonts.map((f, i) => ({
        name: f.family,
        weight: f.weight,
        data: fontBuffers[i],
        style: "normal",
      })),
    }
  )

  return Buffer.from(await imageResponse.arrayBuffer())
}

const renderAndReturnDirectly = async (templateData: unknown) => {
  const parsedTemplate = templateSchema.parse(templateData)
  const imageBuffer = await renderImageBuffer(parsedTemplate)
  const response = new Response(imageBuffer, {
    status: 200,
    headers: { "Content-Type": "image/png" },
  })
  return applyApiCacheHeader(response)
}

const persistAndRespond = async (templateData: unknown, mode: ResponseMode) => {
  const parsedTemplate = templateSchema.parse(templateData)
  const key = buildImageObjectKey(parsedTemplate)
  const url = getPublicObjectUrl(key)

  if (await objectExists(key)) {
    return imageSuccessResponse(url, key, true, mode)
  }

  const imageBuffer = await renderImageBuffer(parsedTemplate)
  await uploadObject({
    key,
    body: imageBuffer,
    contentType: "image/png",
    cacheControl: OBJECT_CACHE_CONTROL,
  })

  return imageSuccessResponse(url, key, false, mode)
}

const handleError = (error: unknown) => {
  if (error instanceof ZodError) {
    return jsonResponse({ error: "Invalid template payload", issues: error.issues }, 400)
  }

  if (error instanceof Error && error.message === "INVALID_TEMPLATE") {
    return jsonResponse(
      {
        error: "Invalid or missing template parameter",
        availableTemplates: Object.keys(templateDefaults),
      },
      400
    )
  }

  const message = error instanceof Error ? error.message : "Unknown error"
  return jsonResponse({ error: "Failed to generate image", message }, 500)
}

export const GET = async (request: NextRequest) => {
  try {
    const templateData = toTemplateDataFromGet(request)
    if (!isR2Enabled()) {
      return await renderAndReturnDirectly(templateData)
    }
    const mode = parseResponseMode(request)
    return await persistAndRespond(templateData, mode)
  } catch (error) {
    return handleError(error)
  }
}

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json()
    if (!isR2Enabled()) {
      return await renderAndReturnDirectly(body)
    }
    const mode = parseResponseMode(request)
    return await persistAndRespond(body, mode)
  } catch (error) {
    return handleError(error)
  }
}
