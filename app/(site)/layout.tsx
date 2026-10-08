import { SplashScreen } from "@/components/shared/splash-screen";

import { TopBar } from "./_components/top-bar";
import { SiteHeader } from "./_components/site-header";
import { SiteFooter } from "./_components/site-footer";

// Moldura das páginas públicas: TopBar (rola com a página), header fixo no
// topo e footer. Na Home o hero sobe por baixo do header (ver hero.tsx).
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
      <TopBar />
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}
