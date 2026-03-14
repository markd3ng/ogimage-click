
# ogimage.click

A free and open source tool for generating beautiful Open Graph images, Twitter/X headers, and blog covers - no signup required.

## 🌟 Features

- **Multiple Template Types**
  - Open Graph Images
  - Twitter/X Headers
  - Blog Cover Images
  - Custom Templates

- **Rich Customization**
  - Custom backgrounds (solid colors & gradients)
  - Grid and noise overlays
  - Logo upload support
  - Professional typography
  - Multiple export formats (PNG, JPEG, WebP)

- **Developer Experience**
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
git clone https://github.com/weijunext/ogimage-click.git
cd ogimage.click
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables in `.env.local`:
```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_GOOGLE_ID=
NEXT_PUBLIC_GOOGLE_ADSENSE_ID=
```

4. Start the development server:
```bash
pnpm dev
```

## 🛠️ Tech Stack

- [Next.js 15](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Satori](https://github.com/vercel/satori)
- [Zod](https://zod.dev/)

## 📖 Usage

1. Choose a template type (OG Image, Twitter Header, or Blog Cover)
2. Customize your content (text, colors, images)
3. Preview in real-time
4. Export in your preferred format
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

### Endpoint

```
POST /api/v1/images
```

### Request Headers

```
Content-Type: application/json
```

### Request Body

```typescript
{
  template: string;      // Template ID (required)
  width?: number;        // Image width (default: 1200)
  height?: number;       // Image height (default: 630)
  data: object;          // Template-specific data (required)
}
```

### Response

- **Content-Type**: `image/png`
- **Body**: Binary PNG image data

---

### Templates

#### Open Graph Series (1200 x 630)

| Template ID | Description |
|-------------|-------------|
| `og-default` | Default OG template with title, description, and logo |
| `og-minimal` | Minimalist OG template with centered text |
| `og-gradient` | OG template with gradient background |
| `og-blog` | Blog-style OG template |
| `og-personal` | Personal branding OG template |

#### X Header Series (1500 x 500)

| Template ID | Description |
|-------------|-------------|
| `x-header-default` | Default X header template |
| `x-header-minimal` | Minimalist X header template |
| `x-header-gradient` | X header with gradient background |

#### Blog Cover Series (1200 x 630)

| Template ID | Description |
|-------------|-------------|
| `blog-cover` | Blog cover image template |

---

### Template Data Structures

#### `og-default`

```json
{
  "template": "og-default",
  "data": {
    "title": "Your Title Here",
    "description": "Your description text here",
    "logo": "https://example.com/logo.png",
    "background": "#ffffff",
    "backgroundType": "solid",
    "showGrid": false,
    "showNoise": false,
    "fontFamily": "inter"
  }
}
```

#### `og-minimal`

```json
{
  "template": "og-minimal",
  "data": {
    "title": "Your Title Here",
    "subtitle": "Your subtitle",
    "background": "#000000",
    "fontFamily": "inter"
  }
}
```

#### `og-gradient`

```json
{
  "template": "og-gradient",
  "data": {
    "title": "Your Title Here",
    "description": "Your description",
    "gradientFrom": "#6366f1",
    "gradientTo": "#ec4899",
    "fontFamily": "inter"
  }
}
```

#### `og-blog`

```json
{
  "template": "og-blog",
  "data": {
    "title": "Blog Post Title",
    "author": "Author Name",
    "date": "2024-01-15",
    "category": "Technology",
    "background": "#ffffff",
    "fontFamily": "inter"
  }
}
```

#### `og-personal`

```json
{
  "template": "og-personal",
  "data": {
    "name": "Your Name",
    "title": "Your Job Title",
    "avatar": "https://example.com/avatar.png",
    "social": "@username",
    "background": "#ffffff",
    "fontFamily": "inter"
  }
}
```

#### `x-header-default`

```json
{
  "template": "x-header-default",
  "data": {
    "title": "Your Name",
    "subtitle": "Your Bio or Tagline",
    "background": "#1a1a1a",
    "fontFamily": "inter"
  }
}
```

#### `x-header-minimal`

```json
{
  "template": "x-header-minimal",
  "data": {
    "text": "Simple Text Header",
    "background": "#ffffff",
    "textColor": "#000000",
    "fontFamily": "inter"
  }
}
```

#### `x-header-gradient`

```json
{
  "template": "x-header-gradient",
  "data": {
    "title": "Your Name",
    "subtitle": "Your Tagline",
    "gradientFrom": "#3b82f6",
    "gradientTo": "#8b5cf6",
    "fontFamily": "inter"
  }
}
```

#### `blog-cover`

```json
{
  "template": "blog-cover",
  "data": {
    "title": "Blog Title",
    "subtitle": "Blog Subtitle",
    "author": "Author Name",
    "date": "2024-01-15",
    "background": "#ffffff",
    "fontFamily": "inter"
  }
}
```

---

### Supported Fonts

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

### Usage Examples

#### cURL

```bash
curl -X POST https://your-domain.com/api/v1/images \
  -H "Content-Type: application/json" \
  -d '{
    "template": "og-default",
    "width": 1200,
    "height": 630,
    "data": {
      "title": "Hello World",
      "description": "This is a test image",
      "background": "#6366f1",
      "fontFamily": "inter"
    }
  }' \
  --output og-image.png
```

#### JavaScript (Fetch)

```javascript
const response = await fetch('https://your-domain.com/api/v1/images', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    template: 'og-default',
    width: 1200,
    height: 630,
    data: {
      title: 'Hello World',
      description: 'This is a test image',
      background: '#6366f1',
      fontFamily: 'inter',
    },
  }),
});

const blob = await response.blob();
const url = URL.createObjectURL(blob);

// Use the image URL
const img = document.createElement('img');
img.src = url;
document.body.appendChild(img);
```

#### Next.js API Route

```typescript
// app/api/og/route.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  return new ImageResponse(
    (
      <div style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6366f1',
      }}>
        <span style={{ fontSize: 64, color: 'white' }}>
          {searchParams.get('title') || 'Hello World'}
        </span>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
```

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

- [Live Site](https://myogimage.com/)

---

Built by [Jude Wei](https://github.com/weijunext) 

This project is inspired by and built upon [imgsrc-app](https://github.com/FadyMak/imgsrc-app) 
