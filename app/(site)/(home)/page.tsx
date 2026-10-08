import { Hero } from "./_components/hero";
import { MissionVideo } from "./_components/mission-video";
import { TrustCards } from "./_components/trust-cards";
import { AboutTeaser } from "./_components/about-teaser";
import { CausesGrid } from "./_components/causes-grid";
import { Team } from "./_components/team";
import { VolunteerCta } from "./_components/volunteer-cta";
import { Partners } from "./_components/partners";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustCards />
      <AboutTeaser />
      <MissionVideo />
      <CausesGrid />
      <Team />
      <VolunteerCta />
      <Partners />
    </>
  );
}
