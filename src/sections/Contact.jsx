"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import RegistrationForm from "@/components/RegistrationForm";

export default function Contact() {
  return (
    <section id="contact" className="w-full min-h-screen flex flex-col justify-center items-center py-20 md:py-32 px-6 md:px-8 bg-final-bg relative z-10">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent" />
      
      <div className="max-w-3xl w-full text-center mb-12 md:mb-16 px-4">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-inter text-brand-accent tracking-[0.35em] text-[10px] md:text-xs uppercase mb-4 md:mb-6 block font-bold"
        >
          Final Step
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="display-font text-4xl md:text-7xl font-light text-brand-white leading-tight"
        >
          Start Your <br className="md:hidden" />
          <em className="italic font-bold text-brand-cream tracking-tight">Journey</em>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-inter text-brand-silver font-light mt-6 text-lg tracking-tight"
        >
          Take the first step towards building real-world skills.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex justify-center"
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
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 1 }}
        className="w-full flex justify-center"
      >
        <RegistrationForm />
      </motion.div>

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
