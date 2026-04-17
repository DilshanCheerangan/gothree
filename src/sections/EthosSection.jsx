"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * EthosSection - The Decision Split Edition
 * A luxury-grade comparison between traditional education and the GoThree method.
 */
export default function EthosSection() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  // Smooth Drift: The text floats up the screen as you scroll
  const driftY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const smoothDrift = useSpring(driftY, { stiffness: 100, damping: 30 });

  return (
    <section 
      ref={container}
      className="relative w-full py-32 md:py-64 px-6 md:px-16 bg-brand-airy transition-colors duration-500 overflow-hidden"
    >
      <div className="section-rule text-brand-ash/30 absolute top-0 left-0" />

      {/* Background Watermark - High-fidelity GOTHREE branding */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -150]) }}
        className="absolute top-0 left-0 w-full text-center text-[24.5vw] font-black text-brand-accent/[0.04] select-none pointer-events-none leading-none tracking-[-0.08em] whitespace-nowrap overflow-hidden"
      >
        GOTHREE
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          style={{ y: smoothDrift }}
          className="flex flex-col lg:flex-row items-center justify-between gap-16 md:gap-32"
        >
          {/* Left Column: The Legacy (Adaptive Grey) */}
          <div className="w-full lg:w-1/2 space-y-12 text-left opacity-60">
            <div className="space-y-4 text-brand-ash dark:text-brand-silver">
              <span className="font-space text-[10px] tracking-[0.4em] uppercase block mb-2 font-black">Legacy Model</span>
              <h3 className="display-font text-3xl md:text-5xl font-light italic line-through decoration-brand-ash/30 dark:decoration-brand-silver/30">
                Passive Lectures.
              </h3>
              <p className="font-inter text-sm md:text-base font-light max-w-sm leading-relaxed text-brand-ash dark:text-brand-silver/70">
                Standard education relies on watching content, not creating it.
              </p>
            </div>
            
            <div className="space-y-4 text-brand-ash dark:text-brand-silver">
              <h3 className="display-font text-3xl md:text-5xl font-light italic line-through decoration-brand-ash/30 dark:decoration-brand-silver/30">
                MCQ Assessments.
              </h3>
              <p className="font-inter text-sm md:text-base font-light max-w-sm leading-relaxed text-brand-ash dark:text-brand-silver/70">
                Measuring knowledge through quizzes rather than outcomes.
              </p>
            </div>
          </div>

          {/* Center Connector (Vertical Line) */}
          <div className="hidden lg:block w-[1px] h-64 bg-brand-ash/20 self-center" />

          {/* Right Column: The GOTHREE (Vibrant Blue) */}
          <div className="w-full lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
              className="space-y-8"
            >
              <span className="font-space text-[10px] tracking-[0.4em] uppercase text-brand-accent block mb-2 font-black animate-pulse">GOTHREE</span>
              <h2 className="display-font text-5xl md:text-8xl lg:text-9xl font-bold text-brand-accent leading-[0.9] tracking-tighter">
                ONLY <br />
                <span className="text-brand-accent drop-shadow-[0_0_50px_rgba(46,91,255,0.2)]">BUILDING.</span>
              </h2>
              
              <p className="font-inter text-lg md:text-xl text-brand-warm font-light leading-relaxed max-w-md">
                We believe in outcomes over watching. Every session results in a piece of your professional portfolio. No exceptions.
              </p>

              <div className="flex items-center gap-6 pt-6">
                <div className="h-[1px] w-20 bg-brand-accent/30" />
                <span className="font-space text-xs tracking-widest text-brand-accent font-black uppercase">Real Briefs. Real Mentorship.</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
