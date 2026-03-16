"use client"

import { useTemplateStore } from "@/providers/template-store-provider"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { absoluteUrl } from "@/lib/url"

export function CopyApiRequestButton() {
  const template = useTemplateStore((state) => state)

  async function handleCopy({ copyAs }: { copyAs: "json" | "curl" }) {
    const requestBody = {
      name: template.name,
      params: template.params,
      background: template.background,
      canvas: template.canvas,
    }

    if (copyAs === "json") {
      await navigator.clipboard.writeText(JSON.stringify(requestBody, null, 2))
    } else if (copyAs === "curl") {
      const apiUrl = absoluteUrl("/api/v1/images")
      const curl = `curl -X POST "${apiUrl}" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(requestBody)}' \\
  -o image.png`

      await navigator.clipboard.writeText(curl)
    }

    toast.success("Copied to clipboard")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          Copy Request
          <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem onClick={() => handleCopy({ copyAs: "json" })}>
          Copy as JSON
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleCopy({ copyAs: "curl" })}>
          Copy as curl
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
