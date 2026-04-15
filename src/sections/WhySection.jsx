"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.85, ease: "circOut", delay },
});

const whyPoints = [
  {
    title: "Verified & Legit",
    desc: "GoThree is a registered organisation — no fake certificates, no unpaid 'training' traps. We're transparent about what we offer.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Project-Based Learning",
    desc: "Every intern works on real industry projects, not just theoretical coursework. You leave with a portfolio that proves your skills.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  {
    title: "Expert Mentors",
    desc: "Work directly with professionals who have built real products in the real world — not just people who teach about it.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    title: "Recognised Certificates",
    desc: "Our certificates carry weight with employers because they're backed by real project evidence — not just attendance.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    title: "Flexible Modes",
    desc: "Hybrid and online options to fit your college schedule. We work around your timetable, not the other way around.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "End-to-End Support",
    desc: "From onboarding to final project review, our team is available throughout your internship journey — not just on Day 1.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
];

export default function WhySection() {
  return (
    <section className="relative w-full py-28 md:py-36 px-6 md:px-16 bg-brand-charcoal overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-ash/50 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span {...fadeUp(0)} className="inline-block font-inter text-brand-accent tracking-[0.4em] text-[10px] uppercase font-bold mb-5">
            Why GoThree
          </motion.span>
          <motion.h2 {...fadeUp(0.1)} className="display-font text-[clamp(1.8rem,4vw,4.5rem)] font-light text-brand-white leading-tight tracking-tight">
            We do internships <em className="italic font-bold text-brand-cream">differently.</em>
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-16">
          {whyPoints.map((point, i) => (
            <motion.div
              key={point.title}
              {...fadeUp(i * 0.07)}
              className="group glass-panel border border-brand-ash/30 rounded-2xl p-7 md:p-8 hover:border-brand-accent/40 transition-all duration-500 hover:shadow-xl hover:shadow-brand-accent/5 flex flex-col gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent/20 transition-colors duration-300">
                {point.icon}
              </div>
              <h3 className="display-font text-lg font-bold text-brand-white group-hover:text-brand-accent transition-colors duration-300 leading-tight">
                {point.title}
              </h3>
              <p className="font-inter text-sm text-brand-silver font-light leading-relaxed flex-1">
                {point.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Final CTA banner */}
        <motion.div
          {...fadeUp(0.2)}
          className="relative glass-panel border border-brand-accent/20 rounded-2xl p-10 md:p-14 text-center overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full blur-[80px] opacity-20" style={{ background: "var(--glow-color)" }} />
          </div>

          <p className="font-inter text-brand-mist text-xs tracking-[0.3em] uppercase font-bold mb-5">Ready to start?</p>
          <h3 className="display-font text-[clamp(1.5rem,3.5vw,4rem)] font-light text-brand-white leading-tight tracking-tight mb-4">
            Stop learning. <em className="italic font-bold text-brand-cream">Start building.</em>
          </h3>
          <p className="font-inter text-brand-silver font-light text-base mb-10 max-w-md mx-auto leading-relaxed">
            Work on real systems. Ship real products. Get industry-ready in months — not years.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="group flex items-center justify-center gap-3 bg-brand-accent text-white px-8 py-4 rounded-full hover:shadow-xl hover:shadow-brand-accent/30 transition-all duration-300 font-inter text-xs font-black tracking-widest uppercase"
            >
              Apply Now
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-3 bg-transparent border border-brand-ash/50 text-brand-white px-8 py-4 rounded-full hover:border-brand-accent/60 hover:text-brand-accent transition-all duration-300 font-inter text-xs font-bold tracking-widest uppercase"
            >
              Talk to Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
