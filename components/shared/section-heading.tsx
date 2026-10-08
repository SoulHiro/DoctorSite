import { cn } from "@/lib/utils"
import { Eyebrow } from "@/components/shared/eyebrow"

type SectionHeadingProps = {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: "start" | "center"
  as?: "h2" | "h3"
  /** `brand` para usar sobre fundo secondary-active. */
  tone?: "default" | "brand"
  className?: string
}

/** Abertura padrão de seção: eyebrow opcional, título e uma descrição curta. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  as: Heading = "h2",
  tone = "default",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex max-w-xl flex-col gap-3",
        align === "center" && "mx-auto items-center text-center",
        className
      )}
    >
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <Heading
        className={cn(
          "font-heading font-semibold text-balance",
          Heading === "h2" ? "text-h3 md:text-h2" : "text-h4 md:text-h3"
        )}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={cn(
            "max-w-prose",
            tone === "brand" ? "text-primary-foreground" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
