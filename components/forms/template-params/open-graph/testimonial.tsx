import { useTemplateStore } from "@/providers/template-store-provider"
import { MixerHorizontalIcon } from "@radix-ui/react-icons"

import { TestimonialTemplate } from "@/lib/templates/open-graph"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TextSettings } from "@/components/forms/text-settings"
import { ImageSelector } from "@/components/image-selector"
import { ResponsivePopover } from "@/components/responsive-popover"

export function Form() {
  const template = useTemplateStore((state) => state)
  const params = template.params as TestimonialTemplate["params"]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Template Properties</CardTitle>
        <CardDescription>Customize testimonial content and style.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <TextField
              id="quote"
              label="Quote"
              value={params.quote}
              onChange={(value) => template.updateParams({ quote: value })}
            />
            <TextField
              id="authorName"
              label="Author Name"
              value={params.authorName}
              onChange={(value) => template.updateParams({ authorName: value })}
            />
            <TextField
              id="authorTitle"
              label="Author Title"
              value={params.authorTitle}
              onChange={(value) => template.updateParams({ authorTitle: value })}
            />
            <TextField
              id="authorCompany"
              label="Author Company"
              value={params.authorCompany}
              onChange={(value) => template.updateParams({ authorCompany: value })}
            />
            <TextField
              id="productName"
              label="Product Name"
              value={params.productName}
              onChange={(value) => template.updateParams({ productName: value })}
            />

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="authorAvatar">Author Avatar</Label>
              <ImageSelector
                id="authorAvatar"
                onChange={(v) =>
                  template.updateParams({
                    authorAvatar: {
                      ...params.authorAvatar,
                      url: v ?? "",
                    },
                  })
                }
                initialFileName={
                  params.authorAvatar.url
                    ? params.authorAvatar.url.split("/").pop()
                    : undefined
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="score">Rating Score</Label>
                <Input
                  id="score"
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

            <div className="space-y-1.5">
              <Label htmlFor="quoteStyle">Quote Style</Label>
              <Select
                value={params.quoteStyle}
                onValueChange={(v) =>
                  template.updateParams({
                    quoteStyle: v as TestimonialTemplate["params"]["quoteStyle"],
                  })
                }
              >
                <SelectTrigger id="quoteStyle">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="classic">Classic</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                </SelectContent>
              </Select>
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
  value: TestimonialTemplate["params"]["quote"]
  onChange: (value: TestimonialTemplate["params"]["quote"]) => void
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
