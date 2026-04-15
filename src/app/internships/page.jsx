"use client";

import { useState } from "react";
import InternshipSection from "@/components/InternshipSection";
import InternshipDetail from "@/components/InternshipDetail";
import { internships } from "@/data/internships";
import { motion } from "framer-motion";

export default function ProgramsPage() {
  const [activeInternship, setActiveInternship] = useState(null);

  // Lock body scroll when detail is open
  if (typeof window !== "undefined") {
    if (activeInternship) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  return (
    <main className="w-full min-h-screen bg-brand-deep flex relative flex-col">
      {/* Page Header */}
      <div className="w-full flex flex-col items-center justify-center pt-40 pb-16 px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-inter text-brand-accent tracking-[0.35em] text-[10px] md:text-xs uppercase mb-4 block font-bold"
        >
          Internship Programs
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="display-font text-5xl md:text-8xl font-light text-brand-white leading-tight"
        >
          Our{" "}
          <em className="italic font-bold text-brand-cream tracking-tight">
            Internships
          </em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-inter text-brand-silver font-light mt-6 text-lg tracking-tight max-w-xl"
        >
          Click any internship to explore its curriculum and outcomes.
        </motion.p>
      </div>

      {/* Programs List */}
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

      {/* Detail Overlay */}
      <InternshipDetail
        data={activeInternship}
        onClose={() => setActiveInternship(null)}
      />
    </main>
  );
}
