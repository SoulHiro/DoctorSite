import { SplashScreen } from "@/components/shared/splash-screen";

import { TopBar } from "./_components/top-bar";
import { SiteHeader } from "./_components/site-header";
import { SiteFooter } from "./_components/site-footer";

// Moldura das páginas públicas. Hoje o header fica sobreposto ao topo da
// página porque a Home abre com um hero de tela cheia; páginas sem hero vão
// precisar de outra estratégia (ver docs/ARCHITECTURE.md).
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SplashScreen />
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:rounded-lg focus-visible:bg-primary focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-medium focus-visible:text-primary-foreground"
      >
        Pular para o conteúdo
      </a>
      <div className="relative">
        <div className="absolute inset-x-0 top-0 z-20 bg-gradient-to-b from-white/80 via-white/35 to-transparent pb-8">
          <TopBar />
          <SiteHeader />
        </div>
        <main id="main">{children}</main>
      </div>
      <SiteFooter />
    </>
  );
}
