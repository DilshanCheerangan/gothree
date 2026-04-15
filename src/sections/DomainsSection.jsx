"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { internships } from "@/data/internships";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.85, ease: "circOut", delay },
});

// Theme color maps matching the existing internship themes
const themeConfig = {
  cyber: { accent: "#00ff9f", label: "Cyber Security & Ethical Hacking", emoji: "🛡" },
  ar: { accent: "#a259ff", label: "AR & Game Development", emoji: "🎮" },
  python: { accent: "#f7c948", label: "Advanced Python", emoji: "🐍" },
  web: { accent: "#2e5bff", label: "Web Development", emoji: "🌐" },
  app: { accent: "#00bfff", label: "App Development", emoji: "📱" },
  ai: { accent: "#ff6b6b", label: "Artificial Intelligence", emoji: "🤖" },
};

export default function DomainsSection() {
  return (
    <section className="relative w-full py-28 md:py-36 px-6 md:px-16 bg-brand-deep overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent" />

      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] opacity-10" style={{ background: "var(--glow-color)" }} />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span {...fadeUp(0)} className="inline-block font-inter text-brand-accent tracking-[0.4em] text-[10px] uppercase font-bold mb-5">
            Open Positions
          </motion.span>
          <motion.h2 {...fadeUp(0.1)} className="display-font text-[clamp(1.8rem,4vw,4.5rem)] font-light text-brand-white leading-tight tracking-tight mb-4">
            Choose your <em className="italic font-bold text-brand-cream">domain.</em>
          </motion.h2>
          <motion.p {...fadeUp(0.2)} className="font-inter text-brand-silver font-light text-base max-w-md mx-auto leading-relaxed">
            Six focused tracks. Each one built around real skills, real projects, and real outcomes.
          </motion.p>
        </div>

        {/* Domain grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-12">
          {internships.map((program, i) => {
            const cfg = themeConfig[program.theme] || { accent: "#2e5bff", label: program.title, emoji: "⚡" };
            return (
              <motion.div
                key={program.id}
                {...fadeUp(i * 0.08)}
                className="group relative glass-panel border border-brand-ash/30 rounded-2xl p-7 md:p-8 hover:border-brand-accent/30 transition-all duration-500 hover:shadow-xl flex flex-col gap-4 overflow-hidden"
                style={{ "--domain-color": cfg.accent }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                  style={{ background: `radial-gradient(circle at 20% 50%, ${cfg.accent}0d 0%, transparent 65%)` }}
                />

                {/* Live indicator */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: cfg.accent }} />
                    <span className="font-inter text-[9px] tracking-[0.2em] uppercase font-bold" style={{ color: cfg.accent }}>
                      Open
                    </span>
                  </div>
                  <span className="text-xl leading-none">{cfg.emoji}</span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="display-font text-lg font-bold text-brand-white leading-tight group-hover:text-brand-white transition-colors duration-300">
                    {program.title}
                  </h3>
                  <p className="font-inter text-xs text-brand-mist mt-1 italic">{program.tagline}</p>
                </div>

                {/* Description */}
                <p className="font-inter text-[12px] text-brand-silver font-light leading-relaxed flex-1">
                  {program.description}
                </p>

                {/* Duration */}
                <div className="flex items-center gap-2 pt-2 border-t border-brand-ash/20">
                  <svg className="w-3 h-3 flex-shrink-0" style={{ color: cfg.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-inter text-[10px] text-brand-mist tracking-wide">{program.duration}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div {...fadeUp(0.3)} className="flex justify-center">
          <Link
            href="/internships"
            className="group flex items-center gap-3 bg-transparent border border-brand-accent/50 text-brand-accent px-8 py-4 rounded-full hover:bg-brand-accent hover:text-white hover:shadow-xl hover:shadow-brand-accent/25 transition-all duration-400 font-inter text-xs font-black tracking-widest uppercase"
          >
            <span>Explore All Internships</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
