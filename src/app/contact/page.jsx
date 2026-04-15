"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const contacts = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    sublabel: "Chat with us directly",
    value: "+91 90749 61908",
    href: "https://wa.me/919074961908",
    external: true,
    color: "#25D366",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
      </svg>
    ),
  },
  {
    id: "whatsapp-group",
    label: "Community Group",
    sublabel: "Join our WhatsApp community",
    value: "GoThree Internship Community",
    href: "https://chat.whatsapp.com/H7ym02zyZI18A1ymOHfBS2",
    external: true,
    color: "#25D366",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
  },
  {
    id: "email",
    label: "Email",
    sublabel: "Send us a message",
    value: "info@gothree.in",
    href: "mailto:info@gothree.in",
    external: false,
    color: "#2e5bff",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    id: "instagram",
    label: "Instagram",
    sublabel: "Follow our journey",
    value: "@gothree.in",
    href: "https://instagram.com/gothree.in",
    external: true,
    color: "#E1306C",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    sublabel: "Connect professionally",
    value: "GoThree",
    href: "https://linkedin.com/company/gothree",
    external: true,
    color: "#0A66C2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: "website",
    label: "Website",
    sublabel: "Visit our official site",
    value: "www.gothree.in",
    href: "https://www.gothree.in",
    external: true,
    color: "#2e5bff",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253M3 12a8.96 8.96 0 00.284 2.253" />
      </svg>
    ),
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.85, ease: "circOut", delay },
});

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen bg-brand-deep overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative w-full min-h-[55vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden pt-32 pb-20">
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[130px] opacity-20" style={{ background: "var(--glow-color)" }} />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[130px] opacity-15" style={{ background: "var(--glow-color)" }} />
        </div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent" />

        <motion.span {...fadeUp(0)} className="inline-block font-inter text-brand-accent tracking-[0.4em] text-[10px] uppercase font-bold mb-6">
          Get In Touch
        </motion.span>

        <motion.h1 {...fadeUp(0.1)} className="display-font text-[clamp(3rem,8vw,8rem)] font-light text-brand-white leading-[0.9] tracking-tight mb-6">
          Let's <em className="italic font-bold text-brand-cream">connect.</em>
        </motion.h1>

        <motion.p {...fadeUp(0.2)} className="font-inter text-brand-silver font-light text-base md:text-lg max-w-lg leading-relaxed">
          Reach out through any of the channels below — we typically respond within a few hours.
        </motion.p>
      </section>

      {/* ── CONTACT CARDS GRID ── */}
      <section className="relative w-full py-20 px-6 md:px-16 bg-brand-charcoal">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-ash/50 to-transparent" />
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {contacts.map((c, i) => (
              <motion.a
                key={c.id}
                href={c.href}
                target={c.external ? "_blank" : "_self"}
                rel={c.external ? "noopener noreferrer" : ""}
                {...fadeUp(i * 0.08)}
                className="group relative glass-panel border border-brand-ash/30 rounded-2xl p-7 md:p-8 hover:border-brand-accent/40 transition-all duration-500 hover:shadow-2xl flex flex-col gap-5 overflow-hidden cursor-pointer"
                style={{ "--card-color": c.color }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                  style={{ background: `radial-gradient(circle at 20% 50%, ${c.color}10 0%, transparent 70%)` }}
                />

                {/* Top row: icon + arrow */}
                <div className="flex items-start justify-between">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${c.color}15`, color: c.color, border: `1px solid ${c.color}25` }}
                  >
                    {c.icon}
                  </div>
                  <div className="w-8 h-8 rounded-full border border-brand-ash/30 flex items-center justify-center group-hover:border-brand-accent/50 group-hover:bg-brand-accent/10 transition-all duration-300">
                    <svg className="w-3 h-3 text-brand-mist group-hover:text-brand-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                </div>

                {/* Label */}
                <div>
                  <p className="font-inter text-[10px] tracking-[0.25em] uppercase font-bold mb-1" style={{ color: c.color }}>
                    {c.label}
                  </p>
                  <p className="font-inter text-[11px] text-brand-mist mb-3 tracking-wide">
                    {c.sublabel}
                  </p>
                  <p className="display-font text-lg font-medium text-brand-white group-hover:text-brand-accent transition-colors duration-300 leading-tight">
                    {c.value}
                  </p>
                </div>

                {/* Bottom line */}
                <div
                  className="mt-auto h-[1px] w-8 group-hover:w-full transition-all duration-700 ease-out"
                  style={{ background: `${c.color}40` }}
                />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIRECT MESSAGE CTA ── */}
      <section className="relative w-full py-28 md:py-36 px-6 flex flex-col items-center justify-center text-center overflow-hidden bg-brand-deep">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full blur-[100px] opacity-20" style={{ background: "var(--glow-color)" }} />
        </div>

        <motion.span {...fadeUp(0)} className="inline-block font-inter text-brand-accent tracking-[0.4em] text-[10px] uppercase font-bold mb-6">
          Quick Action
        </motion.span>

        <motion.h2 {...fadeUp(0.1)} className="display-font text-[clamp(2rem,5vw,5rem)] font-light text-brand-white leading-tight tracking-tight mb-4">
          Ready to start your<br />
          <em className="italic font-bold text-brand-cream">internship journey?</em>
        </motion.h2>

        <motion.p {...fadeUp(0.2)} className="font-inter text-brand-silver font-light text-base max-w-md mb-10 leading-relaxed">
          Skip the form — message us directly on WhatsApp for the fastest response.
        </motion.p>

        <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://wa.me/919074961908"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full hover:shadow-xl hover:shadow-[#25D366]/25 transition-all duration-300 font-inter text-xs font-black tracking-widest uppercase"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
            </svg>
            <span>Message on WhatsApp</span>
          </a>
          <Link
            href="/register"
            className="flex items-center gap-3 bg-transparent border border-brand-ash/50 text-brand-white px-8 py-4 rounded-full hover:border-brand-accent/60 hover:text-brand-accent transition-all duration-300 font-inter text-xs font-bold tracking-widest uppercase"
          >
            Apply for Internship
          </Link>
        </motion.div>

        {/* Footer brand */}
        <div className="mt-24 flex flex-col items-center gap-4 text-brand-mist">
          <img src="/logoG.svg" alt="GoThree" className="w-8 h-8 opacity-40" style={{ filter: "var(--logo-filter)" }} />
          <div className="font-inter text-[10px] tracking-[0.4em] uppercase opacity-40">© GoThree 2026</div>
        </div>
      </section>

    </main>
  );
}
