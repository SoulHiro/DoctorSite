import Link from "next/link"
import { HandCoins } from "lucide-react"

import { donateHref } from "@/content/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

/** CTA "Doe agora": o botão primário padrão com o ícone de doação. */
export function DonateButton({ className }: { className?: string }) {
  return (
    <Link href={donateHref} className={cn(buttonVariants(), className)}>
      <HandCoins aria-hidden="true" />
      Doe agora
    </Link>
  )
}
