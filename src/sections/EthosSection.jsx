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

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <section
      ref={container}
      className="relative w-full py-24 bg-transparent overflow-visible"
    >
      {/* Trifecta Anchor: Hero Bottom Border */}
      <div className="section-rule text-brand-accent/30 absolute top-0 left-0" />

      {/* Background Watermark - Touching Hero bottom (at top), Screen Left, and Screen Right */}
      <div className="absolute top-0 left-0 w-full pointer-events-none select-none overflow-hidden h-[30vw] z-0">
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]) }}
          className="absolute top-0 left-0 w-screen text-center text-[24.5vw] font-black leading-none tracking-[-0.08em] whitespace-nowrap -translate-x-[0.6vw] -translate-y-[2.8vw] select-none pointer-events-none"
          style={{ color: "#0d0b08" }}
        >
          GOTHREE
        </motion.div>
      </div>


    </section>
  );
}
