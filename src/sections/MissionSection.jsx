"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function MissionSection() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  // Kinetic Typography Transitions
  const tracking1 = useTransform(smoothProgress, [0, 0.5], ["0.5em", "-0.05em"]);
  const opacity1 = useTransform(smoothProgress, [0.1, 0.35, 0.5, 0.65], [0, 1, 1, 0]);
  const scale1 = useTransform(smoothProgress, [0.1, 0.35], [0.9, 1]);

  const tracking2 = useTransform(smoothProgress, [0.4, 0.9], ["0.5em", "-0.05em"]);
  const opacity2 = useTransform(smoothProgress, [0.45, 0.75, 0.9, 1], [0, 1, 1, 0]);
  const scale2 = useTransform(smoothProgress, [0.45, 0.75], [0.9, 1]);

  return (
    <section
      ref={container}
      className="relative w-full py-[25vh] px-6 md:px-16 bg-transparent flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-[25vh] relative z-10 w-full text-center">

        {/* Mission Block A */}
        <motion.div
          style={{ opacity: opacity1, letterSpacing: tracking1, scale: scale1 }}
          className="flex flex-col items-center"
        >
          <h2 className="font-space text-[clamp(2rem,7.5vw,7.5rem)] font-black text-brand-white leading-[0.8] uppercase whitespace-nowrap">
            Systemic <br />
            <span className="text-brand-accent italic font-light tracking-[-0.08em] block mt-4 text-brand-accent">Precision.</span>
          </h2>
          <div className="mt-20 h-[80px] w-px bg-gradient-to-b from-brand-accent/40 to-transparent" />
          <p className="mt-12 font-inter text-[10px] md:text-xs text-brand-silver font-light tracking-[0.3em] uppercase max-w-lg leading-loose opacity-60">
            Synthesizing raw potential into <br />
            <span className="text-brand-white font-bold">high-caliber technical expertise.</span>
          </p>
        </motion.div>

        {/* Mission Block B */}
        <motion.div
          style={{ opacity: opacity2, letterSpacing: tracking2, scale: scale2 }}
          className="flex flex-col items-center"
        >
          <h2 className="font-space text-[clamp(2rem,7.5vw,7.5rem)] font-black text-brand-white leading-[0.8] uppercase whitespace-nowrap">
            Industrial <br />
            <span className="italic font-light tracking-[-0.08em] block mt-4">Excellence.</span>
          </h2>
          <div className="mt-20 h-[80px] w-px bg-gradient-to-b from-brand-accent/40 to-transparent" />
          <p className="mt-12 font-inter text-[10px] md:text-xs text-brand-silver font-light tracking-[0.3em] uppercase max-w-lg leading-loose opacity-60">
            Engineering professionals <br />
            <span className="text-brand-white font-bold">aligned with global industry demands.</span>
          </p>
        </motion.div>

      </div>
    </section>
  );
}
