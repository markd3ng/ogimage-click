import { useTemplateStore } from "@/providers/template-store-provider"
import { MixerHorizontalIcon } from "@radix-ui/react-icons"

import { RichTemplate } from "@/lib/templates/blog"
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
  const params = template.params as RichTemplate["params"]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Template Properties</CardTitle>
        <CardDescription>Customize rich blog card content.</CardDescription>
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
              id="authorName"
              label="Author Name"
              value={params.author.name}
              onChange={(value) =>
                template.updateParams({
                  author: {
                    ...params.author,
                    name: value,
                  },
                })
              }
            />
            <TextField
              id="authorTitle"
              label="Author Title"
              value={params.author.title}
              onChange={(value) =>
                template.updateParams({
                  author: {
                    ...params.author,
                    title: value,
                  },
                })
              }
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

            <div className="grid grid-cols-3 gap-4">
              <SimpleField
                id="views"
                label="Views"
                value={params.stats.views}
                onChange={(value) =>
                  template.updateParams({
                    stats: {
                      ...params.stats,
                      views: value,
                    },
                  })
                }
              />
              <SimpleField
                id="likes"
                label="Likes"
                value={params.stats.likes}
                onChange={(value) =>
                  template.updateParams({
                    stats: {
                      ...params.stats,
                      likes: value,
                    },
                  })
                }
              />
              <SimpleField
                id="comments"
                label="Comments"
                value={params.stats.comments}
                onChange={(value) =>
                  template.updateParams({
                    stats: {
                      ...params.stats,
                      comments: value,
                    },
                  })
                }
              />
            </div>

            <SimpleField
              id="tags"
              label="Tags (comma separated)"
              value={params.tags.join(", ")}
              onChange={(value) =>
                template.updateParams({
                  tags: value
                    .split(",")
                    .map((v) => v.trim())
                    .filter(Boolean),
                })
              }
            />

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="layout">Layout</Label>
                <Select
                  value={params.layout}
                  onValueChange={(v) =>
                    template.updateParams({
                      layout: v as RichTemplate["params"]["layout"],
                    })
                  }
                >
                  <SelectTrigger id="layout">
                    <SelectValue placeholder="Select layout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="split">Split</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <SelectField
                id="showStats"
                label="Show Stats"
                value={params.showStats ? "yes" : "no"}
                onChange={(value) =>
                  template.updateParams({
                    showStats: value === "yes",
                  })
                }
              />

              <SelectField
                id="showTags"
                label="Show Tags"
                value={params.showTags ? "yes" : "no"}
                onChange={(value) =>
                  template.updateParams({
                    showTags: value === "yes",
                  })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <ColorField
                id="primaryColor"
                label="Primary Color"
                value={params.primaryColor}
                onChange={(value) => template.updateParams({ primaryColor: value })}
              />
              <ColorField
                id="secondaryColor"
                label="Secondary Color"
                value={params.secondaryColor}
                onChange={(value) =>
                  template.updateParams({ secondaryColor: value })
                }
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="authorAvatar">Author Avatar</Label>
                <ImageSelector
                  id="authorAvatar"
                  onChange={(v) =>
                    template.updateParams({
                      author: {
                        ...params.author,
                        avatar: {
                          ...params.author.avatar,
                          url: v ?? "",
                        },
                      },
                    })
                  }
                  initialFileName={
                    params.author.avatar.url
                      ? params.author.avatar.url.split("/").pop()
                      : undefined
                  }
                />
              </div>

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
  value: RichTemplate["params"]["title"]
  onChange: (value: RichTemplate["params"]["title"]) => void
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

function SimpleField({
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
      <Input id={id} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}

function SelectField({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: "yes" | "no"
  onChange: (value: "yes" | "no") => void
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Select value={value} onValueChange={(v) => onChange(v as "yes" | "no")}>
        <SelectTrigger id={id}>
          <SelectValue placeholder="Select value" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="yes">Yes</SelectItem>
          <SelectItem value="no">No</SelectItem>
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
