import { useTemplateStore } from "@/providers/template-store-provider"
import { MixerHorizontalIcon } from "@radix-ui/react-icons"

import { MinimalTemplate } from "@/lib/templates/blog"
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
  const params = template.params as MinimalTemplate["params"]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Template Properties</CardTitle>
        <CardDescription>Customize minimal blog template.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
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
              id="date"
              label="Date"
              value={params.date}
              onChange={(value) => template.updateParams({ date: value })}
            />

            <div className="grid w-full max-w-sm items-center gap-1.5">
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
                <Label htmlFor="accentElement">Accent Element</Label>
                <Select
                  value={params.accentElement}
                  onValueChange={(v) =>
                    template.updateParams({
                      accentElement: v as MinimalTemplate["params"]["accentElement"],
                    })
                  }
                >
                  <SelectTrigger id="accentElement">
                    <SelectValue placeholder="Select accent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="line">Line</SelectItem>
                    <SelectItem value="dot">Dot</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="layout">Layout</Label>
                <Select
                  value={params.layout}
                  onValueChange={(v) =>
                    template.updateParams({
                      layout: v as MinimalTemplate["params"]["layout"],
                    })
                  }
                >
                  <SelectTrigger id="layout">
                    <SelectValue placeholder="Select layout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="centered">Centered</SelectItem>
                    <SelectItem value="left">Left</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="spacing">Spacing</Label>
                <Select
                  value={params.spacing}
                  onValueChange={(v) =>
                    template.updateParams({
                      spacing: v as MinimalTemplate["params"]["spacing"],
                    })
                  }
                >
                  <SelectTrigger id="spacing">
                    <SelectValue placeholder="Select spacing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="relaxed">Relaxed</SelectItem>
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
  value: MinimalTemplate["params"]["title"]
  onChange: (value: MinimalTemplate["params"]["title"]) => void
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
