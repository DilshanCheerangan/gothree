"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 500px (past hero)
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, x: "-50%", opacity: 0 }}
          animate={{ y: 0, x: "-50%", opacity: 1 }}
          exit={{ y: 100, x: "-50%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200]"
        >
          <Link
            href="/register"
            className="flex items-center gap-4 px-8 py-4 bg-brand-white text-brand-deep rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:scale-105 transition-transform active:scale-95 group border border-white/20 backdrop-blur-md"
          >
            <span className="font-space text-xs font-black tracking-[0.2em] uppercase">
                Elevate Your Career
            </span>
            <div className="w-6 h-6 rounded-full bg-brand-deep flex items-center justify-center text-white group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
