import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// `tight` e `wide` reproduzem os antigos PageContainer (px-4) e
// SectionContainer (px-12). Unificar no gutter do DESIGN.md (px-4 md:px-8)
// fica para a branch da Home, porque muda o alinhamento visual.
const containerVariants = cva("mx-auto w-full max-w-7xl", {
  variants: {
    gutter: {
      tight: "px-4",
      wide: "px-12",
    },
  },
  defaultVariants: {
    gutter: "tight",
  },
})

type ContainerProps = React.ComponentProps<"div"> &
  VariantProps<typeof containerVariants>

export function Container({ gutter, className, ...props }: ContainerProps) {
  return (
    <div className={cn(containerVariants({ gutter }), className)} {...props} />
  )
}
