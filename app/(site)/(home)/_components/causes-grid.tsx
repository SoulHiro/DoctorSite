import { Building2, Heart, Stethoscope, Users } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { Section } from "@/components/layout/section"
import { CategoryStrip } from "./category-strip"

const CAUSES = [
  {
    icon: Building2,
    title: "Visitas ao leito",
    text: "Visitas regulares aos leitos, sempre combinadas com a equipe médica de cada unidade.",
    tone: "secondary" as const,
  },
  {
    icon: Stethoscope,
    title: "Salas de espera",
    text: "Levamos leveza também pra quem espera consulta ou exame, não só pra internados.",
    tone: "primary" as const,
  },
  {
    icon: Heart,
    title: "Companhia e música",
    text: "Música, conversa e companhia pra moradores que recebem poucas visitas.",
    tone: "secondary" as const,
  },
  {
    icon: Users,
    title: "Cuidando de quem cuida",
    text: "O cansaço de quem trabalha em saúde também importa. Paramos pra fazer rir a equipe.",
    tone: "primary" as const,
  },
]

const TONE_CLASSES = {
  primary: "bg-primary-subtle text-primary-active",
  secondary: "bg-secondary-subtle text-secondary-active",
} as const

export function CausesGrid() {
  return (
    <>
      <Section tone="surface" spacing="lg">
        <Reveal className="mx-auto max-w-xl text-center">
          <h2 className="text-balance font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            Onde a equipe entra em cena
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-foreground/70">
            Cada tipo de visita pede um jeito diferente de aparecer. É por
            isso que treinamos pra ler a sala antes de fazer qualquer piada.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-10 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {CAUSES.map((cause, index) => (
            <Reveal
              key={cause.title}
              delayMs={index * 70}
              className="flex flex-col items-center gap-3 text-center"
            >
              <span
                className={`flex size-16 shrink-0 items-center justify-center rounded-full ${TONE_CLASSES[cause.tone]}`}
                aria-hidden="true"
              >
                <cause.icon className="size-7" />
              </span>
              <h3 className="font-heading text-lg font-semibold text-foreground">
                {cause.title}
              </h3>
              <p className="max-w-[26ch] text-sm leading-relaxed text-foreground/70">
                {cause.text}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex justify-center sm:mt-16">
          <a
            href="#contato"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Saiba como ajudar
          </a>
        </div>
      </Section>

      <CategoryStrip />
    </>
  )
}
