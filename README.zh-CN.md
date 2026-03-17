# ogimage.click

[English Documentation](README.md)

一个免费开源的工具，用于生成精美的 Open Graph 图片、Twitter/X 横幅和博客封面。无需注册即可使用。

---

## 目录

- [简介](#简介)
- [功能特性](#功能特性)
- [在线演示](#在线演示)
- [快速开始](#快速开始)
- [API 文档](#api-文档)
- [配置说明](#配置说明)
- [模板参考](#模板参考)
- [请求示例](#请求示例)
- [背景配置](#背景配置)
- [支持的字体](#支持的字体)
- [技术栈](#技术栈)
- [贡献指南](#贡献指南)
- [许可证](#许可证)

---

## 简介

ogimage.click 是一个面向开发者的工具，用于以编程方式生成社交媒体图片。它提供可视化编辑器用于设计图片，以及 REST API 用于自动化生成。

**使用场景：**
- 为网站生成动态 Open Graph 图片
- 以编程方式创建 Twitter/X 横幅
- 批量设计博客封面图片
- 构建自动化社交媒体工作流

---

## 功能特性

**多种图片类型**
- Open Graph 图片 (1200 x 630)
- Twitter/X 横幅 (1500 x 500)
- 博客封面图片 (1200 x 630)

**丰富的自定义选项**
- 自定义背景（纯色和渐变）
- 网格和噪点叠加
- Logo 上传支持
- 专业排版
- 多种导出格式（PNG、JPEG、WebP）

**开发者体验**
- 用于程序化生成图片的 REST API
- 开箱即用的 HTML Meta 标签
- Next.js App Router 集成
- 实时预览
- 无需身份验证
- 免费开源

**存储模式**
- 直接模式：直接通过 API 返回图片（默认）
- R2 持久化模式：将图片存储在 Cloudflare R2 中，提供公开 URL

---

## 在线演示

访问 [ogimage.click](https://ogimage.click/) 试用可视化编辑器。

---

## 快速开始

### 环境要求

- Node.js 18+
- pnpm（推荐）或 npm

### 安装步骤

1. 克隆仓库：
```bash
git clone https://github.com/markd3ng/ogimage-click.git
cd ogimage-click
```

2. 安装依赖：
```bash
pnpm install
```

3. 在 `.env.local` 中设置环境变量：
```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_CLARITY_ID=your_clarity_site_id

# 可选：启用 Cloudflare R2 存储
ENABLE_R2_STORAGE=false

# 可选：启用 R2 调试日志用于故障排查
DEBUG_R2=false

R2_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
R2_REGION=auto
R2_BUCKET=og-images
R2_ACCESS_KEY_ID=your_r2_access_key_id
R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
R2_PUBLIC_BASE_URL=https://cdn.example.com
```

4. 启动开发服务器：
```bash
pnpm dev
```

---

## API 文档

### 概述

API 支持两种存储模式，通过 `ENABLE_R2_STORAGE` 环境变量控制：

| 模式 | ENABLE_R2_STORAGE | 行为 |
|------|-------------------|------|
| 直接模式 | `false` 或未设置 | 直接返回 `image/png` 二进制数据 |
| R2 持久化 | `true` | 持久化到 R2，返回 URL 或 302 跳转 |

### 直接模式（默认）

无需外部存储配置。图片按需生成并直接返回。

**缓存头：**
```
Cache-Control: public, max-age=0, s-maxage=604800, stale-while-revalidate=604800
```

### R2 持久化模式

需要 Cloudflare R2 配置。生成的图片存储在 R2 中，具有公开读取权限。

**优势：**
- 图片直接从 CDN 提供
- 减少后续请求的计算开销
- URL 稳定便于缓存

**CORS 说明：** 如果仅在 `<img>` 标签中使用图片，无需额外的 CORS 配置。如需 `fetch`/`canvas` 像素访问，请配置 R2 CORS 允许你的域名。

### 接口端点

#### POST /api/v1/images

使用 JSON 请求体生成具有完整自定义选项的图片。

**请求头：**
```
Content-Type: application/json
```

**请求体：**
```typescript
{
  name: string;           // 模板 ID（必需）
  params: object;         // 模板特定参数（必需）
  background: object;     // 背景配置（必需）
  canvas: {               // 画布尺寸（必需）
    width: number;
    height: number;
  }
}
```

**响应（直接模式）：**
- Content-Type: `image/png`
- Body: PNG 二进制数据

**响应（R2 模式 - 默认 JSON）：**
```json
{
  "url": "https://cdn.example.com/og/og-basic/<hash>.png",
  "key": "og/og-basic/<hash>.png",
  "cached": true
}
```

**响应（R2 模式 - 跳转）：**
- 状态: `302 Found`
- 响应头: `Location: https://cdn.example.com/og/og-basic/<hash>.png`

**查询参数（仅 R2 模式）：**
- `mode=redirect` - 返回 302 跳转而非 JSON

#### GET /api/v1/images

使用 URL 参数生成图片，适用于简单场景。

**查询参数：**

| 参数 | 类型 | 必需 | 描述 | 示例 |
|------|------|------|------|------|
| `template` | string | 是 | 模板 ID | `og:basic` |
| `title.text` | string | 否 | 标题文本 | `Hello World` |
| `description.text` | string | 否 | 描述文本 | `My description` |
| `logo.url` | string | 否 | Logo 图片 URL | `https://example.com/logo.png` |
| `title.color` | string | 否 | 标题颜色 | `#ff0000` |
| `title.fontSize` | number | 否 | 标题字体大小 | `52` |
| `mode` | string | 否 | R2 模式专用：`json` 或 `redirect` | `redirect` |

**响应：** 与 POST 端点相同。

**示例 URL：**
```
# 直接模式（默认）
https://ogimage.click/api/v1/images?template=og:basic&title.text=Hello%20World

# R2 JSON 模式
https://ogimage.click/api/v1/images?template=og:basic&title.text=Hello%20World&mode=json

# R2 跳转模式
https://ogimage.click/api/v1/images?template=og:basic&title.text=Hello%20World&mode=redirect
```

### 使用示例

#### cURL

```bash
# 直接模式 - 保存图片到文件
curl -X POST "https://your-domain.com/api/v1/images" \
  -H "Content-Type: application/json" \
  -d '{"name":"og:corporate","params":{"companyName":{"text":"My Company","fontFamily":"inter","fontWeight":700,"fontSize":36,"color":"#1e40af"},"title":{"text":"Welcome","fontFamily":"inter","fontWeight":600,"fontSize":42,"color":"#0f172a"}},"background":{"type":"color","color":"#ffffff","noise":0},"canvas":{"width":1200,"height":630}}' \
  -o image.png

# R2 模式 - 返回包含 URL 的 JSON
curl -X POST "https://your-domain.com/api/v1/images" \
  -H "Content-Type: application/json" \
  -d '{"name":"og:basic","params":{"title":{"text":"Hello"}},"background":{"type":"color","color":"#ffffff"},"canvas":{"width":1200,"height":630}}'
```

#### JavaScript (Fetch)

```javascript
// 直接模式
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

// R2 模式
const response = await fetch('https://your-domain.com/api/v1/images', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ /* ... */ }),
});

const data = await response.json();
console.log(data.url); // https://cdn.example.com/...
```

#### Next.js 集成

```typescript
// app/api/og/route.tsx
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Hello World';

  // 直接模式 - 代理图片
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

// R2 模式 - 跳转到已存储的图片
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

### HTML Meta 标签

```html
<meta property="og:title" content="Your Page Title" />
<meta property="og:description" content="Your page description" />
<meta property="og:image" content="https://yourdomain.com/api/v1/images?template=og:basic&title.text=Your%20Title" />
<meta property="og:url" content="https://yourdomain.com" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://yourdomain.com/api/v1/images?template=og:basic&title.text=Your%20Title" />
```

---

## 调试

### R2 调试模式

在环境变量中设置 `DEBUG_R2=true` 可以开启 R2 操作的详细日志记录。

**适用场景：**
- 诊断缓存命中/未命中问题
- 排查 R2 连接问题
- 监控对象上传/存在性检查操作

**日志输出内容包括：**
- 请求 ID 用于追踪
- 对象 key 生成详情
- HeadObject（存在性检查）结果
- PutObject（上传）进度
- 错误详情及状态码

**示例日志输出：**
```
[DEBUG_R2 2025-01-15T10:30:00.000Z] GET request received {"requestId":"...","mode":"json"}
[DEBUG_R2 2025-01-15T10:30:00.200Z] objectExists called {"key":"og/og-basic/...","bucket":"og-images"}
[DEBUG_R2 2025-01-15T10:30:00.500Z] objectExists failed {"key":"og/og-basic/...","errorName":"NotFound"}
```

**注意：** 调试模式仅在开发或故障排查时启用，因为它会增加每个请求的开销。

---

## 配置说明

### 站点信息

编辑 `config/site.ts` 自定义你的站点：

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

### 分析统计（Microsoft Clarity）

1. 从 [Microsoft Clarity](https://clarity.microsoft.com/) 获取你的 Clarity 站点 ID
2. 添加到 `.env.local`：
   ```
   NEXT_PUBLIC_CLARITY_ID=your_clarity_site_id
   ```

跟踪代码位于 `clarity.js`，在 `app/GoogleAnalytics.tsx` 中加载。

### 博客/指南内容

文章以 `.mdx` 文件形式存储在 `app/guides/posts/` 中。

**文件结构：**
```
app/guides/
├── posts/                    # 文章源文件
│   ├── your-article.mdx
│   └── another-article.mdx
├── [slug]/                   # 动态文章页面
├── page.tsx                  # 文章列表页
├── utils.ts                  # MDX 解析工具
└── layout.tsx
```

**添加新文章：**

1. 在 `app/guides/posts/` 中创建新的 `.mdx` 文件
2. 在顶部添加 frontmatter：
   ```mdx
   ---
   title: Your Article Title
   publishedAt: 2025-01-15
   summary: Brief description of the article
   ---

   Your content here...
   ```
3. 文章将自动在 `/guides/your-article-slug` 可用

### 管理模板

模板在 `components/template-selector.tsx` 中配置。

**隐藏模板**（前端隐藏但 API 仍可用）：在 `templates` 数组中将其注释掉：

```typescript
const templates = [
  {
    platform: "open-graph",
    name: "og:image-right",
    // ...
  },
  // {
  //   platform: "open-graph",
  //   name: "og:testimonial",  // 前端隐藏
  //   ...
  // },
]
```

---

## 模板参考

### Open Graph 系列 (1200 x 630)

| 模板 ID | 描述 |
|---------|------|
| `og:image-right` | 图片在右侧，文字在左侧 |
| `og:hero` | 大标题和背景图的 Hero 风格 |
| `og:logos` | 网格布局显示多个 Logo |
| `og:basic` | 简单的标题、描述和 Logo 模板 |
| `og:notice` | 带图标和消息的通告/提醒风格 |
| `og:corporate` | 企业品牌信息模板 |
| `og:product-showcase` | 产品展示，包含特性和定价 |

### X/Twitter 横幅系列 (1500 x 500)

| 模板 ID | 描述 |
|---------|------|
| `x:header-basic` | 基础文字横幅 |
| `x:header-minimalist` | 极简设计横幅 |
| `x:header-logo` | 突出显示 Logo 的横幅 |

### 博客封面系列 (1200 x 630)

| 模板 ID | 描述 |
|---------|------|
| `blog:basic` | 带标题和作者的基础博客封面 |
| `blog:minimal` | 极简博客封面 |
| `blog:magazine` | 杂志风格博客封面 |

---

## 请求示例

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

## 背景配置

### 纯色背景

```json
{
  "type": "color",
  "color": "#ffffff",
  "noise": 0
}
```

### 线性渐变

```json
{
  "type": "linear-gradient",
  "direction": "to bottom right",
  "colorStops": ["#f8fafc", "#e2e8f0", "#cbd5e1"],
  "noise": 0.05
}
```

### 带网格叠加

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

### 网格图案

| 图案 | 描述 |
|------|------|
| `grid` | 规则网格线 |
| `dots` | 点状图案 |
| `diagonal-lines` | 对角线图案 |

---

## 支持的字体

| 字体 | 值 |
|------|-----|
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

## 技术栈

- [Next.js 15](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Satori](https://github.com/vercel/satori)
- [Zod](https://zod.dev/)

---

## 贡献指南

欢迎贡献。请随时提交 Pull Request。对于重大更改，请先打开 issue 讨论你想要更改的内容。

1. Fork 本仓库
2. 创建你的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

---

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。

---

由 [markd3ng](https://github.com/markd3ng) 构建

本项目灵感来源于 [imgsrc-app](https://github.com/FadyMak/imgsrc-app)
