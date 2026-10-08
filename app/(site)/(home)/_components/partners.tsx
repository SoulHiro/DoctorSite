import { Reveal } from "@/components/motion/reveal"
import { Section } from "@/components/layout/section"

const PARTNERS = [
  "Sicredi Ibirubá",
  "Supermercado Casa do Chimarrão",
  "Hospital da Comunidade Annes Dias",
  "Indutar Tecno Metal",
  "Theo Transportes",
] as const

export function Partners() {
  return (
    <Section id="parceiros">
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
    </Section>
  )
}
