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
    if (item.external) {
      return (
        <motion.a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="relative font-inter text-xs font-bold uppercase tracking-[0.1em] text-brand-white group"
          whileHover="hover"
        >
          <span className="relative z-10 hover:text-brand-accent transition-colors">
            {item.label}
          </span>
          <motion.div
            className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-brand-accent transform origin-left"
            variants={{ initial: { scaleX: 0 }, hover: { scaleX: 1 } }}
            transition={{ duration: 0.3, ease: "circOut" }}
            initial="initial"
          />
        </motion.a>
      );
    }
    return (
      <motion.div className="relative group" whileHover="hover">
        <Link
          href={item.href}
          className={`font-inter text-xs font-bold uppercase tracking-[0.1em] transition-colors ${
            isActive ? "text-brand-accent" : "text-brand-white hover:text-brand-accent"
          }`}
        >
          {item.label}
        </Link>
        <motion.div
          className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-brand-accent transform origin-left"
          variants={{ initial: { scaleX: isActive ? 1 : 0 }, hover: { scaleX: 1 } }}
          transition={{ duration: 0.3, ease: "circOut" }}
          initial="initial"
          animate={isActive ? "hover" : "initial"}
        />
      </motion.div>
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
      <div className="hidden md:flex gap-8 pointer-events-auto">
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
        <div className="hidden md:flex gap-8 items-center">
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

            <div className="flex flex-col items-center gap-10">
              {[...leftLinks, ...rightLinks].map((item, idx) => {
                const isActive = !item.external && pathname === item.href;
                if (item.external) {
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMenuOpen(false)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.07 }}
                      className="display-font text-4xl font-light text-brand-white hover:text-brand-accent transition-colors tracking-tight"
                    >
                      {item.label}
                    </motion.a>
                  );
                }
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.07 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`display-font text-4xl font-light transition-colors tracking-tight ${
                        isActive ? "text-brand-accent" : "text-brand-white hover:text-brand-accent"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.a
                href="https://www.gothree.in"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 font-inter text-xs font-bold tracking-[0.2em] text-brand-mist uppercase"
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
