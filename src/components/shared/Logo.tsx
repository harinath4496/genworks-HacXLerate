import { GenWorksCrest } from "@/components/AnimatedLogo";

export function Logo({ className = "", inverted = false }: { className?: string; inverted?: boolean }) {
  const textColor = inverted ? "text-[#FAF9F5]" : "text-[#141511]";
  const subColor = inverted ? "text-[#D3A373]/80" : "text-[#82756A]";

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Classic Insignia */}
      <GenWorksCrest size={28} inverted={inverted} />

      {/* Classic Wordmark */}
      <div className="flex flex-col leading-none">
        <span className={`font-serif font-black text-xl tracking-[0.05em] ${textColor}`}>
          GENWORKS
        </span>
        <span className={`font-mono text-[8px] uppercase tracking-[0.24em] ${subColor} mt-0.5 font-semibold`}>
          STUDIO
        </span>
      </div>
    </div>
  );
}
