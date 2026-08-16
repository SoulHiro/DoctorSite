import { ImageIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type ImagePlaceholderProps = {
  label: string
  tone?: "primary" | "secondary" | "neutral"
  className?: string
}

const TONE_CLASSES: Record<NonNullable<ImagePlaceholderProps["tone"]>, string> = {
  primary: "bg-primary-subtle text-secondary",
  secondary: "bg-secondary-subtle text-secondary-active",
  neutral: "bg-muted text-foreground/70",
}

/**
 * Stand-in for a real photo. Marks where an image belongs and what it should
 * show, so photos can be dropped in later without touching layout code.
 */
export function ImagePlaceholder({
  label,
  tone = "neutral",
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`Espaço reservado para foto: ${label}`}
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-current/25 p-4 text-center",
        TONE_CLASSES[tone],
        className
      )}
    >
      <ImageIcon className="size-6 shrink-0 opacity-60" aria-hidden="true" />
      <span className="max-w-[22ch] text-xs leading-snug font-medium">
        {label}
      </span>
    </div>
  )
}
