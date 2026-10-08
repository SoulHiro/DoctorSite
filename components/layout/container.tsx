import { cn } from "@/lib/utils"

// Largura máxima (container-max, 1280px) e gutter únicos do site:
// space-4 no celular, space-8 do tablet em diante. Header, seções e footer
// usam o mesmo container, então as bordas do conteúdo sempre alinham.
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-4 md:px-8", className)}
      {...props}
    />
  )
}
