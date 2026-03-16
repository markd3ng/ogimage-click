import { toBackgroundShorthand } from "@/lib/templates/elements/background"
import { MinimalTemplate } from "@/lib/templates/blog"
import { absoluteUrl } from "@/lib/url"

import { Watermark } from "../elements/watermark"

export const Template = ({
  template,
  renderWatermark,
}: {
  template: MinimalTemplate
  renderWatermark: boolean
}) => {
  const spacingMap = {
    compact: "8px",
    normal: "14px",
    relaxed: "22px",
  } as const

  return (
    <div
      style={{
        width: template.canvas.width,
        height: template.canvas.height,
        background: toBackgroundShorthand(template.background),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: template.params.layout === "left" ? "flex-start" : "center",
        textAlign: template.params.layout === "left" ? "left" : "center",
        padding: "64px",
        gap: spacingMap[template.params.spacing],
      }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          inset: 0,
          filter: "brightness(100%) contrast(150%)",
          opacity: template.background.noise,
          backgroundImage: `url('${absoluteUrl("/noise.svg")}')`,
          backgroundRepeat: "repeat",
        }}
      />

      {template.params.logo.url && (
        <img
          alt=""
          src={template.params.logo.url}
          style={{ width: "72px", height: "72px", marginBottom: "8px" }}
        />
      )}

      {template.params.accentElement === "line" && (
        <div
          style={{
            width: "120px",
            height: "4px",
            borderRadius: "9999px",
            background: template.params.accentColor,
          }}
        />
      )}
      {template.params.accentElement === "dot" && (
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "9999px",
            background: template.params.accentColor,
          }}
        />
      )}

      <div
        style={{
          fontFamily: template.params.title.fontFamily,
          fontWeight: template.params.title.fontWeight,
          fontSize: `${template.params.title.fontSize}px`,
          color: template.params.title.color,
          lineHeight: "1.2",
          maxWidth: "980px",
        }}
      >
        {template.params.title.text}
      </div>

      <div
        style={{
          fontFamily: template.params.subtitle.fontFamily,
          fontWeight: template.params.subtitle.fontWeight,
          fontSize: `${template.params.subtitle.fontSize}px`,
          color: template.params.subtitle.color,
          maxWidth: "900px",
        }}
      >
        {template.params.subtitle.text}
      </div>

      <div style={{ display: "flex", gap: "10px", alignItems: "center", marginTop: "8px" }}>
        <div
          style={{
            fontFamily: template.params.author.fontFamily,
            fontWeight: template.params.author.fontWeight,
            fontSize: `${template.params.author.fontSize}px`,
            color: template.params.author.color,
          }}
        >
          {template.params.author.text}
        </div>
        <div style={{ color: "#9ca3af" }}>•</div>
        <div
          style={{
            fontFamily: template.params.date.fontFamily,
            fontWeight: template.params.date.fontWeight,
            fontSize: `${template.params.date.fontSize}px`,
            color: template.params.date.color,
          }}
        >
          {template.params.date.text}
        </div>
      </div>

      {renderWatermark && (
        <Watermark
          style={{
            right: "2rem",
            top: "2rem",
          }}
        />
      )}
    </div>
  )
}
