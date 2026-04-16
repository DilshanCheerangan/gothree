"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TrainingPage() {
  return (
    <main className="w-full min-h-screen bg-brand-deep flex flex-col items-center justify-center relative overflow-hidden px-6">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-30"
          style={{ background: "var(--glow-color)" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="relative z-10 flex flex-col items-center text-center gap-6"
      >
        {/* Label */}
        <span className="font-inter text-brand-accent tracking-[0.35em] text-[10px] md:text-xs uppercase font-bold">
          Coming Soon
        </span>

        {/* Heading */}
        <h1 className="display-font text-[clamp(3rem,10vw,8rem)] font-light text-brand-white leading-[0.9] tracking-tight">
          Expert <em className="italic font-bold text-brand-cream">Training</em>
        </h1>

        {/* Divider */}
        <div className="w-16 h-[1px] bg-brand-accent/40 my-2" />

        {/* Description */}
        <p className="font-inter text-brand-silver font-light text-base md:text-lg max-w-md leading-relaxed">
          We're crafting something extraordinary. Our specialized training programs will be live very soon — stay tuned.
        </p>

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-inter text-xs font-bold uppercase tracking-[0.15em] text-brand-mist hover:text-brand-accent transition-colors group"
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
