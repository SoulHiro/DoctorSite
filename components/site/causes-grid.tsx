import { Building2, Heart, Stethoscope, Users } from "lucide-react"

import { Reveal } from "@/components/site/reveal"
import { ImagePlaceholder } from "@/components/site/image-placeholder"
import { CategoryStrip } from "@/components/site/category-strip"

const CAUSES = [
  {
    icon: Building2,
    tag: "Hospitais",
    title: "Visitas ao leito",
    text: "Visitas regulares aos leitos, sempre combinadas com a equipe médica de cada unidade.",
    tone: "primary" as const,
    featured: false,
  },
  {
    icon: Stethoscope,
    tag: "Postos de saúde",
    title: "Salas de espera",
    text: "Levamos leveza também pra quem espera consulta ou exame, não só pra internados.",
    tone: "secondary" as const,
    featured: true,
  },
  {
    icon: Heart,
    tag: "Asilos",
    title: "Companhia e música",
    text: "Música, conversa e companhia pra moradores que recebem poucas visitas.",
    tone: "primary" as const,
    featured: false,
  },
  {
    icon: Users,
    tag: "Equipes de saúde",
    title: "Cuidando de quem cuida",
    text: "O cansaço de quem trabalha em saúde também importa. Paramos pra fazer rir a equipe.",
    tone: "secondary" as const,
    featured: false,
  },
]

export function CausesGrid() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <Reveal className="max-w-xl">
          <h2 className="text-balance font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            Onde a equipe entra em cena
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground/70">
            Cada tipo de visita pede um jeito diferente de aparecer. É por
            isso que treinamos pra ler a sala antes de fazer qualquer piada.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {CAUSES.map((cause, index) => (
            <Reveal
              key={cause.tag}
              delayMs={index * 70}
              className={
                "flex flex-col overflow-hidden rounded-lg shadow-sm " +
                (cause.featured ? "bg-primary-subtle" : "bg-background")
              }
            >
              <div className="relative">
                <ImagePlaceholder
                  label={`Foto: ${cause.tag.toLowerCase()}`}
                  tone={cause.tone}
                  className="aspect-[4/3] w-full rounded-none border-0"
                />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-secondary shadow-sm">
                  <cause.icon className="size-3.5" aria-hidden="true" />
                  {cause.tag}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-5">
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {cause.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground/70">
                    {cause.text}
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between gap-2 border-t border-border pt-3 text-xs text-foreground/60">
                  <span>Meta de apoio a definir com a equipe</span>
                </div>

                <a
                  href="#contato"
                  className={
                    "inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 " +
                    (cause.featured
                      ? "bg-primary text-primary-foreground hover:bg-primary-hover"
                      : "bg-secondary-active text-white hover:bg-secondary-700")
                  }
                >
                  Saiba como ajudar
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <CategoryStrip />
    </section>
  )
}
