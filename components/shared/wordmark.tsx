import Link from "next/link"

import { cn } from "@/lib/utils"

/** Marca tipográfica provisória, enquanto não existe logo. Sempre leva à Home. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("inline-flex flex-col gap-0.5 rounded-sm text-foreground", className)}
    >
      <span className="text-caption text-muted-foreground uppercase">
        SOS Bom Humor
      </span>
      <span className="font-heading text-h5 font-semibold">Doutores Palhaços</span>
    </Link>
  )
}
