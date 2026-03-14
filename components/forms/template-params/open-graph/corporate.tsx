import { useTemplateStore } from "@/providers/template-store-provider"
import { MixerHorizontalIcon } from "@radix-ui/react-icons"

import { CorporateTemplate } from "@/lib/templates/open-graph"
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
  const params = template.params as CorporateTemplate["params"]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Template Properties</CardTitle>
        <CardDescription>Customize corporate template fields.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <TextField
              id="companyName"
              label="Company Name"
              value={params.companyName}
              onChange={(value) => template.updateParams({ companyName: value })}
            />
            <TextField
              id="tagline"
              label="Tagline"
              value={params.tagline}
              onChange={(value) => template.updateParams({ tagline: value })}
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

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="brandColor">Brand Color</Label>
              <Input
                id="brandColor"
                type="color"
                value={params.brandColor}
                onChange={(e) => template.updateParams({ brandColor: e.target.value })}
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
  value: CorporateTemplate["params"]["title"]
  onChange: (value: CorporateTemplate["params"]["title"]) => void
}) {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex space-x-2">
        <Input
          id={id}
          value={value.text}
          onChange={(e) =>
            onChange({
              ...value,
              text: e.target.value,
            })
          }
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
