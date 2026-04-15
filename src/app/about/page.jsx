"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const pillars = [
  {
    title: "Practical Exposure",
    desc: "Real-world projects and hands-on learning that simulate actual industry environments.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15a2.25 2.25 0 00-1.32 2.063v.11a2.25 2.25 0 001.32 2.063A2.25 2.25 0 0022 17.25v-.11a2.25 2.25 0 00-2.2-2.04zM5 14.5a2.25 2.25 0 00-1.32 2.063v.11A2.25 2.25 0 005 18.736a2.25 2.25 0 002.2-2.063v-.11A2.25 2.25 0 005 14.5z" />
      </svg>
    ),
    number: "01",
  },
  {
    title: "Expert Guidance",
    desc: "Mentorship from industry professionals who have built careers in their domains.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    number: "02",
  },
  {
    title: "Career Growth",
    desc: "Skills that matter in the job market — curated to meet what employers are looking for.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    number: "03",
  },
];



const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.9, ease: "circOut", delay },
});

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen bg-brand-deep overflow-x-hidden">

      {/* ── HERO SECTION ── */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] opacity-25" style={{ background: "var(--glow-color)" }} />
        </div>

        {/* Decorative lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-accent/10 to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.span {...fadeUp(0)} className="inline-block font-inter text-brand-accent tracking-[0.4em] text-[10px] uppercase font-bold mb-6">
            About GoThree
          </motion.span>

          <motion.h1 {...fadeUp(0.1)} className="display-font text-[clamp(2rem,4.5vw,5.5rem)] font-light text-brand-white leading-[1.05] tracking-tight mb-10">
            Bridging the gap between<br />
            <em className="italic font-bold text-brand-cream">learning &amp; industry.</em>
          </motion.h1>

          <motion.div {...fadeUp(0.2)} className="w-20 h-[1px] bg-brand-accent/50 mx-auto mb-10" />

          <motion.p {...fadeUp(0.3)} className="font-inter text-brand-silver text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            GoThree is an emerging education and training company dedicated to bridging the gap between academic learning and industry requirements.
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-inter text-[9px] tracking-[0.3em] uppercase text-brand-mist">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-brand-accent/60 to-transparent animate-pulse" />
        </motion.div>
      </section>

      {/* ── MISSION SECTION ── */}
      <section className="relative w-full py-28 md:py-36 px-6 md:px-16 bg-brand-charcoal">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-ash/60 to-transparent" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

          {/* Left: label + mission text */}
          <div>
            <motion.span {...fadeUp(0)} className="inline-block font-inter text-brand-accent tracking-[0.4em] text-[10px] uppercase font-bold mb-8">
              Our Mission
            </motion.span>

            <motion.p {...fadeUp(0.1)} className="display-font text-[clamp(1.8rem,3.5vw,3rem)] font-light text-brand-white leading-[1.2] tracking-tight">
              To provide students with{" "}
              <em className="italic font-bold text-brand-cream">practical exposure,</em>{" "}
              professional guidance, and career-oriented opportunities.
            </motion.p>

            <motion.p {...fadeUp(0.2)} className="font-inter text-brand-silver font-light mt-8 text-base leading-relaxed max-w-md">
              Through internships, training, and certification programs — we equip the next generation of professionals with skills that the industry demands today.
            </motion.p>
          </div>

          {/* Right: large decorative quote */}
          <motion.div
            {...fadeUp(0.15)}
            className="relative flex items-center justify-center"
          >
            <div className="relative glass-panel border border-brand-ash/30 rounded-3xl p-10 md:p-14 shadow-2xl shadow-brand-accent/5">
              <div className="text-[6rem] leading-none font-space font-bold text-brand-accent/10 absolute -top-4 -left-2 select-none">"</div>
              <p className="font-inter text-brand-white/90 text-base md:text-lg leading-relaxed font-light italic relative z-10">
                We believe every student deserves access to real-world experience before they enter the workforce.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-8 h-[1px] bg-brand-accent" />
                <span className="font-inter text-[10px] text-brand-accent tracking-[0.2em] uppercase font-bold">GoThree Team</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>



      {/* ── PILLARS SECTION ── */}
      <section className="relative w-full py-28 md:py-36 px-6 md:px-16 bg-brand-charcoal">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-ash/60 to-transparent" />
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <motion.span {...fadeUp(0)} className="inline-block font-inter text-brand-accent tracking-[0.4em] text-[10px] uppercase font-bold mb-6">
              What We Stand For
            </motion.span>
            <motion.h2 {...fadeUp(0.1)} className="display-font text-[clamp(2rem,5vw,5rem)] font-light text-brand-white leading-tight tracking-tight">
              Three pillars of <em className="italic font-bold text-brand-cream">excellence</em>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                {...fadeUp(i * 0.12)}
                className="group relative glass-panel border border-brand-ash/30 rounded-2xl p-8 md:p-10 hover:border-brand-accent/40 transition-all duration-500 hover:shadow-xl hover:shadow-brand-accent/5"
              >
                {/* Number watermark */}
                <div className="absolute top-4 right-6 font-space text-5xl font-bold text-brand-accent/[0.08] group-hover:text-brand-accent/[0.14] transition-colors duration-500 select-none leading-none">
                  {p.number}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent mb-6 group-hover:bg-brand-accent/20 transition-colors duration-300">
                  {p.icon}
                </div>

                <h3 className="display-font text-xl font-bold text-brand-white mb-3 group-hover:text-brand-accent transition-colors duration-300">
                  {p.title}
                </h3>
                <p className="font-inter text-sm text-brand-silver font-light leading-relaxed">
                  {p.desc}
                </p>

                <div className="mt-8 w-8 h-[1px] bg-brand-accent/30 group-hover:w-16 group-hover:bg-brand-accent/60 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="relative w-full py-28 md:py-36 px-6 flex flex-col items-center justify-center text-center overflow-hidden bg-brand-deep">
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
        <div className="mt-20 flex flex-col items-center gap-4 text-brand-mist">
          <img src="/logoG.svg" alt="GoThree" className="w-8 h-8 opacity-40" style={{ filter: "var(--logo-filter)" }} />
          <div className="font-inter text-[10px] tracking-[0.4em] uppercase opacity-40">© GoThree 2026</div>
        </div>
      </section>

    </main>
  );
}
