"use client";

import React from "react";

/**
 * Classic GenWorks Architectural Monogram Crest
 * Interlocking geometric insignia combining the letter "G" and "W"
 * within a classic faceted diamond shield with burnished gold accents.
 */
export function GenWorksCrest({
  size = 36,
  inverted = false,
  className = "",
}: {
  size?: number;
  inverted?: boolean;
  className?: string;
}) {
  const goldAccent = "#D3A373";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 ${className}`}
    >
      <defs>
        <linearGradient id={`crestGold-${size}-${inverted ? "inv" : "std"}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E5C199" />
          <stop offset="100%" stopColor="#C4925D" />
        </linearGradient>
      </defs>

      {/* Outer Classic Shield / Diamond Crest with bevelled corners */}
      <path
        d="M24 3 L43 14 V34 L24 45 L5 34 V14 Z"
        fill={inverted ? "rgba(255,255,255,0.08)" : "#141511"}
        stroke={`url(#crestGold-${size}-${inverted ? "inv" : "std"})`}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />

      {/* Inner Fine Inset Contour */}
      <path
        d="M24 7 L39 16 V32 L24 41 L9 32 V16 Z"
        fill="none"
        stroke={goldAccent}
        strokeWidth="0.75"
        strokeOpacity="0.45"
        strokeDasharray="2 2"
      />

      {/* The Classic "G" Serif Monogram Path (Left & Center) */}
      <path
        d="M23 15 C17 15 13 19 13 25 C13 31 17 34 23 34 C27 34 29.5 32 30.5 29.5 H23 V26 H34 V32 C31.5 36 27.5 37.5 23 37.5 C15 37.5 9.5 32 9.5 25 C9.5 17.5 15.5 12 23 12 C26.5 12 29.5 13.2 31.8 15.5 L29.2 18 C27.5 16.2 25.4 15 23 15 Z"
        fill={`url(#crestGold-${size}-${inverted ? "inv" : "std"})`}
      />

      {/* The Classic Interlocking "W" Apex (Right Chevron / Facet) */}
      <path
        d="M31 19 L34.5 28 L37.5 20.5 L40.5 28 L43.5 19 H45 L41.5 31 H39.5 L37.5 24.5 L35.5 31 H33.5 L29.5 19 Z"
        fill={inverted ? "#FAF9F5" : "#FAF8F5"}
      />

      {/* Center Precision Benchmark Dot */}
      <circle cx="24" cy="24" r="1.5" fill="#FAF9F5" />
    </svg>
  );
}

interface GenWorksLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showText?: boolean;
  animated?: boolean;
  inverted?: boolean;
}

/**
 * GenWorks Classic Horizontal Logo Component
 * Combines the classic architectural crest with a refined serif/editorial wordmark.
 */
export function GenWorksLogo({
  size = "md",
  className = "",
  showText = true,
  animated = false,
  inverted = false,
}: GenWorksLogoProps) {
  const sizes = {
    sm: { icon: 26, text: "text-lg", sub: "text-[8px]" },
    md: { icon: 32, text: "text-xl", sub: "text-[9px]" },
    lg: { icon: 40, text: "text-2xl", sub: "text-[10px]" },
    xl: { icon: 52, text: "text-4xl", sub: "text-[11px]" },
  };

  const cfg = sizes[size];
  const textColor = inverted ? "text-[#FAF9F5]" : "text-[#141511]";
  const subColor = inverted ? "text-[#D3A373]/80" : "text-[#82756A]";

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Classic Crest Emblem */}
      <div className={animated ? "animate-pulse" : ""}>
        <GenWorksCrest size={cfg.icon} inverted={inverted} />
      </div>

      {/* Classic Wordmark */}
      {showText && (
        <div className="flex flex-col leading-none">
          <div className={`font-serif font-black ${cfg.text} ${textColor} flex items-center tracking-[0.05em]`}>
            <span>GENWORKS</span>
          </div>
          <span className={`font-mono ${cfg.sub} uppercase tracking-[0.24em] ${subColor} mt-0.5 font-semibold`}>
            CREATIVE STUDIO
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * AnimatedLogo Component (for central splash or hero placements)
 */
export function AnimatedLogo() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 select-none">
      <GenWorksCrest size={56} />
      <div className="flex flex-col items-center leading-none text-center">
        <span className="font-serif font-black text-3xl tracking-[0.06em] text-[#141511]">
          GENWORKS
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#82756A] mt-1.5 font-semibold">
          COMMERCIAL PRODUCTION STUDIO
        </span>
      </div>
    </div>
  );
}

/**
 * GenWorksBrandLoader Component
 */
export function GenWorksBrandLoader({
  statusText = "AUTHENTICATING SECURE SESSION",
  subText = "Accessing creative workspace & production escrow...",
  fullscreen = true,
}: {
  statusText?: string;
  subText?: string;
  fullscreen?: boolean;
}) {
  return (
    <div
      className={
        fullscreen
          ? "fixed inset-0 z-[9999] bg-[#fbfaf0] flex flex-col items-center justify-center p-6 text-[#1b1c16] select-none"
          : "w-full py-12 flex flex-col items-center justify-center p-6 text-[#1b1c16] select-none"
      }
    >
      <div className="flex flex-col items-center animate-in fade-in duration-500 max-w-sm text-center">
        {/* Classic Crest */}
        <div className="p-3.5 bg-white rounded-3xl shadow-sm border border-[#E4E3D9] mb-4">
          <GenWorksCrest size={48} />
        </div>

        {/* Wordmark */}
        <div className="font-serif font-black text-2xl tracking-[0.06em] text-[#141511]">
          GENWORKS
        </div>
        <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#82756A] mt-1 font-bold">
          EST. 2026 • COMMERCIAL STUDIO
        </p>

        {/* Minimalist Progress Indicator */}
        <div className="w-48 h-1 bg-[#efeee4] rounded-full overflow-hidden mt-6">
          <div className="w-full h-full bg-[#d3a373] rounded-full origin-left animate-pulse" />
        </div>

        {/* Status Text */}
        <p className="font-mono text-[10px] tracking-widest uppercase text-[#50453b] mt-4 font-semibold">
          {statusText}
        </p>

        {subText && (
          <p className="text-xs text-[#82756a] mt-1 font-sans">
            {subText}
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * GenWorks Full-Screen Splash Screen
 */
export function SplashScreen({ onFinish }: { onFinish?: () => void }) {
  const [visible, setVisible] = React.useState(true);
  const [fading, setFading] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true);
      const closeTimer = setTimeout(() => {
        setVisible(false);
        if (onFinish) onFinish();
      }, 500);
      return () => clearTimeout(closeTimer);
    }, 1200);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#fbfaf0] flex flex-col items-center justify-center transition-opacity duration-500 ease-out ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <GenWorksBrandLoader />
    </div>
  );
}
