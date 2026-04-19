"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FloatingPaths } from "@/components/ui/background-paths";

export default function FinalCTA() {
  return (
    <section className="relative w-full pt-20 pb-24 px-6 flex flex-col items-center justify-center text-center overflow-hidden bg-transparent">
      {/* Background Trajectory Paths */}
      <div className="absolute inset-0 z-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
        className="relative z-10 max-w-5xl"
      >
        <span className="font-space text-brand-accent tracking-[0.6em] text-[10px] md:text-xs uppercase font-black mb-16 block opacity-50">
          Conclusion // Mission Start
        </span>

        <h2 className="font-space text-[clamp(2rem,8vw,6rem)] font-black text-brand-white leading-[0.85] tracking-[-0.06em] mb-24 uppercase">
          Start the <br />
          <span className="italic font-light tracking-[-0.1em] text-brand-accent">Trajectory.</span>
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <Link
            href="/register"
            className="group relative inline-flex items-center gap-8 px-16 py-6 bg-brand-white text-brand-deep rounded-full transition-all duration-500 hover:scale-110 shadow-[0_30px_60px_rgba(0,0,0,0.5)] active:scale-95"
          >
            <span className="font-space text-xs md:text-sm font-black tracking-[0.3em] uppercase">
              Apply Now
            </span>
            <div className="w-10 h-10 rounded-full bg-brand-deep flex items-center justify-center text-white group-hover:rotate-45 transition-transform duration-500">
              <ArrowRight className="w-5 h-5" />
            </div>
          </Link>

          <Link href="/contact" className="font-space text-[10px] md:text-xs uppercase tracking-[0.4em] text-brand-silver hover:text-brand-accent transition-colors py-4">
            Consult Advisor // Live
          </Link>
        </div>
      </motion.div>

      {/* Footer Branding Signature */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay: 0.5 }}
        className="mt-16 w-full flex flex-col items-center gap-12 px-10"
      >
        <div className="w-full max-w-screen-xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-screen-xl gap-8">
          <div className="flex items-center gap-6">
            <span className="display-font text-3xl font-black italic tracking-tighter text-brand-white">GoThree.</span>
            <div className="hidden md:block w-px h-8 bg-white/10" />
            <span className="font-space text-[9px] tracking-[0.5em] uppercase opacity-40">Move with purpose</span>
          </div>

          <div className="flex gap-10">
            <span className="font-space text-[9px] tracking-[0.2em] uppercase opacity-20">Terms_Privacy</span>
            <span className="font-space text-[9px] tracking-[0.2em] uppercase opacity-20">© 2026_GoThree_NX</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
