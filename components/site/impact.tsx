import { Reveal } from "@/components/site/reveal";

const STATS = [
  { value: "19", label: "hospitais visitados no Rio Grande do Sul" },
  { value: "+8.000", label: "pacientes e famílias atendidas" },
  { value: "3", label: "anos de atuação contínua" },
] as const;

export function Impact() {
  return (
    <section id="impacto" className="bg-secondary-active text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <Reveal>
          <p className="max-w-2xl text-pretty text-lg leading-relaxed text-white/90 sm:text-xl">
            Cada visita é planejada com hospitais e postos de saúde, nunca
            improvisada. É assim que, em três anos, uma equipe voluntária virou
            presença regular em quase duas dezenas de unidades de saúde.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-col divide-y divide-white/15 border-t border-white/15 sm:mt-12 sm:flex-row sm:divide-x sm:divide-y-0 sm:border-t-0">
          {STATS.map((stat, index) => (
            <Reveal
              key={stat.label}
              delayMs={index * 80}
              className="flex-1 py-6 first:pt-0 sm:px-8 sm:py-0 sm:first:pl-0 sm:first:pt-0 sm:last:pr-0"
            >
              <p className="font-heading text-4xl font-bold sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 max-w-[22ch] text-sm leading-snug text-white/80">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
