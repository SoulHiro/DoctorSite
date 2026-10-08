import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";

export function AboutTeaser() {
  return (
    <Section
      id="quem-somos"
      spacing="lg"
      className="mt-12 sm:mt-16 lg:mt-24"
    >
      <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16">
        <Reveal className="relative">
          <div
            role="img"
            aria-label="Voluntário(a) em visita, ajoelhado(a) ao lado do leito"
            className="aspect-[4/5] w-full rounded-lg bg-secondary-subtle"
          />
          <div
            role="img"
            aria-label="Detalhe de um jaleco colorido de doutor(a) palhaço(a)"
            className="absolute -bottom-8 -left-6 aspect-square w-2/5 rounded-lg bg-primary-subtle sm:-left-10 sm:w-1/3"
          />
        </Reveal>

        <Reveal delayMs={100} className="flex flex-col gap-6 pt-10 lg:pt-0">
          <span className="text-xs font-semibold tracking-[0.08em] text-secondary-active uppercase">
            Quem somos
          </span>

          <h2 className="max-w-md text-balance font-heading text-2xl font-semibold leading-[1.25] text-foreground sm:text-3xl">
            Um jaleco colorido pode mudar o clima de um corredor inteiro.
          </h2>

          <p className="max-w-[60ch] text-base leading-relaxed text-foreground/80">
            Levamos música, mágica, teatro e, principalmente, escuta a quem
            está passando por um momento difícil de saúde. Há 3 anos, uma
            equipe voluntária virou presença regular em hospitais, postos
            de saúde e asilos do Rio Grande do Sul.
          </p>

          <div className="flex items-center gap-4">
            <div
              role="img"
              aria-label="Voluntário(a) conversando com a equipe médica antes de uma visita"
              className="size-16 shrink-0 rounded-lg bg-secondary-subtle"
            />
            <p className="text-sm leading-relaxed text-foreground/80">
              Cada visita começa com uma conversa: o que esse quarto, esse
              corredor, essa pessoa precisam hoje.
            </p>
          </div>

          <p className="max-w-[60ch] text-base leading-relaxed text-foreground/80">
            Treinamos antes de qualquer voluntário entrar sozinho em um
            quarto, e mantemos parceria direta com a equipe médica de cada
            unidade. A seriedade do hospital nunca fica de fora.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
