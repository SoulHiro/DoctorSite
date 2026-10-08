"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { DonateButton } from "@/components/shared/donate-button";

const NAV_LINKS = [
  { href: "#quem-somos", label: "Quem Somos" },
  { href: "#impacto", label: "Impacto" },
  { href: "#lei-rouanet", label: "Lei Rouanet" },
  { href: "#faca-parte", label: "Faça Parte" },
  { href: "#contato", label: "Contato" },
] as const;

export function SiteHeader() {
  const [navVisible, setNavVisible] = useState(true);

  return (
    <header>
      <Container className="flex items-center justify-between py-6">
        <a
          href="#inicio"
          className="font-heading text-lg font-semibold text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 rounded-sm"
        >
          Doutores Palhaços
        </a>

        <div className="flex items-center gap-3">
          <div
            className={cn(
              "grid transition-[grid-template-columns] duration-base ease-out motion-reduce:transition-none",
              navVisible ? "grid-cols-[1fr]" : "grid-cols-[0fr]",
            )}
          >
            <div
              className={cn(
                "flex min-w-0 items-center gap-3 overflow-hidden transition-opacity duration-base ease-out motion-reduce:transition-none",
                navVisible ? "opacity-100" : "opacity-0",
              )}
              inert={!navVisible}
            >
              <nav
                className="hidden items-center gap-1 whitespace-nowrap md:flex"
                aria-label="Navegação principal"
              >
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <DonateButton className="hidden md:inline-flex" />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setNavVisible((v) => !v)}
            aria-expanded={navVisible}
            aria-label={
              navVisible ? "Recolher navegação" : "Expandir navegação"
            }
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
              "bg-secondary-active text-white hover:bg-secondary",
            )}
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
        </div>
      </Container>
    </header>
  );
}
