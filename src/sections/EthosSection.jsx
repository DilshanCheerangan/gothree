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

  return (
    <section
      ref={container}
      className="relative w-full py-40 bg-brand-deep overflow-visible"
    >
      {/* Trifecta Anchor: Hero Bottom Border */}
      <div className="section-rule text-brand-accent/30 absolute top-0 left-0" />

      {/* Background Watermark - Touching Hero bottom (at top), Screen Left, and Screen Right */}
      <div className="absolute top-0 left-0 w-full pointer-events-none select-none overflow-hidden h-[30vw] z-0">
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]) }}
          className="absolute top-0 left-0 w-screen text-center text-[24.5vw] font-black text-brand-accent/[0.04] leading-none tracking-[-0.08em] whitespace-nowrap -translate-x-[0.6vw] -translate-y-[2.25vw]"
        >
          GOTHREE
        </motion.div>
      </div>


      {/* Narrative vertical anchor line */}
      <div className="relative z-10 flex flex-col items-center pt-24">
        <div className="w-px h-32 bg-gradient-to-b from-brand-accent/30 via-brand-accent/10 to-transparent" />
        <span className="font-space text-[9px] tracking-[0.6em] uppercase text-brand-accent/40 mt-8">Trajectory Bridge</span>
      </div>
    </section>
  );
}
