"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

/**
 * BackgroundAtmosphere
 * The ultimate source of truth for the GoThree environment.
 * Consolidates technical texture, volumetric wash, and light rays into one choreographed system.
 */
export default function BackgroundAtmosphere() {
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll();

  // 1. Base Background Color (Deep Black start)
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.5, 1],
    ["#020202", "#020202", "#080604", "#110e0a"]
  );

  // 2. The Global Reveal Trigger: Locked to 0 strictly during the Hero phase (0.0 to 0.12)
  const atmosphereReveal = useTransform(
    scrollYProgress,
    [0.10, 0.35, 0.85, 1],
    [0, 1, 1, 0.3]
  );

  // 3. Gold Atmospheric Wash: Smoother volumetric ramp
  const goldIntensity = useTransform(atmosphereReveal, [0, 1], [0, 0.22]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Industrial Ray distribution
  const rays = useMemo(() => [
    { left: "8%", width: "1px", blur: "6px", delay: 0, opacity: 0.12, height: "75vh" },
    { left: "22%", width: "1px", blur: "4px", delay: 1, opacity: 0.08, height: "60vh" },
    { left: "40%", width: "2px", blur: "10px", delay: 0.5, opacity: 0.15, height: "85vh" },
    { left: "58%", width: "1px", blur: "8px", delay: 2, opacity: 0.1, height: "70vh" },
    { left: "75%", width: "1px", blur: "5px", delay: 1.5, opacity: 0.08, height: "80vh" },
    { left: "92%", width: "2px", blur: "14px", delay: 0.2, opacity: 0.14, height: "72vh" },
    // Soft ambient rays for filling space
    { left: "15%", width: "120px", blur: "140px", delay: 3, opacity: 0.04, height: "100vh" },
    { left: "82%", width: "150px", blur: "180px", delay: 4, opacity: 0.03, height: "100vh" },
  ], []);

  return (
    <motion.div
      style={{ backgroundColor: bgColor }}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none"
    >
      {/* 
          1. UNIFIED TECHNICAL TEXTURE 
          Replaces the local Hero background with a consistent global blueprint.
      */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none">
        <img
          src="/hero-bg.png"
          alt=""
          className="w-full h-full object-cover grayscale brightness-125"
        />
      </div>

      {/* 
          2. VOLUMETRIC GOLD WASH
          Rising linear glow, strictly hidden in the Hero.
      */}
      <motion.div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          opacity: goldIntensity,
          background: "linear-gradient(to top, rgba(166, 124, 59, 1) 0%, transparent 80%)"
        }}
      />

      {/* 
          3. INDUSTRIAL LIGHT RAYS 
          Sophisticated 'color-dodge' blending for high-end optical smoothness.
      */}
      <motion.div
        style={{ opacity: atmosphereReveal }}
        className="absolute inset-0 flex items-end"
      >
        {rays.map((ray, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [ray.opacity * 0.7, ray.opacity, ray.opacity * 0.7],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: ray.delay
            }}
            className="absolute bottom-0"
            style={{
              left: ray.left,
              width: ray.width,
              height: ray.height,
              background: "linear-gradient(to top, rgba(166, 124, 59, 0.3) 0%, transparent 100%)",
              filter: `blur(${ray.blur})`,
              mixBlendMode: "color-dodge"
            }}
          />
        ))}
      </motion.div>

      {/* 4. Fine Technical Grid Overlay */}
      <div className="absolute inset-0 bg-technical-grid opacity-[0.02]" />

      {/* 5. Global Polish Layers */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40 z-10 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.5)_100%)] z-10 pointer-events-none opacity-30" />
    </motion.div>
  );
}
