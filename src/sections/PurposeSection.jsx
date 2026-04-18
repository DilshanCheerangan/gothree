"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import GeomCenterpiece from "@/components/ui/GeomCenterpiece";

export default function PurposeSection() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  // --- True Pinning & Staged Motion Mapping ---
  
  // Phase 1: Typography Entrance (0-0.35) | Phase 2: Refined Pin (0.35-0.45) | Phase 3: Fast Exit (0.45-1)
  const textY = useTransform(scrollYProgress, [0, 0.35, 0.45, 1], [400, 0, 0, -1000]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.1, 0.6, 0.8], [0, 1, 1, 0]);

  // 3D Workstation Entrance (sequenced AFTER text)
  const pcOpacity = useTransform(scrollYProgress, [0, 0.3, 0.4, 0.6, 0.8], [0, 0, 1, 1, 0]);
  const pcY = useTransform(scrollYProgress, [0, 0.3, 0.45, 1], [350, 350, -120, -1120]); // Now syncs perfectly with text exit (-1000 relative change)
  
  // High-End Focus Reveal
  const blurVal = useTransform(scrollYProgress, [0.3, 0.4], [20, 0]);
  const blurStyle = useTransform(blurVal, (v) => `blur(${v}px)`);

  return (
    <section
      ref={container}
      className="relative w-full h-[180vh] bg-transparent"
    >
      {/* 
          STICKY WRAPPER: 
          This container stays pinned to the viewport for the entire 300vh scroll range.
      */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden px-6 md:px-24">
        
        {/* Decorative Grid Lines (Stationary) */}
        <div className="absolute top-0 left-12 w-px h-full bg-brand-accent/5 hidden md:block" />
        <div className="absolute top-0 right-12 w-px h-full bg-brand-accent/5 hidden md:block" />

        {/* 1. LAYER: 3D CENTERPIECE (Pinned & Sequenced) */}
        <motion.div 
          className="absolute z-50 pointer-events-none scale-[1.0] md:scale-[1.6]"
          style={{ 
            opacity: pcOpacity, 
            y: pcY,
            filter: blurStyle
          }}
        >
          <GeomCenterpiece scrollProgress={scrollYProgress} />
          
          {/* Ground Shadow */}
          <motion.div 
            className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[60%] h-8 bg-black/80 blur-2xl rounded-[100%] -z-10"
            style={{ 
              opacity: useTransform(pcOpacity, [0, 1], [0, 0.6]),
              scale: useTransform(scrollYProgress, [0.4, 0.65], [0.8, 1.1])
            }}
          />
        </motion.div>

        {/* 2. LAYER: TYPOGRAPHY (Pinned & Sequenced) */}
        <motion.div 
          style={{ y: textY, opacity: textOpacity }}
          className="w-full max-w-[1600px] flex flex-col md:flex-row justify-between items-center relative z-10"
        >
          {/* LEFT BLOCK: "Move with" */}
          <div className="flex flex-col items-start w-full md:w-auto">
            <h2 className="display-font text-[clamp(1.5rem,4.5vw,5rem)] font-light text-brand-white leading-tight tracking-[-0.04em] uppercase">
              Move <span className="italic font-light text-brand-white ml-2">with</span>
            </h2>

            <div className="mt-8 text-left opacity-40">
              <p className="font-inter text-brand-silver text-[9px] md:text-[10px] font-light tracking-[0.3em] uppercase max-w-[180px] leading-relaxed">
                Guidance rooted in <br />
                Industrial precision.
              </p>
            </div>
          </div>

          {/* RIGHT BLOCK: "Purpose" */}
          <div className="flex flex-col items-start md:items-end text-left md:text-right w-full md:w-auto mt-24 md:mt-32">
            <h2 className="display-font text-[clamp(2.5rem,7vw,8rem)] font-bold text-brand-white leading-tight tracking-[-0.04em] uppercase relative top-6">
              Purpose
            </h2>

            <div className="mt-4 w-full md:w-[400px]">
              <div className="h-px w-full bg-brand-accent/20 mb-8" />
              <div className="flex justify-between items-center mb-6">
                <span className="font-space text-[10px] tracking-[0.4em] text-brand-accent font-bold uppercase">Gothree Strategy</span>
                <span className="font-space text-[10px] tracking-[0.4em] text-brand-silver opacity-60 uppercase">2026_NX</span>
              </div>
              <p className="font-inter text-brand-mist text-xs md:text-sm font-light leading-relaxed max-w-sm ml-auto">
                At GoThree, we don't just build skills; we engineer transitions. Our programs are designed to minimize the gap between your potential and industry expectations, powered by high-impact training and real-world certification.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
