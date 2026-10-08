"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

import { getVisibleNav, site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DonateButton } from "@/components/shared/donate-button";
import { Wordmark } from "@/components/shared/wordmark";

const topLevelClass =
  "block py-4 font-heading text-h5 font-semibold text-foreground transition-colors duration-fast ease-out hover:text-primary-active aria-[current=page]:text-primary-active";

// Menu do celular e tablet (abaixo de lg). Usa <dialog> nativo: showModal()
// já prende o foco, deixa o resto da página inerte e fecha com Esc. Os grupos
// do menu viram acordeões (<details>).
export function SiteMenu({ className }: { className?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const nav = getVisibleNav();

  // Fecha ao navegar para outra página.
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        aria-label="Abrir menu"
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
        className={className}
      >
        <Menu aria-hidden="true" />
      </Button>

      <dialog
        ref={dialogRef}
        aria-label="Menu"
        // Clique no fundo escurecido (fora do painel) fecha o menu.
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="site-menu fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-full max-w-sm bg-background p-0 text-foreground shadow-sm backdrop:bg-foreground/40 open:animate-in open:slide-in-from-right motion-reduce:open:animate-none"
      >
        <div className="flex h-full flex-col gap-8 px-6 pt-5 pb-8">
          <div className="flex items-center justify-between">
            <Wordmark />
            <Button
              variant="ghost"
              size="icon"
              aria-label="Fechar menu"
              onClick={() => dialogRef.current?.close()}
            >
              <X aria-hidden="true" />
            </Button>
          </div>

          <nav aria-label="Navegação principal" className="-mx-1 min-h-0 overflow-y-auto px-1">
            <ul className="flex flex-col">
              {nav.map((entry) =>
                entry.type === "link" ? (
                  <li key={entry.href} className="border-b border-border">
                    <Link
                      href={entry.href}
                      aria-current={pathname === entry.href ? "page" : undefined}
                      className={topLevelClass}
                    >
                      {entry.label}
                    </Link>
                  </li>
                ) : (
                  <li key={entry.label} className="border-b border-border">
                    <details className="group">
                      <summary className={cn(topLevelClass, "flex cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden")}>
                        {entry.label}
                        <ChevronDown
                          className="size-5 transition-transform duration-fast ease-out group-open:rotate-180 motion-reduce:transition-none"
                          aria-hidden="true"
                        />
                      </summary>
                      <ul className="flex flex-col pb-3">
                        {entry.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              aria-current={pathname === item.href ? "page" : undefined}
                              className="block rounded-lg px-3 py-2 text-body-sm font-medium text-foreground transition-colors duration-fast ease-out hover:bg-muted aria-[current=page]:text-primary-active"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                )
              )}
            </ul>
          </nav>

          <DonateButton className="w-full" />

          <p className="mt-auto text-body-sm text-muted-foreground">
            {site.location} ·{" "}
            <a href={`mailto:${site.email}`} className="underline underline-offset-4">
              {site.email}
            </a>
          </p>
        </div>
      </dialog>
    </>
  );
}
