import { SITE_NAME } from "@/config/site"
import { absoluteUrl } from "@/lib/url"

interface Props {
  style?: React.CSSProperties
}

export function Watermark({ style }: Props) {
  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        ...style,
      }}
    >
      <img
        src={absoluteUrl("/assets/watermark.svg")}
        alt={SITE_NAME}
        style={{
          // watermark svg has a 2.7 aspect ratio
          width: "8.1rem",
          height: "3rem",
        }}
      />
    </div>
  )
}
