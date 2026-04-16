"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Briefcase, BookOpen, Zap, ArrowLeft } from "lucide-react";
import { useState } from "react";
import RegistrationForm from "@/components/RegistrationForm";
import ComingSoonMessage from "@/components/ComingSoonMessage";

export default function Contact() {
  const [regType, setRegType] = useState(null);

  const selectionCards = [
    {
      id: "internships",
      title: "Internship",
      subtitle: "Programs",
      description: "Gain real-world experience through our industry-backed internship tracks.",
      icon: Briefcase,
    },
    {
      id: "courses",
      title: "Specialized",
      subtitle: "Courses",
      description: "Master high-demand tech skills with our expert-led curriculum.",
      icon: BookOpen,
    },
    {
      id: "training",
      title: "Direct",
      subtitle: "Training",
      description: "Fast-track your learning journey with intensive hands-on training sessions.",
      icon: Zap,
    },
  ];

  return (
    <section id="contact" className="w-full min-h-screen flex flex-col justify-start items-center py-20 md:py-32 px-6 md:px-8 bg-final-bg relative z-10">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent" />
      
      <div className="max-w-3xl w-full text-center mb-12 md:mb-16 px-4">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-inter text-brand-accent tracking-[0.35em] text-[10px] md:text-xs uppercase mb-4 md:mb-6 block font-bold"
        >
          {regType ? "Registration Space" : "Final Step"}
        </motion.span>
        
        <motion.h2 
          key={regType ? "heading-reg" : "heading-init"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="display-font text-4xl md:text-7xl font-light text-brand-white leading-tight"
        >
          {regType ? (
            <>Select Your <em className="italic font-bold text-brand-cream tracking-tight">Path</em></>
          ) : (
            <>Start Your <br className="md:hidden" /> <em className="italic font-bold text-brand-cream tracking-tight">Journey</em></>
          )}
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-inter text-brand-silver font-light mt-6 text-lg tracking-tight"
        >
          {regType === 'internships' 
            ? "Complete your profile for the GoThree Internship programs."
            : regType 
              ? "This track will be available for registration soon." 
              : "Take the first step towards building real-world skills."
          }
        </motion.p>
      </div>

      <div className="w-full max-w-7xl relative flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!regType ? (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl"
            >
              {selectionCards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => setRegType(card.id)}
                  className="group relative flex flex-col items-center text-center p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-brand-accent/50 hover:bg-brand-accent/[0.03] transition-all duration-500 backdrop-blur-sm"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-accent/10 transition-all duration-500">
                    <card.icon className="w-8 h-8 text-brand-white group-hover:text-brand-accent transition-colors" />
                  </div>
                  <h3 className="display-font text-2xl font-light text-brand-white">
                    {card.title} <br />
                    <em className="italic font-bold text-brand-cream">{card.subtitle}</em>
                  </h3>
                  <p className="mt-4 text-xs font-inter text-brand-silver leading-relaxed opacity-60">
                    {card.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-brand-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    Register Now <ExternalLink className="w-3 h-3" />
                  </div>
                </button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="w-full flex flex-col items-center"
            >
              <button 
                onClick={() => setRegType(null)}
                className="mb-12 flex items-center gap-2 font-inter text-xs font-bold uppercase tracking-[0.15em] text-brand-mist hover:text-brand-accent transition-colors group"
              >
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                Change Track
              </button>

              {regType === 'internships' ? (
                <RegistrationForm />
              ) : (
                <ComingSoonMessage 
                  title={regType === 'courses' ? "Advanced" : "Specialized"}
                  type={regType === 'courses' ? "Courses" : "Training"}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!regType && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 flex justify-center"
        >
          <a 
            href="https://chat.whatsapp.com/H7ym02zyZI18A1ymOHfBS2"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-2 rounded-full bg-brand-accent/10 border border-brand-accent/20 hover:bg-brand-accent/20 transition-all group"
          >
            <span className="w-2 h-2 bg-brand-accent rounded-full animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-white">Join the Community WhatsApp</span>
            <ExternalLink className="w-3 h-3 text-brand-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      )}

      {/* Footer Branding */}
      <div className="mt-32 flex flex-col items-center gap-6 text-brand-mist pb-16">
        <img 
          src="/logoG.svg" 
          alt="GoThree Logo" 
          className="w-10 h-10 opacity-100 transition-all duration-300" 
          style={{ filter: "var(--logo-filter)" }}
        />
        <div className="uppercase tracking-[0.5em] font-space text-[0.65rem]">
          © 2026
        </div>
      </div>
    </section>
  );
}

