import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"

import { getFontsFromTemplate, getFontUrl, FontFamily, FontWeight } from "@/lib/fonts"
import { templateSchema } from "@/lib/templates"
import { templates } from "@/components/templates"

export const runtime = "edge"

// Additional fonts needed by templates but not in params
const additionalFonts: { family: FontFamily; weight: FontWeight }[] = [
  { family: "noto-sans", weight: 400 }, // For star symbols
]

export const POST = async (request: NextRequest) => {
  const body = await request.json()

  const template = templateSchema.parse(body)
  const fontsFromParams = getFontsFromTemplate(template.params)
  
  // Merge with additional fonts, avoiding duplicates
  const fonts = [...fontsFromParams]
  for (const additional of additionalFonts) {
    if (!fonts.find(f => f.family === additional.family && f.weight === additional.weight)) {
      fonts.push(additional)
    }
  }
  
  const fontsResponses = await Promise.all(
    fonts.map((f) =>
      // Next.js automatically caches fetch requests
      fetch(getFontUrl({ family: f.family, weight: f.weight }))
    )
  )
  const fontBuffers = await Promise.all(
    fontsResponses.map((res) => res.arrayBuffer())
  )

  const { Template } = templates[template.name]

  const response = new ImageResponse(
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
      fonts: fonts.map((f, i) => {
        return {
          name: f.family,
          weight: f.weight,
          data: fontBuffers[i],
          style: "normal",
        }
      }),
    }
  )

  return response
}
