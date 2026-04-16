import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10px" },
  transition: { duration: 1, ease: [0.33, 1, 0.68, 1], delay },
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
        02
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 md:mb-28">
          <motion.span {...fadeUp(0)} className="section-eyebrow inline-block text-brand-accent mb-6">
            Your Journey
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
                From sign-up to
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
                job-ready.
              </motion.span>
            </div>
          </h2>
          <motion.p {...fadeUp(0.2)} className="font-inter text-brand-silver font-light text-base max-w-md mx-auto leading-relaxed">
            No fluff, no confusion. Here's exactly what the journey looks like.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10px" }}
              whileTap={{ scale: 0.98 }}
              className="group relative glass-panel border border-brand-ash/30 rounded-2xl p-7 md:p-11 transition-all duration-500 hover:shadow-2xl flex flex-col gap-6 mobile-glow-pulse md:hover:border-brand-accent/40 md:hover:-translate-y-1"
            >
              {/* Step number watermark inside card */}
              <div className="absolute top-5 right-6 font-space text-5xl font-bold text-brand-accent/[0.12] group-hover:text-brand-accent/[0.2] transition-colors duration-500 select-none leading-none">
                {step.number}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent/20 transition-colors duration-300">
                {step.icon}
              </div>

              <h3 className="display-font text-xl md:text-2xl font-bold text-brand-white group-hover:text-brand-accent transition-colors duration-300 leading-tight">
                {step.title}
              </h3>
              <p className="font-inter text-sm text-brand-silver font-light leading-relaxed flex-1">
                {step.desc}
              </p>
              <div className="h-[1px] w-8 group-hover:w-20 transition-all duration-500 bg-brand-accent/40" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div {...fadeUp(0.3)} className="flex justify-center">
          <Link
            href="/register"
            className="group flex items-center gap-3 bg-brand-accent text-white px-9 py-4 rounded-full hover:shadow-2xl hover:shadow-brand-accent/30 hover:-translate-y-0.5 transition-all duration-300 font-inter text-xs font-black tracking-widest uppercase"
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
