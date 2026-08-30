import { Reveal } from "@/components/site/reveal"
import { SectionContainer } from "@/components/site/section-container"

export function VolunteerCta() {
  return (
    <section id="voluntariado" className="bg-secondary-active text-white">
      <SectionContainer className="py-16 sm:py-20 lg:py-24">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-xl">
            <h2 className="text-balance font-heading text-3xl font-semibold leading-[1.2] sm:text-4xl">
              Não precisa saber malabarismo. Precisa querer aparecer.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/85">
              Voluntários novos passam por uma conversa inicial e acompanham
              uma visita antes de entrar de vez. Não tem pré-requisito de
              experiência em palhaçaria: tem treinamento e uma equipe que
              ensina no dia a dia.
            </p>
          </Reveal>

          <Reveal delayMs={100}>
            <a
              href="#contato"
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-white/50"
            >
              Quero ser voluntário
            </a>
          </Reveal>
        </div>
      </SectionContainer>
    </section>
  )
}
