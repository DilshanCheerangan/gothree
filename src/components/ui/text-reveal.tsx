"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealByWordProps {
  text: string;
  className?: string;
}

/**
 * TextRevealByWord - Luxury Cinematic Edition
 * Features:
 * 1. Blur-to-Focus reveal (Cinematic unmasking)
 * 2. Traveling Golden Focus Glow behind words
 * 3. Parallax 'Mist' drift
 */
const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  className,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const words = text.split(" ");

  // Deep Parallax Drift - The whole text field floats slightly faster than the scroll
  const y = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const smoothYOffset = useSpring(y, { stiffness: 40, damping: 20 });

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[100vh] flex items-center justify-center overflow-hidden", className)}>
      <motion.div 
        style={{ y: smoothYOffset }}
        className="relative mx-auto flex w-full max-w-7xl items-center justify-center bg-transparent px-6 md:px-12"
      >
        <p
          className={
            "flex flex-wrap items-center justify-center gap-x-3 md:gap-x-6 text-center display-font text-[1.5rem] md:text-[2.6rem] font-light leading-[1.25] tracking-[-0.02em] max-w-5xl"
          }
        >
          {words.map((word, i) => {
            const step = 1 / words.length;
            
            // Map the reveal to a tighter central window (0.25 to 0.65) for faster reveal
            const start = 0.25 + (i * step) * 0.4;
            const end = start + (step * 2) * 0.4;

            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </motion.div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: any;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  // 1. Color: Mist (fade) -> Brand White (focus)
  const color = useTransform(progress, range, [
    "rgba(148, 163, 184, 0.15)", // Very faint mist
    "rgba(255, 255, 255, 1)"      // Pure white
  ]);

  // 2. Blur: Heavy blur -> Technical Sharpness
  const blurVal = useTransform(progress, range, [12, 0]);
  const filter = useTransform(blurVal, (v) => `blur(${v}px)`);

  // 3. Floating Motion (Y-axis)
  const wordY = useTransform(progress, range, [20, 0]);
  const smoothWordY = useSpring(wordY, { stiffness: 80, damping: 25 });

  // 4. Focus Glow (The Golden Traveling Light)
  // We want the glow to peak exactly in the middle of the 'focus' range
  const glowOpacity = useTransform(progress, 
    [range[0], (range[0] + range[1]) / 2, range[1]], 
    [0, 0.25, 0]
  );
  const glowScale = useTransform(progress, range, [0.8, 1.1]);

  return (
    <span className="relative inline-block py-2">
      {/* Golden Focus Glow Layer */}
      <motion.span
        style={{ opacity: glowOpacity, scale: glowScale }}
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle,rgba(166,124,59,0.4)_0%,transparent_75%)] blur-2xl pointer-events-none rounded-full"
      />

      <motion.span
        style={{ color, filter, y: smoothWordY }}
        className="relative inline-block transition-colors duration-200"
      >
        {children}
      </motion.span>
    </span>
  );
};

export { TextRevealByWord };
