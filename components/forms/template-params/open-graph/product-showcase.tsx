import { useTemplateStore } from "@/providers/template-store-provider"
import { MixerHorizontalIcon } from "@radix-ui/react-icons"

import { ProductShowcaseTemplate } from "@/lib/templates/open-graph"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TextSettings } from "@/components/forms/text-settings"
import { ImageSelector } from "@/components/image-selector"
import { ResponsivePopover } from "@/components/responsive-popover"

export function Form() {
  const template = useTemplateStore((state) => state)
  const params = template.params as ProductShowcaseTemplate["params"]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Template Properties</CardTitle>
        <CardDescription>Customize product showcase details.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <TextField
              id="productName"
              label="Product Name"
              value={params.productName}
              onChange={(value) => template.updateParams({ productName: value })}
            />
            <TextField
              id="price"
              label="Price"
              value={params.price}
              onChange={(value) => template.updateParams({ price: value })}
            />
            <TextField
              id="originalPrice"
              label="Original Price"
              value={params.originalPrice}
              onChange={(value) => template.updateParams({ originalPrice: value })}
            />
            <TextField
              id="badge"
              label="Badge"
              value={params.badge}
              onChange={(value) => template.updateParams({ badge: value })}
            />

            {params.features.map((feature, index) => (
              <TextField
                key={index}
                id={`feature-${index}`}
                label={`Feature ${index + 1}`}
                value={feature}
                onChange={(value) =>
                  template.updateParams({
                    features: params.features.map((item, i) =>
                      i === index ? value : item
                    ),
                  })
                }
              />
            ))}

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="ratingScore">Rating Score</Label>
                <Input
                  id="ratingScore"
                  type="number"
                  min={0}
                  max={5}
                  step={0.1}
                  value={params.rating.score}
                  onChange={(e) =>
                    template.updateParams({
                      rating: {
                        ...params.rating,
                        score: Number(e.target.value),
                      },
                    })
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ratingTotal">Rating Total</Label>
                <Input
                  id="ratingTotal"
                  type="number"
                  min={0}
                  value={params.rating.total}
                  onChange={(e) =>
                    template.updateParams({
                      rating: {
                        ...params.rating,
                        total: Number(e.target.value),
                      },
                    })
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="accentColor">Accent Color</Label>
                <Input
                  id="accentColor"
                  type="color"
                  value={params.accentColor}
                  onChange={(e) =>
                    template.updateParams({ accentColor: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="productImage">Product Image</Label>
                <ImageSelector
                  id="productImage"
                  onChange={(v) =>
                    template.updateParams({
                      productImage: {
                        ...params.productImage,
                        url: v ?? "",
                      },
                    })
                  }
                  initialFileName={
                    params.productImage.url
                      ? params.productImage.url.split("/").pop()
                      : undefined
                  }
                />
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="brandLogo">Brand Logo</Label>
                <ImageSelector
                  id="brandLogo"
                  onChange={(v) =>
                    template.updateParams({
                      brandLogo: {
                        ...params.brandLogo,
                        url: v ?? "",
                      },
                    })
                  }
                  initialFileName={
                    params.brandLogo.url
                      ? params.brandLogo.url.split("/").pop()
                      : undefined
                  }
                />
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

function TextField({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: ProductShowcaseTemplate["params"]["productName"]
  onChange: (value: ProductShowcaseTemplate["params"]["productName"]) => void
}) {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex space-x-2">
        <Input
          id={id}
          value={value.text}
          onChange={(e) => onChange({ ...value, text: e.target.value })}
        />

        <ResponsivePopover
          title="Font Settings"
          description={`Customize ${label.toLowerCase()} style.`}
          trigger={
            <Button variant="outline" size="icon">
              <MixerHorizontalIcon className="h-4 w-4" />
            </Button>
          }
        >
          <TextSettings
            fontFamily={value.fontFamily}
            fontSize={value.fontSize}
            fontWeight={value.fontWeight}
            color={value.color}
            onChangeFontFamily={(fontFamily) => onChange({ ...value, fontFamily })}
            onChangeFontSize={(fontSize) => onChange({ ...value, fontSize })}
            onChangeFontWeight={(fontWeight) => onChange({ ...value, fontWeight })}
            onChangeColor={(color) => onChange({ ...value, color })}
          />
        </ResponsivePopover>
      </div>
    </div>
  )
}
