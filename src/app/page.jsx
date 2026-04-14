"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import InternshipSection from "@/components/InternshipSection";
import InternshipDetail from "@/components/InternshipDetail";
import Contact from "@/sections/Contact";
import { internships } from "@/data/internships";

export default function Page() {
  const [activeInternship, setActiveInternship] = useState(null);

  // Lock body scroll when detail is open
  if (typeof window !== 'undefined') {
    if (activeInternship) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  return (
    <main className="w-full min-h-screen bg-brand-deep flex relative flex-col">
      <Hero />

      {/* Immersive Programs Wrapper */}
      <div className="w-full flex-col flex relative z-10 bg-brand-deep">
        {internships.map((program, index) => (
          <InternshipSection
            key={program.id}
            data={program}
            index={index}
            onClick={() => setActiveInternship(program)}
          />
        ))}
      </div>

      <Contact />

      {/* Detail Overlay */}
      <InternshipDetail
        data={activeInternship}
        onClose={() => setActiveInternship(null)}
      />
    </main>
  );
}
