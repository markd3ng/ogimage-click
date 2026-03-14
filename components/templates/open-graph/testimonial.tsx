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
      justifyContent: "space-between",
      alignItems: "flex-start",
      background: toBackgroundShorthand(template.background),
      padding: "60px 80px",
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
        width: "auto",
        gap: "12px",
      }}
    >
      {/* Avatar */}
      {template.params.authorAvatar.url && (
        <img
          alt=""
          src={template.params.authorAvatar.url}
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #ffffff",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        />
      )}

      {/* Author Name */}
      <div
        style={{
          display: "flex",
          fontFamily: template.params.authorName.fontFamily,
          fontWeight: 700,
          fontSize: "18px",
          color: "#333333",
          marginTop: "8px",
        }}
      >
        {template.params.authorName.text}
      </div>

      {/* Title & Company - Stacked and centered */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            fontFamily: template.params.authorTitle.fontFamily,
            fontWeight: 400,
            fontSize: "14px",
            color: "#777777",
          }}
        >
          {template.params.authorTitle.text}
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: template.params.authorCompany.fontFamily,
            fontWeight: 600,
            fontSize: "14px",
            color: template.params.accentColor,
          }}
        >
          {template.params.authorCompany.text}
        </div>
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
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="#ffbf00"
              style={{ display: "flex" }}
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
      )}

      {/* Spacer to push product name to bottom */}
      <div style={{ flex: 1, minHeight: "60px" }} />

      {/* Product Name Button */}
      <div
        style={{
          display: "flex",
          fontFamily: template.params.productName.fontFamily,
          fontWeight: 600,
          fontSize: "14px",
          color: template.params.accentColor,
          background: "#ffffff",
          padding: "10px 30px",
          borderRadius: "8px",
          border: "1px solid #d1d9e6",
          boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
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
        justifyContent: "center",
        width: "60%",
        paddingLeft: "60px",
        height: "100%",
      }}
    >
      {/* Quote text */}
      <div
        style={{
          display: "flex",
          fontFamily: template.params.quote.fontFamily,
          fontWeight: 300,
          fontSize: "26px",
          color: "#333333",
          lineHeight: "1.6",
        }}
      >
        {template.params.quote.text}
      </div>

      {/* Signature with line */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "40px",
            height: "1px",
            background: "#333333",
          }}
        />
        <div
          style={{
            display: "flex",
            fontFamily: template.params.authorName.fontFamily,
            fontWeight: 400,
            fontSize: "16px",
            color: "#777777",
          }}
        >
          — {template.params.authorName.text}
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
