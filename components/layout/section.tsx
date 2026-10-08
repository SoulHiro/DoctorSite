import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Container } from "@/components/layout/container"

const sectionVariants = cva("relative isolate", {
  variants: {
    tone: {
      background: "bg-background",
      surface: "bg-surface",
      brand: "bg-secondary-active text-white",
    },
  },
  defaultVariants: {
    tone: "background",
  },
})

const spacingVariants = cva("", {
  variants: {
    spacing: {
      md: "py-16 sm:py-20 lg:py-24",
      lg: "py-16 sm:py-20 lg:py-28",
    },
  },
  defaultVariants: {
    spacing: "md",
  },
})

type SectionProps = React.ComponentProps<"section"> &
  VariantProps<typeof sectionVariants> &
  VariantProps<typeof spacingVariants> & {
    gutter?: React.ComponentProps<typeof Container>["gutter"]
    containerClassName?: string
    /** Camada decorativa (vetores, confetes) atrás do conteúdo. */
    decoration?: React.ReactNode
  }

/**
 * Bloco de página padrão: fundo, ritmo vertical e Container.
 * `isolate` mantém o z-index das camadas decorativas preso à seção.
 */
export function Section({
  tone,
  spacing,
  gutter = "wide",
  className,
  containerClassName,
  decoration,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn(sectionVariants({ tone }), className)} {...props}>
      {decoration && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          {decoration}
        </div>
      )}
      <Container
        gutter={gutter}
        className={cn(spacingVariants({ spacing }), containerClassName)}
      >
        {children}
      </Container>
    </section>
  )
}
