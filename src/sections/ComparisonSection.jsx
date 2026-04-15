"use client";

import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.85, ease: "circOut", delay },
});

const comparisons = [
  { left: "Not just videos", right: "Real deliverables you can show employers" },
  { left: "Not just theory", right: "Team-based builds with mentor review" },
  { left: "Not just certificates", right: "Portfolio-ready work that speaks for itself" },
  { left: "Not just assignments", right: "Projects used in real-world contexts" },
];

const outcomes = [
  "Build real projects you can show in interviews",
  "Walk away with a verified portfolio — not just a PDF",
  "Get reviewed by professionals who actually work in the industry",
  "Certificate backed by real project evidence",
];

export default function ComparisonSection() {
  return (
    <section className="relative w-full py-28 md:py-36 px-6 md:px-16 bg-brand-deep overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span {...fadeUp(0)} className="inline-block font-inter text-brand-accent tracking-[0.4em] text-[10px] uppercase font-bold mb-5">
            The Difference
          </motion.span>
          <motion.h2 {...fadeUp(0.1)} className="display-font text-[clamp(1.8rem,4vw,4.5rem)] font-light text-brand-white leading-tight tracking-tight">
            GoThree vs. <em className="italic font-bold text-brand-cream">everything else.</em>
          </motion.h2>
        </div>

        {/* Comparison rows */}
        <div className="flex flex-col gap-3 mb-20">
          {comparisons.map((row, i) => (
            <motion.div
              key={i}
              {...fadeUp(i * 0.08)}
              className="grid grid-cols-2 glass-panel border border-brand-ash/30 rounded-xl overflow-hidden hover:border-brand-accent/30 transition-colors duration-300"
            >
              {/* Left: what we're NOT */}
              <div className="flex items-center gap-3 px-6 py-4 border-r border-brand-ash/30">
                <div className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-2.5 h-2.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <span className="font-inter text-sm text-brand-mist line-through decoration-brand-ash/60">{row.left}</span>
              </div>
              {/* Right: what we ARE */}
              <div className="flex items-center gap-3 px-6 py-4">
                <div className="w-5 h-5 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-2.5 h-2.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span className="font-inter text-sm text-brand-white font-medium">{row.right}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Outcomes: right-aligned floating cards */}
        <div className="flex flex-col items-end gap-3">
          <motion.span {...fadeUp(0)} className="font-inter text-brand-accent tracking-[0.3em] text-[10px] uppercase font-bold mb-2">
            What you walk away with
          </motion.span>
          {outcomes.map((o, i) => (
            <motion.div
              key={i}
              {...fadeUp(i * 0.07)}
              className="max-w-lg w-full glass-panel border border-brand-ash/30 rounded-xl px-6 py-4 flex items-center gap-4 hover:border-brand-accent/40 transition-colors duration-300"
            >
              <div className="w-8 h-8 rounded-lg bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
              </div>
              <p className="font-inter text-sm text-brand-silver leading-snug">{o}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
