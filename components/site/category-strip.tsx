import { Heart } from "lucide-react"

import { SectionContainer } from "@/components/site/section-container"

const CATEGORIES = [
  "Voluntariado",
  "Doações",
  "Hospitais",
  "Postos de Saúde",
  "Parceiros",
]

export function CategoryStrip() {
  return (
    <div className="bg-primary py-4">
      <SectionContainer className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
        {CATEGORIES.map((category) => (
          <span
            key={category}
            className="inline-flex items-center gap-2 font-heading text-sm font-bold tracking-wide text-primary-foreground uppercase sm:text-base"
          >
            <Heart className="size-4 shrink-0" aria-hidden="true" />
            {category}
          </span>
        ))}
      </SectionContainer>
    </div>
  )
}
