"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function SpecialtySection() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 50%", "start 10%"],
  });

  // Balanced Spring for naturally paced highlight
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 45, 
    damping: 20, 
    restDelta: 0.001 
  });

  const text = "We specialize in shaping potential into domain-focused careers that meet real industry demands — building skilled professionals for tomorrow's workforce.";
  const words = text.split(" ");

  return (
    <section ref={container} className="relative w-full py-32 md:py-48 bg-brand-deep">
      <div className="w-full flex items-center justify-center px-6 md:px-16 overflow-hidden">
        
        <div className="max-w-7xl w-full relative z-10 px-4 md:px-0">
            <h2 className="font-space text-[clamp(1.2rem,3.5vw,3.5rem)] font-black leading-[1.1] tracking-[-0.04em] text-center md:text-left uppercase">
                {words.map((word, i) => {
                    const stepSize = 1 / words.length;
                    const centerPoint = (i + 0.5) * stepSize;
                    
                    // Controlled ranges for pure luxury emergence
                    const range = (offset) => [
                        Math.max(0, centerPoint - offset),
                        centerPoint,
                        Math.min(1, centerPoint + offset)
                    ];

                    const revealRange = range(0.06);
                    const focusRange = range(0.03);

                    // Persistent Illumination: Stay at 1 once reached
                    const opacity = useTransform(smoothProgress, revealRange, [0.05, 1, 1]);
                    const y = useTransform(smoothProgress, revealRange, [20, 0, 0]);
                    const color = useTransform(smoothProgress, revealRange, ["#334155", "#ffffff", "#ffffff"]);
                    const scale = useTransform(smoothProgress, focusRange, [0.98, 1, 1]);
                    
                    const blurValue = useTransform(smoothProgress, revealRange, [2, 0, 0]);
                    const blur = useTransform(blurValue, (v) => `blur(${v}px)`);

                    return (
                        <motion.span
                            key={i}
                            style={{ 
                                opacity, 
                                y,
                                color, 
                                scale,
                                filter: blur,
                                display: "inline-block",
                                marginRight: "0.22em",
                            }}
                            className="relative py-1.5"
                        >
                            {word}
                            {/* Ambient Glow - Symmetrical focus pass */}
                            <motion.span 
                                style={{ 
                                    opacity: useTransform(smoothProgress, focusRange, [0, 0.25, 0]) 
                                }}
                                className="absolute inset-0 blur-3xl bg-brand-accent/30 -z-10"
                            />
                        </motion.span>
                    );
                })}
            </h2>
        </div>
      </div>
    </section>
  );
}
