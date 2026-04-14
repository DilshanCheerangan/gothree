"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";

export default function InternshipDetail({ data, onClose }) {
  if (!data) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-[999] bg-brand-deep/95 backdrop-blur-3xl overflow-y-auto flex items-center justify-center p-4 md:p-12"
        initial={{ opacity: 0, clipPath: "circle(0% at 50% 50%)" }}
        animate={{ opacity: 1, clipPath: "circle(150% at 50% 50%)" }}
        exit={{ opacity: 0, clipPath: "circle(0% at 50% 50%)" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // ExpoOut
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-[1000] w-12 h-12 rounded-full bg-brand-charcoal border border-brand-ash flex items-center justify-center text-brand-silver hover:text-brand-white hover:bg-brand-smoke transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-full max-w-6xl flex flex-col md:flex-row gap-16 md:gap-24 relative">
          
          {/* Left: Sticky Header */}
          <div className="flex-1 md:sticky top-12 h-fit">
            <span className="font-inter text-brand-accent tracking-[0.3em] text-xs uppercase mb-4 block">
              {data.tagline}
            </span>
            <h2 className="display-font text-5xl md:text-7xl font-light text-brand-white leading-[1]">
              {data.title}
            </h2>
            <div className="mt-12 flex flex-col gap-6">
              <div>
                <span className="font-space text-brand-mist text-xs uppercase tracking-[0.2em] block mb-2">Duration</span>
                <p className="font-inter text-brand-white">{data.duration}</p>
              </div>
            </div>
            
            <a href="#contact" onClick={onClose} className="mt-16 inline-flex items-center gap-4 bg-brand-white text-brand-deep px-8 py-4 font-space uppercase tracking-[0.2em] text-sm hover:bg-brand-accent hover:text-brand-white transition-colors duration-300">
              Apply Now 
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Right: Scrollable Content */}
          <div className="flex-1 flex flex-col gap-12 pt-4 md:pt-16 pb-32">
            <div>
              <h3 className="font-space text-brand-white text-2xl mb-6">The Initiative</h3>
              <p className="font-inter text-brand-silver leading-relaxed text-lg font-light">
                {data.description}
              </p>
            </div>

            <div className="w-full h-[1px] bg-brand-ash/50" />

            <div>
              <h3 className="font-space text-brand-white text-2xl mb-6">Key Focus Areas</h3>
              <ul className="flex flex-col gap-4">
                {data.highlights.map((highlight, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + (idx * 0.1) }}
                    className="flex items-start gap-4 font-inter text-brand-silver font-light"
                  >
                    <span className="text-brand-accent font-space mt-[2px]">{`0${idx + 1}`}</span>
                    {highlight}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
