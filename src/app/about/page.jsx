"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TextRevealByWord } from "@/components/ui/text-reveal";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.9, ease: "circOut", delay },
});

export default function AboutPage() {
  return (
    <main className="relative w-full min-h-screen bg-brand-deep">

      {/* ── HERO SECTION ── */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] opacity-25" style={{ background: "var(--glow-color)" }} />
        </div>

        {/* Decorative lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.span {...fadeUp(0)} className="inline-block font-inter text-brand-accent tracking-[0.4em] text-[10px] uppercase font-bold mb-6">
            About GoThree
          </motion.span>

          <motion.h1 {...fadeUp(0.1)} className="display-font text-[clamp(2.5rem,5vw,6rem)] font-light text-brand-white leading-[1.05] tracking-tight mb-8">
            Bridging the gap between<br />
            <em className="italic font-bold text-brand-cream">learning &amp; industry.</em>
          </motion.h1>

          <motion.div {...fadeUp(0.2)} className="w-20 h-[1px] bg-brand-accent/50 mx-auto mb-8" />

          <motion.p {...fadeUp(0.3)} className="font-inter text-brand-silver text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            GoThree is an emerging education and training company dedicated to bridging the gap between academic learning and industry requirements.
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-inter text-[9px] tracking-[0.3em] uppercase text-brand-mist">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-brand-accent/60 to-transparent animate-pulse" />
        </motion.div>
      </section>

      {/* ── TEXT REVEAL SECTION ── */}
      <section className="relative w-full bg-brand-charcoal overflow-visible">
        <TextRevealByWord 
          text="GoThree is an emerging education and training company dedicated to bridging the gap between academic learning and industry requirements. Through internships, training, and certification programs — we equip the next generation of professionals with skills that the industry demands today."
          className="bg-brand-charcoal"
        />
      </section>

      {/* ── QUOTE SECTION ── */}
      <section className="relative w-full py-12 px-6 md:px-16 bg-brand-deep">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center text-center">
          <motion.div
            {...fadeUp(0.1)}
            className="relative glass-panel border border-brand-ash/30 rounded-3xl p-10 md:p-14 shadow-2xl shadow-brand-accent/5 max-w-3xl"
          >
            <div className="text-[5rem] leading-none font-space font-bold text-brand-accent/10 absolute -top-4 -left-2 select-none">"</div>
            <p className="font-inter text-brand-white/90 text-xl md:text-2xl leading-relaxed font-light italic relative z-10">
              We believe every student deserves access to real-world experience before they enter the workforce.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="w-8 h-[1px] bg-brand-accent" />
              <span className="font-inter text-[10px] text-brand-accent tracking-[0.2em] uppercase font-bold">GoThree Team</span>
              <div className="w-8 h-[1px] bg-brand-accent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="relative w-full py-16 px-6 flex flex-col items-center justify-center text-center overflow-hidden bg-brand-deep">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px] opacity-20" style={{ background: "var(--glow-color)" }} />
        </div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent" />

        <motion.span {...fadeUp(0)} className="inline-block font-inter text-brand-accent tracking-[0.4em] text-[10px] uppercase font-bold mb-6">
          Get Started
        </motion.span>
        <motion.h2 {...fadeUp(0.1)} className="display-font text-[clamp(2.5rem,6vw,6rem)] font-light text-brand-white leading-tight tracking-tight mb-6">
          Ready to build<br />
          <em className="italic font-bold text-brand-cream">real skills?</em>
        </motion.h2>
        <motion.p {...fadeUp(0.2)} className="font-inter text-brand-silver font-light text-base max-w-md mb-10 leading-relaxed">
          Join GoThree's internship programs and take the first step toward a career that matters.
        </motion.p>

        <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/internships"
            className="group relative flex items-center gap-3 bg-brand-accent text-white px-8 py-4 rounded-full overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-brand-accent/30 font-inter text-xs font-black tracking-widest uppercase"
          >
            <span>Explore Internships</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-3 bg-transparent border border-brand-ash/50 text-brand-white px-8 py-4 rounded-full hover:border-brand-accent/60 hover:text-brand-accent transition-all duration-300 font-inter text-xs font-bold tracking-widest uppercase"
          >
            Get in Touch
          </Link>
        </motion.div>

        {/* Footer brand */}
        <div className="mt-16 flex flex-col items-center gap-4 text-brand-mist">
          <img src="/logoG.svg" alt="GoThree" className="w-8 h-8 opacity-40" style={{ filter: "var(--logo-filter)" }} />
          <div className="font-inter text-[10px] tracking-[0.4em] uppercase opacity-40">© GoThree 2026</div>
        </div>
      </section>

    </main>
  );
}
