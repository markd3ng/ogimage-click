# ogimage.click

A free and open source tool for generating beautiful Open Graph images, Twitter/X headers, and blog covers - no signup required.

## 🌟 Features

- **Multiple Template Types**
  - Open Graph Images (1200 x 630)
  - Twitter/X Headers (1500 x 500)
  - Blog Cover Images (1200 x 630)

- **Rich Customization**
  - Custom backgrounds (solid colors & gradients)
  - Grid and noise overlays
  - Logo upload support
  - Professional typography
  - Multiple export formats (PNG, JPEG, WebP)

- **Developer Experience**
  - REST API for programmatic image generation
  - Ready-to-use HTML meta tags
  - Next.js App Router integration
  - Real-time preview
  - No authentication required
  - Free and open source

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/markd3ng/ogimage-click.git
cd ogimage-click
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables in `.env.local`:
```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_CLARITY_ID=your_clarity_site_id

# Cloudflare R2 (S3-compatible)
R2_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
R2_REGION=auto
R2_BUCKET=og-images
R2_ACCESS_KEY_ID=your_r2_access_key_id
R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
R2_PUBLIC_BASE_URL=https://cdn.example.com
```


4. Start the development server:
```bash
pnpm dev
```

## ⚙️ Configuration

### Site Information

Edit `config/site.ts` to customize your site:

```typescript
export const SITE_OWNER = "Your Name";
export const BASE_URL = "https://yourdomain.com";
export const SITE_NAME = "YourSiteName";  // Used in templates and UI
export const TWITTER_URL = "https://x.com/your_handle";
export const BLUESKY_URL = "https://bsky.app/profile/your_handle";

const baseSiteConfig = {
  name: "Your Site Name",
  title: "Your Site Title",
  description: "Your site description",
  // ... other config
}
```

**Note:** `SITE_NAME` is used throughout the app (templates, watermark, homepage, etc.). Changing it in one place updates everywhere.

### Analytics (Microsoft Clarity)

This project uses Microsoft Clarity for analytics instead of Google Analytics.

1. Get your Clarity Site ID from [Microsoft Clarity](https://clarity.microsoft.com/)
2. Add to `.env.local`:
   ```
   NEXT_PUBLIC_CLARITY_ID=your_clarity_site_id
   ```

The tracking code is in `clarity.js` and is loaded in `app/GoogleAnalytics.tsx`.

### Blog/Guides Content

Articles are stored in `app/guides/posts/` as `.mdx` files.

**File structure:**
```
app/guides/
├── posts/                    # Article source files
│   ├── your-article.mdx
│   └── another-article.mdx
├── [slug]/                   # Dynamic article page
├── page.tsx                  # Article list page
├── utils.ts                  # MDX parsing utilities
└── layout.tsx
```

**Adding a new article:**

1. Create a new `.mdx` file in `app/guides/posts/`
2. Add frontmatter at the top:
   ```mdx
   ---
   title: Your Article Title
   publishedAt: 2025-01-15
   summary: Brief description of the article
   ---

   Your content here...
   ```
3. The article will be automatically available at `/guides/your-article-slug`

### Managing Templates

Templates are configured in `components/template-selector.tsx`.

**To hide a template** from the frontend (but keep it available via API), comment it out in the `templates` array:

```typescript
const templates = [
  // Open Graph templates
  {
    platform: "open-graph",
    name: "og:image-right",
    // ...
  },
  // {
  //   platform: "open-graph",
  //   name: "og:testimonial",  // Hidden from frontend
  //   ...
  // },
]
```

**Available templates:**

| Category | Templates |
|----------|-----------|
| Open Graph | `og:image-right`, `og:hero`, `og:logos`, `og:basic`, `og:notice`, `og:corporate`, `og:product-showcase` |
| X/Twitter Header | `x:header-basic`, `x:header-minimalist`, `x:header-logo` |
| Blog Cover | `blog:basic`, `blog:minimal`, `blog:magazine` |

## 🛠️ Tech Stack

- [Next.js 15](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Satori](https://github.com/vercel/satori)
- [Zod](https://zod.dev/)

## 📖 Usage

1. Choose a template type (Open Graph, Twitter/X Header, or Blog Cover)
2. Customize your content (text, colors, images, backgrounds)
3. Preview in real-time
4. Export in your preferred format (PNG, JPEG, WebP)
5. Use the generated meta tags in your project

### Example Meta Tags

```html
<meta property="og:title" content="Your Page Title" />
<meta property="og:description" content="Your page description" />
<meta property="og:image" content="https://yourdomain.com/og.png" />
<meta property="og:url" content="https://yourdomain.com" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://yourdomain.com/og.png" />
```

## 📚 API Documentation

### Endpoints

#### 1. POST /api/v1/images

For complex templates with full customization (JSON body).

**Request Headers:**
```
Content-Type: application/json
```

**Request Body Structure:**
```typescript
{
  name: string;           // Template ID (required)
  params: object;         // Template-specific parameters (required)
  background: object;     // Background configuration (required)
  canvas: {               // Canvas dimensions (required)
    width: number;
    height: number;
  }
}
```

**Response (Direct Mode - 默认):**
- **Content-Type**: `image/png`
- **Body**: Binary PNG image data

**Response (R2 Persist Mode):**
- `mode=redirect` → `302` 跳转到图片 URL
- 默认 → JSON: `{ url, key, cached }`

#### 2. GET /api/v1/images

For simple usage with URL parameters.

**Query Parameters:**

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `template` | string | **Required.** Template ID | `og:basic` |
| `title.text` | string | Title text | `Hello World` |
| `description.text` | string | Description text | `My description` |
| `logo.url` | string | Logo image URL | `https://example.com/logo.png` |
| `title.color` | string | Title color | `#ff0000` |
| `title.fontSize` | number | Title font size | `52` |
| `mode` | string | R2 mode only: `json` / `redirect` | `redirect` |

**Response (Direct Mode - 默认):**
- **Content-Type**: `image/png`
- **Body**: Binary PNG image data

**Response (R2 Persist Mode - JSON):**
```json
{
  "url": "https://cdn.example.com/og/og-basic/<hash>.png",
  "key": "og/og-basic/<hash>.png",
  "cached": true
}
```

**Response (R2 Persist Mode - redirect):**
- `302 Found` → `Location: https://cdn.example.com/og/og-basic/<hash>.png`

**Example URLs:**

```
# Direct mode (default)
https://ogimage.click/api/v1/images?template=og:basic&title.text=Hello%20World

# R2 JSON mode
https://ogimage.click/api/v1/images?template=og:basic&title.text=Hello%20World&mode=json

# R2 Redirect mode
https://ogimage.click/api/v1/images?template=og:basic&title.text=Hello%20World&mode=redirect
```

**HTML Usage:**

```html
<!-- Direct mode -->
<img src="https://ogimage.click/api/v1/images?template=og:basic&title.text=Hello%20World" alt="OG Image" />

<!-- R2 mode (use the returned URL) -->
<img src="https://cdn.example.com/og/og-basic/<hash>.png" alt="OG Image" />

<!-- Open Graph meta tag -->
<meta property="og:image" content="https://cdn.example.com/og/og-basic/<hash>.png" />
```

### Caching & Storage Mode

API 支持两种存储模式，通过 `ENABLE_R2_STORAGE` 环境变量切换：

| Mode | `ENABLE_R2_STORAGE` | Behavior |
|------|---------------------|----------|
| **Direct** (default) | `false` 或未设置 | 直接返回 `image/png` 二进制，不依赖外部存储 |
| **R2 Persist** | `true` | 生成图片持久化到 R2，返回 JSON URL 或 302 跳转 |

**Direct Mode (默认)**
- 无需配置 R2 环境变量
- 直接返回 PNG 图片二进制
- 缓存：`Cache-Control: public, max-age=0, s-maxage=604800, stale-while-revalidate=604800` (7 days)

**R2 Persist Mode**
- 需要完整 R2 配置
- 首次生成后持久化存储，后续直接返回已有 URL
- API 缓存 7 天 + R2 对象缓存 7 天
- 公开读、私有写（服务端凭证写入，前端用公开 URL）

**R2 CORS Note:** 如果仅在 `<img>` 标签中使用，通常无需额外 CORS 配置；如需 `fetch`/`canvas` 像素访问，需在 R2 配置允许站点域名的 `GET` 跨域规则。


---

## Templates

### Open Graph Series (1200 x 630)

| Template ID | Description |
|-------------|-------------|
| `og:image-right` | Image on the right side with text on left |
| `og:hero` | Hero-style with large title and background image |
| `og:logos` | Display multiple logos in a grid layout |
| `og:basic` | Simple template with title, description, and logo |
| `og:notice` | Notice/alert style with icon and message |
| `og:corporate` | Corporate branding with company info |
| `og:product-showcase` | Product showcase with features and pricing |

### X Header Series (1500 x 500)

| Template ID | Description |
|-------------|-------------|
| `x:header-basic` | Basic header with text |
| `x:header-minimalist` | Minimalist header design |
| `x:header-logo` | Header with logo prominently displayed |

### Blog Cover Series (1200 x 630)

| Template ID | Description |
|-------------|-------------|
| `blog:basic` | Basic blog cover with title and author |
| `blog:minimal` | Minimalist blog cover |
| `blog:magazine` | Magazine-style blog cover |

---

## Request Examples

### og:corporate

```json
{
  "name": "og:corporate",
  "params": {
    "companyName": {
      "text": "myogimage.com",
      "fontFamily": "inter",
      "fontWeight": 700,
      "fontSize": 36,
      "color": "#1e40af"
    },
    "tagline": {
      "text": "Free • Fast • Professional",
      "fontFamily": "inter",
      "fontWeight": 400,
      "fontSize": 20,
      "color": "#64748b"
    },
    "title": {
      "text": "Create beautiful OG images for free.",
      "fontFamily": "inter",
      "fontWeight": 600,
      "fontSize": 42,
      "color": "#0f172a"
    },
    "subtitle": {
      "text": "No signup required. Just design and download.",
      "fontFamily": "inter",
      "fontWeight": 400,
      "fontSize": 24,
      "color": "#475569"
    },
    "logo": {
      "url": "https://your-domain.com/logo.png"
    },
    "brandColor": "#2563eb"
  },
  "background": {
    "type": "linear-gradient",
    "direction": "to bottom right",
    "colorStops": ["#f8fafc", "#e2e8f0", "#cbd5e1"],
    "noise": 0.05,
    "gridOverlay": {
      "pattern": "grid",
      "color": "#94a3b8",
      "opacity": 0.15,
      "blurRadius": 30
    }
  },
  "canvas": {
    "width": 1200,
    "height": 630
  }
}
```

### blog:minimal

```json
{
  "name": "blog:minimal",
  "params": {
    "title": {
      "text": "Create beautiful OG images for free.",
      "fontFamily": "inter",
      "fontWeight": 300,
      "fontSize": 56,
      "color": "#111827"
    },
    "subtitle": {
      "text": "A simple guide to get started.",
      "fontFamily": "inter",
      "fontWeight": 300,
      "fontSize": 20,
      "color": "#6b7280"
    },
    "author": {
      "text": "John Doe",
      "fontFamily": "inter",
      "fontWeight": 400,
      "fontSize": 16,
      "color": "#374151"
    },
    "date": {
      "text": "Jan 10, 2026",
      "fontFamily": "inter",
      "fontWeight": 300,
      "fontSize": 14,
      "color": "#9ca3af"
    },
    "logo": {
      "url": "https://your-domain.com/logo.png"
    },
    "accentElement": "line",
    "accentColor": "#000000",
    "layout": "centered",
    "spacing": "normal"
  },
  "background": {
    "type": "color",
    "color": "#ffffff",
    "noise": 0
  },
  "canvas": {
    "width": 1200,
    "height": 630
  }
}
```

### x:header-logo

```json
{
  "name": "x:header-logo",
  "params": {
    "description": {
      "text": "Create Open Graph Images with one click",
      "fontFamily": "inter",
      "fontWeight": 600,
      "fontSize": 48,
      "color": "#030712"
    },
    "logo": {
      "url": "https://your-domain.com/logo.svg"
    }
  },
  "background": {
    "type": "linear-gradient",
    "direction": "to top right",
    "colorStops": ["rgb(249, 168, 212)", "rgb(216, 180, 254)", "rgb(129, 140, 248)"],
    "noise": 0.15
  },
  "canvas": {
    "width": 1500,
    "height": 500
  }
}
```

---

## API Usage Examples

### cURL

```bash
curl -X POST "https://your-domain.com/api/v1/images" \
  -H "Content-Type: application/json" \
  -d '{"name":"og:corporate","params":{"companyName":{"text":"My Company","fontFamily":"inter","fontWeight":700,"fontSize":36,"color":"#1e40af"},"tagline":{"text":"Innovation First","fontFamily":"inter","fontWeight":400,"fontSize":20,"color":"#64748b"},"title":{"text":"Welcome to Our Platform","fontFamily":"inter","fontWeight":600,"fontSize":42,"color":"#0f172a"},"subtitle":{"text":"Build something amazing today.","fontFamily":"inter","fontWeight":400,"fontSize":24,"color":"#475569"},"logo":{"url":"https://your-domain.com/logo.png"},"brandColor":"#2563eb"},"background":{"type":"color","color":"#ffffff","noise":0},"canvas":{"width":1200,"height":630}}'
```

### JavaScript (Fetch)

```javascript
const response = await fetch('https://your-domain.com/api/v1/images', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'og:corporate',
    params: {
      companyName: {
        text: 'My Company',
        fontFamily: 'inter',
        fontWeight: 700,
        fontSize: 36,
        color: '#1e40af',
      },
      tagline: {
        text: 'Innovation First',
        fontFamily: 'inter',
        fontWeight: 400,
        fontSize: 20,
        color: '#64748b',
      },
      title: {
        text: 'Welcome to Our Platform',
        fontFamily: 'inter',
        fontWeight: 600,
        fontSize: 42,
        color: '#0f172a',
      },
      subtitle: {
        text: 'Build something amazing today.',
        fontFamily: 'inter',
        fontWeight: 400,
        fontSize: 24,
        color: '#475569',
      },
      logo: {
        url: 'https://your-domain.com/logo.png',
      },
      brandColor: '#2563eb',
    },
    background: {
      type: 'color',
      color: '#ffffff',
      noise: 0,
    },
    canvas: {
      width: 1200,
      height: 630,
    },
  }),
});

const data = await response.json();

const img = document.createElement('img');
img.src = data.url;
document.body.appendChild(img);
```

### Next.js API Route (Dynamic OG Image URL)

```typescript
// app/api/og/route.tsx
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Hello World';

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/images?mode=redirect`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'og:corporate',
      params: {
        companyName: { text: 'My Brand', fontFamily: 'inter', fontWeight: 700, fontSize: 36, color: '#1e40af' },
        tagline: { text: '', fontFamily: 'inter', fontWeight: 400, fontSize: 20, color: '#64748b' },
        title: { text: title, fontFamily: 'inter', fontWeight: 600, fontSize: 42, color: '#0f172a' },
        subtitle: { text: '', fontFamily: 'inter', fontWeight: 400, fontSize: 24, color: '#475569' },
        logo: { url: '' },
        brandColor: '#2563eb',
      },
      background: { type: 'color', color: '#ffffff', noise: 0 },
      canvas: { width: 1200, height: 630 },
    }),
    redirect: 'manual',
  });

  const location = response.headers.get('location');
  if (!location) {
    return new Response('OG URL not found', { status: 500 });
  }

  return Response.redirect(location, 302);
}
```

---

## Background Configuration

### Solid Color

```json
{
  "type": "color",
  "color": "#ffffff",
  "noise": 0
}
```

### Linear Gradient

```json
{
  "type": "linear-gradient",
  "direction": "to bottom right",
  "colorStops": ["#f8fafc", "#e2e8f0", "#cbd5e1"],
  "noise": 0.05
}
```

### With Grid Overlay

```json
{
  "type": "linear-gradient",
  "direction": "to bottom right",
  "colorStops": ["#f8fafc", "#e2e8f0"],
  "noise": 0.05,
  "gridOverlay": {
    "pattern": "grid",
    "color": "#94a3b8",
    "opacity": 0.15,
    "blurRadius": 30
  }
}
```

### Grid Patterns

| Pattern | Description |
|---------|-------------|
| `grid` | Regular grid lines |
| `dots` | Dot pattern |
| `diagonal-lines` | Diagonal line pattern |

---

## Supported Fonts

| Font Family | Value |
|-------------|-------|
| Inter | `inter` |
| Roboto | `roboto` |
| Open Sans | `open-sans` |
| Lato | `lato` |
| Montserrat | `montserrat` |
| Poppins | `poppins` |
| Raleway | `raleway` |
| Nunito | `nunito` |
| Source Sans Pro | `source-sans-pro` |
| Merriweather | `merriweather` |
| Playfair Display | `playfair-display` |
| Lora | `lora` |
| Noto Sans | `noto-sans` |
| Noto Serif | `noto-serif` |
| IBM Plex Sans | `ibm-plex-sans` |
| IBM Plex Serif | `ibm-plex-serif` |
| Fira Code | `fira-code` |
| JetBrains Mono | `jetbrains-mono` |
| Source Code Pro | `source-code-pro` |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌐 Links

- [Live Site](https://ogimage.click/)

---

Built by [markd3ng](https://github.com/markd3ng) 

This project is inspired by and built upon [imgsrc-app](https://github.com/FadyMak/imgsrc-app) 
