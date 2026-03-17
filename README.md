# ogimage.click

[中文文档](README.zh-CN.md)

A free and open source tool for generating beautiful Open Graph images, Twitter/X headers, and blog covers. No signup required.

---

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Live Demo](#live-demo)
- [Quick Start](#quick-start)
- [API Documentation](#api-documentation)
- [Configuration](#configuration)
- [Templates Reference](#templates-reference)
- [Request Examples](#request-examples)
- [Background Configuration](#background-configuration)
- [Supported Fonts](#supported-fonts)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [License](#license)

---

## Introduction

ogimage.click is a developer-friendly tool for generating social media images programmatically. It provides a visual editor for designing images and a REST API for automated generation.

**Use Cases:**
- Generate dynamic Open Graph images for your website
- Create Twitter/X headers programmatically
- Design blog cover images at scale
- Build automated social media workflows

---

## Features

**Multiple Image Types**
- Open Graph Images (1200 x 630)
- Twitter/X Headers (1500 x 500)
- Blog Cover Images (1200 x 630)

**Rich Customization**
- Custom backgrounds (solid colors and gradients)
- Grid and noise overlays
- Logo upload support
- Professional typography
- Multiple export formats (PNG, JPEG, WebP)

**Developer Experience**
- REST API for programmatic image generation
- Ready-to-use HTML meta tags
- Next.js App Router integration
- Real-time preview
- No authentication required
- Free and open source

**Storage Modes**
- Direct Mode: Return images directly via API (default)
- R2 Persist Mode: Store images in Cloudflare R2 with public URLs

---

## Live Demo

Visit [ogimage.click](https://ogimage.click/) to try the visual editor.

---

## Quick Start

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

# Optional: Enable Cloudflare R2 storage
ENABLE_R2_STORAGE=false

# Optional: Enable R2 debug logging for troubleshooting
DEBUG_R2=false

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

---

## API Documentation

### Overview

The API supports two storage modes controlled by the `ENABLE_R2_STORAGE` environment variable:

| Mode | ENABLE_R2_STORAGE | Behavior |
|------|-------------------|----------|
| Direct | `false` or unset | Returns `image/png` binary directly |
| R2 Persist | `true` | Persists to R2, returns URL or 302 redirect |

### Direct Mode (Default)

No external storage configuration required. Images are generated on-demand and returned directly.

**Cache Headers:**
```
Cache-Control: public, max-age=0, s-maxage=604800, stale-while-revalidate=604800
```

### R2 Persist Mode

Requires Cloudflare R2 configuration. Generated images are stored in R2 with public read access.

**Benefits:**
- Images served directly from CDN
- Reduced compute on subsequent requests
- Stable URLs for caching

**CORS Note:** If only using images in `<img>` tags, no additional CORS configuration is needed. For `fetch`/`canvas` pixel access, configure R2 CORS to allow your domain.

### Endpoints

#### POST /api/v1/images

Generate images with full customization using JSON body.

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
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

**Response (Direct Mode):**
- Content-Type: `image/png`
- Body: Binary PNG data

**Response (R2 Mode - JSON default):**
```json
{
  "url": "https://cdn.example.com/og/og-basic/<hash>.png",
  "key": "og/og-basic/<hash>.png",
  "cached": true
}
```

**Response (R2 Mode - Redirect):**
- Status: `302 Found`
- Header: `Location: https://cdn.example.com/og/og-basic/<hash>.png`

**Query Parameters (R2 Mode only):**
- `mode=redirect` - Returns 302 redirect instead of JSON

#### GET /api/v1/images

Generate images using URL parameters for simple use cases.

**Query Parameters:**

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `template` | string | Yes | Template ID | `og:basic` |
| `title.text` | string | No | Title text | `Hello World` |
| `description.text` | string | No | Description text | `My description` |
| `logo.url` | string | No | Logo image URL | `https://example.com/logo.png` |
| `title.color` | string | No | Title color | `#ff0000` |
| `title.fontSize` | number | No | Title font size | `52` |
| `mode` | string | No | R2 mode only: `json` or `redirect` | `redirect` |

**Response:** Same as POST endpoint.

**Example URLs:**
```
# Direct mode (default)
https://ogimage.click/api/v1/images?template=og:basic&title.text=Hello%20World

# R2 JSON mode
https://ogimage.click/api/v1/images?template=og:basic&title.text=Hello%20World&mode=json

# R2 Redirect mode
https://ogimage.click/api/v1/images?template=og:basic&title.text=Hello%20World&mode=redirect
```

### Usage Examples

#### cURL

```bash
# Direct mode - saves image to file
curl -X POST "https://your-domain.com/api/v1/images" \
  -H "Content-Type: application/json" \
  -d '{"name":"og:corporate","params":{"companyName":{"text":"My Company","fontFamily":"inter","fontWeight":700,"fontSize":36,"color":"#1e40af"},"title":{"text":"Welcome","fontFamily":"inter","fontWeight":600,"fontSize":42,"color":"#0f172a"}},"background":{"type":"color","color":"#ffffff","noise":0},"canvas":{"width":1200,"height":630}}' \
  -o image.png

# R2 mode - returns JSON with URL
curl -X POST "https://your-domain.com/api/v1/images" \
  -H "Content-Type: application/json" \
  -d '{"name":"og:basic","params":{"title":{"text":"Hello"}},"background":{"type":"color","color":"#ffffff"},"canvas":{"width":1200,"height":630}}'
```

#### JavaScript (Fetch)

```javascript
// Direct mode
const response = await fetch('https://your-domain.com/api/v1/images', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'og:corporate',
    params: {
      title: { text: 'Welcome', fontFamily: 'inter', fontWeight: 600, fontSize: 42, color: '#0f172a' },
    },
    background: { type: 'color', color: '#ffffff', noise: 0 },
    canvas: { width: 1200, height: 630 },
  }),
});

const blob = await response.blob();
const url = URL.createObjectURL(blob);

// R2 mode
const response = await fetch('https://your-domain.com/api/v1/images', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ /* ... */ }),
});

const data = await response.json();
console.log(data.url); // https://cdn.example.com/og/...
```

#### Next.js Integration

```typescript
// app/api/og/route.tsx
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Hello World';

  // Direct mode - proxy the image
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/images`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'og:corporate',
      params: { title: { text: title, fontFamily: 'inter', fontWeight: 600, fontSize: 42, color: '#0f172a' } },
      background: { type: 'color', color: '#ffffff', noise: 0 },
      canvas: { width: 1200, height: 630 },
    }),
  });

  return new Response(response.body, {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' },
  });
}

// R2 mode - redirect to stored image
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Hello World';

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/images?mode=redirect`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ /* ... */ }),
    redirect: 'manual',
  });

  const location = response.headers.get('location');
  if (!location) {
    return new Response('OG URL not found', { status: 500 });
  }

  return Response.redirect(location, 302);
}
```

### HTML Meta Tags

```html
<meta property="og:title" content="Your Page Title" />
<meta property="og:description" content="Your page description" />
<meta property="og:image" content="https://yourdomain.com/api/v1/images?template=og:basic&title.text=Your%20Title" />
<meta property="og:url" content="https://yourdomain.com" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://yourdomain.com/api/v1/images?template=og:basic&title.text=Your%20Title" />
```

---

## Debugging

### R2 Debug Mode

Set `DEBUG_R2=true` in your environment variables to enable detailed logging for R2 operations.

**Useful for:**
- Diagnosing cache hit/miss issues
- Troubleshooting R2 connection problems
- Monitoring object upload/exists operations

**Log output includes:**
- Request IDs for tracing
- Object key generation details
- HeadObject (exists check) results
- PutObject (upload) progress
- Error details with status codes

**Example log output:**
```
[DEBUG_R2 2025-01-15T10:30:00.000Z] GET request received {"requestId":"...","mode":"json"}
[DEBUG_R2 2025-01-15T10:30:00.200Z] objectExists called {"key":"og/og-basic/...","bucket":"og-images"}
[DEBUG_R2 2025-01-15T10:30:00.500Z] objectExists failed {"key":"og/og-basic/...","errorName":"NotFound"}
```

**Note:** Debug mode should only be enabled during development or troubleshooting, as it adds overhead to each request.

---

## Configuration

### Site Information

Edit `config/site.ts` to customize your site:

```typescript
export const SITE_OWNER = "Your Name";
export const BASE_URL = "https://yourdomain.com";
export const SITE_NAME = "YourSiteName";
export const TWITTER_URL = "https://x.com/your_handle";
export const BLUESKY_URL = "https://bsky.app/profile/your_handle";

const baseSiteConfig = {
  name: "Your Site Name",
  title: "Your Site Title",
  description: "Your site description",
}
```

### Analytics (Microsoft Clarity)

1. Get your Clarity Site ID from [Microsoft Clarity](https://clarity.microsoft.com/)
2. Add to `.env.local`:
   ```
   NEXT_PUBLIC_CLARITY_ID=your_clarity_site_id
   ```

The tracking code is in `clarity.js` and loaded in `app/GoogleAnalytics.tsx`.

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

---

## Templates Reference

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

### X/Twitter Header Series (1500 x 500)

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

## Tech Stack

- [Next.js 15](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Satori](https://github.com/vercel/satori)
- [Zod](https://zod.dev/)

---

## Contributing

Contributions are welcome. Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built by [markd3ng](https://github.com/markd3ng)

This project is inspired by and built upon [imgsrc-app](https://github.com/FadyMak/imgsrc-app)
