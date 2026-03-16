import {
  CreditCard,
  Download,
  Eye,
  Layout,
  Paintbrush,
  Palette,
  Sliders,
  Zap,
} from "lucide-react"

import { SITE_NAME } from "@/config/site"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ReasonsSection() {
  return (
    <div className="w-full py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Why Choose {SITE_NAME}?
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to create stunning social media images in
            seconds
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => (
            <Card
              key={index}
              className="group transition-shadow duration-300 hover:shadow-lg"
            >
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 p-3 transition-colors duration-300 group-hover:bg-blue-100">
                  <reason.icon className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {reason.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{reason.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

const reasons = [
  {
    icon: CreditCard,
    title: "Free and No Sign-up Required",
    description:
      "Start creating professional OG images instantly - no registration or credit card needed. Access all features completely free.",
  },
  {
    icon: Layout,
    title: "Multi-Platform Support",
    description:
      "Generate optimized images for any platform with the correct dimensions. Perfect for Open Graph, Twitter/X headers, and more.",
  },
  {
    icon: Palette,
    title: "Professional Templates",
    description:
      "Choose from multiple professionally designed templates including Basic, Hero, Image Right, Notice, and Logos layouts.",
  },
  {
    icon: Download,
    title: "Flexible Export Options",
    description:
      "Export your designs in PNG, JPEG, or WebP formats with optimized file sizes while maintaining high quality.",
  },
  {
    icon: Sliders,
    title: "Advanced Customization",
    description:
      "Personalize every aspect with custom backgrounds, patterns, gradients, and brand colors. Upload your logos and images.",
  },
  {
    icon: Paintbrush,
    title: "Modern Design Features",
    description:
      "Create stunning visuals with premium typography, grid overlays and visual effects.",
  },
  {
    icon: Eye,
    title: "Instant Preview",
    description:
      "See your changes in real-time with our WYSIWYG interface. Get immediate visual feedback as you design.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Generate professional social media images in seconds with our intuitive interface and optimized workflow.",
  },
]
