import { cn } from "@/lib/utils"

/**
 * Uma única palavra de destaque dentro de um título, em Fraunces itálica com
 * WONK. No máximo uma por página. Sobre fundo de marca, troque a cor por
 * text-primary-subtle via className.
 */
export function AccentWord({ className, ...props }: React.ComponentProps<"em">) {
  return (
    <em className={cn("accent-word text-primary-active", className)} {...props} />
  )
}
