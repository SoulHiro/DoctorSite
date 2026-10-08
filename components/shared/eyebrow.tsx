import { cn } from "@/lib/utils"

type EyebrowProps = React.ComponentProps<"p"> & {
  /** `brand` para usar sobre fundo secondary-active. */
  tone?: "default" | "brand"
}

/** Rótulo curto em maiúsculas acima de um título. */
export function Eyebrow({ tone = "default", className, ...props }: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-caption uppercase",
        tone === "brand" ? "text-primary-subtle" : "text-secondary-active",
        className
      )}
      {...props}
    />
  )
}
