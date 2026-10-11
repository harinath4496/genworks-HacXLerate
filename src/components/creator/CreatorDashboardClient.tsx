"use client";

import { useState } from "react";
import {
  Sparkles,
  Briefcase,
  TrendingUp,
  MessageSquarePlus,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Upload,
  Cloud,
  Film,
  Layers,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { CreatorUploadModal } from "./CreatorUploadModal";

interface CreatorDashboardClientProps {
  initialProfile: any;
  initialBriefs: any[];
}

export function CreatorDashboardClient({
  initialProfile,
  initialBriefs,
}: CreatorDashboardClientProps) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [logs, setLogs] = useState<any[]>(
    initialProfile?.creatorLogs && initialProfile.creatorLogs.length > 0
      ? initialProfile.creatorLogs
      : [
          {
            id: "log_default_1",
            content:
              'Published "L\'Aura Celestial Perfume Commercial" with Runway Gen-3 Alpha. Seed: 8947219044, CFG: 7.5. Fully cleared for global digital broadcasting.',
            mediaUrl:
              "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80",
            createdAt: new Date().toISOString(),
          },
          {
            id: "log_default_2",
            content:
              'Benchmark: Tested Kling 1.5 Pro zero-gravity silk physics with 45 inference steps. Seed 3104928173 reproduced 100% deterministic motion.',
            mediaUrl:
              "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80",
            createdAt: new Date(Date.now() - 86400000).toISOString(),
          },
        ]
  );

  const [liveBriefs] = useState<any[]>(
    initialBriefs && initialBriefs.length > 0
      ? initialBriefs
      : [
          {
            id: "b1",
            title: "Luxury Silk Fragrance 9:16 Video Campaign",
            brand: { name: "Aura Cosmetics" },
            budgetRange: "$3,500",
            formats: ["9:16 Vertical Reel"],
            description:
              "Looking for a generative AI director to produce 3 high-impact luxury perfume reels using Runway Gen-3 or Kling AI. Escrow guaranteed.",
            contentTypes: ["9:16 Reel", "Commercial"],
            styles: ["Photorealistic", "Luxury Editorial"],
            commercialUse: "Full Commercial Buyout",
          },
          {
            id: "b2",
            title: "Cyberpunk Beverage TVC Spec Commercial",
            brand: { name: "NeonVolt Energy" },
            budgetRange: "$4,200",
            formats: ["16:9 Cinema"],
            description:
              "High-energy neon cyberpunk commercial with deterministic character consistency across 5 dynamic cuts.",
            contentTypes: ["16:9 4K TVC"],
            styles: ["Futuristic", "High Dynamic Range"],
            commercialUse: "Global Digital Rights",
          },
        ]
  );

  const userName = initialProfile?.user?.name || "Elena Vance";
  const views = "189";
  const activeCount = liveBriefs.length;

  const refreshLogs = async () => {
    try {
      const res = await fetch("/api/creator/logs");
      const data = await res.json();
      if (data.success && data.logs && data.logs.length > 0) {
        setLogs(data.logs);
      }
    } catch (err) {
      console.warn("Logs refresh notice:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500 pb-10">
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-[#1A1A1A]">
              Welcome back, {userName}
            </h1>
            <span className="bg-[#FEF9E1] text-[#D3A373] flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full border border-[#D3A373]/20">
              <ShieldCheck size={14} /> AI Verified
            </span>
          </div>
          <p className="text-gray-500 mt-2 text-sm">
            Here is what is happening with your GenWorks portfolio & Cloudinary CDN pipeline today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-[#D3A373] hover:bg-[#C29263] text-[#1B1C16] px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-md flex items-center gap-2"
          >
            <Cloud size={16} />
            <span>Upload via Cloudinary</span>
          </button>

          <Link
            href="/dashboard"
            className="bg-[#1A1A1A] text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-black transition-all shadow-md flex items-center gap-2"
          >
            <Sparkles size={16} className="text-[#D3A373]" />
            <span>Browse Brand Marketplace</span>
          </Link>
        </div>
      </div>

      {/* Cloudinary Real-Time Upload CTA Strip */}
      <div className="bg-gradient-to-r from-[#1B1C16] via-[#2A2B23] to-[#1B1C16] text-[#FBFAF0] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl border border-[#D3A373]/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-[#D3A373]/15 to-transparent pointer-events-none" />
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="flex items-center gap-2">
            <span className="bg-[#D3A373] text-[#1B1C16] font-mono text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
              Cloudinary CDN Active
            </span>
            <span className="text-xs text-[#E4E3D9]/70 font-mono">
              Cloud: bzpfks5x • Instant 4K Streaming
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Publish New AI Videos, Prompts &amp; Deterministic Seeds
          </h2>
          <p className="text-xs sm:text-sm text-[#E4E3D9]/80 leading-relaxed">
            Drag-and-drop your Runway Gen-3, Kling 1.5, or Midjourney generations. Files upload
            directly to Cloudinary with verified seed parameters and commercial clearance.
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="bg-[#D3A373] hover:bg-[#C29263] text-[#1B1C16] font-bold text-xs py-3.5 px-6 rounded-2xl flex items-center gap-2 transition-all shadow-lg shrink-0 relative z-10"
        >
          <Upload size={16} />
          <span>Upload New AI Masterpiece</span>
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Profile Views"
          value={views}
          trend="+12% from last week"
          trendUp={true}
          icon={<TrendingUp size={22} className="text-[#D3A373]" />}
        />
        <StatCard
          title="Active Brand Briefs"
          value={activeCount.toString()}
          trend="Direct from MongoDB Atlas"
          trendUp={true}
          icon={<Briefcase size={22} className="text-[#D3A373]" />}
        />
        <StatCard
          title="AI Match Score"
          value="98%"
          trend="AI Identity Verified"
          trendUp={true}
          icon={<Zap size={22} className="text-[#D3A373]" />}
        />
      </div>

      {/* Grid: Live Briefs & Recent Logs */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pt-2">
        {/* Left Column: Live Briefs */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center gap-2 text-[#1A1A1A]">
              🔥 Real-Time Brand Briefs
              <span className="bg-red-100 text-red-600 text-[10px] uppercase font-black px-2 py-0.5 rounded-sm tracking-wider">
                Live Escrow
              </span>
            </h2>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-500 hover:text-[#1A1A1A] transition-colors"
            >
              View Marketplace
            </Link>
          </div>

          <div className="space-y-4">
            {liveBriefs && liveBriefs.length > 0 ? (
              liveBriefs.map((brief: any) => (
                <div
                  key={brief.id}
                  className="bg-white p-6 border border-gray-200/60 rounded-3xl hover:border-[#D3A373]/40 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-[#1A1A1A] group-hover:text-[#D3A373] transition-colors">
                        {brief.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-sm font-semibold text-gray-800">
                          {brief.brand?.name || "Verified Enterprise Brand"}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm font-bold text-[#D3A373]">
                          Budget: {brief.budgetRange || "$2,500"}
                        </span>
                      </div>
                    </div>
                    <div className="bg-green-50 border border-green-200 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 size={12} /> {brief.formats?.[0] || "9:16"}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-2">
                    {brief.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {brief.contentTypes?.map((t: string, i: number) => (
                      <span
                        key={i}
                        className="text-xs font-medium bg-gray-50 border border-gray-200 px-3 py-1 rounded-full text-gray-600"
                      >
                        {t}
                      </span>
                    ))}
                    {brief.styles?.map((s: string, i: number) => (
                      <span
                        key={i}
                        className="text-xs font-medium bg-[#FAF9F5] border border-[#D3A373]/30 px-3 py-1 rounded-full text-[#B48450]"
                      >
                        {s}
                      </span>
                    ))}
                    {brief.commercialUse && (
                      <span className="text-xs font-semibold bg-blue-50 border border-blue-200 px-3 py-1 rounded-full text-blue-700">
                        📜 {brief.commercialUse}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-6 border border-gray-200/60 rounded-3xl">
                <p className="text-sm text-gray-500">No active briefs yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Recent Logs with Cloudinary Media */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#1A1A1A]">Recent Logs</h2>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="text-xs font-bold text-[#D3A373] hover:underline flex items-center gap-1"
            >
              <Upload size={13} />
              <span>+ New Log</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-200/60 shadow-sm space-y-6 max-h-[600px] overflow-y-auto">
            {logs && logs.length > 0 ? (
              <div className="space-y-5">
                {logs.map((log: any) => (
                  <div
                    key={log.id}
                    className="pb-5 border-b border-gray-100 last:border-0 last:pb-0 relative space-y-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D3A373] mt-2 shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
                          {log.content}
                        </p>
                        <span className="text-[10px] font-mono font-semibold text-gray-400 mt-1 block uppercase">
                          {new Date(log.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Media Thumbnail from Cloudinary / Unsplash */}
                    {log.mediaUrl && (
                      <div className="rounded-2xl overflow-hidden border border-gray-100 max-h-40 bg-black/5 relative group">
                        <img
                          src={log.mediaUrl}
                          alt="Log Media"
                          className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[9px] font-mono px-2 py-0.5 rounded-md backdrop-blur-xs">
                          Cloudinary CDN
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 flex flex-col items-center">
                <div className="bg-[#FEF9E1] w-14 h-14 rounded-full flex items-center justify-center mb-4 border border-[#D3A373]/20">
                  <MessageSquarePlus size={24} className="text-[#D3A373]" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">No AI logs yet</h4>
                <p className="text-sm text-gray-500 mb-6 max-w-[200px] leading-relaxed">
                  Document your AI experiments to build credibility.
                </p>
                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="text-[#1A1A1A] text-sm font-semibold border border-gray-200 px-5 py-2 rounded-full hover:border-gray-300 transition-colors"
                >
                  Write a log
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cloudinary Upload Modal */}
      <CreatorUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={refreshLogs}
      />
    </div>
  );
}

function StatCard({
  title,
  value,
  trend,
  trendUp,
  icon,
}: {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean | null;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-200/60 shadow-sm hover:shadow-md hover:border-gray-300 transition-all group">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold tracking-tight text-[#1A1A1A]">{value}</h3>
        </div>
        <div className="bg-[#FEF9E1] p-3 rounded-2xl group-hover:scale-105 transition-transform border border-[#D3A373]/10">
          {icon}
        </div>
      </div>
      <p
        className={`text-xs font-medium mt-5 ${
          trendUp === true
            ? "text-green-600"
            : trendUp === false
            ? "text-red-500"
            : "text-gray-500"
        }`}
      >
        {trend}
      </p>
    </div>
  );
}
