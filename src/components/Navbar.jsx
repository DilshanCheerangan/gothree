"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const menuItems = [
    { label: "Programs", href: "#program-1" },
    { label: "Contacts", href: "https://wa.me/919074961908" },
    { label: "Register", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 1 }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-16 flex justify-between items-center pointer-events-none"
    >
      {/* LEFT: Navigation Links - Visible on MD+ */}
      <div className="hidden md:flex gap-12 pointer-events-auto w-1/3">
        {menuItems.map((item) => (
          <motion.a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : "_self"}
            rel={item.href.startsWith("http") ? "noopener noreferrer" : ""}
            className="relative font-inter text-xs font-bold uppercase tracking-[0.1em] text-brand-white group"
            whileHover="hover"
          >
            <span className="relative z-10">{item.label}</span>
            <motion.div
              className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-brand-accent transform origin-left"
              variants={{
                initial: { scaleX: 0 },
                hover: { scaleX: 1 }
              }}
              transition={{ duration: 0.3, ease: "circOut" }}
              initial="initial"
            />
          </motion.a>
        ))}
      </div>

      {/* CENTER: The Logo - Always Visible */}
      <div className="flex items-center gap-1 pointer-events-auto transition-all justify-center w-full md:w-1/3">
        <img src="/logoG.svg" alt="G" className="w-auto h-20 md:h-20 grayscale brightness-0 opacity-90" />
        <img src="/textgothree.svg" alt="GoThree" className="w-auto h-16 md:h-16 -translate-x-6 md:-translate-x-9 grayscale brightness-0 -translate-y-[1px] opacity-90" />
      </div>

      {/* RIGHT: Site Link - Visible on MD+ */}
      <div className="hidden md:flex gap-12 justify-end pointer-events-auto w-1/3 font-inter text-xs font-bold tracking-[0.1em] text-brand-white">
        <a
          href="https://www.gothree.in"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-brand-accent transition-colors lowercase"
        >
          WWW.GOTHREE.IN
        </a>
      </div>
    </motion.nav>
  );
}
