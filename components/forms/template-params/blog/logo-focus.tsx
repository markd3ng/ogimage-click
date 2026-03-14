import { useTemplateStore } from "@/providers/template-store-provider"
import { MixerHorizontalIcon } from "@radix-ui/react-icons"

import { LogoFocusTemplate } from "@/lib/templates/blog"
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
  const params = template.params as LogoFocusTemplate["params"]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Template Properties</CardTitle>
        <CardDescription>Customize logo focused blog template.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
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

            <TextField
              id="title"
              label="Title"
              value={params.title}
              onChange={(value) => template.updateParams({ title: value })}
            />
            <TextField
              id="description"
              label="Description"
              value={params.description}
              onChange={(value) => template.updateParams({ description: value })}
            />

            <div className="grid grid-cols-2 gap-4">
              <SelectField
                id="logoSize"
                label="Logo Size"
                value={params.logoSize}
                options={["small", "medium", "large"]}
                onChange={(v) =>
                  template.updateParams({
                    logoSize: v as LogoFocusTemplate["params"]["logoSize"],
                  })
                }
              />
              <SelectField
                id="layout"
                label="Layout"
                value={params.layout}
                options={["vertical", "horizontal"]}
                onChange={(v) =>
                  template.updateParams({
                    layout: v as LogoFocusTemplate["params"]["layout"],
                  })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <SelectField
                id="alignment"
                label="Alignment"
                value={params.alignment}
                options={["left", "center"]}
                onChange={(v) =>
                  template.updateParams({
                    alignment: v as LogoFocusTemplate["params"]["alignment"],
                  })
                }
              />
              <SelectField
                id="spacing"
                label="Spacing"
                value={params.spacing}
                options={["compact", "normal", "relaxed"]}
                onChange={(v) =>
                  template.updateParams({
                    spacing: v as LogoFocusTemplate["params"]["spacing"],
                  })
                }
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <ColorField
                id="brandColor"
                label="Brand Color"
                value={params.brandColor}
                onChange={(value) => template.updateParams({ brandColor: value })}
              />
              <ColorField
                id="textColor"
                label="Text Color"
                value={params.textColor}
                onChange={(value) => template.updateParams({ textColor: value })}
              />
              <ColorField
                id="borderColor"
                label="Border Color"
                value={params.borderColor}
                onChange={(value) => template.updateParams({ borderColor: value })}
              />
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
  value: LogoFocusTemplate["params"]["title"]
  onChange: (value: LogoFocusTemplate["params"]["title"]) => void
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

function SelectField({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id}>
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

function ColorField({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
