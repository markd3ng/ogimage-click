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
      background: toBackgroundShorthand(template.background),
      padding: "60px",
    }}
  >
    {/* Background effects */}
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

    {/* Left sidebar - Author info */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "280px",
        gap: "16px",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Avatar */}
      {template.params.authorAvatar.url && (
        <img
          alt=""
          src={template.params.authorAvatar.url}
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "9999px",
            objectFit: "cover",
          }}
        />
      )}

      {/* Author Name */}
      <div
        style={{
          fontFamily: template.params.authorName.fontFamily,
          fontWeight: template.params.authorName.fontWeight,
          fontSize: `${template.params.authorName.fontSize}px`,
          color: template.params.authorName.color,
          marginTop: "8px",
        }}
      >
        {template.params.authorName.text}
      </div>

      {/* Author Title */}
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

      {/* Author Company (blue) */}
      <div
        style={{
          fontFamily: template.params.authorCompany.fontFamily,
          fontWeight: template.params.authorCompany.fontWeight,
          fontSize: `${template.params.authorCompany.fontSize}px`,
          color: template.params.accentColor,
        }}
      >
        {template.params.authorCompany.text}
      </div>

      {/* Rating Stars */}
      {template.params.rating.show && (
        <div
          style={{
            display: "flex",
            gap: "4px",
            marginTop: "8px",
          }}
        >
          {Array.from({
            length: Math.max(1, Math.min(5, Math.round(template.params.rating.score))),
          }).map((_, index) => (
            <svg
              key={index}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="#f59e0b"
              style={{ display: "flex" }}
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
      )}

      {/* Spacer to push product name to bottom */}
      <div style={{ flex: 1 }} />

      {/* Product Name Button */}
      <div
        style={{
          fontFamily: template.params.productName.fontFamily,
          fontWeight: template.params.productName.fontWeight,
          fontSize: `${template.params.productName.fontSize}px`,
          color: template.params.productName.color,
          background: "rgba(59, 130, 246, 0.1)",
          padding: "12px 24px",
          borderRadius: "8px",
          border: `1px solid ${template.params.accentColor}`,
        }}
      >
        {template.params.productName.text}
      </div>
    </div>

    {/* Right content - Quote */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        paddingLeft: "60px",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Quote text */}
      <div
        style={{
          fontFamily: template.params.quote.fontFamily,
          fontWeight: template.params.quote.fontWeight,
          fontSize: `${template.params.quote.fontSize}px`,
          color: template.params.quote.color,
          lineHeight: "1.5",
          flex: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        {template.params.quote.text}
      </div>

      {/* Signature with line */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "2px",
            background: template.params.accentColor,
          }}
        />
        <div
          style={{
            fontFamily: template.params.authorName.fontFamily,
            fontWeight: 500,
            fontSize: "18px",
            color: template.params.accentColor,
          }}
        >
          {template.params.authorName.text}
        </div>
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
