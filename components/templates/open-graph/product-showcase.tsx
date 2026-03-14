import { patterns } from "@/lib/patterns"
import { toBackgroundShorthand } from "@/lib/templates/elements/background"
import { ProductShowcaseTemplate } from "@/lib/templates/open-graph"
import { absoluteUrl } from "@/lib/url"

import { Watermark } from "../elements/watermark"

export const Template = ({
  template,
  renderWatermark,
}: {
  template: ProductShowcaseTemplate
  renderWatermark: boolean
}) => (
  <div
    style={{
      width: template.canvas.width,
      height: template.canvas.height,
      display: "flex",
      background: toBackgroundShorthand(template.background),
      padding: "44px",
      justifyContent: "space-between",
      gap: "32px",
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

    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "60%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            background: template.params.accentColor,
            color: template.params.badge.color,
            fontFamily: template.params.badge.fontFamily,
            fontWeight: template.params.badge.fontWeight,
            fontSize: `${template.params.badge.fontSize}px`,
            borderRadius: "9999px",
            padding: "8px 14px",
          }}
        >
          {template.params.badge.text}
        </div>
        {template.params.brandLogo.url && (
          <img alt="" src={template.params.brandLogo.url} style={{ width: "44px", height: "44px" }} />
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div
          style={{
            fontFamily: template.params.productName.fontFamily,
            fontWeight: template.params.productName.fontWeight,
            fontSize: `${template.params.productName.fontSize}px`,
            color: template.params.productName.color,
            lineHeight: "1.2",
          }}
        >
          {template.params.productName.text}
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
          <div
            style={{
              fontFamily: template.params.price.fontFamily,
              fontWeight: template.params.price.fontWeight,
              fontSize: `${template.params.price.fontSize}px`,
              color: template.params.price.color,
            }}
          >
            {template.params.price.text}
          </div>
          <div
            style={{
              fontFamily: template.params.originalPrice.fontFamily,
              fontWeight: template.params.originalPrice.fontWeight,
              fontSize: `${template.params.originalPrice.fontSize}px`,
              color: template.params.originalPrice.color,
              textDecoration: "line-through",
            }}
          >
            {template.params.originalPrice.text}
          </div>
        </div>

        {template.params.rating.show && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "2px" }}>
            <div style={{ color: template.params.accentColor, fontSize: "22px", display: "flex" }}>{"\u2605"}</div>
            <div style={{ color: "#374151", fontSize: "20px", fontWeight: 600, display: "flex" }}>{template.params.rating.score}</div>
            <div style={{ color: "#6b7280", fontSize: "18px", display: "flex" }}>({template.params.rating.total})</div>
          </div>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {template.params.features.map((feature, index) => (
          <div key={index} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "9999px", background: template.params.accentColor }} />
            <div
              style={{
                fontFamily: feature.fontFamily,
                fontWeight: feature.fontWeight,
                fontSize: `${feature.fontSize}px`,
                color: feature.color,
              }}
            >
              {feature.text}
            </div>
          </div>
        ))}
      </div>
    </div>

    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "40%" }}>
      {template.params.productImage.url && (
        <img
          alt=""
          src={template.params.productImage.url}
          style={{
            width: "100%",
            maxHeight: "520px",
            objectFit: "contain",
            borderRadius: "20px",
            border: "1px solid #e5e7eb",
          }}
        />
      )}
    </div>

    {renderWatermark && (
      <Watermark
        style={{
          bottom: "2rem",
          right: "2rem",
        }}
      />
    )}
  </div>
)
