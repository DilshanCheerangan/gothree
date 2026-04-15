"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Check initial state
    if (typeof window !== 'undefined') {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    }
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [isMenuOpen]);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

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
      className="fixed top-0 left-0 w-full z-[100] px-6 py-6 md:px-16 flex justify-between items-center pointer-events-none"
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
            <span className="relative z-10 hover:text-brand-accent transition-colors">{item.label}</span>
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
        {/* Light Mode: Black | Dark Mode: White */}
        <img 
          src="/logoG.svg" 
          alt="GoThree Logo" 
          className="w-auto h-16 md:h-20 transition-all duration-300"
          style={{ filter: isDark ? "brightness(0) invert(1) brightness(1.5)" : "brightness(0)" }}
        />
        <img 
          src="/textgothree.svg" 
          alt="GoThree" 
          className="w-auto h-16 md:h-16 -translate-x-6 md:-translate-x-9 -translate-y-[1px] transition-all duration-300"
          style={{ filter: isDark ? "brightness(0) invert(1) brightness(1.5)" : "brightness(0)" }}
        />
      </div>

      {/* RIGHT: Site Link & Theme Toggle */}
      <div className="flex gap-4 md:gap-8 items-center justify-end pointer-events-auto w-1/3 font-inter text-xs font-bold tracking-[0.1em] text-brand-white">
        <a
          href="https://www.gothree.in"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block hover:text-brand-accent transition-colors lowercase"
        >
          WWW.GOTHREE.IN
        </a>

        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          className="w-10 h-10 rounded-full bg-brand-charcoal border border-brand-ash/30 flex items-center justify-center hover:border-brand-accent transition-all dark:bg-brand-charcoal dark:hover:border-brand-accent"
          aria-label="Toggle Theme"
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-brand-accent" />
          ) : (
            <Moon className="w-4 h-4 text-brand-white" />
          )}
        </button>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden w-10 h-10 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent"
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[150] bg-brand-deep/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center p-8 pointer-events-auto"
          >
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 text-brand-white"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="flex flex-col items-center gap-12">
              {menuItems.map((item, idx) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="display-font text-4xl font-light text-brand-white hover:text-brand-accent transition-colors tracking-tight"
                >
                  {item.label}
                </motion.a>
              ))}
              
              <motion.a
                href="https://www.gothree.in"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 font-inter text-xs font-bold tracking-[0.2em] text-brand-mist uppercase"
              >
                www.gothree.in
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
