"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function TechnicalHUD() {
  const { scrollYProgress } = useScroll();
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState("");

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const progressText = useTransform(smoothProgress, (p) => `${(p * 100).toFixed(1)}%`);

  useEffect(() => {
    const handleMove = (e) => setCoords({ x: e.clientX, y: e.clientY });
    const updateTime = () => {
        const now = new Date();
        setTime(now.toLocaleTimeString("en-US", { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    
    window.addEventListener("mousemove", handleMove);
    const interval = setInterval(updateTime, 1000);
    updateTime();

    return () => {
        window.removeEventListener("mousemove", handleMove);
        clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[150] pointer-events-none p-6 md:p-10 flex flex-col justify-between overflow-hidden">
        {/* Top Indicators */}
        <div className="flex justify-between items-start text-[8px] md:text-[10px] font-space font-black tracking-[0.3em] uppercase text-brand-accent/40">
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-brand-accent animate-pulse rounded-full" />
                    <span>GoThree // System Active</span>
                </div>
                <div className="ml-4.5 opacity-60">Status: Integrated / Stage: Home</div>
            </div>
            <div className="flex items-center gap-6">
                <span>Ref: G3-NX-2026</span>
                <span className="text-brand-white/40">{time}</span>
            </div>
        </div>

        {/* Center Crosshair (Subtle) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-10">
            <div className="w-[100px] h-[1px] bg-white" />
            <div className="w-[1px] h-[100px] bg-white absolute" />
            <div className="w-1.5 h-1.5 border border-white rounded-full absolute" />
        </div>

        {/* Sidebar Coordinates & HUD elements */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-end gap-12 pointer-events-none hidden md:flex">
            <div className="flex flex-col items-end">
                <span className="text-[9px] font-space tracking-widest uppercase opacity-30 mb-2">Coordinates</span>
                <span className="text-[10px] font-space font-black text-brand-white/60">X: {coords.x}</span>
                <span className="text-[10px] font-space font-black text-brand-white/60">Y: {coords.y}</span>
            </div>
            
            <div className="w-px h-24 bg-gradient-to-b from-transparent via-brand-accent/20 to-transparent" />

            <div className="flex flex-col items-end transform rotate-90 origin-right translate-y-12 translate-x-1.5">
                <span className="text-[9px] font-black tracking-[0.5em] uppercase text-brand-accent italic">Aeronautical Caliber</span>
            </div>
        </div>

        {/* Bottom Left: Progress Gauge */}
        <div className="flex items-end justify-between">
            <div className="flex items-end gap-8">
                <div className="flex flex-col gap-3">
                    <span className="text-[10px] font-space font-black tracking-[0.3em] uppercase text-brand-white/40">
                        Scene Persistence
                    </span>
                    <div className="h-0.5 w-64 bg-white/5 relative overflow-hidden">
                        <motion.div 
                            style={{ scaleX: smoothProgress }}
                            className="absolute top-0 left-0 w-full h-full bg-brand-accent origin-left"
                        />
                    </div>
                </div>
                <motion.span className="text-xl md:text-2xl font-space font-black text-brand-accent tracking-tighter leading-none mb-[-2px]">
                    {progressText}
                </motion.span>
            </div>

            {/* Bottom Right: Scale indicator */}
            <div className="flex flex-col items-end gap-2 opacity-30">
                <div className="flex gap-1 h-3 items-end">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className={`w-[1px] bg-white ${i % 4 === 0 ? 'h-full' : 'h-1/2'}`} />
                    ))}
                </div>
                <span className="text-[8px] font-space font-bold tracking-widest uppercase">Depth Analysis // V1.0</span>
            </div>
        </div>
    </div>
  );
}
