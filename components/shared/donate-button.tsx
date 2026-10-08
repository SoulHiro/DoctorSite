import { HandCoins } from "lucide-react"

import { cn } from "@/lib/utils"

type DonateButtonProps = {
  iconPosition?: "left" | "right"
  className?: string
}

export function DonateButton({
  iconPosition = "left",
  className,
}: DonateButtonProps) {
  const icon = (
    <span
      className="flex size-7 items-center justify-center rounded-full bg-white text-primary"
      aria-hidden="true"
    >
      <HandCoins className="size-4" />
    </span>
  )

  return (
    <a
      href="#contato"
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-primary py-1.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        iconPosition === "left" ? "pr-4 pl-1.5" : "pr-1.5 pl-4",
        className
      )}
    >
      {iconPosition === "left" && icon}
      Doe Agora
      {iconPosition === "right" && icon}
    </a>
  )
}
