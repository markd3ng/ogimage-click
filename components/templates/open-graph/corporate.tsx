import { patterns } from "@/lib/patterns"
import { toBackgroundShorthand } from "@/lib/templates/elements/background"
import { CorporateTemplate } from "@/lib/templates/open-graph"
import { absoluteUrl } from "@/lib/url"

import { Watermark } from "../elements/watermark"

export const Template = ({
  template,
  renderWatermark,
}: {
  template: CorporateTemplate
  renderWatermark: boolean
}) => (
  <div
    style={{
      width: template.canvas.width,
      height: template.canvas.height,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      background: toBackgroundShorthand(template.background),
      padding: "56px",
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

    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <div
          style={{
            fontFamily: template.params.companyName.fontFamily,
            fontWeight: template.params.companyName.fontWeight,
            fontSize: `${template.params.companyName.fontSize}px`,
            color: template.params.companyName.color,
          }}
        >
          {template.params.companyName.text}
        </div>
        <div
          style={{
            fontFamily: template.params.tagline.fontFamily,
            fontWeight: template.params.tagline.fontWeight,
            fontSize: `${template.params.tagline.fontSize}px`,
            color: template.params.tagline.color,
          }}
        >
          {template.params.tagline.text}
        </div>
      </div>

      {template.params.logo.url && (
        <img
          alt=""
          src={template.params.logo.url}
          style={{
            width: "84px",
            height: "84px",
            borderRadius: "16px",
            border: `4px solid ${template.params.brandColor}`,
          }}
        />
      )}
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "900px" }}>
      <div
        style={{
          fontFamily: template.params.title.fontFamily,
          fontWeight: template.params.title.fontWeight,
          fontSize: `${template.params.title.fontSize}px`,
          color: template.params.title.color,
          letterSpacing: "-0.02em",
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

    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: "14px",
        background: template.params.brandColor,
      }}
    />

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
