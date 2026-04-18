"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Cpu, Globe, Database, Compass } from "lucide-react";

const services = [
    {
        id: "01",
        title: "Internships",
        label: "Professional Production",
        desc: "Rigorous system builds within 6 technical domains. Not a workshop—a high-caliber production cycle for those ready to ship.",
        domains: ["Cyber Security", "AI & ML", "Web Dev", "App Dev", "Python", "AR/XR"],
        href: "/internships",
        icon: <Cpu className="w-6 h-6" />,
    },
    {
        id: "02",
        title: "Courses",
        label: "Skill Specialization",
        desc: "Master specific toolchains and architectural patterns. Direct mentorship from leads who build real-world systems.",
        domains: ["React/Next.js", "Pentesting", "Deep Learning", "Cloud Arch"],
        href: "/courses",
        icon: <Globe className="w-6 h-6" />,
    },
    {
        id: "03",
        title: "Training",
        label: "Enterprise Force",
        desc: "Modernizing collegiate and corporate workflows via the GoThree methodology. Precision engineering for teams.",
        domains: ["DevOps", "Agile Flow", "Tech Leadership", "Security Audits"],
        href: "/training",
        icon: <Database className="w-6 h-6" />,
    },
];

export default function ServicesSection() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 45, damping: 20 });

    return (
        <section ref={container} className="relative w-full h-[350vh] bg-transparent">
            <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden px-6 md:px-16">

                {/* Split Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] w-full max-w-7xl mx-auto gap-20">

                    {/* LEFT PILLAR: Persistent Anchor */}
                    <div className="flex flex-col justify-center py-20">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: "circOut" }}
                        >
                            <span className="text-brand-accent font-space text-[10px] md:text-xs font-black tracking-[0.5em] uppercase mb-4 block">
                                Our Strategy
                            </span>
                            <h2 className="display-font text-5xl md:text-6xl font-light text-brand-white leading-none tracking-tighter uppercase whitespace-nowrap">
                                Our <br />
                                <span className="italic font-bold text-brand-accent">Services.</span>
                            </h2>

                            <div className="mt-12 h-px w-32 bg-gradient-to-r from-brand-accent to-transparent" />
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: Vertical Narrative Stream */}
                    <div className="relative h-[60vh] flex flex-col items-center">
                        <div className="w-full relative h-full">
                            {services.map((service, index) => {
                                // Creating a buffer at start and end for a 'Blank Canvas' entry/exit
                                // With 3 items, we map them into the [0.2, 0.95] scroll range
                                // This delay ensures the heading text settles before cards appear
                                const startBuffer = 0.2;
                                const endBuffer = 0.95;
                                const usableRange = endBuffer - startBuffer;
                                const stepSize = usableRange / (services.length);

                                const center = startBuffer + (index + 0.5) * stepSize;

                                // Vertical Translation Logic (Aggressive off-screen bounds)
                                // Entrance/Exit points are now outside the section boundaries
                                const range = [center - stepSize * 1.5, center, center + stepSize * 1.5];
                                const y = useTransform(smoothProgress, range, ["200%", "0%", "-200%"]);

                                // Sharp Opacity Thresholds (Fully invisible at scroll 0 and 1)
                                const focusRange = [
                                    center - stepSize * 1.0,
                                    center - stepSize * 0.4,
                                    center + stepSize * 0.4,
                                    center + stepSize * 1.0
                                ];
                                const opacity = useTransform(smoothProgress, focusRange, [0, 1, 1, 0]);
                                const scale = useTransform(smoothProgress, focusRange, [0.75, 1, 1, 0.75]);

                                const blurValue = useTransform(smoothProgress, focusRange, [16, 0, 0, 16]);
                                const blur = useTransform(blurValue, (v) => `blur(${v}px)`);

                                // Manage pointer events to ensure zero interference when invisible
                                const pointerEvents = useTransform(smoothProgress, (p) =>
                                    p > center - stepSize * 0.4 && p < center + stepSize * 0.4 ? "auto" : "none"
                                );

                                return (
                                    <motion.div
                                        key={index}
                                        style={{ y, opacity, scale, filter: blur, pointerEvents }}
                                        className="absolute top-0 left-0 w-full"
                                    >
                                        <div className="flex flex-col gap-8 py-10 px-4 md:px-0">
                                            <div className="flex items-center gap-6">
                                                <div className="w-10 h-10 rounded-xl bg-brand-accent/5 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
                                                    {service.icon}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-space text-[9px] tracking-[0.3em] uppercase text-brand-accent/60 font-black">{service.label}</span>
                                                    <span className="font-space text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none text-brand-white">
                                                        {service.title}.
                                                    </span>
                                                </div>
                                            </div>

                                            <p className="font-inter text-brand-silver text-sm md:text-lg font-light leading-relaxed max-w-xl opacity-80">
                                                {service.desc}
                                            </p>

                                            <div className="flex flex-wrap gap-2">
                                                {service.domains.map((domain, di) => (
                                                    <span
                                                        key={di}
                                                        className="px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02] font-space text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-brand-white/40"
                                                    >
                                                        {domain}
                                                    </span>
                                                ))}
                                            </div>

                                            <Link href={service.href} className="group flex items-center gap-4 w-fit mt-4">
                                                <span className="font-space text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent underline underline-offset-8 decoration-brand-accent/20 group-hover:decoration-brand-accent transition-all">
                                                    Execute Trajectory
                                                </span>
                                                <ArrowUpRight className="w-4 h-4 text-brand-accent transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                            </Link>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                </div>

                {/* Center Vertical Separator (Geometric Glow) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[40vh] bg-gradient-to-b from-transparent via-brand-accent/10 to-transparent hidden md:block opacity-30" />
            </div>
        </section>
    );
}
