"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GeomCenterpiece from "@/components/ui/GeomCenterpiece";

export default function PurposeSection() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section
      ref={container}
      className="relative w-full min-h-screen py-32 md:py-48 bg-transparent overflow-hidden flex flex-col justify-center items-center px-6 md:px-24"
    >
      {/* Decorative vertical rules to match the 'luxury' vibe */}
      <div className="absolute top-0 left-12 w-px h-full bg-brand-accent/5 hidden md:block" />
      <div className="absolute top-0 right-12 w-px h-full bg-brand-accent/5 hidden md:block" />

      {/* 3D Centerpiece Integration */}
      <GeomCenterpiece />

      <div className="w-full max-w-[1600px] flex flex-col md:flex-row justify-between items-center relative gap-12 md:gap-0">

        {/* LEFT BLOCK: "Move with" */}
        <div className="flex flex-col items-start w-full md:w-auto">
          <motion.h2
            style={{ y: y2 }}
            className="display-font text-[clamp(1.5rem,4.5vw,5rem)] font-light text-brand-white leading-tight tracking-[-0.04em] uppercase"
          >
            Move <span className="italic font-light text-brand-white ml-2">with</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-left"
          >
            <p className="font-inter text-brand-silver text-[9px] md:text-[10px] font-light tracking-[0.3em] uppercase max-w-[180px] leading-relaxed opacity-40">
              Guidance rooted in <br />
              Industrial precision.
            </p>
          </motion.div>
        </div>

        {/* RIGHT BLOCK: "Purpose" */}
        <div className="flex flex-col items-start md:items-end text-left md:text-right w-full md:w-auto mt-24 md:mt-32">
          <motion.h2
            style={{ y: y2 }}
            className="display-font text-[clamp(2.5rem,7vw,8rem)] font-bold text-brand-white leading-tight tracking-[-0.04em] uppercase relative top-6"
          >
            Purpose
          </motion.h2>

          <div className="mt-4 w-full md:w-[400px]">
            <div className="h-px w-full bg-brand-accent/20 mb-8" />

            <div className="flex justify-between items-center mb-6">
              <span className="font-space text-[10px] tracking-[0.4em] text-brand-accent font-bold uppercase">Gothree Strategy</span>
              <span className="font-space text-[10px] tracking-[0.4em] text-brand-silver opacity-60 uppercase">2026_NX</span>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="font-inter text-brand-mist text-xs md:text-sm font-light leading-relaxed max-w-sm ml-auto"
            >
              At GoThree, we don't just build skills; we engineer transitions. Our programs are designed to minimize the gap between your potential and industry expectations, powered by high-impact training and real-world certification.
            </motion.p>
          </div>
        </div>
      </div>

    </section>
  );
}
