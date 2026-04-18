"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * BackgroundAtmosphere
 * A premium global background component that adds depth, texture, and light across the entire scroll.
 * Features:
 * - Dynamic scroll color transition (Black -> Gold Brass)
 * - Vertically distributed light spots
 * - Absolute positioning to scroll with content
 * - technical blueprint grid
 */
export default function BackgroundAtmosphere() {
  const [isMobile, setIsMobile] = useState(false);

  // 1. Global Page Scroll Tracking
  const { scrollYProgress } = useScroll();

  // 2. Color Mapping: Black (#050505) -> Deep Gold Brass (#2a1e0b)
  // Hero stays black (0.0 to 0.1), then transitions
  const bgColor = useTransform(
    scrollYProgress,
    [0.1, 0.45, 1],
    ["#050505", "#16110a", "#2a1e0b"]
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div 
      style={{ backgroundColor: bgColor }}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none"
    >
      {/* 1. Global Light Spots - Vertically distributed with ultra-smooth radial gradients */}
      
      {/* LIGHT 01: Hero Bloom (Gold) - Enhanced falloff */}
      <motion.div 
        className="absolute top-[5%] -right-[15%] w-[100vw] h-[100vw] rounded-full blur-[200px] animate-atmospheric opacity-60"
        style={{ 
          background: "radial-gradient(circle at center, rgba(166, 124, 59, 0.15) 0%, rgba(166, 124, 59, 0.05) 30%, transparent 70%)" 
        }}
      />

      {/* LIGHT 02: Mid-scroll Atmosphere (Deep Blue) - Higher diffusion */}
      <motion.div 
        className="absolute top-[250vh] -left-[20%] w-[110vw] h-[110vw] rounded-full blur-[250px] animate-atmospheric-slow opacity-50"
        style={{ 
          background: "radial-gradient(circle at center, rgba(26, 43, 75, 0.2) 0%, rgba(26, 43, 75, 0.08) 40%, transparent 75%)" 
        }}
      />

      {/* LIGHT 03: Feature Section Glow (Gold) - Tightened center, soft edges */}
      <motion.div 
        className="absolute top-[450vh] -right-[10%] w-[90vw] h-[90vw] rounded-full blur-[220px] animate-atmospheric opacity-70"
        style={{ 
          background: "radial-gradient(circle at center, rgba(166, 124, 59, 0.12) 0%, transparent 70%)" 
        }}
      />

      {/* LIGHT 04: Bottom-scroll Bloom (Void Blue) - Extreme diffusion */}
      <motion.div 
        className="absolute bottom-[20%] -left-[15%] w-[120vw] h-[120vw] rounded-full blur-[300px] animate-atmospheric-slow opacity-60"
        style={{ 
          background: "radial-gradient(circle at center, rgba(10, 21, 37, 0.25) 0%, rgba(10, 21, 37, 0.1) 50%, transparent 80%)" 
        }}
      />

      {/* 2. Technical Grid - Blueprint texture spanning full height */}
      <div className="absolute inset-0 bg-technical-grid opacity-[0.03]" />

      {/* 4. Vignette - Pulling focus to center (Fixed relative to viewport for consistent contrast) */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-10" />
    </motion.div>
  );
}
