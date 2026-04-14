"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // We only attach event listeners on the client side
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      // Check if the target is interactive
      const isInteractive = e.target.closest('a, button, [role="button"], input, textarea');
      setIsHovering(Boolean(isInteractive));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Main Cursor Dot */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-brand-accent rounded-full pointer-events-none z-[9999] mix-blend-normal transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: mousePosition.x - 4, // centering offset
          y: mousePosition.y - 4,
          scale: isHovering ? 5 : 1,
          backgroundColor: isHovering ? "transparent" : "#b8935a",
          border: isHovering ? "1px solid #b8935a" : "none"
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
      />
      
      {/* Cursor Trail */}
      <motion.div
        ref={trailRef}
        className="fixed top-0 left-0 w-8 h-8 border border-brand-accent/25 rounded-full pointer-events-none z-[9998] mix-blend-normal transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: mousePosition.x - 16, // centering offset
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0 : 1
        }}
        transition={{ type: "tween", ease: "circOut", duration: 0.4 }}
      />
    </>
  );
}
