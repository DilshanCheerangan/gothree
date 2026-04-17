"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function IntroOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // 1. Check if user has visited in this session
    const hasVisited = sessionStorage.getItem("gothree_intro_seen");
    
    if (!hasVisited) {
      setShouldRender(true);
      setIsVisible(true);
      
      // 2. Set timeout to fade out
      const timer = setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem("gothree_intro_seen", "true");
        
        // Final cleanup after animation completes
        setTimeout(() => setShouldRender(false), 1000);
      }, 2500); // Increased to 2.5s display time

      return () => clearTimeout(timer);
    }
  }, []);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-brand-deep pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center space-y-2"
          >
            {/* Branding Label */}
            <span className="block font-space text-[10px] md:text-xs font-black tracking-[0.6em] uppercase text-brand-accent/60 selection:bg-transparent">
              GoThree™
            </span>
            
            {/* Tagline */}
            <h1 className="display-font text-2xl md:text-4xl font-light text-brand-white tracking-tighter leading-tight selection:bg-transparent lowercase italic">
              Move with purpose.
            </h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
