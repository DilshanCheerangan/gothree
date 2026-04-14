"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 1 }}
      className="fixed top-0 left-0 w-full z-50 px-8 py-8 md:px-16 flex justify-between items-center mix-blend-difference pointer-events-none"
    >
      {/* LEFT: Navigation Links */}
      <div className="hidden md:flex gap-12 pointer-events-auto w-1/3">
        {["Programs", "Manifesto", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="font-inter text-[0.65rem] md:text-xs font-bold uppercase tracking-[0.05em] text-white hover:text-white/70 transition-colors"
          >
            {item}
          </a>
        ))}
      </div>

      {/* CENTER: The Logo */}
      <div className="flex items-center gap-1 pointer-events-auto opacity-100 transition-opacity justify-center w-1/3">
        <img src="/logoG.svg" alt="G" className="w-auto h-16 sm:h-20 invert brightness-0" />
        <img src="/textgothree.svg" alt="GoThree" className="w-auto h-16 sm:h-20 -translate-x-4 invert brightness-0 -translate-y-[2px]" />
      </div>

      {/* RIGHT: Contact Information */}
      <div className="hidden md:flex gap-12 justify-end pointer-events-auto w-1/3 font-inter text-[0.65rem] md:text-xs font-bold tracking-[0.05em] text-white">
        <a
          href="https://wa.me/919074961908"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white/70 transition-colors"
        >
          +91 9074961908
        </a>
        <a
          href="https://www.gothree.in"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white/70 transition-colors lowercase"
        >
          www.gothree.in
        </a>
      </div>
    </motion.nav>
  );
}
