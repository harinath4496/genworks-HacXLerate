"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Image as ImageIcon,
  MessageSquarePlus,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react";

export function CreatorSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-[#FEF9E1] border-r border-[#E5E0C8] flex flex-col pt-6 pb-4">
      {/* Logo */}
      <div className="px-8 mb-10">
        <Link href="/dashboard/creator" className="block">
          <h1 className="text-2xl font-bold tracking-tighter text-[#1A1A1A]">
            GenWorks<span className="text-[#D3A373]">.</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1 font-medium tracking-wide uppercase">
            Creator Studio
          </p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        <SidebarItem
          href="/dashboard/creator"
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
          active={pathname === "/dashboard/creator"}
        />
        <SidebarItem
          href="/portfolio/manage"
          icon={<ImageIcon size={20} />}
          label="My Portfolio"
          active={pathname === "/portfolio/manage"}
        />
        <SidebarItem
          href="/dashboard/creator/posts"
          icon={<MessageSquarePlus size={20} />}
          label="My Posts"
          active={pathname === "/dashboard/creator/posts"}
        />
        <SidebarItem
          href="/profile/edit"
          icon={<Settings size={20} />}
          label="Profile Settings"
          active={pathname === "/profile/edit"}
        />
      </nav>

      {/* Bottom Actions */}
      <div className="px-4 mt-auto space-y-2">
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 w-full px-4 py-2.5 text-xs font-semibold text-[#1A1A1A] bg-white/70 hover:bg-white rounded-xl transition-colors border border-[#E5E0C8]"
        >
          <Sparkles size={16} className="text-[#D3A373]" />
          <span>Brand Marketplace</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-3 w-full px-4 py-2.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </Link>
      </div>
    </aside>
  );
}

function SidebarItem({
  href,
  icon,
  label,
  active = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
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
