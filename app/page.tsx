import { TopBar } from "@/components/site/topbar";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Impact } from "@/components/site/impact";
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
      <TopBar />
      <Header />
      <main id="main">
        <Hero />
        {/* <Impact /> */}
        <AboutTeaser />
        <CausesGrid />
        <Team />
        <VolunteerCta />
        <Partners />
      </main>
      <ContactFooter />
    </>
  );
}
