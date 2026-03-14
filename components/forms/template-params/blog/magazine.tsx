import { useTemplateStore } from "@/providers/template-store-provider"
import { MixerHorizontalIcon } from "@radix-ui/react-icons"

import { MagazineTemplate } from "@/lib/templates/blog"
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
  const params = template.params as MagazineTemplate["params"]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Template Properties</CardTitle>
        <CardDescription>Customize magazine style cover.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <TextField
              id="category"
              label="Category"
              value={params.category}
              onChange={(value) => template.updateParams({ category: value })}
            />
            <TextField
              id="title"
              label="Title"
              value={params.title}
              onChange={(value) => template.updateParams({ title: value })}
            />
            <TextField
              id="subtitle"
              label="Subtitle"
              value={params.subtitle}
              onChange={(value) => template.updateParams({ subtitle: value })}
            />
            <TextField
              id="author"
              label="Author"
              value={params.author}
              onChange={(value) => template.updateParams({ author: value })}
            />
            <TextField
              id="publishDate"
              label="Publish Date"
              value={params.publishDate}
              onChange={(value) => template.updateParams({ publishDate: value })}
            />
            <TextField
              id="readTime"
              label="Read Time"
              value={params.readTime}
              onChange={(value) => template.updateParams({ readTime: value })}
            />

            <div className="grid grid-cols-2 gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="featuredImage">Featured Image</Label>
                <ImageSelector
                  id="featuredImage"
                  onChange={(v) =>
                    template.updateParams({
                      featuredImage: {
                        ...params.featuredImage,
                        url: v ?? "",
                      },
                    })
                  }
                  initialFileName={
                    params.featuredImage.url
                      ? params.featuredImage.url.split("/").pop()
                      : undefined
                  }
                />
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="logo">Logo</Label>
                <ImageSelector
                  id="logo"
                  onChange={(v) =>
                    template.updateParams({
                      logo: {
                        ...params.logo,
                        url: v ?? "",
                      },
                    })
                  }
                  initialFileName={
                    params.logo.url ? params.logo.url.split("/").pop() : undefined
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
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

              <div className="space-y-1.5">
                <Label htmlFor="layoutStyle">Layout Style</Label>
                <Select
                  value={params.layoutStyle}
                  onValueChange={(v) =>
                    template.updateParams({
                      layoutStyle: v as MagazineTemplate["params"]["layoutStyle"],
                    })
                  }
                >
                  <SelectTrigger id="layoutStyle">
                    <SelectValue placeholder="Select layout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left-content">Left Content</SelectItem>
                    <SelectItem value="right-content">Right Content</SelectItem>
                  </SelectContent>
                </Select>
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
  value: MagazineTemplate["params"]["title"]
  onChange: (value: MagazineTemplate["params"]["title"]) => void
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
