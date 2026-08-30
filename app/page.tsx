import { TopBar } from "@/components/site/topbar";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { MissionVideo } from "@/components/site/mission-video";
import { TrustCards } from "@/components/site/trust-cards";
import { AboutTeaser } from "@/components/site/about-teaser";
import { CausesGrid } from "@/components/site/causes-grid";
import { Team } from "@/components/site/team";
import { VolunteerCta } from "@/components/site/volunteer-cta";
import { Partners } from "@/components/site/partners";
import { ContactFooter } from "@/components/site/contact-footer";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:rounded-lg focus-visible:bg-primary focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-medium focus-visible:text-primary-foreground"
      >
        Pular para o conteúdo
      </a>
      <div className="relative">
        <div className="absolute inset-x-0 top-0 z-20 bg-gradient-to-b from-white/80 via-white/35 to-transparent pb-8">
          <TopBar />
          <Header />
        </div>
        <main id="main">
          <Hero />
          <TrustCards />
          <AboutTeaser />
          <MissionVideo />
          <CausesGrid />
          <Team />
          <VolunteerCta />
          <Partners />
        </main>
      </div>
      <ContactFooter />
    </>
  );
}
