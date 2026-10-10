import Link from "next/link";
import { LayoutDashboard, Image as ImageIcon, MessageSquarePlus, Settings, LogOut } from "lucide-react";

export function CreatorSidebar() {
  return (
    <aside className="w-64 h-screen bg-[#FEF9E1] border-r border-[#E5E0C8] flex flex-col pt-6 pb-4">
      {/* Logo */}
      <div className="px-8 mb-10">
        <h1 className="text-2xl font-bold tracking-tighter text-[#1A1A1A]">
          Clientora<span className="text-[#D3A373]">.</span>
        </h1>
        <p className="text-xs text-gray-500 mt-1 font-medium tracking-wide uppercase">Creator Studio</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        <SidebarItem href="/dashboard/creator" icon={<LayoutDashboard size={20} />} label="Dashboard" active />
        <SidebarItem href="/portfolio/manage" icon={<ImageIcon size={20} />} label="My Portfolio" />
        <SidebarItem href="/dashboard/creator/posts" icon={<MessageSquarePlus size={20} />} label="My Posts" />
        <SidebarItem href="/profile/edit" icon={<Settings size={20} />} label="Profile Settings" />
      </nav>

      {/* User Area (Bottom) */}
      <div className="px-4 mt-auto">
        <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors">
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

function SidebarItem({ href, icon, label, active = false }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <Link 
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${
        active 
          ? "bg-[#D3A373] text-white shadow-md shadow-[#D3A373]/20" 
          : "text-[#1A1A1A]/70 hover:bg-white hover:text-[#1A1A1A]"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}
