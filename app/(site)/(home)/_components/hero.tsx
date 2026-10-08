import Image from "next/image";

import { Container } from "@/components/layout/container";
import { DonateButton } from "@/components/shared/donate-button";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex h-screen w-full items-end overflow-hidden"
    >
      <Image
        src="/hero-doctors.png"
        alt="Equipe de doutores(as) palhaços(as) em uma sala de recreação hospitalar"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/25 to-transparent"
      />

      <Container className="relative z-10 pb-16 sm:pb-20 lg:pb-24">
        <div className="flex max-w-xl flex-col items-start gap-6">
          <h1 className="text-balance font-heading text-[clamp(2.5rem,5.5vw,3.815rem)] leading-[1.1] font-bold text-foreground">
            Um <span className="font-accent font-normal">sorriso</span> que cura
          </h1>

          <p className="text-pretty text-lg leading-relaxed text-foreground/80">
            Palhaçaria hospitalar em hospitais e postos de saúde do Rio Grande
            do Sul, há 3 anos.
          </p>

          <DonateButton iconPosition="right" className="h-11 px-6" />
        </div>
      </Container>
    </section>
  );
}
