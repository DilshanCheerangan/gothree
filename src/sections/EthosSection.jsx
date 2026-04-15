"use client";

import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.85, ease: "circOut", delay },
});

const ethos = [
  {
    label: "No lectures.",
    strikethrough: true,
    desc: "Every session replaces a lecture with a real project brief. You don't watch — you build.",
  },
  {
    label: "No passive learning.",
    strikethrough: true,
    desc: "No video playlists. No MCQ quizzes. Every session produces a deliverable your mentor reviews.",
  },
  {
    label: "Only building.",
    strikethrough: false,
    desc: "Real project briefs. Real team collaboration. Real feedback. A real portfolio by the end.",
  },
];

export default function EthosSection() {
  return (
    <section className="relative w-full py-28 md:py-36 px-6 md:px-16 bg-brand-charcoal overflow-hidden">
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-ash/50 to-transparent" />

      {/* Background accent circles */}
      <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full border border-brand-accent/5" />
      <div className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full border border-brand-accent/5" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.span {...fadeUp(0)} className="inline-block font-inter text-brand-accent tracking-[0.4em] text-[10px] uppercase font-bold mb-5">
            Real Talk
          </motion.span>
          <motion.h2 {...fadeUp(0.1)} className="display-font text-[clamp(2rem,5vw,5.5rem)] font-light text-brand-white leading-[0.95] tracking-tight">
            This isn't what<br />
            <em className="italic font-bold text-brand-cream">you think.</em>
          </motion.h2>
          <motion.p {...fadeUp(0.2)} className="font-inter text-brand-silver font-light text-base md:text-lg mt-6 max-w-xl mx-auto leading-relaxed">
            We don't do lectures. We don't do passive learning. We only do building.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {ethos.map((item, i) => (
            <motion.div
              key={item.label}
              {...fadeUp(i * 0.12)}
              className="group relative glass-panel border border-brand-ash/30 rounded-2xl p-8 md:p-10 hover:border-brand-accent/40 transition-all duration-500 hover:shadow-xl hover:shadow-brand-accent/5 flex flex-col gap-5"
            >
              {/* Icon */}
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.strikethrough ? "bg-red-500/10 border border-red-500/20" : "bg-brand-accent/10 border border-brand-accent/20"}`}>
                {item.strikethrough ? (
                  <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                )}
              </div>

              {/* Label */}
              <h3 className={`display-font text-xl font-bold leading-tight ${item.strikethrough ? "text-red-400 line-through decoration-2" : "text-brand-accent"}`}>
                {item.label}
              </h3>

              {/* Desc */}
              <p className="font-inter text-sm text-brand-silver font-light leading-relaxed flex-1">
                {item.desc}
              </p>

              <div className="h-[1px] w-8 group-hover:w-16 transition-all duration-500 bg-brand-accent/30" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
