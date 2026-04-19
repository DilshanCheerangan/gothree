"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function SpecialtySection() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 80%", "start 0%"],
  });

  // Slightly more responsive spring for a balanced reveal pace
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 22,
    damping: 24,
    restDelta: 0.001
  });

    const text = "We specialize in shaping potential into domain-focused careers that meet real industry demands — building skilled professionals for tomorrow's workforce.";
    const totalChars = text.length;
    let charCount = 0;
 
    return (
      <section ref={container} className="relative w-full py-10 md:py-16 bg-transparent">
        <div className="w-full flex items-center justify-center px-6 md:px-16 overflow-hidden">
  
          <div className="max-w-7xl w-full relative z-10 px-4 md:px-0">
            <h2 className="font-space text-[clamp(1.2rem,3.5vw,3.5rem)] font-black leading-[1.1] tracking-[-0.04em] text-center md:text-left uppercase">
              {text.split(" ").map((word, wordIndex) => {
                return (
                  <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.22em]">
                    {word.split("").map((char, charIndex) => {
                      const i = charCount++;
                      const stepSize = 1 / totalChars;
                      const centerPoint = (i + 0.5) * stepSize;
  
                      const range = (offset) => [
                        Math.max(0, centerPoint - offset),
                        centerPoint,
                        Math.min(1, centerPoint + offset)
                      ];
  
                      const revealRange = range(0.06);
                      const focusRange = range(0.03);
  
                      const opacity = useTransform(smoothProgress, revealRange, [0.05, 1, 1]);
                      const y = useTransform(smoothProgress, revealRange, [10, 0, 0]);
                      const color = useTransform(smoothProgress, revealRange, ["#334155", "#ffffff", "#ffffff"]);
                      const filter = useTransform(smoothProgress, revealRange, (v) => {
                        const blur = (1 - (v - revealRange[0]) / (revealRange[1] - revealRange[0])) * 4;
                        return `blur(${Math.max(0, blur)}px)`;
                      });
  
                      return (
                        <motion.span
                          key={charIndex}
                          style={{
                            opacity,
                            y,
                            color,
                            filter,
                            display: "inline-block",
                          }}
                          className="relative"
                        >
                          {char}
                          {/* Ambient Glow - Symmetrical focus pass per character */}
                          <motion.span
                            style={{
                              opacity: useTransform(smoothProgress, focusRange, [0, 0.15, 0])
                            }}
                            className="absolute inset-0 blur-xl bg-brand-accent/20 -z-10"
                          />
                        </motion.span>
                      );
                    })}
                  </span>
                );
              })}
            </h2>
          </div>
        </div>
      </section>
  );
}
