import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { internships } from "@/data/internships";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10px" },
  transition: { duration: 1, ease: [0.33, 1, 0.68, 1], delay },
});

const themeConfig = {
  cyber:  { accent: "#00ff9f", label: "Cyber Security & Ethical Hacking", emoji: "🛡" },
  ar:     { accent: "#a259ff", label: "AR & Game Development",            emoji: "🎮" },
  python: { accent: "#f7c948", label: "Advanced Python",                  emoji: "🐍" },
  web:    { accent: "#2e5bff", label: "Web Development",                  emoji: "🌐" },
  app:    { accent: "#00bfff", label: "App Development",                  emoji: "📱" },
  ai:     { accent: "#ff6b6b", label: "Artificial Intelligence",          emoji: "🤖" },
};

export default function DomainsSection() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section 
      ref={container}
      className="relative w-full py-28 md:py-48 px-6 md:px-16 bg-brand-charcoal overflow-hidden"
    >
      <div className="section-rule text-brand-ash absolute top-0 left-0" />

      {/* Watermark */}
      <motion.div
        style={{ y: y1 }}
        className="section-watermark absolute top-0 right-4 md:right-10 text-brand-white select-none"
        aria-hidden="true"
      >
        03
      </motion.div>

      {/* Bottom glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-[140px] opacity-10"
          style={{ background: "var(--glow-color)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 md:mb-28">
          <motion.span {...fadeUp(0)} className="section-eyebrow inline-block text-brand-accent mb-6">
            Open Positions
          </motion.span>
          
          <h2 className="display-font text-[clamp(2.5rem,6vw,7rem)] font-light text-brand-white leading-[0.92] tracking-tight">
            <div className="overflow-hidden mb-2">
              <motion.span
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
                className="inline-block"
              >
                Choose your
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
                className="inline-block italic font-bold text-brand-cream"
              >
                domain.
              </motion.span>
            </div>
          </h2>
          <motion.p {...fadeUp(0.2)} className="font-inter text-brand-silver font-light text-base max-w-md mx-auto leading-relaxed">
            Six focused tracks. Each one built around real skills, real projects, and real outcomes.
          </motion.p>
        </div>

        {/* Domain grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-14">
          {internships.map((program, i) => {
            const cfg = themeConfig[program.theme] || { accent: "#2e5bff", label: program.title, emoji: "⚡" };
            return (
              <motion.div
                key={program.id}
                {...fadeUp(i * 0.08)}
                className="group relative glass-panel border border-brand-ash/30 rounded-2xl p-7 md:p-10 hover:border-brand-accent/30 hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl flex flex-col gap-5 overflow-hidden"
                style={{ "--domain-color": cfg.accent }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                  style={{ background: `radial-gradient(circle at 20% 50%, ${cfg.accent}12 0%, transparent 70%)` }}
                />

                {/* Live indicator + emoji */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: cfg.accent }} />
                    <span className="font-inter text-[9px] tracking-[0.25em] uppercase font-bold" style={{ color: cfg.accent }}>
                      Open
                    </span>
                  </div>
                  <span className="text-2xl leading-none">{cfg.emoji}</span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="display-font text-xl md:text-2xl font-bold text-brand-white leading-tight">
                    {program.title}
                  </h3>
                  <p className="font-inter text-xs text-brand-mist mt-1.5 italic">{program.tagline}</p>
                </div>

                {/* Description */}
                <p className="font-inter text-[12px] text-brand-silver font-light leading-relaxed flex-1">
                  {program.description}
                </p>

                {/* Duration */}
                <div className="flex items-center gap-2.5 pt-3 border-t border-brand-ash/25">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" style={{ color: cfg.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
            className="group flex items-center gap-3 bg-transparent border border-brand-accent/50 text-brand-accent px-9 py-4 rounded-full hover:bg-brand-accent hover:text-white hover:shadow-2xl hover:shadow-brand-accent/25 hover:-translate-y-0.5 transition-all duration-400 font-inter text-xs font-black tracking-widest uppercase"
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
