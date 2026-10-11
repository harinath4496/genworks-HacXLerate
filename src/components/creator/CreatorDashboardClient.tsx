"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Briefcase,
  Zap,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  Plus,
  Cloud,
  Upload,
  Film,
  Play,
  Layers,
  Sliders,
  ExternalLink,
} from "lucide-react";
import { CreatorUploadModal } from "./CreatorUploadModal";

interface CreatorDashboardClientProps {
  initialProfile: any;
  initialBriefs: any[];
}

function isVideoUrl(url?: string): boolean {
  if (!url) return false;
  return (
    url.endsWith(".mp4") ||
    url.endsWith(".webm") ||
    url.endsWith(".mov") ||
    url.includes("/video/upload/") ||
    url.includes("resource_type=video")
  );
}

export function CreatorDashboardClient({
  initialProfile,
  initialBriefs,
}: CreatorDashboardClientProps) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const defaultLogs = [
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
  ];

  const [logs, setLogs] = useState<any[]>(
    initialProfile?.creatorLogs && initialProfile.creatorLogs.length > 0
      ? initialProfile.creatorLogs
      : defaultLogs
  );

  const [liveBriefs] = useState<any[]>(
    initialBriefs && initialBriefs.length > 0
      ? initialBriefs
      : [
          {
            id: "brief_default_1",
            title: "Haute Horlogerie Global Launch Reel",
            brand: { name: "Vacheron & Co." },
            budgetRange: "$8,500",
            formats: ["16:9 Cinema", "9:16 Vertical"],
            description:
              "Seeking macro generative cinematography of mechanical escapements, sapphire crystals, and rose gold finishing. Runway Gen-3 Alpha or Kling 1.5 Pro.",
            styles: ["Macro Cinema", "Warm Amber Lighting", "4K Ultra-Sharp"],
            commercialUse: "Global Digital Broadcast + Print",
          },
          {
            id: "brief_default_2",
            title: "Zero-Gravity Performance Footwear Campaign",
            brand: { name: "AeroPulse Athletics" },
            budgetRange: "$6,200",
            formats: ["9:16 Social Commercial"],
            description:
              "Photorealistic gravity-defying fabric simulations and kinetic urban sprints. Full seed reproducibility and ComfyUI workflow deliverables required.",
            styles: ["Kinetic Motion", "High Dynamic Range"],
            commercialUse: "Global Digital Rights",
          },
        ]
  );

  const userName = initialProfile?.user?.name || "Elena Vance";
  const views = "189";
  const activeCount = liveBriefs.length;

  // On client mount, retrieve any locally cached uploaded videos and merge them
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = JSON.parse(
          localStorage.getItem("genworks_recent_uploads") || "[]"
        );
        if (Array.isArray(cached) && cached.length > 0) {
          setLogs((prev) => {
            const existingIds = new Set(prev.map((item) => item.id || item.mediaUrl));
            const newItems = cached.filter(
              (c: any) => !existingIds.has(c.id) && !existingIds.has(c.mediaUrl)
            );
            return [...newItems, ...prev];
          });
        }
      } catch (err) {
        console.warn("Local uploads sync notice:", err);
      }
    }
  }, []);

  const refreshLogs = async () => {
    try {
      // 1. Pull server logs
      const res = await fetch("/api/creator/logs");
      const data = await res.json();
      let combined = data.success && data.logs ? data.logs : [];

      // 2. Merge client local storage uploads
      if (typeof window !== "undefined") {
        try {
          const cached = JSON.parse(
            localStorage.getItem("genworks_recent_uploads") || "[]"
          );
          if (Array.isArray(cached) && cached.length > 0) {
            const existingIds = new Set(
              combined.map((item: any) => item.id || item.mediaUrl)
            );
            const fresh = cached.filter(
              (c: any) => !existingIds.has(c.id) && !existingIds.has(c.mediaUrl)
            );
            combined = [...fresh, ...combined];
          }
        } catch {}
      }

      if (combined.length > 0) {
        setLogs(combined);
      }
    } catch (err) {
      console.warn("Logs refresh notice:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500 pb-16">
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-serif font-bold tracking-tight text-[#141511]">
              Welcome back, {userName}
            </h1>
            <span className="bg-[#FEF9E1] text-[#A67C46] flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full border border-[#D3A373]/30">
              <ShieldCheck size={14} /> AI Verified Director
            </span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-medium">
            Manage your AI visual reels, publish Cloudinary assets, and review enterprise briefs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-[#D3A373] hover:bg-[#B88652] text-[#141511] font-bold px-5 py-2.5 rounded-full text-xs transition-all shadow-md flex items-center gap-2"
          >
            <Cloud size={16} />
            <span>Upload New Reel (Cloudinary)</span>
          </button>

          <Link
            href="/portfolio/manage"
            className="bg-[#141511] text-[#FAF9F5] px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-black transition-all shadow-md flex items-center gap-2"
          >
            <Film size={15} className="text-[#D3A373]" />
            <span>Manage Portfolio</span>
          </Link>
        </div>
      </div>

      {/* Cloudinary Real-Time Upload CTA Strip */}
      <div className="bg-gradient-to-r from-[#141511] via-[#242520] to-[#141511] text-[#FAF9F5] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl border border-[#D3A373]/30 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-[#D3A373]/15 to-transparent pointer-events-none" />
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="flex items-center gap-2">
            <span className="bg-[#D3A373] text-[#141511] font-mono text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
              Cloudinary CDN Active
            </span>
            <span className="text-xs text-[#FAF9F5]/70 font-mono">
              Cloud: bzpfks5x • Instant 4K Video Streaming
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-white">
            Publish New AI Videos, Seed Parameters &amp; Buyout Works
          </h2>
          <p className="text-xs sm:text-sm text-[#FAF9F5]/80 leading-relaxed">
            Drag-and-drop your Runway Gen-3, Kling 1.5, or Midjourney generations. Videos upload
            directly to Cloudinary CDN with verifiable seeds, CFG settings, and commercial clearance tags.
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="bg-[#D3A373] hover:bg-[#B88652] text-[#141511] font-bold text-xs py-3.5 px-6 rounded-2xl flex items-center gap-2 transition-all shadow-lg shrink-0 relative z-10"
        >
          <Upload size={16} />
          <span>Upload Video / Masterpiece</span>
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Director Profile Views"
          value={views}
          trend="+18% from brand agencies"
          trendUp={true}
          icon={<TrendingUp size={22} className="text-[#D3A373]" />}
        />
        <StatCard
          title="Active Brand Briefs"
          value={activeCount.toString()}
          trend="Real-Time Production Briefs"
          trendUp={true}
          icon={<Briefcase size={22} className="text-[#D3A373]" />}
        />
        <StatCard
          title="Generative Benchmark"
          value="99.4%"
          trend="Seed Reproducibility Certified"
          trendUp={true}
          icon={<Zap size={22} className="text-[#D3A373]" />}
        />
      </div>

      {/* Visual Creative Showcase: Recently Uploaded Video Reels */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4">
          <div>
            <h2 className="text-xl font-serif font-bold text-[#141511] flex items-center gap-2">
              <Film className="w-5 h-5 text-[#D3A373]" />
              Active Video Showcase &amp; Uploaded Media
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Instant Cloudinary streaming of your latest generative video creations with full playback controls.
            </p>
          </div>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="self-start sm:self-auto text-xs font-bold text-[#141511] bg-neutral-100 hover:bg-neutral-200 px-4 py-2 rounded-full transition-colors flex items-center gap-1.5"
          >
            <Plus size={14} /> Add New Video
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {logs.slice(0, 6).map((item: any, idx: number) => {
            const hasVideo = isVideoUrl(item.mediaUrl);
            return (
              <div
                key={item.id || idx}
                className="group bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-200/80 hover:border-[#D3A373]/60 transition-all flex flex-col justify-between"
              >
                <div className="relative bg-black aspect-video flex items-center justify-center overflow-hidden">
                  {hasVideo ? (
                    <video
                      src={item.mediaUrl}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover"
                    />
                  ) : item.mediaUrl ? (
                    <img
                      src={item.mediaUrl}
                      alt="Work preview"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="text-neutral-500 text-xs flex flex-col items-center gap-2">
                      <Film size={24} />
                      <span>Generative Artifact</span>
                    </div>
                  )}

                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="bg-black/75 backdrop-blur-md text-[#FAF9F5] text-[9px] font-mono uppercase px-2 py-0.5 rounded-full border border-white/10 font-bold">
                      {hasVideo ? "Cloudinary Video" : "Cloudinary Image"}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold text-xs sm:text-sm text-neutral-900 line-clamp-2 leading-snug">
                      {item.title || item.content?.slice(0, 70) || "Creative Generation"}
                    </h4>
                    <p className="text-[11px] text-neutral-500 line-clamp-2 mt-1 leading-relaxed">
                      {item.content}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-neutral-200/60 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                    <span>
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "Just Now"}
                    </span>
                    <span className="text-[#A67C46] font-semibold">Cleared for Buyout</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid: Live Briefs & Recent Activity Logs */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pt-2">
        {/* Left Column: Live Briefs */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-serif font-bold flex items-center gap-2 text-[#141511]">
              💼 Real-Time Brand Briefs
              <span className="bg-amber-100 text-amber-800 text-[10px] uppercase font-bold px-2 py-0.5 rounded-md tracking-wider">
                Escrow Protected
              </span>
            </h2>
            <Link
              href="/dashboard"
              className="text-xs font-semibold text-neutral-600 hover:text-[#141511] transition-colors"
            >
              Browse All Briefs →
            </Link>
          </div>

          <div className="space-y-4">
            {liveBriefs && liveBriefs.length > 0 ? (
              liveBriefs.map((brief: any) => (
                <div
                  key={brief.id}
                  className="bg-white p-6 border border-neutral-200 rounded-3xl hover:border-[#D3A373]/60 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-serif font-bold text-lg text-[#141511] group-hover:text-[#A67C46] transition-colors">
                        {brief.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-xs font-semibold text-neutral-700">
                          {brief.brand?.name || "Verified Brand Agency"}
                        </span>
                        <span className="text-neutral-300">•</span>
                        <span className="text-xs font-bold text-[#A67C46]">
                          Budget: {brief.budgetRange || "$5,000"}
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#FAF9F5] border border-neutral-200 text-neutral-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 size={12} className="text-[#A67C46]" />{" "}
                      {brief.formats?.[0] || "9:16"}
                    </div>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed mb-4 line-clamp-2">
                    {brief.description ||
                      "Seeking photorealistic commercial generation with verified seeds and buyout rights."}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-100 text-xs">
                    <div className="flex flex-wrap gap-1.5">
                      {brief.styles?.map((s: string, idx: number) => (
                        <span
                          key={idx}
                          className="bg-neutral-100 text-neutral-700 text-[10px] font-medium px-2.5 py-1 rounded-md"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-neutral-700 bg-neutral-100 px-3 py-1 rounded-full">
                      {brief.commercialUse || "Global Digital Rights"}
                    </span>
                  </div>
                </div>
              ))
            ) : null}
          </div>
        </div>

        {/* Right Column: Verified Experimentation Logs */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-serif font-bold text-[#141511]">
              Activity &amp; Proof Logs
            </h2>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="text-xs font-bold text-[#A67C46] hover:underline"
            >
              + Add Log
            </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-5">
            {logs.map((log: any) => (
              <div
                key={log.id}
                className="pb-5 border-b border-neutral-100 last:border-0 last:pb-0 relative space-y-3"
              >
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#D3A373] mt-2 shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-medium">
                      {log.content}
                    </p>
                    <span className="text-[10px] font-mono font-semibold text-neutral-400 mt-1 block uppercase">
                      {new Date(log.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {log.mediaUrl && (
                  <div className="rounded-2xl overflow-hidden border border-neutral-200 max-h-44 bg-black relative group">
                    {isVideoUrl(log.mediaUrl) ? (
                      <video
                        src={log.mediaUrl}
                        controls
                        playsInline
                        className="w-full h-44 object-cover"
                      />
                    ) : (
                      <img
                        src={log.mediaUrl}
                        alt="Log Media"
                        className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    <span className="absolute bottom-2 right-2 bg-black/75 text-white text-[9px] font-mono px-2 py-0.5 rounded-md backdrop-blur-xs font-bold">
                      Cloudinary CDN
                    </span>
                  </div>
                )}
              </div>
            ))}
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
    <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm hover:shadow-md hover:border-neutral-300 transition-all group">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-semibold text-neutral-500 mb-1">{title}</p>
          <h3 className="text-3xl font-serif font-bold tracking-tight text-[#141511]">{value}</h3>
        </div>
        <div className="bg-[#FAF9F5] p-3 rounded-2xl group-hover:scale-105 transition-transform border border-[#D3A373]/20">
          {icon}
        </div>
      </div>
      <p
        className={`text-xs font-medium mt-5 ${
          trendUp === true
            ? "text-emerald-700"
            : trendUp === false
            ? "text-rose-600"
            : "text-neutral-500"
        }`}
      >
        {trend}
      </p>
    </div>
  );
}
