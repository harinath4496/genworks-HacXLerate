"use client";

import React from "react";

interface GenWorksLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showText?: boolean;
  animated?: boolean;
  inverted?: boolean;
}

/**
 * GenWorks Official Logo Component
 * Exact match to image_48eb78.png:
 * - 2x2 grid of distinct modular cubes (squares with crisp micro-rounded corners, NEVER circles)
 * - 3 solid deep charcoal/black cubes (#1A1A1A)
 * - 1 lower-right accent warm caramel cube (#D3A373)
 * - Dual-weight wordmark: "Gen" (Heavy Bold) + "Works" (Medium Sans)
 */
export function GenWorksLogo({
  size = "md",
  className = "",
  showText = true,
  animated = false,
  inverted = false,
}: GenWorksLogoProps) {
  // Dimensions carefully calibrated so tiles are unambiguously CUBES, not circles
  const iconConfig = {
    sm: {
      container: "w-6 h-6 gap-[2.5px]",
      tileRadius: "rounded-[2px]",
    },
    md: {
      container: "w-8 h-8 gap-[3.5px]",
      tileRadius: "rounded-[3px]",
    },
    lg: {
      container: "w-11 h-11 gap-[4.5px]",
      tileRadius: "rounded-[4.5px]",
    },
    xl: {
      container: "w-14 h-14 gap-[6px]",
      tileRadius: "rounded-[6px]",
    },
  };

  const textSizes = {
    sm: "text-[20px]",
    md: "text-[24px]",
    lg: "text-[34px]",
    xl: "text-[50px]",
  };

  const config = iconConfig[size];
  const darkTileColor = inverted ? "bg-white" : "bg-[#1A1A1A]";
  const accentTileColor = "bg-[#D3A373]";
  const textColor = inverted ? "text-white" : "text-[#1A1A1A]";

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* 2x2 Modular Cube Grid Icon */}
      <div
        className={`grid grid-cols-2 ${config.container} shrink-0 ${
          animated ? "animate-spin-slow" : ""
        }`}
      >
        {/* Top-Left Cube */}
        <div
          className={`${darkTileColor} ${config.tileRadius} aspect-square ${
            animated ? "animate-pulse-sequence" : ""
          }`}
          style={{ animationDelay: "0s" }}
        />
        {/* Top-Right Cube */}
        <div
          className={`${darkTileColor} ${config.tileRadius} aspect-square ${
            animated ? "animate-pulse-sequence" : ""
          }`}
          style={{ animationDelay: "0.2s" }}
        />
        {/* Bottom-Left Cube */}
        <div
          className={`${darkTileColor} ${config.tileRadius} aspect-square ${
            animated ? "animate-pulse-sequence" : ""
          }`}
          style={{ animationDelay: "0.6s" }}
        />
        {/* Bottom-Right Accent Cube */}
        <div
          className={`${accentTileColor} ${config.tileRadius} aspect-square shadow-sm ${
            animated ? "animate-pulse-sequence" : ""
          }`}
          style={{ animationDelay: "0.4s" }}
        />
      </div>

      {/* Wordmark: Gen (ExtraBold) + Works (Medium) */}
      {showText && (
        <div className={`${textSizes[size]} tracking-tight ${textColor} leading-none font-headline`}>
          <strong className="font-extrabold tracking-tight">Gen</strong>
          <span className="font-medium tracking-tight">Works</span>
        </div>
      )}
    </div>
  );
}

// Backwards-compatible alias for existing imports
export const AnimatedLogo = GenWorksLogo;

/**
 * GenWorks Full-Screen Splash Screen
 */
export function SplashScreen({ onFinish }: { onFinish?: () => void }) {
  const [visible, setVisible] = React.useState(true);
  const [fading, setFading] = React.useState(false);

  React.useEffect(() => {
    // Hold splash for 1.3 seconds, then smoothly fade out
    const timer = setTimeout(() => {
      setFading(true);
      const closeTimer = setTimeout(() => {
        setVisible(false);
        if (onFinish) onFinish();
      }, 500);
      return () => clearTimeout(closeTimer);
    }, 1300);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#fbfaf0] flex flex-col items-center justify-center transition-opacity duration-500 ease-out ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center">
        {/* Large GenWorks Cube Brand Mark */}
        <div className="mb-7 scale-110 sm:scale-125">
          <GenWorksLogo size="xl" animated={true} />
        </div>

        {/* Minimalist Progress Indicator */}
        <div className="w-36 h-1 bg-[#efeee4] rounded-full overflow-hidden mt-1">
          <div className="w-full h-full bg-[#d3a373] rounded-full origin-left animate-pulse" />
        </div>

        <p className="font-mono text-[11px] tracking-widest uppercase text-[#50453b] mt-4 font-semibold">
          CURATED AI CREATIVE STUDIO
        </p>
      </div>
    </div>
  );
}
