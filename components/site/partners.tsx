import { Reveal } from "@/components/site/reveal"
import { SectionContainer } from "@/components/site/section-container"

const PARTNERS = [
  "Sicredi Ibirubá",
  "Supermercado Casa do Chimarrão",
  "Hospital da Comunidade Annes Dias",
  "Indutar Tecno Metal",
  "Theo Transportes",
] as const

export function Partners() {
  return (
    <section id="parceiros" className="bg-background">
      <SectionContainer className="py-16 sm:py-20 lg:py-24">
        <Reveal>
          <p className="text-sm font-medium tracking-[0.04em] text-foreground/70">
            Quem já apoia essas visitas
          </p>
        </Reveal>

        <Reveal
          delayMs={80}
          className="mt-6 flex flex-wrap gap-x-10 gap-y-4 border-t border-border pt-6"
        >
          {PARTNERS.map((partner) => (
            <span
              key={partner}
              className="font-heading text-lg font-medium text-foreground/80 sm:text-xl"
            >
              {partner}
            </span>
          ))}
        </Reveal>
      </SectionContainer>
    </section>
  )
}
