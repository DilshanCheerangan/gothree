"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { internships } from "@/data/internships";
import { ArrowLeft, ArrowUpRight, Calendar, MapPin, CheckCircle2 } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: "circOut", delay },
});

export default function InternshipDetailPage({ params }) {
  const { id } = use(params);
  const data = internships.find((p) => p.id === id);

  if (!data) notFound();

  // Color mapping based on theme
  const themeColors = {
    cyber: "#00ff9f",
    ar: "#a259ff",
    python: "#f7c948",
    web: "#2e5bff",
    app: "#00bfff",
    ai: "#ff6b6b",
  };
  
  const accentColor = themeColors[data.theme] || "#2e5bff";

  return (
    <main className="w-full min-h-screen bg-brand-deep text-brand-white relative overflow-hidden pb-32">
      {/* Decorative Glow */}
      <div 
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-10 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)` }}
      />

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 md:px-16 max-w-7xl mx-auto">
        {/* Back Link */}
        <motion.div {...fadeUp(0)} className="mb-12">
          <Link 
            href="/internships" 
            className="group flex items-center gap-2 text-brand-silver hover:text-brand-accent transition-colors font-inter text-xs font-bold uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to internships</span>
          </Link>
        </motion.div>

        <div className="flex flex-col md:flex-row items-end gap-12 relative">
          {/* Giant Watermark shorthand */}
          <div className="absolute -top-12 md:-top-16 -left-4 md:-left-20 opacity-[0.03] select-none pointer-events-none font-space text-[10rem] md:text-[22rem] font-black leading-none uppercase tracking-tighter transition-all duration-500">
            {data.shorthand}
          </div>

          <div className="flex-1 relative z-10 w-full">
            <motion.span 
              {...fadeUp(0.1)} 
              className="section-eyebrow block mb-6 px-3 py-1 bg-brand-accent/10 border border-brand-accent/20 rounded-full w-fit"
              style={{ color: accentColor, borderColor: `${accentColor}33` }}
            >
              {data.tagline}
            </motion.span>
            <motion.h1 
              {...fadeUp(0.2)} 
              className="display-font text-[2.8rem] md:text-8xl font-light leading-[0.95] tracking-tight mb-8"
            >
              {data.title.split(' ').map((word, i) => (
                <span key={i} className={i % 2 !== 0 ? "italic font-bold text-brand-cream" : ""}>
                  {word}{" "}
                </span>
              ))}
            </motion.h1>
          </div>

          {/* Logistics Summary: Optimized for Mobile */}
          <motion.div 
            {...fadeUp(0.3)} 
            className="w-full md:w-auto flex-shrink-0 grid grid-cols-2 md:flex md:flex-col gap-6 md:gap-8 pb-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-charcoal border border-brand-ash/20 flex items-center justify-center text-brand-silver">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-brand-ash font-bold uppercase tracking-widest">Duration</p>
                <p className="font-inter text-xs md:text-sm font-bold">{data.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-charcoal border border-brand-ash/20 flex items-center justify-center text-brand-silver">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-brand-ash font-bold uppercase tracking-widest">Mode</p>
                <p className="font-inter text-xs md:text-sm font-bold">{data.location}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="px-6 md:px-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
        
        {/* Left: About & Brief */}
        <div className="lg:col-span-12">
           <div className="section-rule text-brand-ash mb-16" />
        </div>

        <motion.div {...fadeUp(0.4)} className="lg:col-span-5">
           <span className="section-eyebrow text-brand-accent mb-6 block">The Brief</span>
           <h2 className="display-font text-3xl md:text-4xl font-bold text-brand-cream mb-8 leading-tight">
             About this<br />internship
           </h2>
           <p className="font-inter text-lg text-brand-silver font-light leading-relaxed">
             {data.description}
           </p>
        </motion.div>

        {/* Right: Curriculum / What you'll build */}
        <motion.div {...fadeUp(0.5)} className="lg:col-span-7">
          <span className="section-eyebrow text-brand-accent mb-6 block font-medium">Curriculum</span>
          <h2 className="display-font text-3xl md:text-4xl font-bold text-brand-white mb-10">
            What you'll build
          </h2>
          
          <div className="space-y-4">
            {data.curriculum.map((item, i) => (
              <motion.div 
                key={i} 
                {...fadeUp(0.6 + i * 0.1)}
                className="glass-panel border border-brand-ash/20 p-6 md:p-8 rounded-2xl flex items-start gap-6 hover:border-brand-accent/40 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-accent/20 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-brand-accent" />
                </div>
                <p className="font-inter text-brand-silver leading-relaxed pt-1 italic font-light">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Explore More Domains */}
      <section className="mt-40 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="section-rule text-brand-ash mb-16" />
        <motion.div {...fadeUp(0)} className="mb-12">
          <span className="section-eyebrow text-brand-accent mb-4 block">Next Steps</span>
          <h2 className="display-font text-3xl md:text-5xl font-light">
            Explore other <em className="italic font-bold text-brand-cream">domains.</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {internships
            .filter((p) => p.id !== data.id)
            .map((p, i) => (
              <motion.div
                key={p.id}
                {...fadeUp(0.1 + i * 0.05)}
              >
                <Link 
                  href={`/internships/${p.id}`}
                  className="group flex flex-col items-center gap-4 glass-panel border border-brand-ash/20 py-8 rounded-2xl hover:border-brand-accent/40 hover:-translate-y-1 transition-all duration-300"
                >
                  <div 
                    className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent/20 transition-all duration-300 group-hover:scale-110"
                    style={{ color: themeColors[p.theme] || "#2e5bff", backgroundColor: `${themeColors[p.theme] || "#2e5bff"}1a` }}
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                  <span className="font-space text-[10px] md:text-[11px] font-bold text-brand-silver group-hover:text-brand-accent uppercase tracking-widest text-center px-4 transition-colors">
                    {p.shorthand}
                  </span>
                </Link>
              </motion.div>
            ))}
        </div>
      </section>

      {/* Final CTA */}
      <motion.section {...fadeUp(0.8)} className="mt-32 px-6 md:px-16 max-w-4xl mx-auto text-center">
        <div className="glass-panel border-2 border-brand-accent/20 p-12 md:p-20 rounded-[3rem] relative overflow-hidden group">
          {/* Animated Background Pulse */}
          <div className="absolute inset-0 bg-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <h2 className="display-font text-4xl md:text-6xl font-light mb-8 relative z-10 leading-none">
            Ready to become a<br />
            <em className="italic font-bold text-brand-accent uppercase tracking-tighter">Professional?</em>
          </h2>
          
          <Link 
            href="/register" 
            className="relative z-10 inline-flex items-center gap-4 bg-brand-accent text-white px-12 py-5 rounded-full font-inter text-xs font-black uppercase tracking-[0.25em] hover:scale-105 hover:shadow-2xl hover:shadow-brand-accent/40 transition-all duration-300"
          >
            <span>Apply Now</span>
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </motion.section>

    </main>
  );
}
