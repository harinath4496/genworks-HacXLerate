"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ShieldCheck,
  Star,
  Clock,
  Sparkles,
  MapPin,
  CheckCircle2,
  Copy,
  Check,
  ChevronLeft,
  ArrowRight,
  Sliders,
  Cpu,
  Layers,
  Award,
  Share2,
} from "lucide-react";
import { CREATORS_POOL, getCreatorById, CreatorPortfolioItem } from "@/lib/creatorsData";

export default function CreatorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const creatorId = (params?.id as string) || "c1";

  const creator = getCreatorById(creatorId) || CREATORS_POOL[0];
  const [selectedItem, setSelectedItem] = useState<CreatorPortfolioItem | null>(
    creator.portfolioItems[0] || null
  );
  const [copiedSeed, setCopiedSeed] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  const handleCopySeed = (seed: string) => {
    navigator.clipboard.writeText(seed);
    setCopiedSeed(true);
    setTimeout(() => setCopiedSeed(false), 2000);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f5] text-[#1b1c16] font-body selection:bg-[#d3a373]/30">
      {/* Top Floating Editorial Navbar */}
      <nav className="sticky top-0 z-40 bg-[#faf9f5]/90 backdrop-blur-md border-b border-[#e4e3d9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xs font-bold font-headline uppercase tracking-wider text-[#50453b] hover:text-[#1b1c16] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Discovery Feed</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="p-2 rounded-full border border-[#e4e3d9] bg-white text-[#50453b] hover:text-[#1b1c16] transition-all shadow-xs"
              title="Share Profile"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <Link
              href={`/dashboard?briefModal=true&director=${encodeURIComponent(creator.name)}`}
              className="bg-[#1b1c16] hover:bg-[#2e2f27] text-[#fbfaf0] text-xs font-headline font-bold py-2.5 px-5 rounded-full flex items-center gap-2 transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d3a373]" />
              <span>Commission via Escrow</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Share Toast */}
      {shareToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1b1c16] text-[#fbfaf0] text-xs font-bold py-3 px-5 rounded-2xl shadow-2xl flex items-center gap-2 border border-[#d3a373]/40 animate-fade-in-up">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Profile URL copied to clipboard</span>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-10">
        {/* Creator Hero Header Card */}
        <section className="bg-white rounded-3xl border border-[#e4e3d9] p-6 sm:p-10 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#d3a373]/15 to-transparent rounded-full blur-3xl -z-0 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              {/* Creator Avatar with Verified Pulse */}
              <div className="relative shrink-0">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-2 border-[#d3a373] shadow-md relative">
                  <Image
                    src={creator.avatar}
                    alt={creator.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white p-1.5 rounded-xl shadow-md border-2 border-white flex items-center" title="AI Skills Verified">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>

              {/* Creator Meta */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="font-headline font-black text-2xl sm:text-3xl text-[#1b1c16]">
                    {creator.name}
                  </h1>
                  <span className="font-mono text-xs text-[#82756a] font-semibold">
                    {creator.handle}
                  </span>
                  <span className="bg-[#dfe7bf] text-[#5a6242] text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Award className="w-3 h-3 text-[#5a6242]" />
                    {creator.verificationScore}% AI Certified
                  </span>
                </div>

                <p className="font-headline text-sm font-bold text-[#d3a373]">
                  {creator.role}
                </p>

                <p className="font-body text-xs sm:text-sm text-[#50453b] max-w-xl leading-relaxed">
                  {creator.bio}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-[#82756a] font-medium">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#50453b]" />
                    {creator.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    {creator.turnaroundTime} SLA
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {creator.commercialLicense}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Pillar */}
            <div className="flex md:flex-col gap-4 shrink-0 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-[#e4e3d9] md:pl-8">
              <div>
                <p className="font-mono text-[10px] uppercase font-bold text-[#82756a]">
                  Commission Rate
                </p>
                <p className="font-headline font-black text-2xl text-[#1b1c16]">
                  {creator.hourlyRate}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{creator.rating}</span>
                </div>
                <span className="text-xs text-[#82756a]">
                  ({creator.projectsCompleted} completed)
                </span>
              </div>

              <Link
                href={`/dashboard?briefModal=true&director=${encodeURIComponent(creator.name)}`}
                className="w-full bg-[#d3a373] hover:bg-[#c29263] text-[#1b1c16] text-xs font-headline font-bold py-3 px-5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <span>Hire {creator.name.split(" ")[0]}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Verified Toolchain Pill Bar */}
          <div className="mt-8 pt-6 border-t border-[#e4e3d9]/70 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] font-bold text-[#82756a] uppercase tracking-wider mr-2 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#d3a373]" />
              Verified Toolchain:
            </span>
            {creator.tools.map((t) => (
              <span
                key={t}
                className="bg-[#faf9f5] border border-[#e4e3d9] text-[#1b1c16] text-xs font-semibold px-3 py-1 rounded-full shadow-2xs"
              >
                {t}
              </span>
            ))}
            <span className="bg-[#efeee4] text-[#50453b] text-xs font-medium px-3 py-1 rounded-full">
              {creator.specialization}
            </span>
          </div>
        </section>

        {/* AI Portfolio & Reproducible Workflows */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="font-headline font-black text-xl text-[#1b1c16] flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#d3a373]" />
                <span>Verified AI Portfolio & Workflows</span>
              </h2>
              <p className="text-xs text-[#82756a] mt-0.5">
                Every asset below is verified for deterministic seed reproducibility and commercial clearance.
              </p>
            </div>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {creator.portfolioItems.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`bg-white rounded-3xl border overflow-hidden transition-all duration-300 cursor-pointer shadow-xs ${
                    isSelected
                      ? "border-[#d3a373] ring-2 ring-[#d3a373]/30"
                      : "border-[#e4e3d9] hover:border-[#82756a]"
                  }`}
                >
                  {/* Media Banner */}
                  <div className="relative aspect-video w-full bg-[#1b1c16] overflow-hidden group">
                    <Image
                      src={item.mediaUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-full">
                      {item.aspectRatio} Aspect
                    </div>
                    <div className="absolute top-3 right-3 bg-[#d3a373] text-[#1b1c16] text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {item.category}
                    </div>
                  </div>

                  {/* Portfolio Card Meta */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-headline font-bold text-base text-[#1b1c16]">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#82756a] mt-0.5">
                          {item.views} Views • {item.likes} Saves
                        </p>
                      </div>
                      <span className="font-mono text-[11px] font-bold bg-[#faf9f5] border border-[#e4e3d9] px-2.5 py-1 rounded-lg text-[#50453b]">
                        {item.toolsUsed[0]}
                      </span>
                    </div>

                    {/* Technical Workflow Preview Box */}
                    <div className="bg-[#faf9f5] rounded-2xl p-4 border border-[#e4e3d9] space-y-3">
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#82756a] font-bold">
                        <span className="flex items-center gap-1.5">
                          <Sliders className="w-3.5 h-3.5 text-[#d3a373]" />
                          GENERATION PARAMETERS
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopySeed(item.workflow.seed);
                          }}
                          className="flex items-center gap-1 text-[#d3a373] hover:text-[#b88657] transition-colors"
                        >
                          {copiedSeed ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-700">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Seed</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-2 font-mono text-[11px] border-y border-[#e4e3d9]/60 py-2">
                        <div>
                          <span className="text-[#82756a] block text-[10px]">MODEL</span>
                          <span className="font-bold text-[#1b1c16] truncate block">{item.workflow.model.split("+")[0]}</span>
                        </div>
                        <div>
                          <span className="text-[#82756a] block text-[10px]">SEED</span>
                          <span className="font-bold text-[#1b1c16]">{item.workflow.seed}</span>
                        </div>
                        <div>
                          <span className="text-[#82756a] block text-[10px]">CFG / STEPS</span>
                          <span className="font-bold text-[#1b1c16]">{item.workflow.cfgScale} / {item.workflow.steps}</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono font-bold text-[#82756a] uppercase block mb-1">
                          Positive Prompt Directive:
                        </span>
                        <p className="font-mono text-xs text-[#50453b] bg-white p-2.5 rounded-xl border border-[#e4e3d9] leading-relaxed line-clamp-2">
                          "{item.workflow.positivePrompt}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Milestone Escrow Security Section */}
        <section className="bg-gradient-to-r from-[#1b1c16] to-[#2e2f27] text-[#fbfaf0] rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#d3a373]" />
              <span className="font-mono text-xs uppercase tracking-wider text-[#d3a373] font-bold">
                GenWorks Vault Protection
              </span>
            </div>
            <h3 className="font-headline font-black text-xl sm:text-2xl text-white">
              Ready to collaborate with {creator.name}?
            </h3>
            <p className="text-xs sm:text-sm text-[#efeee4]/80 leading-relaxed">
              Your budget is held in milestone escrow. {creator.name} is only paid when you review and approve the final video renders and seed parameters.
            </p>
          </div>

          <Link
            href={`/dashboard?briefModal=true&director=${encodeURIComponent(creator.name)}`}
            className="bg-[#d3a373] hover:bg-[#c29263] text-[#1b1c16] font-headline font-bold text-xs py-3.5 px-6 rounded-full flex items-center gap-2 transition-all shadow-md shrink-0 whitespace-nowrap"
          >
            <span>Commission {creator.name.split(" ")[0]}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </main>
    </div>
  );
}
