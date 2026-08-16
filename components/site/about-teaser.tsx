"use client"

import { Tabs } from "@base-ui/react/tabs"
import { Check } from "lucide-react"

import { Reveal } from "@/components/site/reveal"
import { ImagePlaceholder } from "@/components/site/image-placeholder"

const TABS = [
  {
    value: "missao",
    label: "Nossa missão",
    text: "Levar alegria e acolhimento a quem está passando por um momento difícil de saúde, através da arte da palhaçaria hospitalar.",
  },
  {
    value: "visao",
    label: "Nossa visão",
    text: "Ser presença constante em cada hospital, posto de saúde e asilo da região. Não uma visita ocasional, uma rotina que se pode contar.",
  },
  {
    value: "como",
    label: "Como ajudamos",
    text: "Música, mágica, teatro e, principalmente, escuta. Cada visita é pensada a partir do paciente que está na nossa frente, não de um roteiro fixo.",
  },
] as const

const CHECKLIST = [
  "19 hospitais e postos de saúde visitados no RS",
  "Treinamento antes de qualquer voluntário entrar sozinho em um quarto",
  "Parceria direta com a equipe médica de cada unidade",
]

export function AboutTeaser() {
  return (
    <section id="quem-somos" className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <Reveal className="relative">
            <ImagePlaceholder
              label="Voluntário(a) em visita, ajoelhado(a) ao lado do leito"
              tone="secondary"
              className="aspect-[4/5] w-full"
            />
            <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-lg bg-surface px-4 py-3 shadow-sm">
              <span className="font-heading text-2xl font-bold text-secondary">
                3 anos
              </span>
              <span className="max-w-[16ch] text-xs leading-snug text-foreground/70">
                de visitas regulares no Rio Grande do Sul
              </span>
            </div>
          </Reveal>

          <Reveal delayMs={100} className="flex flex-col gap-6 pt-6 lg:pt-0">
            <h2 className="max-w-lg text-balance font-heading text-3xl font-semibold leading-[1.2] text-foreground sm:text-4xl">
              Um jaleco colorido pode mudar o clima de um corredor inteiro.
            </h2>

            <Tabs.Root defaultValue="missao" className="flex flex-col gap-4">
              <Tabs.List className="relative flex flex-wrap gap-2 border-b border-border">
                {TABS.map((tab) => (
                  <Tabs.Tab
                    key={tab.value}
                    value={tab.value}
                    className="rounded-t-lg px-3 py-2 text-sm font-medium text-foreground/70 outline-none transition-colors data-[selected]:text-secondary hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {tab.label}
                  </Tabs.Tab>
                ))}
                <Tabs.Indicator className="absolute bottom-0 h-0.5 w-(--active-tab-width) translate-x-(--active-tab-left) bg-primary transition-all duration-base ease-out" />
              </Tabs.List>
              {TABS.map((tab) => (
                <Tabs.Panel key={tab.value} value={tab.value}>
                  <p className="max-w-[60ch] text-base leading-relaxed text-foreground/80">
                    {tab.text}
                  </p>
                </Tabs.Panel>
              ))}
            </Tabs.Root>

            <ul className="flex flex-col gap-2.5">
              {CHECKLIST.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/80">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-secondary-active"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="#equipe"
              className="inline-flex h-10 w-fit items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              Conheça a equipe
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
