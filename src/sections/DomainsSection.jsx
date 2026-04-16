"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { internships } from "@/data/internships";
import { cn } from "@/lib/utils";

const themeConfig = {
  cyber:  { accent: "#00ff9f", label: "Cyber Security & Ethical Hacking", emoji: "🛡" },
  ar:     { accent: "#a259ff", label: "AR & Game Development",            emoji: "🎮" },
  python: { accent: "#f7c948", label: "Advanced Python",                  emoji: "🐍" },
  web:    { accent: "#2e5bff", label: "Web Development",                  emoji: "🌐" },
  app:    { accent: "#00bfff", label: "App Development",                  emoji: "📱" },
  ai:     { accent: "#ff6b6b", label: "Artificial Intelligence",          emoji: "🤖" },
};

/**
 * DomainsSection - The Focus Rails Edition
 * Replaces the generic grid with 'Interactive Focus Rails' that expand on hover.
 * Luxury experience using glassmorphism and expansion/blur interactions.
 */
export default function DomainsSection() {
  const container = useRef(null);
  const [activeItem, setActiveItem] = useState(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section 
      ref={container}
      className="relative w-full py-32 md:py-64 px-6 md:px-16 bg-brand-airy transition-colors duration-500 overflow-hidden"
    >
      <div className="section-rule text-brand-ash/30 absolute top-0 left-0" />

      {/* Watermark */}
      <motion.div
        style={{ y: y1 }}
        className="section-watermark absolute top-0 right-4 md:right-10 text-brand-accent/[0.05] select-none pointer-events-none"
        aria-hidden="true"
      >
        03
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-left mb-20 md:mb-32">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="section-eyebrow inline-block text-brand-accent mb-6 font-black"
          >
            Open Positions
          </motion.span>
          
          <h2 className="display-font text-[clamp(2.5rem,6vw,7rem)] font-bold text-brand-accent leading-none tracking-tighter max-w-4xl drop-shadow-[0_0_30px_rgba(46,91,255,0.1)]">
            Choose your <span className="italic font-light opacity-60">focus.</span>
          </h2>
          <p className="font-inter text-brand-warm/60 dark:text-brand-white/50 font-light text-base md:text-xl mt-8 max-w-2xl leading-relaxed">
            Six focused tracks built around real briefs. Select a rail to see how we build.
          </p>
        </div>

        {/* Focus Rails Container - Compact Edition */}
        <div className="flex flex-col lg:flex-row gap-4 h-full min-h-[380px] w-full items-stretch">
          {internships.map((program, i) => {
            const cfg = themeConfig[program.theme] || { accent: "#2e5bff", label: program.title, emoji: "⚡" };
            const isActive = activeItem === i;

            return (
              <motion.div
                key={program.id}
                onMouseEnter={() => setActiveItem(i)}
                onMouseLeave={() => setActiveItem(null)}
                animate={{ 
                  flex: isActive ? 2.5 : 1,
                  filter: activeItem !== null && !isActive ? "blur(3px) brightness(0.95)" : "blur(0) brightness(1)",
                  opacity: activeItem !== null && !isActive ? 0.7 : 1
                }}
                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                className={cn(
                  "relative group overflow-hidden glass-panel border border-brand-accent/10 rounded-3xl p-6 transition-all duration-500 flex flex-col justify-between cursor-pointer mobile-glow-pulse",
                  isActive ? "bg-white/60 border-brand-accent/30 shadow-2xl shadow-brand-accent/5" : "bg-white/30"
                )}
                style={{ "--domain-color": cfg.accent }}
              >
                {/* Background Accent (Visible only on hover) */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 0.05 : 0 }}
                  className="absolute inset-0 z-0 bg-brand-accent pointer-events-none"
                />

                {/* Top Section */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">
                      {cfg.emoji}
                    </div>
                    {/* Live indicator only revealed when focused */}
                    <motion.div 
                      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.8 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: cfg.accent }} />
                      <span className="font-inter text-[9px] tracking-[0.25em] uppercase font-black" style={{ color: cfg.accent }}>
                        Apply
                      </span>
                    </motion.div>
                  </div>

                  <h3 className={cn(
                    "display-font font-bold transition-all duration-500 leading-[1.1] tracking-tight",
                    isActive ? "text-3xl md:text-4xl lg:text-4xl" : "text-lg md:text-xl text-brand-accent/60"
                  )}>
                    {program.title}
                  </h3>
                </div>

                {/* Bottom Detail (Visible when focused) */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="relative z-10 mt-auto"
                >
                  <div className="h-0.5 w-12 bg-brand-accent/20 mb-6" />
                  
                  <Link
                    href={`/internships`}
                    className="group/btn flex items-center gap-3 w-fit text-brand-accent font-space text-[10px] tracking-widest uppercase font-black"
                  >
                    <span>View Curriculum</span>
                    <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                  </Link>
                </motion.div>

                {/* Background Number (Watermark) */}
                <div className={cn(
                  "absolute -bottom-10 -right-10 display-font font-black text-white/[0.03] transition-all duration-700 pointer-events-none select-none",
                  isActive ? "text-[150px] rotate-0" : "text-[100px] -rotate-12"
                )}>
                  0{i + 1}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
