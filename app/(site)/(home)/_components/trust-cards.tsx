const RESULT_STATS = [
  { value: "19", label: "hospitais e postos visitados" },
  { value: "+8.000", label: "pessoas atendidas" },
] as const;

const NEXT_VISITS = [
  { label: "Hospital Annes Dias", date: "25 mai" },
  { label: "Posto de Saúde Central", date: "03 jun" },
  { label: "Asilo Recanto Feliz", date: "14 jun" },
  { label: "Nova unidade", date: "em breve" },
] as const;

export function TrustCards() {
  return (
    <section className="relative z-10 mt-6 w-full sm:mt-8 lg:-mt-8">
      <div className="grid w-full lg:grid-cols-[5fr_4fr_5fr] lg:items-center">
        <div className="flex w-full flex-col justify-center gap-6 bg-secondary-active px-8 py-10 text-white lg:h-80">
          <p className="max-w-xs text-balance font-heading text-2xl leading-snug font-semibold sm:text-3xl">
            Obrigado pelos resultados alcançados com você
          </p>
          <div className="flex gap-8">
            {RESULT_STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-3xl font-bold sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 max-w-[14ch] text-xs leading-snug tracking-wide text-white/80 uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col justify-center gap-4 bg-warning-400 px-6 py-10 text-foreground lg:h-86">
          <h3 className="font-heading text-lg font-semibold">
            Próximas visitas
          </h3>
          <ul className="flex flex-col gap-3 text-sm">
            {NEXT_VISITS.map((visit) => (
              <li
                key={visit.label}
                className="flex items-center justify-between gap-3 border-b border-foreground/15 pb-2 last:border-0 last:pb-0"
              >
                <span className="text-foreground/90">{visit.label}</span>
                <span className="shrink-0 text-foreground/70">
                  {visit.date}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-4 bg-primary-active px-8 py-10 text-center text-white lg:h-80">
          <span className="text-xs font-semibold tracking-[0.08em] text-primary-subtle uppercase">
            Ajude a gente
          </span>
          <h3 className="font-heading text-xl font-semibold sm:text-2xl">
            Seja voluntário
          </h3>
          <a
            href="#voluntariado"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-white px-5 text-sm font-semibold text-primary-active transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-white/60"
          >
            Quero ajudar
          </a>
        </div>
      </div>
    </section>
  );
}
