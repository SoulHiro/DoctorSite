import { cn } from "@/lib/utils"

type StatProps = {
  /** Já formatado, ex.: "+8.000". */
  value: string
  label: string
  /** `brand` para usar sobre fundo secondary-active. */
  tone?: "default" | "brand"
  className?: string
}

/**
 * Número de impacto. Renderiza um par <dt>/<dd>: use dentro de um <dl>.
 * O rótulo vem antes no DOM (leitores de tela leem "anos de atuação: 3"),
 * mas aparece abaixo do número.
 */
export function Stat({ value, label, tone = "default", className }: StatProps) {
  return (
    <div className={cn("flex flex-col-reverse gap-1", className)}>
      <dt
        className={cn(
          "max-w-[18ch] text-body-sm",
          tone === "brand" ? "text-primary-foreground" : "text-muted-foreground"
        )}
      >
        {label}
      </dt>
      <dd className="text-h2 font-bold tracking-tight tabular-nums md:text-stat">
        {value}
      </dd>
    </div>
  )
}
