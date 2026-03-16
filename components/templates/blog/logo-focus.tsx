import { toBackgroundShorthand } from "@/lib/templates/elements/background"
import { LogoFocusTemplate } from "@/lib/templates/blog"
import { absoluteUrl } from "@/lib/url"

import { Watermark } from "../elements/watermark"

export const Template = ({
  template,
  renderWatermark,
}: {
  template: LogoFocusTemplate
  renderWatermark: boolean
}) => {
  const logoSizeMap = {
    small: "88px",
    medium: "120px",
    large: "156px",
  } as const
  const isHorizontal = template.params.layout === "horizontal"

  return (
    <div
      style={{
        width: template.canvas.width,
        height: template.canvas.height,
        background: toBackgroundShorthand(template.background),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "54px",
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

      <div
        style={{
          width: "100%",
          border: `2px solid ${template.params.borderColor}`,
          borderRadius: "26px",
          padding: "40px",
          display: "flex",
          flexDirection: isHorizontal ? "row" : "column",
          alignItems: template.params.alignment === "left" ? "flex-start" : "center",
          textAlign: template.params.alignment === "left" ? "left" : "center",
          gap:
            template.params.spacing === "compact"
              ? "16px"
              : template.params.spacing === "relaxed"
                ? "30px"
                : "22px",
          background: "rgba(255,255,255,0.82)",
        }}
      >
        {template.params.logo.url && (
          <img
            alt=""
            src={template.params.logo.url}
            style={{
              width: logoSizeMap[template.params.logoSize],
              height: logoSizeMap[template.params.logoSize],
              borderRadius: "20px",
              border: `4px solid ${template.params.brandColor}`,
            }}
          />
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "14px", flex: 1 }}>
          <div
            style={{
              fontFamily: template.params.title.fontFamily,
              fontWeight: template.params.title.fontWeight,
              fontSize: `${template.params.title.fontSize}px`,
              color: template.params.textColor,
            }}
          >
            {template.params.title.text}
          </div>
          <div
            style={{
              fontFamily: template.params.description.fontFamily,
              fontWeight: template.params.description.fontWeight,
              fontSize: `${template.params.description.fontSize}px`,
              color: template.params.description.color,
              lineHeight: "1.45",
            }}
          >
            {template.params.description.text}
          </div>
        </div>
      </div>

      {renderWatermark && (
        <Watermark
          style={{
            right: "2rem",
            bottom: "2rem",
          }}
        />
      )}
    </div>
  )
}
