"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function InternshipSection({ data, index, onClick }) {
  const isEven = index % 2 === 0;

  return (
    <section
      id={`program-${index + 1}`}
      className="relative w-full min-h-[90vh] flex flex-col justify-center items-center py-24 px-8 md:px-24 border-t border-brand-ash/40 hover:bg-brand-accent/[0.03] transition-colors duration-700 group cursor-pointer overflow-hidden"
      onClick={onClick}
    >

      {/* Decorative Index - Perfectly visible Electric Blue accent */}
      <div className={`absolute top-12 font-space text-[12rem] md:text-[24rem] font-bold text-brand-accent/[0.08] -z-10 leading-none group-hover:text-brand-accent/[0.12] transition-colors duration-700 ${isEven ? 'left-8 md:left-24 text-left' : 'right-8 md:right-24 text-right'}`}>
        0{index + 1}
      </div>

      <div className={`w-full max-w-[1400px] flex flex-col md:flex-row items-center gap-16 md:gap-32 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

        {/* Typographic Block */}
        <div className="flex-1 text-left z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="font-inter text-brand-accent tracking-[0.35em] text-xs uppercase mb-6 font-bold"
          >
            {data.tagline}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="display-font text-5xl md:text-7xl font-light text-brand-white leading-[1.05]"
          >
            {data.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="font-inter text-brand-silver font-medium mt-8 max-w-xl text-lg leading-relaxed dark:font-light"
          >
            {data.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 flex items-center gap-4 text-brand-mist group-hover:text-brand-accent transition-colors duration-500"
          >
            <span className="font-space font-bold uppercase tracking-[0.2em] text-xs">Enter Module</span>
            <div className="w-12 h-[1px] bg-current" />
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
          </motion.div>
        </div>

        {/* Abstract Data Representation (Enhanced for Light Theme) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3, duration: 1.2, ease: "circOut" }}
          className="flex-1 w-full aspect-square md:aspect-[4/3] glass-panel bg-white/10 dark:bg-amber-950/30 border border-blue-300 dark:border-amber-700 rounded-full flex flex-col justify-center items-center p-12 relative shadow-lg shadow-brand-accent/5"
        >
          {/* Internal abstraction: pulsing rings & tags */}
          <div className="absolute inset-4 rounded-full border border-brand-ash/10 border-dashed animate-[spin_60s_linear_infinite]" />
          <div className="absolute inset-16 rounded-full border border-brand-accent/10 animate-[spin_40s_linear_infinite_reverse]" />

          <div className="relative z-10 flex flex-col gap-4 text-center items-center">
            {data.highlights.map((highlight, i) => (
              <span key={i} className="font-inter text-xs tracking-[0.1em] text-white dark:text-amber-100 bg-blue-500 dark:bg-amber-700 px-4 py-2 rounded-full border border-blue-400 dark:border-amber-600 shadow-sm backdrop-blur-md font-bold">
                {highlight}
              </span>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Separator - Sharply visible grey in light mode */}
      <div className={`mt-16 md:mt-24 w-1/4 h-[1px] bg-brand-ash/40 ${isEven ? 'self-end' : 'self-start'}`} />
    </section>
  );
}
