export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Mini 4-Block Grid Icon */}
      <div className="grid grid-cols-2 gap-[2px]">
        <div className="w-[10px] h-[10px] bg-[#1A1A1A] rounded-[3px]" />
        <div className="w-[10px] h-[10px] bg-[#1A1A1A] rounded-[3px]" />
        <div className="w-[10px] h-[10px] bg-[#D3A373] rounded-[3px]" />
        <div className="w-[10px] h-[10px] bg-[#1A1A1A] rounded-[3px]" />
      </div>
      {/* The Text */}
      <span className="text-2xl tracking-tight text-[#1A1A1A]">
        <strong className="font-extrabold">Gen</strong>
        <span className="font-medium">Works</span>
      </span>
    </div>
  );
}