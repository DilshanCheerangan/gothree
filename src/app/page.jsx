import Hero from "@/components/Hero";
import EthosSection from "@/sections/EthosSection";
import MissionSection from "@/sections/MissionSection";
import SpecialtySection from "@/sections/SpecialtySection";
import ServicesSection from "@/sections/ServicesSection";
import FinalCTA from "@/sections/FinalCTA";

export default function Page() {
  return (
    <main className="relative w-full min-h-screen bg-transparent flex flex-col">

      {/* SCENE 0: Hero */}
      <Hero />

      {/* SCENE 1: Ethos Comparison */}
      <EthosSection />

      {/* SCENE 2: Mission */}
      <MissionSection />

      {/* SCENE 3: Specialty Reveal */}
      <SpecialtySection />

      {/* SCENE 4: Services Carousel */}
      <ServicesSection />

      {/* SCENE 5: Final CTA */}
      <FinalCTA />
    </main>
  );
}
