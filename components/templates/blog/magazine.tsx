import { patterns } from "@/lib/patterns"
import { toBackgroundShorthand } from "@/lib/templates/elements/background"
import { MagazineTemplate } from "@/lib/templates/blog"
import { absoluteUrl } from "@/lib/url"

import { Watermark } from "../elements/watermark"

export const Template = ({
  template,
  renderWatermark,
}: {
  template: MagazineTemplate
  renderWatermark: boolean
}) => {
  const reverse = template.params.layoutStyle === "right-content"

  return (
    <div
      style={{
        width: template.canvas.width,
        height: template.canvas.height,
        background: toBackgroundShorthand(template.background),
        display: "flex",
        padding: "44px",
        gap: "28px",
        flexDirection: reverse ? "row-reverse" : "row",
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

      {template.background.gridOverlay && (
        <div
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            backgroundImage: `url('${patterns[template.background.gridOverlay.pattern].svg({ color: template.background.gridOverlay.color, opacity: template.background.gridOverlay.opacity })}')`,
            maskImage:
              template.background.gridOverlay.blurRadius > 0
                ? `radial-gradient(rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) ${100 - template.background.gridOverlay.blurRadius}%)`
                : "none",
          }}
        />
      )}

      <div style={{ width: "58%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div
            style={{
              color: template.params.accentColor,
              fontFamily: template.params.category.fontFamily,
              fontWeight: template.params.category.fontWeight,
              fontSize: `${template.params.category.fontSize}px`,
            }}
          >
            {template.params.category.text}
          </div>
          <div
            style={{
              fontFamily: template.params.title.fontFamily,
              fontWeight: template.params.title.fontWeight,
              fontSize: `${template.params.title.fontSize}px`,
              color: template.params.title.color,
              lineHeight: "1.2",
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
            }}
          >
            {template.params.subtitle.text}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {template.params.logo.url && (
              <img alt="" src={template.params.logo.url} style={{ width: "40px", height: "40px" }} />
            )}
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
          </div>

          <div style={{ display: "flex", gap: "8px", color: "#6b7280" }}>
            <div
              style={{
                fontFamily: template.params.publishDate.fontFamily,
                fontWeight: template.params.publishDate.fontWeight,
                fontSize: `${template.params.publishDate.fontSize}px`,
                color: template.params.publishDate.color,
              }}
            >
              {template.params.publishDate.text}
            </div>
            <div>•</div>
            <div
              style={{
                fontFamily: template.params.readTime.fontFamily,
                fontWeight: template.params.readTime.fontWeight,
                fontSize: `${template.params.readTime.fontSize}px`,
                color: template.params.readTime.color,
              }}
            >
              {template.params.readTime.text}
            </div>
          </div>
        </div>
      </div>

      <div style={{ width: "42%", display: "flex", alignItems: "center" }}>
        {template.params.featuredImage.url && (
          <img
            alt=""
            src={template.params.featuredImage.url}
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "22px" }}
          />
        )}
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
