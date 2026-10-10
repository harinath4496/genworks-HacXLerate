import { CreatorSidebar } from "@/components/creator/CreatorSidebar";

export default function CreatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F8F7F3] font-sans selection:bg-[#D3A373]/30 text-[#1A1A1A]">
      <CreatorSidebar />
      <main className="flex-1 p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
