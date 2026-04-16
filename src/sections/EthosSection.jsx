import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10px" },
  transition: { duration: 1, ease: [0.33, 1, 0.68, 1], delay },
});

const ethos = [
  {
    label: "No lectures.",
    strikethrough: true,
    desc: "Every session replaces a lecture with a real project brief. You don't watch — you build.",
  },
  {
    label: "No passive learning.",
    strikethrough: true,
    desc: "No video playlists. No MCQ quizzes. Every session produces a deliverable your mentor reviews.",
  },
  {
    label: "Only building.",
    strikethrough: false,
    desc: "Real project briefs. Real team collaboration. Real feedback. A real portfolio by the end.",
  },
];

export default function EthosSection() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section 
      ref={container}
      className="relative w-full py-28 md:py-48 px-6 md:px-16 bg-brand-charcoal overflow-hidden"
    >
      {/* Top rule */}
      <div className="section-rule text-brand-ash absolute top-0 left-0" />

      {/* Watermark */}
      <motion.div
        style={{ y: y1 }}
        className="section-watermark absolute top-0 right-4 md:right-10 text-brand-white select-none"
        aria-hidden="true"
      >
        01
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 md:mb-28">
          <motion.span
            {...fadeUp(0)}
            className="section-eyebrow inline-block text-brand-accent mb-6"
          >
            Real Talk
          </motion.span>

          <h2 className="display-font text-[clamp(2.5rem,6vw,7rem)] font-light text-brand-white leading-[0.92] tracking-tight">
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
                className="inline-block"
              >
                This isn't what
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
                className="inline-block italic font-bold text-brand-cream"
              >
                you think.
              </motion.span>
            </div>
          </h2>

          <motion.p
            {...fadeUp(0.2)}
            className="font-inter text-brand-silver font-light text-base md:text-lg mt-7 max-w-xl mx-auto leading-relaxed"
          >
            We don't do lectures. We don't do passive learning. We only do building.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {ethos.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10px" }}
              whileTap={{ scale: 0.98 }}
              className="group relative glass-panel border border-brand-ash/30 rounded-2xl p-7 md:p-11 transition-all duration-500 hover:shadow-2xl flex flex-col gap-6 mobile-glow-pulse md:hover:border-brand-accent/40 md:hover:-translate-y-1"
            >
              {/* Icon */}
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                  item.strikethrough
                    ? "bg-red-500/10 border border-red-500/20"
                    : "bg-brand-accent/10 border border-brand-accent/20"
                }`}
              >
                {item.strikethrough ? (
                  <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                )}
              </div>

              {/* Label */}
              <h3
                className={`display-font text-xl md:text-2xl font-bold leading-tight ${
                  item.strikethrough
                    ? "text-red-400 line-through decoration-2"
                    : "text-brand-accent"
                }`}
              >
                {item.label}
              </h3>

              {/* Desc */}
              <p className="font-inter text-sm text-brand-silver font-light leading-relaxed flex-1">
                {item.desc}
              </p>

              <div className="h-[1px] w-8 group-hover:w-20 transition-all duration-500 bg-brand-accent/40" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
