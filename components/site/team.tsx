import { Reveal } from "@/components/site/reveal"
import { SectionContainer } from "@/components/site/section-container"

const TEAM = [
  {
    name: "Dra. Esperança",
    blurb:
      "Fica ao lado de quem está esperando: acompanhantes no corredor, famílias na sala de espera. Traz calma antes de trazer risada.",
    tone: "primary" as const,
  },
  {
    name: "Dr. Alegria",
    blurb:
      "Entra com música e mágica, quebra o silêncio de um quarto em segundos. É quem as crianças pedem pra ver de novo.",
    tone: "secondary" as const,
  },
  {
    name: "Dra. Sorriso",
    blurb:
      "Trabalha no detalhe: o nome certo, a piada certa, o momento de só ficar em silêncio junto. O acolhimento que fica na memória.",
    tone: "primary" as const,
  },
]

export function Team() {
  return (
    <section id="equipe" className="bg-surface">
      <SectionContainer className="py-16 sm:py-20 lg:py-28">
        <Reveal className="max-w-xl">
          <h2 className="text-balance font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            Os personagens que abrem a porta do quarto
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground/70">
            Cada doutor(a) palhaço(a) da equipe constrói um personagem
            próprio. Três deles você vai encontrar com mais frequência nas
            visitas.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:mt-14 sm:grid-cols-6 sm:gap-8">
          {TEAM.map((member, index) => (
            <Reveal
              key={member.name}
              delayMs={index * 90}
              className={
                index === 0
                  ? "sm:col-span-4"
                  : index === 1
                    ? "sm:col-span-2 sm:translate-y-8"
                    : "sm:col-span-3"
              }
            >
              <div className="flex h-full flex-col gap-4 rounded-lg bg-background p-6 shadow-sm">
                <span
                  className={
                    "flex size-14 items-center justify-center rounded-full font-heading text-lg font-semibold " +
                    (member.tone === "primary"
                      ? "bg-primary-subtle text-secondary"
                      : "bg-secondary-subtle text-secondary-active")
                  }
                  aria-hidden="true"
                >
                  {member.name
                    .replace(/^(Dra?\.)\s/, "")
                    .slice(0, 2)
                    .toUpperCase()}
                </span>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-foreground">
                    {member.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                    {member.blurb}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionContainer>
    </section>
  )
}
