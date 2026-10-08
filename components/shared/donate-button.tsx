import { HandCoins } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

/** CTA "Doe agora": o botão primário padrão com o ícone de doação. */
export function DonateButton({ className }: { className?: string }) {
  return (
    <a href="#contato" className={cn(buttonVariants(), className)}>
      <HandCoins aria-hidden="true" />
      Doe agora
    </a>
  )
}
