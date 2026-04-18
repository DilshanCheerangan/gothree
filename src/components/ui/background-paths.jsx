"use client";

import { motion } from "framer-motion";

/**
 * FloatingPaths
 * Renders dynamic, animated SVG paths to create a 'trajectory' or deep space effect.
 */
export function FloatingPaths({ position }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        color: `rgba(255, 255, 255, ${0.05 + i * 0.01})`, // Pure White
        width: 0.2 + i * 0.02,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg
                className="w-full h-full opacity-60"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Trajectory Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke={path.color}
                        strokeWidth={path.width}
                        strokeOpacity={0.2 + path.id * 0.02}
                        initial={{ pathLength: 0.3, opacity: 0 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.4, 0.8, 0.4],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 15 + Math.random() * 10,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

/**
 * BackgroundPaths
 * A standalone component that uses FloatingPaths (from user-provided code).
 */
export function BackgroundPaths({ children }) {
    return (
        <div className="relative w-full h-full overflow-hidden">
            <div className="absolute inset-0 z-0">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    );
}
