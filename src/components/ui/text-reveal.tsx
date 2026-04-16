"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealByWordProps {
  text: string;
  className?: string;
}

/**
 * TextRevealByWord - Smooth Drift Edition
 * Removes the "sticky lock" for a simultaneous scroll and reveal.
 * Uses parallax to slow down the text's ascent while words reveal.
 */
const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  className,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  // We track the section as it enters and leaves the full viewport
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const words = text.split(" ");

  // The 'Slow Drift' (Parallax)
  // We move the text container in the opposite direction of the scroll
  // to effectively reduce the scrolling speed.
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const smoothYOffset = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[100vh] flex items-center justify-center overflow-hidden", className)}>
      <motion.div 
        style={{ y: smoothYOffset }}
        className="relative mx-auto flex w-full max-w-7xl items-center justify-center bg-transparent px-6 md:px-12"
      >
        <p
          className={
            "flex flex-wrap items-center justify-center gap-x-3 md:gap-x-6 text-center display-font text-[1.5rem] md:text-[2.4rem] font-bold leading-[1.3] tracking-tight max-w-5xl"
          }
        >
          {words.map((word, i) => {
            const step = 1 / words.length;
            
            // Speed up the reveal: map the entire paragraph to a 50% window
            // and start it earlier for better responsiveness.
            const start = 0.25 + (i * step) * 0.5;
            const end = start + (step * 2) * 0.5;

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
  const color = useTransform(progress, range, [
    "var(--color-brand-mist)",
    "var(--color-brand-white)"
  ]);

  const wordY = useTransform(progress, range, [5, 0]);
  const smoothWordY = useSpring(wordY, { stiffness: 100, damping: 30 });

  return (
    <span className="relative inline-block py-1">
      <motion.span
        style={{ color, y: smoothWordY }}
        className="relative inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
};

export { TextRevealByWord };
