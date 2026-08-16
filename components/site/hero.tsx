import { CalendarCheck, GraduationCap, Handshake } from "lucide-react";

import { PageContainer } from "@/components/site/page-container";
import { DonateButton } from "@/components/site/donate-button";
import { ImagePlaceholder } from "@/components/site/image-placeholder";

const TRUST_ITEMS = [
  {
    icon: CalendarCheck,
    title: "Visitas planejadas",
    text: "Cada visita é combinada com a equipe médica antes de acontecer. Nunca improvisada, nunca invasiva.",
    href: "#quem-somos",
  },
  {
    icon: GraduationCap,
    title: "Equipe treinada",
    text: "Voluntários passam por preparo e acompanham uma visita antes de entrar sozinhos em um quarto.",
    href: "#faca-parte",
  },
  {
    icon: Handshake,
    title: "Presença regular",
    text: "Não é ação pontual: retornamos aos mesmos hospitais e postos de saúde, mês após mês.",
    href: "#impacto",
  },
] as const;

export function Hero() {
  return (
    <section id="inicio" className="bg-surface">
      <PageContainer className="relative z-10">
        <div className="grid gap-10 rounded-4xl bg-muted px-18 lg:grid-cols-[6fr_5fr] lg:items-center lg:gap-12">
          <div className="flex flex-col items-start gap-6">
            <h1 className="max-w-xl text-balance font-heading text-[clamp(2.5rem,5.5vw,3.815rem)] leading-[1.1] font-bold text-foreground">
              Um{" "}
              <span className="font-accent text-secondary font-normal">
                sorriso
              </span>{" "}
              que cura
            </h1>

            <p className="max-w-xl text-pretty text-lg leading-relaxed text-foreground/80">
              Levamos alegria, acolhimento e descontração a pacientes,
              acompanhantes e equipes de saúde através da arte da palhaçaria
              hospitalar. Há 3 anos visitando hospitais, postos de saúde e
              asilos do Rio Grande do Sul.
            </p>

            <DonateButton iconPosition="right" className="h-11 px-6" />
          </div>

          <div
            className="grid h-[20rem] grid-cols-2 gap-3 sm:h-[24rem] lg:h-[26rem]"
            aria-label="Colagem de fotos da equipe em visita"
          >
            <ImagePlaceholder
              label="Doutor(a) palhaço(a) sorrindo com um paciente"
              tone="primary"
              className="col-span-1 row-span-2 -rotate-1"
            />
            <ImagePlaceholder
              label="Detalhe do nariz de palhaço e jaleco colorido"
              tone="secondary"
              className="col-span-1 rotate-1"
            />
            <ImagePlaceholder
              label="Equipe brincando no corredor do hospital"
              tone="neutral"
              className="col-span-1 -rotate-1"
            />
          </div>
        </div>
      </PageContainer>

      <div className="-mt-24 flex min-h-112 flex-col justify-end bg-secondary-active sm:-mt-32 sm:min-h-128 lg:-mt-58 lg:min-h-144">
        <PageContainer className="grid gap-8 px-24 pb-20 sm:grid-cols-3 sm:gap-10 sm:pb-24">
          {TRUST_ITEMS.map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <span
                className="flex size-14 shrink-0 items-center justify-center rounded-full bg-white text-secondary"
                aria-hidden="true"
              >
                <item.icon className="size-6" />
              </span>
              <div>
                <h3 className="font-heading text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">
                  {item.text}
                </p>
                <a
                  href={item.href}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-subtle transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-white/50 rounded-sm"
                >
                  Saiba mais <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          ))}
        </PageContainer>
      </div>
    </section>
  );
}
