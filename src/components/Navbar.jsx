"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const timeoutRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isMenuOpen]);

  // Scroll Handling logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else {
        if (currentScrollY > lastScrollY && !isMenuOpen) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY) {
          setIsVisible(true);
        }
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMenuOpen]);

  // LEFT side nav links
  const leftLinks = [
    { label: "Home", href: "/" },
    { label: "Internships", href: "/internships" },
    { label: "Courses", href: "/courses" },
    { label: "Training", href: "/training" },
    { label: "About", href: "/about" },
  ];

  // RIGHT side nav links
  const rightLinks = [
    { label: "Contact", href: "/contact" },
    { label: "Register", href: "/register" },
  ];

  const NavLink = ({ item }) => {
    const isActive = pathname === item.href;
    return (
      <Link href={item.href} className="relative group pointer-events-auto">
        <div className="overflow-hidden h-4">
          <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
            <span className={`font-inter text-[10px] font-bold uppercase tracking-[0.2em] block h-4 flex items-center ${isActive ? "text-brand-accent" : "text-brand-white"}`}>
              {item.label}
            </span>
            <span className="font-inter text-[10px] font-bold uppercase tracking-[0.2em] block h-4 flex items-center text-brand-accent">
              {item.label}
            </span>
          </div>
        </div>
        {isActive && (
          <motion.div
            layoutId="nav-dot"
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-accent"
          />
        )}
      </Link>
    );
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 w-full z-[100] px-6 py-6 md:px-12 flex justify-between items-center pointer-events-none"
    >
      <div className="hidden md:flex gap-10 pointer-events-auto">
        {leftLinks.map((item) => (
          <NavLink key={item.label} item={item} />
        ))}
      </div>

      <Link
        href="/"
        className="flex items-center gap-1 pointer-events-auto transition-all absolute left-1/2 -translate-x-1/2"
      >
        <img
          src="/logoG.svg"
          alt="GoThree Logo"
          className="w-auto h-14 md:h-16 transition-all duration-300"
          style={{ filter: "brightness(0) invert(1) brightness(1.5)" }}
        />
        <img
          src="/textgothree.svg"
          alt="GoThree"
          className="w-auto h-14 md:h-14 -translate-x-5 md:-translate-x-7 -translate-y-[1px] transition-all duration-300"
          style={{ filter: "brightness(0) invert(1) brightness(1.5)" }}
        />
      </Link>

      <div className="flex gap-4 md:gap-8 items-center justify-end pointer-events-auto">
        <div className="hidden md:flex gap-10 items-center">
          {rightLinks.map((item) => (
            <NavLink key={item.label} item={item} />
          ))}
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden w-9 h-9 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent pointer-events-auto"
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-brand-deep/98 backdrop-blur-3xl md:hidden flex flex-col pointer-events-auto px-10 pt-32 pb-16"
          >
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-brand-white p-2">
              <X className="w-8 h-8 font-light" />
            </button>
            <div className="relative flex flex-col items-start gap-4">
               {[...leftLinks, ...rightLinks].map((item, idx) => (
                   <Link key={idx} href={item.href} className="display-font text-5xl font-light text-brand-white leading-none tracking-tight block py-1">
                       {item.label}.
                   </Link>
               ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
