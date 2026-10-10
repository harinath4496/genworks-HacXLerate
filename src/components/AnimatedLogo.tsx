"use client";

import React from "react";

/**
 * AnimatedLogo Component
 * Direct implementation from GenWorks_Animated_Logo.zip:
 * - Vertical layout with centered spinning 2x2 cube grid and wordmark below
 * - Grid: w-16 h-16 with gap-1.5, animate-spin-slow (8s)
 * - 4 Cubes: 3 dark (#1A1A1A), 1 accent caramel (#D3A373) with pulse-sequence (1.5s)
 * - Wordmark: text-4xl "GenWorks" (ExtraBold + Medium)
 */
export function AnimatedLogo() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 select-none">
      {/* Grid Icon Container - Spins Slowly */}
      <div className="grid grid-cols-2 gap-1.5 w-16 h-16 animate-spin-slow">
        <div 
          className="bg-[#1A1A1A] rounded-md animate-pulse-sequence" 
          style={{ animationDelay: "0s" }}
        />
        <div 
          className="bg-[#1A1A1A] rounded-md animate-pulse-sequence" 
          style={{ animationDelay: "0.2s" }}
        />
        <div 
          className="bg-[#1A1A1A] rounded-md animate-pulse-sequence" 
          style={{ animationDelay: "0.6s" }}
        />
        <div 
          className="bg-[#D3A373] rounded-md animate-pulse-sequence shadow-sm" 
          style={{ animationDelay: "0.4s" }}
        />
      </div>
      
      {/* Wordmark */}
      <div className="text-4xl tracking-tight text-[#1A1A1A] leading-none">
        <strong className="font-extrabold font-sans">Gen</strong>
        <span className="font-medium font-sans">Works</span>
      </div>
    </div>
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
 * GenWorks Horizontal Navbar & Footer Logo Component (Matches image_48eb78.png)
 */
export function GenWorksLogo({
  size = "md",
  className = "",
  showText = true,
  animated = false,
  inverted = false,
}: GenWorksLogoProps) {
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
        <div
          className={`${darkTileColor} ${config.tileRadius} aspect-square ${
            animated ? "animate-pulse-sequence" : ""
          }`}
          style={{ animationDelay: "0s" }}
        />
        <div
          className={`${darkTileColor} ${config.tileRadius} aspect-square ${
            animated ? "animate-pulse-sequence" : ""
          }`}
          style={{ animationDelay: "0.2s" }}
        />
        <div
          className={`${darkTileColor} ${config.tileRadius} aspect-square ${
            animated ? "animate-pulse-sequence" : ""
          }`}
          style={{ animationDelay: "0.6s" }}
        />
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

/**
 * GenWorksBrandLoader Component
 * Direct implementation from WhatsApp Video 2026-10-10 at 9.33.07 PM.mp4:
 * - Horizontal luxury brand layout with the 4-squircle kinetic blooming & orbiting icon
 * - 4 Squircles with rounded corners:
 *   • Top-Left: Caramel Amber (#D3A373) leading squircle
 *   • Remaining 3: Deep Charcoal (#1B1C16, #2D2E26)
 *   • Motion: Smooth 3D radial bloom, elastic expansion, slight +/-6deg fanning tilt, and clockwise 4-quadrant cycling orbit
 * - Wordmark: "GenWorks" (ExtraBold "Gen" + Medium "Works")
 * - Minimalist status progress bar with warm amber fill
 * - Dynamic status and sub-caption text
 */
export function GenWorksBrandLoader({
  statusText = "AUTHENTICATING CLIENT SESSION",
  subText = "Securing workspace & escrow vault...",
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
      {/* Kinetic Brand Animation styled in globals.css */}
      <div className="flex flex-col items-center animate-in fade-in duration-500">
        {/* Horizontal Brand Identity: Kinetic Squircles + Wordmark */}
        <div className="flex items-center gap-4">
          {/* Kinetic Icon Container (approx 50x50 box) */}
          <div className="relative w-[50px] h-[50px] shrink-0">
            {/* Tile 1: Caramel Accent */}
            <div className="kinetic-tile tile-caramel absolute top-0 left-0 w-[22px] h-[22px] rounded-[6px] bg-[#d3a373] shadow-[0_2px_8px_rgba(211,163,115,0.4)]" />
            {/* Tile 2: Deep Charcoal */}
            <div className="kinetic-tile tile-charcoal-1 absolute top-0 left-0 w-[22px] h-[22px] rounded-[6px] bg-[#1b1c16]" />
            {/* Tile 3: Muted Charcoal */}
            <div className="kinetic-tile tile-charcoal-2 absolute top-0 left-0 w-[22px] h-[22px] rounded-[6px] bg-[#2d2e26]" />
            {/* Tile 4: Deep Charcoal */}
            <div className="kinetic-tile tile-charcoal-3 absolute top-0 left-0 w-[22px] h-[22px] rounded-[6px] bg-[#1b1c16]" />
          </div>

          {/* Wordmark: GenWorks (Matches video typography) */}
          <div className="text-[34px] tracking-tight text-[#1b1c16] leading-none select-none font-headline">
            <strong className="font-extrabold tracking-tight">Gen</strong>
            <span className="font-medium tracking-tight">Works</span>
          </div>
        </div>

        {/* Minimalist Progress Indicator */}
        <div className="w-44 h-1 bg-[#efeee4] rounded-full overflow-hidden mt-6">
          <div className="w-full h-full bg-[#d3a373] rounded-full origin-left animate-pulse" />
        </div>

        {/* Status Text */}
        <p className="font-mono text-[11px] tracking-widest uppercase text-[#50453b] mt-3 font-semibold text-center">
          {statusText}
        </p>

        {subText && (
          <p className="text-xs text-[#82756a] mt-1 text-center font-sans">
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
      }, 600);
      return () => clearTimeout(closeTimer);
    }, 1800);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#fbfaf0] flex flex-col items-center justify-center transition-opacity duration-600 ease-out ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <GenWorksBrandLoader
        statusText="CURATED AI CREATIVE STUDIO"
        subText="Verifying cryptographic integrity & escrow protocol"
        fullscreen={false}
      />
    </div>
  );
}
