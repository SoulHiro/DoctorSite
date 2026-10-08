"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { DonateButton } from "@/components/shared/donate-button";
import { Wordmark } from "@/components/shared/wordmark";

import { SiteMenu } from "./site-menu";
import { SiteNav } from "./site-nav";

// Header fixo no topo (sticky). Na Home ele fica transparente sobre o hero
// até a página rolar; nas demais páginas é sempre sólido.
export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const overHero = pathname === "/" && !scrolled;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,box-shadow] duration-base ease-out",
        // Sobre o hero: totalmente transparente. Depois: fundo e uma linha
        // de 1px (box-shadow, para não mudar a altura do header).
        overHero
          ? "bg-transparent"
          : "bg-background/95 shadow-[0_1px_0_var(--color-border)] backdrop-blur-sm"
      )}
    >
      <Container>
        {/* Wrapper sem padding: referência para posicionar o menu (left em %). */}
        <div className="relative flex h-20 items-center justify-between gap-6">
          <Wordmark />

          {/* Sobre o hero da Home, o menu encosta à direita e o CTA some (o
              hero tem o seu). Ao rolar, o menu desliza para o centro e o CTA
              aparece no lugar. Anima left + translate, que transicionam suave. */}
          <SiteNav
            className={cn(
              // w-max: posicionado com left em %, o menu encolheria até quebrar
              // os nomes; a largura fica sempre a do conteúdo.
              "absolute top-1/2 hidden w-max -translate-y-1/2 transition-[left,translate] duration-slow ease-out lg:block motion-reduce:transition-none",
              overHero ? "left-full -translate-x-full" : "left-1/2 -translate-x-1/2"
            )}
          />

          <div className="flex items-center gap-3">
            <DonateButton
              className={cn(
                "hidden transition-[opacity,visibility,translate] duration-slow ease-out sm:inline-flex motion-reduce:transition-none",
                overHero && "invisible translate-x-2 opacity-0"
              )}
            />
            <SiteMenu className="lg:hidden" />
          </div>
        </div>
      </Container>
    </header>
  );
}
