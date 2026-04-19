"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children?: ReactNode;
  showRadialGradient?: boolean;
}

/**
 * AuroraBackground
 * Custom GoThree Edition - 'Luxury Gold Vapor' theme.
 * Adapted from the user-provided aurora-background component.
 */
export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col h-full items-center justify-center bg-black text-brand-white transition-bg overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            `
            /* GoThree Luxury Gold Palette Mapping */
            [--white-gradient:repeating-linear-gradient(100deg,rgba(240,232,216,0.1)_0%,rgba(240,232,216,0.1)_7%,transparent_10%,transparent_12%,rgba(240,232,216,0.1)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,#000000_0%,#000000_7%,transparent_10%,transparent_12%,#000000_16%)]
            
            /* The 'Gold Vapor' Aurora - Shades of Brass, Gold, and Smoke */
            [--aurora:repeating-linear-gradient(100deg,#a67c3b_10%,#1f1810_15%,#8a8780_20%,#c8c2b8_25%,#a67c3b_30%)]
            
            [background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px]
            
            after:content-[""] 
            after:absolute 
            after:inset-0 
            after:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%,_100%] 
            after:animate-aurora 
            after:[background-attachment:fixed] 
            after:mix-blend-difference
            
            pointer-events-none
            absolute -inset-[10px] opacity-20 will-change-transform`,

            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]`
          )}
        ></div>
      </div>
      {children}
    </div>
  );
};
