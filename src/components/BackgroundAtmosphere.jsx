"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";

/**
 * BackgroundAtmosphere
 * The ultimate source of truth for the GoThree environment.
 * Now powered by a 'Luxury Gold' Aurora engine.
 */
export default function BackgroundAtmosphere() {
  const { scrollYProgress } = useScroll();
  
  // Fade in the Aurora exactly as we enter the Purpose section (3D Showcase)
  const auroraOpacity = useTransform(
    scrollYProgress,
    [0.25, 0.35], // Delayed range to wait for the Ethos section to pass
    [0, 1]
  );

  return (
    <motion.div style={{ opacity: auroraOpacity }}>
      <AuroraBackground className="fixed inset-0 z-0 pointer-events-none" showRadialGradient={false}>
        {/* 
            1. MINIMALIST TECHNICAL VOID 
            Optional: Add back a very faint grid or grain if needed.
        */}
        <div className="absolute inset-0 z-0 bg-transparent pointer-events-none" />
      </AuroraBackground>
    </motion.div>
  );
}
