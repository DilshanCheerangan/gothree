"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * JourneySection - The Process Arc Edition
 * An immersive, horizontal scroll-revealed process flow replacing the generic 3-card grid.
 */
export default function JourneySection() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const steps = [
    {
      title: "Choose your domain",
      desc: "Cyber Security, AI, Web, App or XR. Choose where you want to grow.",
      img: "/luxury_tech_abstract_1.png",
    },
    {
      title: "Build in real teams",
      desc: "No tutorials. Get assigned to actual briefs and ship with a crew.",
      img: "/premium_cyber_shield_1.png",
    },
    {
      title: "Outcome & Excellence",
      desc: "Graduate with a verified portfolio of real project deliverables.",
      img: "/luxury_tech_abstract_1.png",
    },
  ];

  return (
    <section ref={container} className="relative w-full h-[300vh] bg-brand-airy transition-colors duration-500">
      {/* Sticky Frame */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background Images Layer */}
        {steps.map((step, i) => {
          const stepSize = 1 / steps.length;
          const start = i * stepSize;
          const end = (i + 1) * stepSize;
          
          // Image Opacity logic - Fixed offsets (non-decreasing)
          const opacity = useTransform(scrollYProgress, 
            [Math.max(0, start - 0.1), start + 0.05, Math.max(start + 0.06, end - 0.1), end], 
            [0, 0.4, 0.4, 0]
          );

          return (
            <motion.div
              key={i}
              style={{ opacity }}
              className="absolute inset-0 z-0"
            >
              <div className="absolute inset-0 bg-brand-deep/60 z-10" />
              <img
                src={step.img}
                alt={step.title}
                className="w-full h-full object-cover grayscale opacity-10 scale-105"
              />
            </motion.div>
          );
        })}

        {/* Content Layer */}
        <div className="relative z-20 w-full max-w-7xl px-6 md:px-16 h-full flex items-center justify-center">
          <div className="relative w-full h-[60vh] flex items-center justify-center">
            {steps.map((step, i) => {
              const stepSize = 1 / steps.length;
              const start = i * stepSize;
              const end = (i + 1) * stepSize;

              // Text Drift & Opacity
              const y = useTransform(scrollYProgress, [start, end], [100, -100]);
              const opacity = useTransform(scrollYProgress, 
                [start, start + 0.2 * stepSize, end - 0.2 * stepSize, end], 
                [0, 1, 1, 0]
              );
              
              const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

              return (
                <motion.div
                  key={i}
                  style={{ y: smoothY, opacity }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-8"
                >
                  <h2 className="display-font text-5xl md:text-8xl lg:text-9xl font-bold text-brand-accent tracking-tighter leading-none max-w-4xl drop-shadow-[0_0_30px_rgba(46,91,255,0.1)]">
                    {step.title}
                  </h2>
                  <p className="font-inter text-brand-white/60 text-base md:text-xl font-light max-w-lg leading-relaxed">
                    {step.desc}
                  </p>
                  
                  {/* Luxury Progress Bar */}
                  <div className="pt-8 w-64 md:w-96">
                    <div className="h-[1px] w-full bg-white/10 relative">
                      <motion.div 
                        className="absolute inset-0 bg-brand-accent origin-left"
                        style={{ scaleX: useTransform(scrollYProgress, [start, end], [0, 1]) }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Floating Numbers Layer */}
        <div className="absolute bottom-12 left-12 flex items-baseline gap-4 pointer-events-none">
          <span className="display-font text-8xl font-black text-white/5 italic">04</span>
          <div className="h-[2px] w-12 bg-brand-accent/30" />
        </div>
      </div>
    </section>
  );
}
