import { patterns } from "@/lib/patterns"
import { toBackgroundShorthand } from "@/lib/templates/elements/background"
import { RichTemplate } from "@/lib/templates/blog"
import { absoluteUrl } from "@/lib/url"

import { Watermark } from "../elements/watermark"

export const Template = ({
  template,
  renderWatermark,
}: {
  template: RichTemplate
  renderWatermark: boolean
}) => (
  <div
    style={{
      width: template.canvas.width,
      height: template.canvas.height,
      background: toBackgroundShorthand(template.background),
      display: "flex",
      padding: "38px",
      gap: "24px",
      flexDirection: template.params.layout === "split" ? "row" : "column",
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

    <div style={{ display: "flex", flexDirection: "column", gap: "14px", flex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            background: template.params.primaryColor,
            color: "white",
            borderRadius: "9999px",
            padding: "6px 12px",
            fontFamily: template.params.category.fontFamily,
            fontWeight: template.params.category.fontWeight,
            fontSize: `${template.params.category.fontSize}px`,
          }}
        >
          {template.params.category.text}
        </div>
        {template.params.showTags &&
          template.params.tags.slice(0, 3).map((tag, index) => (
            <div
              key={index}
              style={{
                border: `1px solid ${template.params.secondaryColor}`,
                color: template.params.secondaryColor,
                borderRadius: "9999px",
                padding: "5px 10px",
                fontSize: "13px",
              }}
            >
              {tag}
            </div>
          ))}
      </div>

      <div
        style={{
          fontFamily: template.params.title.fontFamily,
          fontWeight: template.params.title.fontWeight,
          fontSize: `${template.params.title.fontSize}px`,
          color: template.params.title.color,
          lineHeight: "1.15",
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
          lineHeight: "1.35",
          maxWidth: "760px",
        }}
      >
        {template.params.subtitle.text}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "8px" }}>
        {template.params.author.avatar.url && (
          <img
            alt=""
            src={template.params.author.avatar.url}
            style={{ width: "52px", height: "52px", borderRadius: "9999px" }}
          />
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <div
            style={{
              fontFamily: template.params.author.name.fontFamily,
              fontWeight: template.params.author.name.fontWeight,
              fontSize: `${template.params.author.name.fontSize}px`,
              color: template.params.author.name.color,
            }}
          >
            {template.params.author.name.text}
          </div>
          <div
            style={{
              fontFamily: template.params.author.title.fontFamily,
              fontWeight: template.params.author.title.fontWeight,
              fontSize: `${template.params.author.title.fontSize}px`,
              color: template.params.author.title.color,
            }}
          >
            {template.params.author.title.text}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#6b7280" }}>
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

      {template.params.showStats && (
        <div style={{ display: "flex", gap: "18px", marginTop: "6px", color: "#374151" }}>
          <div style={{ display: "flex" }}>👁 {template.params.stats.views}</div>
          <div style={{ display: "flex" }}>♥ {template.params.stats.likes}</div>
          <div style={{ display: "flex" }}>💬 {template.params.stats.comments}</div>
        </div>
      )}
    </div>

    {template.params.featuredImage.url && (
      <div style={{ width: template.params.layout === "split" ? "42%" : "100%", display: "flex" }}>
        <img
          alt=""
          src={template.params.featuredImage.url}
          style={{
            width: "100%",
            maxHeight: template.params.layout === "split" ? "100%" : "200px",
            objectFit: "cover",
            borderRadius: "18px",
          }}
        />
      </div>
    )}

    {template.params.logo.url && (
      <img
        alt=""
        src={template.params.logo.url}
        style={{
          width: "36px",
          height: "36px",
          position: "absolute",
          top: "26px",
          right: "26px",
        }}
      />
    )}

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
   