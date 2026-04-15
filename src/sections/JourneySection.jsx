"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.85, ease: "circOut", delay },
});

const steps = [
  {
    number: "01",
    title: "Pick a domain",
    desc: "Choose from Cyber Security, AI, Web Dev, App Dev, Python, or AR & Game Dev — based on where you want to grow.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Work on real projects",
    desc: "Get assigned to actual project briefs. Build with a team. Get reviewed by mentors. Ship deliverables that matter.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Get certified + job-ready",
    desc: "Complete your internship with a portfolio of shipped work and a certificate backed by real project evidence.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
      </svg>
    ),
  },
];

export default function JourneySection() {
  return (
    <section className="relative w-full py-28 md:py-36 px-6 md:px-16 bg-brand-charcoal overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-ash/50 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span {...fadeUp(0)} className="inline-block font-inter text-brand-accent tracking-[0.4em] text-[10px] uppercase font-bold mb-5">
            Your Journey
          </motion.span>
          <motion.h2 {...fadeUp(0.1)} className="display-font text-[clamp(1.8rem,4vw,4.5rem)] font-light text-brand-white leading-tight tracking-tight mb-4">
            From sign-up to <em className="italic font-bold text-brand-cream">job-ready.</em>
          </motion.h2>
          <motion.p {...fadeUp(0.2)} className="font-inter text-brand-silver font-light text-base max-w-md mx-auto leading-relaxed">
            No fluff, no confusion. Here's exactly what the journey looks like.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              {...fadeUp(i * 0.12)}
              className="group relative glass-panel border border-brand-ash/30 rounded-2xl p-8 md:p-10 hover:border-brand-accent/40 transition-all duration-500 hover:shadow-xl hover:shadow-brand-accent/5 flex flex-col gap-5"
            >
              {/* Step number watermark */}
              <div className="absolute top-5 right-6 font-space text-5xl font-bold text-brand-accent/[0.08] group-hover:text-brand-accent/[0.15] transition-colors duration-500 select-none leading-none">
                {step.number}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent/20 transition-colors duration-300">
                {step.icon}
              </div>

              <h3 className="display-font text-lg font-bold text-brand-white group-hover:text-brand-accent transition-colors duration-300 leading-tight">
                {step.title}
              </h3>
              <p className="font-inter text-sm text-brand-silver font-light leading-relaxed flex-1">
                {step.desc}
              </p>
              <div className="h-[1px] w-8 group-hover:w-16 transition-all duration-500 bg-brand-accent/30" />
            </motion.div>
          ))}
        </div>

        {/* Connector CTA */}
        <motion.div {...fadeUp(0.3)} className="flex justify-center">
          <Link
            href="/register"
            className="group flex items-center gap-3 bg-brand-accent text-white px-8 py-4 rounded-full hover:shadow-xl hover:shadow-brand-accent/25 transition-all duration-300 font-inter text-xs font-black tracking-widest uppercase"
          >
            <span>Start Your Journey</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
