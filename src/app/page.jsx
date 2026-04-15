"use client";

import Hero from "@/components/Hero";
import EthosSection from "@/sections/EthosSection";
import JourneySection from "@/sections/JourneySection";
import ComparisonSection from "@/sections/ComparisonSection";
import DomainsSection from "@/sections/DomainsSection";
import WhySection from "@/sections/WhySection";

export default function Page() {
  return (
    <main className="w-full min-h-screen bg-brand-deep flex relative flex-col">
      {/* 1 · Full-viewport cinematic hero */}
      <Hero />

      {/* 2 · Real Talk: No lectures, no passive learning, only building */}
      <EthosSection />

      {/* 3 · The journey: Pick domain → Real projects → Get certified */}
      <JourneySection />

      {/* 4 · GoThree vs everything else (comparison table + outcomes) */}
      <ComparisonSection />

      {/* 5 · Open domains: real internship cards from data */}
      <DomainsSection />

      {/* 6 · Why GoThree + final CTA banner */}
      <WhySection />
    </main>
  );
}
