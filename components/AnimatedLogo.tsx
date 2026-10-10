"use client";

import React from "react";

interface AnimatedLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  showText?: boolean;
}

export function AnimatedLogo({ size = "md", className = "", showText = true }: AnimatedLogoProps) {
  const iconSizes = {
    sm: "w-7 h-7 gap-1",
    md: "w-10 h-10 gap-1.5",
    lg: "w-14 h-14 gap-2",
  };

  const textSizes = {
    sm: "text-xl",
    md: "text-2xl sm:text-3xl",
    lg: "text-4xl sm:text-5xl",
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* 2x2 Grid Icon Container - Spins Slowly */}
      <div className={`grid grid-cols-2 ${iconSizes[size]} animate-spin-slow`}>
        <div
          className="bg-[#1b1c16] rounded-md animate-pulse-sequence"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="bg-[#1b1c16] rounded-md animate-pulse-sequence"
          style={{ animationDelay: "0.2s" }}
        />
        <div
          className="bg-[#1b1c16] rounded-md animate-pulse-sequence"
          style={{ animationDelay: "0.6s" }}
        />
        <div
          className="bg-[#d3a373] rounded-md animate-pulse-sequence shadow-sm"
          style={{ animationDelay: "0.4s" }}
        />
      </div>

      {/* Wordmark replacing GenWorks with Clientora */}
      {showText && (
        <div className={`${textSizes[size]} tracking-tight text-[#1b1c16] leading-none`}>
          <strong className="font-extrabold font-headline">Client</strong>
          <span className="font-medium font-headline">ora</span>
        </div>
      )}
    </div>
  );
}

export function SplashScreen({ onFinish }: { onFinish?: () => void }) {
  const [visible, setVisible] = React.useState(true);
  const [fading, setFading] = React.useState(false);

  React.useEffect(() => {
    // Hold splash for 1.5 seconds, then initiate fade out
    const timer = setTimeout(() => {
      setFading(true);
      const closeTimer = setTimeout(() => {
        setVisible(false);
        if (onFinish) onFinish();
      }, 600); // 600ms fade transition
      return () => clearTimeout(closeTimer);
    }, 1500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#fbfaf0] flex flex-col items-center justify-center transition-opacity duration-600 ease-out ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center">
        {/* Animated MNC Logo */}
        <div className="flex items-center gap-5 select-none scale-110 sm:scale-125 mb-8">
          <div className="grid grid-cols-2 gap-2 w-14 h-14 animate-spin-slow">
            <div
              className="bg-[#1b1c16] rounded-md animate-pulse-sequence"
              style={{ animationDelay: "0s" }}
            />
            <div
              className="bg-[#1b1c16] rounded-md animate-pulse-sequence"
              style={{ animationDelay: "0.2s" }}
            />
            <div
              className="bg-[#1b1c16] rounded-md animate-pulse-sequence"
              style={{ animationDelay: "0.6s" }}
            />
            <div
              className="bg-[#d3a373] rounded-md animate-pulse-sequence shadow-md"
              style={{ animationDelay: "0.4s" }}
            />
          </div>

          <div className="text-[48px] sm:text-[56px] tracking-tight text-[#1b1c16] leading-none">
            <strong className="font-extrabold font-headline">Client</strong>
            <span className="font-medium font-headline">ora</span>
          </div>
        </div>

        {/* Minimalist Progress Indicator */}
        <div className="w-36 h-1 bg-[#efeee4] rounded-full overflow-hidden mt-2">
          <div className="w-full h-full bg-[#d3a373] rounded-full origin-left animate-pulse" />
        </div>

        <p className="font-mono text-[11px] tracking-widest uppercase text-[#50453b] mt-4 font-semibold">
          AI CREATIVE MARKETPLACE
        </p>
      </div>
    </div>
  );
}
