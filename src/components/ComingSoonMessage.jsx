"use client";

import { motion } from "framer-motion";

export default function ComingSoonMessage({ title, type }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl mx-auto text-center p-12 bg-white/[0.02] border border-white/10 rounded-3xl backdrop-blur-xl flex flex-col items-center gap-6"
    >
      <span className="font-inter text-brand-accent tracking-[0.35em] text-[10px] md:text-xs uppercase font-bold">
        Reserved Space
      </span>
      
      <h3 className="display-font text-4xl md:text-6xl font-light text-brand-white leading-tight">
        {title} <br />
        <em className="italic font-bold text-brand-cream">{type}</em>
      </h3>

      <div className="w-12 h-[1px] bg-brand-accent/40" />

      <p className="font-inter text-brand-silver font-light text-sm md:text-base max-w-sm leading-relaxed">
        We're currently finalizing the infrastructure for our {type.toLowerCase()} registrations. 
        Stay connected for the official launch.
      </p>

      <div className="flex gap-2 items-center mt-4">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
        <span className="text-[10px] font-bold tracking-[0.2em] text-brand-mist uppercase">Launching Phase II</span>
      </div>
    </motion.div>
  );
}
