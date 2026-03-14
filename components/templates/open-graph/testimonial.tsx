import { patterns } from "@/lib/patterns"
import { toBackgroundShorthand } from "@/lib/templates/elements/background"
import { TestimonialTemplate } from "@/lib/templates/open-graph"
import { absoluteUrl } from "@/lib/url"

import { Watermark } from "../elements/watermark"

export const Template = ({
  template,
  renderWatermark,
}: {
  template: TestimonialTemplate
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
      padding: "52px",
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

    <div style={{ display: "flex", justifyContent: "space-between", gap: "42px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "28px", flex: 1 }}>
        <div
          style={{
            fontFamily: template.params.quote.fontFamily,
            fontWeight: template.params.quote.fontWeight,
            fontSize: `${template.params.quote.fontSize}px`,
            color: template.params.quote.color,
            lineHeight: "1.35",
            display: "flex",
          }}
        >
          &ldquo;{template.params.quote.text}&rdquo;
        </div>

        {template.params.rating.show && (
          <div style={{ display: "flex", color: template.params.accentColor, fontSize: "28px", gap: "6px" }}>
            {Array.from({ length: Math.max(1, Math.min(5, Math.round(template.params.rating.score))) }).map((_, index) => (
              <div key={index} style={{ display: "flex" }}>★</div>
            ))}
          </div>
        )}
      </div>

      {template.params.authorAvatar.url && (
        <img
          alt=""
          src={template.params.authorAvatar.url}
          style={{ width: "170px", height: "170px", borderRadius: "9999px", border: `6px solid ${template.params.accentColor}` }}
        />
      )}
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <div
        style={{
          fontFamily: template.params.authorName.fontFamily,
          fontWeight: template.params.authorName.fontWeight,
          fontSize: `${template.params.authorName.fontSize}px`,
          color: template.params.authorName.color,
        }}
      >
        {template.params.authorName.text}
      </div>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <div
          style={{
            fontFamily: template.params.authorTitle.fontFamily,
            fontWeight: template.params.authorTitle.fontWeight,
            fontSize: `${template.params.authorTitle.fontSize}px`,
            color: template.params.authorTitle.color,
          }}
        >
          {template.params.authorTitle.text}
        </div>
        <div style={{ width: "6px", height: "6px", borderRadius: "9999px", background: template.params.accentColor }} />
        <div
          style={{
            fontFamily: template.params.authorCompany.fontFamily,
            fontWeight: template.params.authorCompany.fontWeight,
            fontSize: `${template.params.authorCompany.fontSize}px`,
            color: template.params.authorCompany.color,
          }}
        >
          {template.params.authorCompany.text}
        </div>
      </div>
      <div
        style={{
          marginTop: "10px",
          fontFamily: template.params.productName.fontFamily,
          fontWeight: template.params.productName.fontWeight,
          fontSize: `${template.params.productName.fontSize}px`,
          color: template.params.productName.color,
        }}
      >
        {template.params.productName.text}
      </div>
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
