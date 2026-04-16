"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDarkMode = document.documentElement.classList.contains("dark");
      setIsDark(isDarkMode);
    }
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // LEFT side nav links
  const leftLinks = [
    { label: "Home", href: "/" },
    { label: "Internships", href: "/internships" },
    { label: "Courses", href: "/courses" },
    { label: "About", href: "/about" },
  ];

  // RIGHT side nav links
  const rightLinks = [
    { label: "Contact", href: "/contact" },
    { label: "Register", href: "/register" },
  ];

  const NavLink = ({ item }) => {
    const isActive = !item.external && pathname === item.href;

    const linkContent = (
      <div className="relative pointer-events-auto group">
        {/* The Clipping Window — Fixed Height for perfect alignment */}
        <div className="overflow-hidden h-4">
          {/* The Sliding Wrapper */}
          <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
            {/* Top State */}
            <span
              className={`font-inter text-[10px] font-bold uppercase tracking-[0.2em] block h-4 flex items-center ${
                isActive ? "text-brand-accent" : "text-brand-white"
              }`}
            >
              {item.label}
            </span>
            {/* Bottom State (Hover) */}
            <span className="font-inter text-[10px] font-bold uppercase tracking-[0.2em] block h-4 flex items-center text-brand-accent">
              {item.label}
            </span>
          </div>
        </div>

        {/* Active Indicator Dot */}
        {isActive && (
          <motion.div
            layoutId="nav-dot"
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-accent"
          />
        )}
      </div>
    );

    if (item.external) {
      return (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkContent}
        </a>
      );
    }

    return (
      <Link href={item.href}>
        {linkContent}
      </Link>
    );
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 1 }}
      className="fixed top-0 left-0 w-full z-[100] px-6 py-6 md:px-12 flex justify-between items-center pointer-events-none"
    >
      {/* LEFT: Home, Internships, Courses, About */}
      <div className="hidden md:flex gap-10 pointer-events-auto">
        {leftLinks.map((item) => (
          <NavLink key={item.label} item={item} />
        ))}
      </div>

      {/* CENTER: Logo */}
      <Link
        href="/"
        className="flex items-center gap-1 pointer-events-auto transition-all absolute left-1/2 -translate-x-1/2"
      >
        <img
          src="/logoG.svg"
          alt="GoThree Logo"
          className="w-auto h-14 md:h-16 transition-all duration-300"
          style={{ filter: isDark ? "brightness(0) invert(1) brightness(1.5)" : "brightness(0)" }}
        />
        <img
          src="/textgothree.svg"
          alt="GoThree"
          className="w-auto h-14 md:h-14 -translate-x-5 md:-translate-x-7 -translate-y-[1px] transition-all duration-300"
          style={{ filter: isDark ? "brightness(0) invert(1) brightness(1.5)" : "brightness(0)" }}
        />
      </Link>

      {/* RIGHT: Contact, Register, Theme Toggle */}
      <div className="flex gap-4 md:gap-8 items-center justify-end pointer-events-auto">
        {/* Desktop right links */}
        <div className="hidden md:flex gap-10 items-center">
          {rightLinks.map((item) => (
            <NavLink key={item.label} item={item} />
          ))}
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-full bg-brand-charcoal border border-brand-ash/30 flex items-center justify-center hover:border-brand-accent transition-all dark:bg-brand-charcoal dark:hover:border-brand-accent pointer-events-auto"
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
          className="md:hidden w-9 h-9 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent pointer-events-auto"
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[150] bg-brand-deep/98 backdrop-blur-3xl md:hidden overflow-hidden flex flex-col pointer-events-auto px-10 pt-32 pb-16"
          >
            {/* Background Branding */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
              <span className="display-font text-[25vw] font-black tracking-tighter text-brand-white select-none">
                MENU
              </span>
            </div>

            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 text-brand-white p-2"
            >
              <X className="w-8 h-8 font-light" />
            </button>

            <div className="relative flex flex-col items-start gap-4">
              <span className="font-inter text-[10px] uppercase tracking-[0.4em] text-brand-accent font-bold mb-6">
                Navigation
              </span>
              
              {[...leftLinks, ...rightLinks].map((item, idx) => {
                const isActive = !item.external && pathname === item.href;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ 
                      delay: 0.1 + idx * 0.06, 
                      duration: 0.8, 
                      ease: [0.33, 1, 0.68, 1] 
                    }}
                    className="overflow-hidden"
                  >
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="display-font text-5xl font-light text-brand-white leading-none tracking-tight block py-1"
                      >
                        {item.label}.
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className={`display-font text-5xl font-light leading-none tracking-tight block py-1 ${
                          isActive ? "text-brand-accent italic" : "text-brand-white"
                        }`}
                      >
                        {item.label}.
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-auto flex flex-col gap-6">
              <div className="w-full h-px bg-brand-ash/20" />
              <div className="flex justify-between items-center">
                <motion.a
                  href="https://www.gothree.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="font-inter text-[10px] font-bold tracking-[0.2em] text-brand-mist uppercase"
                >
                  www.gothree.in
                </motion.a>
                <div className="flex gap-4">
                  {/* Subtle social links placeholder or similar */}
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
