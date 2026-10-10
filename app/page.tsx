"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  Search,
  ArrowRight,
  ArrowUpRight,
  SlidersHorizontal,
  ShieldCheck,
  BadgeCheck,
  CheckCircle2,
  Lock,
  Layers,
  Video,
  Clapperboard,
  Camera,
  Mic,
  Smile,
  Cpu,
  Palette,
  Eye,
  EyeOff,
  Building2,
  ExternalLink,
  ChevronDown,
  X,
  Menu,
  Star
} from "lucide-react";

type AuthMode = "signin" | "signup";
type UserRole = "BRAND" | "CREATOR";

export default function ClientoraLandingPage() {
  // Navigation & Interactive states
  const [activeCategory, setActiveCategory] = useState("All Packages");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModel, setSelectedModel] = useState("All AI Models");
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [authRole, setAuthRole] = useState<UserRole>("BRAND");
  const [showPassword, setShowPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Quick tag search trigger
  const handleQuickTag = (tag: string) => {
    setSearchQuery(tag);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setTimeout(() => {
      setAuthLoading(false);
      setAuthSuccess(
        authMode === "signin"
          ? "Authenticated successfully! Redirecting to dashboard..."
          : `Studio workspace provisioned for ${authRole === "CREATOR" ? "AI Creator" : "Brand / Client"}!`
      );
      setTimeout(() => {
        setIsAuthOpen(false);
        setAuthSuccess(null);
      }, 1500);
    }, 1000);
  };

  // Fixed Packages Data tailored for AI Content Marketplace
  const packages = [
    {
      id: 1,
      title: "30-Day Viral 9:16 AI Reel Campaign (15 Videos)",
      provider: "HyperReal Studio",
      category: "Generative Video",
      delivery: "10 Days",
      price: "$1,800",
      description: "Custom Runway Gen-3 + Kling cinematic reels with AI voice cloning, dynamic captioning, and sound design ready for TikTok and IG Reels.",
      badge: "Viral Video",
      models: ["Runway Gen-3", "ElevenLabs", "Kling AI"]
    },
    {
      id: 2,
      title: "High-End Synthetic Product Catalog (50 4K Assets)",
      provider: "Latent Forge",
      category: "Product Photography",
      delivery: "7 Days",
      price: "$1,400",
      description: "Studio-quality product placement images generated via Flux.1 Pro fine-tunes. Complete with depth consistency and high-resolution packaging textures.",
      badge: "E-Commerce",
      models: ["Flux.1 Pro", "Midjourney v6", "Inpainting"]
    },
    {
      id: 3,
      title: "Cinematic 60-Second AI Brand Commercial",
      provider: "PromptCine Labs",
      category: "Generative Video",
      delivery: "14 Days",
      price: "$2,900",
      description: "Full commercial spot featuring temporal consistency, bespoke sound score, color grading, and upscale to 4K ProRes with commercial broadcast rights.",
      badge: "Cinema Ad",
      models: ["Kling 1.5", "Sora Beta", "ComfyUI"]
    },
    {
      id: 4,
      title: "Custom Character LoRA & Brand Persona Kit",
      provider: "NeuralCraft Co.",
      category: "Brand LoRAs",
      delivery: "10 Days",
      price: "$2,200",
      description: "Dedicated LoRA weights trained on your mascot or brand identity. Delivers consistent facial fidelity across any lighting and camera angle.",
      badge: "LoRA Model",
      models: ["Flux.1 Dev", "SDXL", "Kohya_ss"]
    },
    {
      id: 5,
      title: "Multilingual AI Voice Dubbing & Lip-Sync (5 Languages)",
      provider: "Vocalis AI",
      category: "Generative Video",
      delivery: "5 Days",
      price: "$950",
      description: "Zero-latency emotive voice cloning via ElevenLabs + Wav2Lip sync. Expand your campaign to Spanish, Hindi, French, and Japanese effortlessly.",
      badge: "Audio & Dubbing",
      models: ["ElevenLabs", "LivePortrait", "Wav2Lip"]
    },
    {
      id: 6,
      title: "Virtual Fashion Lookbook with Digital Avatars",
      provider: "Atelier Synthetic",
      category: "Product Photography",
      delivery: "12 Days",
      price: "$2,400",
      description: "30 high-fashion editorial shots featuring diverse synthetic models wearing your 3D or flat garment designs with tactile fabric draping.",
      badge: "Apparel & Fashion",
      models: ["Midjourney v6", "ControlNet", "Photoshop AI"]
    }
  ];

  const filteredPackages = activeCategory === "All Packages" 
    ? packages 
    : packages.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface antialiased selection:bg-secondary-container selection:text-secondary">
      
      {/* ─────────────────────────────────────────────────────────
          1. HEADER / NAVIGATION BAR
      ───────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Branding */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-container/70 flex items-center justify-center text-secondary shadow-sm">
              <Sparkles className="w-5 h-5 text-secondary" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-headline font-bold text-2xl tracking-tight text-on-surface">Clientora</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
              <span className="font-label text-xs font-semibold text-secondary uppercase tracking-widest hidden sm:inline-block">AI Marketplace</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 font-label text-xs font-semibold text-on-surface-variant">
            <a href="#disciplines" className="hover:text-on-surface transition-colors">Explore AI Creators</a>
            <a href="#packages" className="hover:text-on-surface transition-colors">Campaign Packages</a>
            <a href="#workflow" className="hover:text-on-surface transition-colors">AI Match Engine</a>
            <a href="#talent" className="hover:text-on-surface transition-colors">Verified Talents</a>
            <a href="#cases" className="hover:text-on-surface transition-colors">For Brands</a>
          </nav>

          {/* Right Header CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setAuthMode("signin"); setIsAuthOpen(true); }}
              className="font-label text-xs font-semibold text-on-surface hover:text-primary transition-colors px-3 py-2"
            >
              Log In
            </button>

            <button
              onClick={() => { setAuthMode("signup"); setAuthRole("BRAND"); setIsAuthOpen(true); }}
              className="py-2.5 px-5 rounded-full bg-primary-container text-on-primary-container font-label text-xs font-bold hover:bg-on-surface hover:text-surface-bright transition-all duration-300 flex items-center gap-2 shadow-sm group active:scale-95"
            >
              <span>Post a Brief</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-on-surface hover:bg-surface-container"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-surface-container-low border-b border-outline-variant/40 px-6 py-4 space-y-3 font-label text-sm font-semibold">
            <a href="#disciplines" onClick={() => setMobileMenuOpen(false)} className="block py-2">Explore AI Creators</a>
            <a href="#packages" onClick={() => setMobileMenuOpen(false)} className="block py-2">Campaign Packages</a>
            <a href="#workflow" onClick={() => setMobileMenuOpen(false)} className="block py-2">AI Match Engine</a>
            <a href="#talent" onClick={() => setMobileMenuOpen(false)} className="block py-2">Verified Talents</a>
            <a href="#cases" onClick={() => setMobileMenuOpen(false)} className="block py-2">For Brands</a>
          </div>
        )}
      </header>


      {/* ─────────────────────────────────────────────────────────
          2. HERO SECTION
      ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
        
        {/* Ambient Organic Glows */}
        <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-secondary-container/30 blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-10 w-80 h-80 rounded-full bg-primary-fixed/25 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              
              {/* Category Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-container/80 text-secondary text-xs font-semibold mb-6 shadow-sm border border-secondary-container">
                <span className="w-2 h-2 rounded-full bg-[#5a6242] animate-pulse"></span>
                <span>CURATED AI CREATIVE TALENT PLATFORM • BYTEXL 2026</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-headline font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-on-surface leading-[1.1] mb-6">
                Find the Right AI Experts to Bring Your Ideas to Life.
              </h1>

              {/* Subheadline */}
              <p className="font-body text-base sm:text-lg text-on-surface-variant max-w-2xl mb-8 leading-relaxed">
                Discover trusted generative directors, prompt architects, and ComfyUI specialists for your next commercial project — from viral 9:16 vertical reels to synthetic product photography and custom brand LoRAs.
              </p>

              {/* Interactive Search Bar Component */}
              <div className="w-full bg-surface-container-lowest p-2 rounded-2xl sm:rounded-full shadow-[0_12px_32px_-8px_rgba(36,37,31,0.08)] border border-outline-variant/40 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-4">
                <div className="flex items-center gap-3 px-4 py-2 flex-1">
                  <Search className="w-5 h-5 text-outline shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by tool (Runway Gen-3, Flux.1) or format (9:16 reels)..."
                    className="w-full bg-transparent font-body text-sm text-on-surface placeholder:text-outline focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 shrink-0 px-2">
                  <div className="relative">
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="appearance-none bg-surface-container-low text-on-surface text-xs font-semibold font-label py-2.5 pl-3.5 pr-8 rounded-full border border-outline-variant/30 focus:outline-none cursor-pointer"
                    >
                      <option>All AI Models</option>
                      <option>Runway Gen-3</option>
                      <option>Flux.1 Pro</option>
                      <option>Midjourney v6</option>
                      <option>Kling AI</option>
                      <option>ElevenLabs Audio</option>
                      <option>ComfyUI Nodes</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-on-surface-variant absolute right-2.5 top-3 pointer-events-none" />
                  </div>

                  <button
                    onClick={() => {
                      const el = document.getElementById("packages");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="py-3 px-6 rounded-full bg-primary-container text-on-primary-container font-label text-xs font-bold hover:bg-on-surface hover:text-surface-bright transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                  >
                    <span>Find Experts</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Popular Quick Search Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-8 font-label text-xs">
                <span className="text-on-surface-variant font-medium">Popular:</span>
                {["Runway Gen-3", "9:16 Reels", "Flux.1 Pro", "Brand LoRAs", "Voice Dubbing"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleQuickTag(tag)}
                    className="px-3 py-1 rounded-full bg-surface-container hover:bg-secondary-container hover:text-secondary text-on-surface-variant transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#packages"
                  className="py-3.5 px-7 rounded-full bg-on-surface text-surface-bright font-label text-xs font-bold hover:bg-primary transition-all flex items-center gap-2 shadow-sm"
                >
                  <span>Explore Services</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href="#talent"
                  className="py-3.5 px-6 rounded-full bg-surface-container-lowest border border-outline-variant/40 text-on-surface font-label text-xs font-bold hover:bg-surface-container transition-all flex items-center gap-2 shadow-sm"
                >
                  <BadgeCheck className="w-4 h-4 text-secondary" />
                  <span>Vetted AI Specialists</span>
                </a>
              </div>

            </div>

            {/* Right Visual Graphic Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/40 bg-surface-container-low group">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEyYSItgLNlHcVuENjl1XRuhtLnrLa5MnMYvhTKJ1RWRdXDZ18R7rNXWHPlFM9_16QBj6PpOopo3yyc9MDQbm_DCjZDnm_ERclAX8kDLiIqVFcqUKYdalF-GZDfh0AYNIjdgvvibBRq9PmwhTTYisaLj4u8HCzhe68Pm1JUJek4dfR9JaMiRuvVc9WdFvpMHxo8Up0OLD-O5SGYCfIg_UCk0E9Y8d44nFrlPeTdD3l9TRPXM1o9ks"
                  alt="AI Creators working on generative workflows"
                  className="w-full h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Badge 1 (Bottom Left) */}
                <div className="absolute bottom-6 left-6 bg-surface-container-lowest/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-outline-variant/30 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                    <Sparkles className="w-5 h-5 text-[#7d562d]" />
                  </div>
                  <div>
                    <p className="font-label text-xs font-bold text-on-surface">100% Verified Prompts</p>
                    <p className="font-body text-[11px] text-on-surface-variant">Full generative seed reproducibility</p>
                  </div>
                </div>

                {/* Floating Badge 2 (Top Right) */}
                <div className="absolute top-6 right-6 bg-secondary-container/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md text-secondary font-label text-xs font-bold flex items-center gap-1.5 border border-[#c2caa4]">
                  <CheckCircle2 className="w-4 h-4 text-secondary" />
                  <span>Top 1.2% Generative Benchmark</span>
                </div>
              </div>
            </div>

          </div>

          {/* Metrics Horizontal Ribbon */}
          <div className="mt-16 pt-8 border-t border-outline-variant/30 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div>
              <p className="font-headline font-bold text-3xl sm:text-4xl text-on-surface mb-1">3,400+</p>
              <p className="font-label text-xs font-bold uppercase tracking-wider text-secondary">Verified AI Creators</p>
              <p className="font-body text-xs text-on-surface-variant mt-0.5">Audited on prompt consistency & LoRAs.</p>
            </div>
            <div>
              <p className="font-headline font-bold text-3xl sm:text-4xl text-on-surface mb-1">18+</p>
              <p className="font-label text-xs font-bold uppercase tracking-wider text-secondary">AI Engines Supported</p>
              <p className="font-body text-xs text-on-surface-variant mt-0.5">Runway, Flux, Midjourney, Kling, ComfyUI.</p>
            </div>
            <div>
              <p className="font-headline font-bold text-3xl sm:text-4xl text-on-surface mb-1">9:16 & 16:9</p>
              <p className="font-label text-xs font-bold uppercase tracking-wider text-secondary">Commercial Formats</p>
              <p className="font-body text-xs text-on-surface-variant mt-0.5">Optimized for TikTok, Reels, & Ads.</p>
            </div>
            <div>
              <p className="font-headline font-bold text-3xl sm:text-4xl text-on-surface mb-1">100%</p>
              <p className="font-label text-xs font-bold uppercase tracking-wider text-secondary">Escrow Guaranteed</p>
              <p className="font-body text-xs text-on-surface-variant mt-0.5">Full commercial IP transfer protocols.</p>
            </div>
          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────
          3. CATEGORIES GRID ("What Can Our AI Creators Build For You?")
      ───────────────────────────────────────────────────────── */}
      <section id="disciplines" className="py-20 bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="font-label text-xs font-bold text-secondary uppercase tracking-widest block mb-2">
                GENERATIVE DISCIPLINES
              </span>
              <h2 className="font-headline font-bold text-3xl sm:text-4xl text-on-surface tracking-tight">
                What Can Our AI Creators Build For You?
              </h2>
              <p className="font-body text-sm sm:text-base text-on-surface-variant mt-2 max-w-xl">
                From viral social reels to photorealistic synthetic e-commerce assets, choose the generative discipline that matches your brand roadmap.
              </p>
            </div>

            <a href="#packages" className="mt-4 md:mt-0 font-label text-xs font-bold text-primary hover:underline flex items-center gap-1">
              Browse all 18 generative tracks
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* 8 Specialized Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {[
              {
                icon: Clapperboard,
                title: "Generative Video & Cinema",
                desc: "Runway Gen-3, Kling, Sora, & Luma. Cinematic 16:9 ads with realistic camera motion and lighting.",
                count: "840 Creators"
              },
              {
                icon: Video,
                title: "9:16 Viral Shorts & Reels",
                desc: "TikTok and Instagram native vertical campaigns, AI avatars, dynamic hooks, and pacing.",
                count: "1,290 Creators"
              },
              {
                icon: Camera,
                title: "Synthetic Product Photography",
                desc: "Flux.1 Pro & Midjourney v6 photorealism. Virtual studios, 4K resolution catalog assets.",
                count: "920 Creators"
              },
              {
                icon: Layers,
                title: "Custom LoRA & Style Fine-Tuning",
                desc: "Bespoke LoRA models trained on your specific product designs, brand mascot, or aesthetic.",
                count: "410 Creators"
              },
              {
                icon: Mic,
                title: "AI Voiceovers & Audio Dubbing",
                desc: "ElevenLabs emotive voice cloning, automated lip-syncing, and multilingual audio dubs.",
                count: "670 Creators"
              },
              {
                icon: Smile,
                title: "Virtual Brand Influencers",
                desc: "Persistent AI personas with cross-platform appearance consistency and multi-shot storytelling.",
                count: "350 Creators"
              },
              {
                icon: Cpu,
                title: "Modular ComfyUI Pipelines",
                desc: "Custom node workflows, ControlNet setups, batch rendering, and automated asset generation.",
                count: "280 Creators"
              },
              {
                icon: Palette,
                title: "Concept Art & Visual Direction",
                desc: "Rapid worldbuilding, moodboards, pitch deck visual assets, and high-fidelity keyframes.",
                count: "510 Creators"
              }
            ].map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <div 
                  key={idx}
                  className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 hover:border-primary-container/80 transition-all hover:shadow-md flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-full bg-secondary-container/60 flex items-center justify-center text-secondary mb-4 group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-headline font-bold text-lg text-on-surface mb-2">{cat.title}</h3>
                    <p className="font-body text-xs text-on-surface-variant leading-relaxed mb-6">{cat.desc}</p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20 font-label text-xs">
                    <span className="text-secondary font-semibold">{cat.count}</span>
                    <span className="text-primary group-hover:translate-x-1 transition-transform">↗</span>
                  </div>
                </div>
              );
            })}

          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────
          4. SERVICES BUILT AROUND YOUR GOALS (FIXED-SCOPE PACKAGES)
      ───────────────────────────────────────────────────────── */}
      <section id="packages" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="font-label text-xs font-bold text-secondary uppercase tracking-widest block mb-2">
              TURNKEY DELIVERABLES
            </span>
            <h2 className="font-headline font-bold text-3xl sm:text-4xl text-on-surface tracking-tight">
              Services Built Around Your Goals
            </h2>
            <p className="font-body text-sm sm:text-base text-on-surface-variant mt-2 max-w-xl">
              Direct fixed-scope packages vetted for timeline certainty, prompt recipe delivery, and full commercial copyright clearance.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-6 md:mt-0 font-label text-xs font-semibold">
            {["All Packages", "Generative Video", "Product Photography", "Brand LoRAs"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveCategory(filter)}
                className={`py-2 px-4 rounded-full transition-all ${
                  activeCategory === filter
                    ? "bg-secondary-container text-on-secondary-fixed shadow-sm"
                    : "bg-surface-container-low text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Rich Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-label text-[11px] font-bold uppercase tracking-wider text-secondary bg-secondary-container/50 px-2.5 py-1 rounded-full">
                    {pkg.badge}
                  </span>
                  <span className="font-label text-xs text-on-surface-variant font-medium">
                    ⏱ {pkg.delivery}
                  </span>
                </div>

                <h3 className="font-headline font-bold text-lg text-on-surface mb-2 leading-snug">
                  {pkg.title}
                </h3>

                <p className="font-label text-xs text-secondary font-semibold mb-3">
                  Studio: {pkg.provider}
                </p>

                <p className="font-body text-xs text-on-surface-variant leading-relaxed mb-4">
                  {pkg.description}
                </p>

                {/* AI Models Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {pkg.models.map((m) => (
                    <span key={m} className="bg-surface-container px-2 py-0.5 rounded text-[10px] font-medium text-on-surface-variant">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-on-surface-variant block font-body">Starting from</span>
                  <span className="font-headline font-bold text-xl text-on-surface">{pkg.price}</span>
                </div>

                <button
                  onClick={() => { setAuthMode("signup"); setIsAuthOpen(true); }}
                  className="py-2 px-4 rounded-full bg-surface-container-low hover:bg-on-surface hover:text-surface-bright text-on-surface font-label text-xs font-bold transition-all shadow-sm"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

      </section>


      {/* ─────────────────────────────────────────────────────────
          5. TALENT SHOWCASE ("Meet the People Behind Great Work")
      ───────────────────────────────────────────────────────── */}
      <section id="talent" className="py-20 bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="font-label text-xs font-bold text-secondary uppercase tracking-widest block mb-2">
                VERIFIED TALENT POOL
              </span>
              <h2 className="font-headline font-bold text-3xl sm:text-4xl text-on-surface tracking-tight">
                Meet the People Behind Great Work
              </h2>
              <p className="font-body text-sm sm:text-base text-on-surface-variant mt-2 max-w-xl">
                Every creator undergoes prompt fidelity evaluation, negative constraint audits, and live benchmark tests to guarantee consistent execution.
              </p>
            </div>

            <button 
              onClick={() => { setAuthMode("signup"); setIsAuthOpen(true); }}
              className="mt-4 md:mt-0 font-label text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              View all 3,400+ verified creators ↗
            </button>
          </div>

          {/* 4 Practitioner Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {[
              {
                name: "Camilla Jensen",
                role: "Lead Generative Video Director",
                rate: "$120/hr",
                status: "Available this week",
                tags: ["Runway Gen-3", "Kling AI", "Cinema 4D"],
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDq0Kv-cC8mAEz5wfpKmo3raELW1fBuijdOwpohlyuGEhyqrPvwLkHXQDOhmyOS8Or6apjnPbic9EkA0_z3rAX4WX1O6qZ42DpUlUSCAxotIcjGIEEFUu8XSu5h4k8gsc0UQlTELVuI3YDpotzKpa22nNpZ9MJP0_5kvKa6ntc6p4KBlBMuycOfVpwvCkB6DpyaeVKm_-avpQ-AjfjCxzEQZY2ynJiOvkebFLyyJMFNfZ4ANcrROpY"
              },
              {
                name: "Julian Thorne",
                role: "Flux.1 & Midjourney Specialist",
                rate: "$145/hr",
                status: "Available in 3 days",
                tags: ["Flux.1 Pro", "Midjourney v6", "Photoshop"],
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkCM2ksYTwWQg1iQEoKYaT-kcbo-hVIR0fz1Rv4HpkzzUWm6KIUKf_Iyl5SCjx1BE3-9ieyVXFhAJ8wSEEZF8vQRalfevuZJngBY_ehpjaCDV7dBlb-Q77GRX5_tvF7G95N9VbfVkxqsr6Q-39d7fRZGciTxdV1fGrCXnqvyvh0ySXWtBKMET9Gn27JWU1cP6n9liV8EJphemQFnnF5xz83Mf3LSH-NNHjsd5g-k_YpNwy33UqJCA"
              },
              {
                name: "Amara Osei",
                role: "Virtual Avatar & LoRA Architect",
                rate: "$115/hr",
                status: "Next slot: open now",
                tags: ["ComfyUI", "SDXL LoRAs", "LivePortrait"],
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzfOvetctSVFElvgyDGCQi5eeQzpFWPqalWw2YgH469xv194z_Bt5oQ9a7uGbhcsTxV1wlQmsYyaAtX7j-QNfCfhMCZjlHSPoWLUMAbl_sdJbeId3rnbs0Ipc-_KzLjUrSHxYFjxo6ORWZkz2z8H7L1tqbwelxMhrsDX3JWsxM-GOoKU4J7xcHY2jXA1sbwP86SA30NNIcHOsvYIzkLM5_JOT3GPmDBm0QfLR8rCv2viRAIlSB1X8"
              },
              {
                name: "Soren Lindqvist",
                role: "AI Audio & Multilingual Dubbing",
                rate: "$135/hr",
                status: "Available in 2 days",
                tags: ["ElevenLabs", "Suno v3.5", "Sound Design"],
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaa7pEbRpnvpJ9EoSHdWlLDGxZn-bi-X_mXnsQOblvablaHk3GBIGIMErIcckmMicBvi_E2ByRr6q8pi5PZoJ7KmOZXQYr6UdHDE9F0h0q4FsxqNHGjDDqhWiuWUQxNpewhZnGfdrekAsMqCzrojB3_F69nXWP5ma7AEjcPXGRhtzL79MrpW6L56AgnBAQslM3m2u05O7nssjBIAVivUUoFQlH0F2W0hvHad3XOKAGdkEvS00oVCw"
              }
            ].map((talent, idx) => (
              <div
                key={idx}
                className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/30 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative rounded-xl overflow-hidden mb-4 h-48 bg-surface-container">
                    <img 
                      src={talent.img} 
                      alt={talent.name} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-semibold text-secondary flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                      <span>{talent.status}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-headline font-bold text-base text-on-surface flex items-center gap-1">
                      {talent.name}
                      <BadgeCheck className="w-4 h-4 text-secondary fill-secondary-container" />
                    </h3>
                  </div>

                  <p className="font-body text-xs text-on-surface-variant mb-4">{talent.role}</p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {talent.tags.map((tag) => (
                      <span key={tag} className="bg-surface-container-low px-2 py-0.5 rounded-full text-[10px] font-medium text-on-surface-variant">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between font-label">
                  <span className="font-bold text-sm text-on-surface">{talent.rate}</span>
                  <button
                    onClick={() => { setAuthMode("signup"); setIsAuthOpen(true); }}
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    View Profile →
                  </button>
                </div>
              </div>
            ))}

          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────
          6. FULL-CYCLE WORKFLOW (BYTE-XL ESCROW & INTELLECTUAL PROPERTY)
      ───────────────────────────────────────────────────────── */}
      <section id="workflow" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-label text-xs font-bold text-secondary uppercase tracking-widest block mb-2">
            FULL-CYCLE WORKFLOW
          </span>
          <h2 className="font-headline font-bold text-3xl sm:text-4xl text-on-surface tracking-tight">
            From Idea to Finished AI Campaign
          </h2>
          <p className="font-body text-sm sm:text-base text-on-surface-variant mt-2 leading-relaxed">
            A structured engagement model designed to guarantee prompt reproducibility, ensure strict timeline clarity, and eliminate freelance ambiguity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 01 */}
          <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 relative">
            <div className="w-12 h-12 rounded-full bg-secondary-container/70 flex items-center justify-center text-secondary mb-6">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <span className="font-headline font-bold text-2xl text-outline-variant/70 block mb-2">01</span>
            <h3 className="font-headline font-bold text-xl text-on-surface mb-3">Describe Your AI Need</h3>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed mb-6">
              Post your campaign brief with desired aspect ratios (9:16 or 16:9), target platform, seed prompts, and budget. Our Gemini 1.5 Flash assistant refines your technical requirements automatically.
            </p>
            <div className="font-label text-xs font-semibold text-secondary flex items-center gap-1.5 pt-4 border-t border-outline-variant/20">
              <CheckCircle2 className="w-4 h-4" />
              <span>Self-serve brief or AI-assisted intake</span>
            </div>
          </div>

          {/* Step 02 */}
          <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 relative">
            <div className="w-12 h-12 rounded-full bg-secondary-container/70 flex items-center justify-center text-secondary mb-6">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="font-headline font-bold text-2xl text-outline-variant/70 block mb-2">02</span>
            <h3 className="font-headline font-bold text-xl text-on-surface mb-3">AI Semantic Matching</h3>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed mb-6">
              Our embedding engine computes a real-time Match % based on tool mastery, stylistic synergy, and benchmark scores. Review verified work samples, past ratings, and prompt fidelity recipes.
            </p>
            <div className="font-label text-xs font-semibold text-secondary flex items-center gap-1.5 pt-4 border-t border-outline-variant/20">
              <CheckCircle2 className="w-4 h-4" />
              <span>Zero random spam or unqualified bids</span>
            </div>
          </div>

          {/* Step 03 */}
          <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 relative">
            <div className="w-12 h-12 rounded-full bg-secondary-container/70 flex items-center justify-center text-secondary mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="font-headline font-bold text-2xl text-outline-variant/70 block mb-2">03</span>
            <h3 className="font-headline font-bold text-xl text-on-surface mb-3">Milestone Escrow & Hand-off</h3>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed mb-6">
              Deposit securely into milestone escrow. Review watermarked AI outputs. Release payments only when complete high-resolution media, raw prompt recipes, and full commercial IP assignments are approved.
            </p>
            <div className="font-label text-xs font-semibold text-secondary flex items-center gap-1.5 pt-4 border-t border-outline-variant/20">
              <CheckCircle2 className="w-4 h-4" />
              <span>100% money-back escrow guarantee</span>
            </div>
          </div>

        </div>

      </section>


      {/* ─────────────────────────────────────────────────────────
          7. RECENT DELIVERED ENGAGEMENTS (CASE STUDIES)
      ───────────────────────────────────────────────────────── */}
      <section id="cases" className="py-20 bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="font-label text-xs font-bold text-secondary uppercase tracking-widest block mb-2">
                PROVEN TRACK RECORD
              </span>
              <h2 className="font-headline font-bold text-3xl sm:text-4xl text-on-surface tracking-tight">
                Recent Delivered Engagements
              </h2>
              <p className="font-body text-sm sm:text-base text-on-surface-variant mt-2 max-w-xl">
                High-performance creative squads commissioned and executed through the Clientora AI marketplace.
              </p>
            </div>

            <button 
              onClick={() => { setAuthMode("signup"); setIsAuthOpen(true); }}
              className="mt-4 md:mt-0 font-label text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              Browse stories by industry ↗
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Case Study 1 (Wide 8 Columns) */}
            <div className="lg:col-span-8 bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/30 flex flex-col justify-between">
              <div>
                <div className="rounded-2xl overflow-hidden h-64 mb-6 bg-surface-container relative">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKNJXEKUf_KWz7K52XgdIS2O5FGDBJZlCEWIyH-gaEuUnicR-s74GyzzsNGO-WftpiDszLnUxwe991HimH4v3VTQPAEDllVMaBHoXv2x8ZRE-R2344UWjORk1vYMoRyfLBEmeN0kgxVznE8xb-tpym0TZPI1YtjIW1rmrh07P5EuzD1CGUjKoIBBc902DvdaSFRuF30hWetSk_f9E-QSW08rHNpgeZDqIHn9swpn2Cs2pUK0Pbgj0"
                    alt="Generative Video Case Study"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-surface-container-lowest/90 px-3 py-1 rounded-full text-xs font-bold text-secondary">
                    CONSUMER BRAND & 9:16 VIDEO
                  </div>
                </div>

                <h3 className="font-headline font-bold text-2xl text-on-surface mb-3">
                  Aura Beverages: 0 to 1 Global Launch with 100% Synthetic Video
                </h3>

                <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-6">
                  A bespoke two-person Clientora squad (Generative Video Director and Sound Designer) generated 24 native 9:16 video ads using Runway Gen-3 and ElevenLabs, leading to a 340% increase in social ROAS and cutting physical production costs by $65,000.
                </p>
              </div>

              <div className="pt-6 border-t border-outline-variant/20 flex flex-wrap items-center justify-between gap-4 font-label text-xs">
                <div className="flex gap-6">
                  <div>
                    <span className="text-on-surface-variant block text-[11px]">TIMELINE</span>
                    <span className="font-bold text-on-surface">3 Weeks</span>
                  </div>
                  <div>
                    <span className="text-on-surface-variant block text-[11px]">KEY METRIC</span>
                    <span className="font-bold text-secondary">+340% ROAS</span>
                  </div>
                  <div>
                    <span className="text-on-surface-variant block text-[11px]">FORMAT</span>
                    <span className="font-bold text-on-surface">9:16 Vertical Video</span>
                  </div>
                </div>

                <button 
                  onClick={() => { setAuthMode("signup"); setIsAuthOpen(true); }}
                  className="py-2.5 px-5 rounded-full bg-surface-container hover:bg-on-surface hover:text-surface-bright text-on-surface font-semibold transition-all"
                >
                  Read Case Study ↗
                </button>
              </div>
            </div>

            {/* Case Study 2 (4 Columns) */}
            <div className="lg:col-span-4 bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/30 flex flex-col justify-between">
              <div>
                <div className="rounded-2xl overflow-hidden h-48 mb-6 bg-surface-container relative">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBa1nMZklXbHc0vwcIN-NfMCVExkCOi20SEYrFpea9pFOQZamCaqEqiOjQBmDLM2boDwCufX34ZAllGZTKyPZkKb9b3wLJ6a7bzZwP8az5TEwG84UhABwe3Q5IurSroRbL3pr0NMfM-P2KOZSgwFU8wcWzsgrCoVHyN7bibjCbXhjAZU7BC_TyjQ684lwbb1tUdjyKIwJjbNkKm1mjXx3CZhf9hUnf7D_mF2RuXDnXFjdwK5dtpRIM"
                    alt="Synthetic Product Photography"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-surface-container-lowest/90 px-3 py-1 rounded-full text-xs font-bold text-secondary">
                    E-COMMERCE & LUXURY
                  </div>
                </div>

                <h3 className="font-headline font-bold text-xl text-on-surface mb-3">
                  Solstice Jewels: Zero-Studio Virtual Catalog (200 SKUs)
                </h3>

                <p className="font-body text-xs text-on-surface-variant leading-relaxed mb-6">
                  From CAD renderings to photorealistic Flux.1 placement assets in 10 days, delivering $1.4M GMV in the initial 90 days following launch without shipping a single physical sample.
                </p>
              </div>

              <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between font-label text-xs">
                <div className="flex text-[#d3a373]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <button 
                  onClick={() => { setAuthMode("signup"); setIsAuthOpen(true); }}
                  className="font-bold text-primary hover:underline"
                >
                  View Details →
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────
          8. PLATFORM VALUE PILLARS & TESTIMONIAL
      ───────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          
          <div>
            <div className="w-10 h-10 rounded-full bg-secondary-container/70 flex items-center justify-center text-secondary mb-4">
              <BadgeCheck className="w-5 h-5" />
            </div>
            <h4 className="font-headline font-bold text-base text-on-surface mb-2">Curated Top 1.2%</h4>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
              No generic prompt slop. We evaluate real model reproducibility, workflow nodes, and prompt discipline.
            </p>
          </div>

          <div>
            <div className="w-10 h-10 rounded-full bg-secondary-container/70 flex items-center justify-center text-secondary mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="font-headline font-bold text-base text-on-surface mb-2">Escrow Protected</h4>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
              Milestone funds remain in secure custody. Release only when agreed deliverables meet formal quality review.
            </p>
          </div>

          <div>
            <div className="w-10 h-10 rounded-full bg-secondary-container/70 flex items-center justify-center text-secondary mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-headline font-bold text-base text-on-surface mb-2">Prompt Recipe Delivery</h4>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
              Receive full seed parameters, base model checkpoints, and workflow node graphs along with final media files.
            </p>
          </div>

          <div>
            <div className="w-10 h-10 rounded-full bg-secondary-container/70 flex items-center justify-center text-secondary mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-headline font-bold text-base text-on-surface mb-2">Full IP Assignment</h4>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
              Legally structured intellectual property agreements. You hold 100% commercial exploitation and advertising rights.
            </p>
          </div>

        </div>

        {/* Testimonial Banner */}
        <div className="bg-surface-container-low rounded-3xl p-8 sm:p-12 border border-outline-variant/30 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex text-[#d3a373] mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <blockquote className="font-headline font-medium text-lg sm:text-xl text-on-surface italic leading-relaxed mb-6">
              “Working with Clientora has completely revolutionized our brand campaign workflows. We commissioned a Lead Generative Video Director in under 24 hours who delivered 15 viral 9:16 reels that scaled our TikTok ROAS by 3.4x.”
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container font-bold flex items-center justify-center text-sm">
                TH
              </div>
              <div>
                <p className="font-label text-xs font-bold text-on-surface">Therese Holm</p>
                <p className="font-body text-[11px] text-on-surface-variant">VP of Creative Marketing, Celestine Brands (San Francisco)</p>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 text-center shrink-0 w-full lg:w-64">
            <p className="font-headline font-bold text-4xl text-on-surface mb-1">4.98</p>
            <p className="font-label text-xs font-bold uppercase tracking-wider text-secondary mb-1">Average Client Score</p>
            <p className="font-body text-[11px] text-on-surface-variant">Based on 3,820+ verified client evaluations</p>
          </div>
        </div>

      </section>


      {/* ─────────────────────────────────────────────────────────
          9. CALL TO ACTION BANNER (DARK CHARCOAL CARD)
      ───────────────────────────────────────────────────────── */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-inverse-surface text-inverse-on-surface rounded-3xl p-8 sm:p-16 relative overflow-hidden text-center flex flex-col items-center">
          
          {/* Subtle Ambient Light */}
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#d3a373]/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#5a6242]/30 blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-low/10 text-primary-fixed text-xs font-semibold mb-6 border border-outline/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>START TODAY WITH ZERO RISK</span>
          </div>

          <h2 className="font-headline font-bold text-3xl sm:text-5xl tracking-tight max-w-2xl mb-6">
            Have an AI Campaign in Mind? Let's Find Your Creator.
          </h2>

          <p className="font-body text-sm sm:text-base text-inverse-on-surface/80 max-w-xl mb-8 leading-relaxed">
            Tell us what you're creating and discover verified generative talent in under 24 hours. No obligations, automated escrow, and rapid turnaround.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <button
              onClick={() => { setAuthMode("signup"); setAuthRole("BRAND"); setIsAuthOpen(true); }}
              className="py-3.5 px-8 rounded-full bg-primary-container text-on-primary-container font-label text-xs font-bold hover:bg-surface-bright hover:text-on-surface transition-all flex items-center gap-2 shadow-lg"
            >
              <span>Explore AI Creators</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => { setAuthMode("signup"); setAuthRole("BRAND"); setIsAuthOpen(true); }}
              className="py-3.5 px-8 rounded-full bg-surface-container-low/10 border border-outline/40 hover:bg-surface-container-low/20 text-inverse-on-surface font-label text-xs font-bold transition-all"
            >
              Post a Campaign Brief
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-inverse-on-surface/70 font-label">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-secondary-fixed" />
              Free brief scoping consultation
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-secondary-fixed" />
              24-48 hour talent match
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-secondary-fixed" />
              100% commercial IP rights
            </span>
          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────
          10. FOOTER
      ───────────────────────────────────────────────────────── */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant/30 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            
            {/* Brand column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-secondary-container/70 flex items-center justify-center text-secondary">
                  <Sparkles className="w-4 h-4 text-secondary" />
                </div>
                <span className="font-headline font-bold text-xl text-on-surface">Clientora</span>
              </div>
              <p className="font-body text-xs text-on-surface-variant max-w-sm leading-relaxed mb-6">
                A curated marketplace empowering forward-looking brands and enterprise agencies to commission verified AI content creators, prompt directors, and generative studios.
              </p>
              <div className="flex items-center gap-3 text-secondary">
                <span className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-xs font-bold cursor-pointer hover:bg-secondary-container transition-colors">X</span>
                <span className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-xs font-bold cursor-pointer hover:bg-secondary-container transition-colors">GH</span>
                <span className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-xs font-bold cursor-pointer hover:bg-secondary-container transition-colors">IG</span>
              </div>
            </div>

            {/* Links 1 */}
            <div>
              <p className="font-label text-xs font-bold uppercase tracking-wider text-on-surface mb-4">EXPLORE SERVICES</p>
              <ul className="space-y-2.5 font-body text-xs text-on-surface-variant">
                <li><a href="#disciplines" className="hover:text-on-surface transition-colors">Generative Video</a></li>
                <li><a href="#disciplines" className="hover:text-on-surface transition-colors">9:16 Viral Reels</a></li>
                <li><a href="#disciplines" className="hover:text-on-surface transition-colors">Synthetic Photography</a></li>
                <li><a href="#disciplines" className="hover:text-on-surface transition-colors">Brand LoRA Models</a></li>
                <li><a href="#disciplines" className="hover:text-on-surface transition-colors">AI Voice Dubbing</a></li>
              </ul>
            </div>

            {/* Links 2 */}
            <div>
              <p className="font-label text-xs font-bold uppercase tracking-wider text-on-surface mb-4">FIND EXPERTS</p>
              <ul className="space-y-2.5 font-body text-xs text-on-surface-variant">
                <li><a href="#talent" className="hover:text-on-surface transition-colors">Vetted AI Directors</a></li>
                <li><a href="#talent" className="hover:text-on-surface transition-colors">Runway Gen-3 Masters</a></li>
                <li><a href="#talent" className="hover:text-on-surface transition-colors">Flux.1 Specialists</a></li>
                <li><a href="#talent" className="hover:text-on-surface transition-colors">ComfyUI Architects</a></li>
                <li><a href="#talent" className="hover:text-on-surface transition-colors">Virtual Avatar Creators</a></li>
              </ul>
            </div>

            {/* Links 3 - Newsletter */}
            <div>
              <p className="font-label text-xs font-bold uppercase tracking-wider text-on-surface mb-4">STAY INFORMED</p>
              <p className="font-body text-xs text-on-surface-variant mb-4 leading-relaxed">
                Receive our monthly dispatch on generative AI creative workflows, model benchmarks, and marketplace updates.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="name@agency.com"
                  className="bg-surface-container-low text-xs px-3 py-2 rounded-xl border border-outline-variant/30 w-full focus:outline-none"
                />
                <button 
                  onClick={() => alert("Subscribed to Clientora Creative Dispatch!")}
                  className="bg-primary-container text-on-primary-container px-3 py-2 rounded-xl text-xs font-bold hover:bg-on-surface hover:text-surface-bright transition-all"
                >
                  Join
                </button>
              </div>
            </div>

          </div>

          {/* Legal strip */}
          <div className="pt-8 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-label text-xs text-on-surface-variant">
            <p>© 2026 Clientora Marketplace Inc. Built for byteXL HacXLerate Challenge 2.</p>
            <div className="flex items-center gap-6">
              <a href="#terms" className="hover:underline">Privacy Policy</a>
              <a href="#terms" className="hover:underline">Terms of Service</a>
              <a href="#terms" className="hover:underline">Commercial IP Protection</a>
            </div>
          </div>

        </div>
      </footer>


      {/* ─────────────────────────────────────────────────────────
          11. AUTHENTICATION MODAL (WARM EDITORIAL SYSTEM)
      ───────────────────────────────────────────────────────── */}
      {isAuthOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm transition-all">
          <div className="relative w-full max-w-md bg-surface-container-lowest rounded-2xl p-8 sm:p-10 shadow-2xl border border-outline-variant/30 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close button */}
            <button
              onClick={() => setIsAuthOpen(false)}
              className="absolute top-4 right-4 p-2 text-on-surface-variant hover:text-on-surface rounded-full hover:bg-surface-container transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Ambient Halos */}
            <div className="absolute -top-16 -left-12 w-48 h-48 rounded-full bg-secondary-container/40 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-8 w-44 h-44 rounded-full bg-primary-fixed/30 blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col w-full">
              
              {/* Crest */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-secondary-container/70 flex items-center justify-center text-secondary mb-3 shadow-sm">
                  <Sparkles className="w-6 h-6 text-secondary" />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-headline font-bold text-xl tracking-tight text-on-surface">Clientora</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                  <span className="font-label text-xs font-semibold text-secondary uppercase tracking-widest">Market</span>
                </div>
                <p className="font-body text-xs text-on-surface-variant max-w-[280px]">
                  Curated platform for visionary brands and verified AI creators.
                </p>
              </div>

              {/* Segmented Switcher */}
              <div className="bg-surface-container rounded-full p-1 flex items-center mb-6 shadow-inner">
                <button
                  type="button"
                  onClick={() => { setAuthMode("signin"); setAuthSuccess(null); }}
                  className={`flex-1 py-2 px-4 rounded-full font-label text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    authMode === "signin"
                      ? "text-on-surface bg-surface-container-lowest shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {authMode === "signin" && <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />}
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthMode("signup"); setAuthSuccess(null); }}
                  className={`flex-1 py-2 px-4 rounded-full font-label text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    authMode === "signup"
                      ? "text-on-surface bg-surface-container-lowest shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {authMode === "signup" && <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />}
                  Create Account
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleAuthSubmit} className="space-y-3.5">
                
                {/* Role Switcher (Sign Up Only) */}
                {authMode === "signup" && (
                  <div className="space-y-1.5">
                    <label className="block font-label text-[11px] font-semibold text-on-surface uppercase tracking-wider pl-1">
                      I am joining as
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setAuthRole("BRAND")}
                        className={`py-2 px-3 rounded-xl font-label text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                          authRole === "BRAND"
                            ? "border border-primary-container bg-surface-container-low text-on-surface"
                            : "border border-transparent bg-surface-container text-on-surface-variant"
                        }`}
                      >
                        <Building2 className="w-4 h-4 text-primary" />
                        Brand / Client
                      </button>
                      <button
                        type="button"
                        onClick={() => setAuthRole("CREATOR")}
                        className={`py-2 px-3 rounded-xl font-label text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                          authRole === "CREATOR"
                            ? "border border-primary-container bg-surface-container-low text-on-surface"
                            : "border border-transparent bg-surface-container text-on-surface-variant"
                        }`}
                      >
                        <Palette className="w-4 h-4 text-primary" />
                        AI Creator
                      </button>
                    </div>
                  </div>
                )}

                {/* Name (Sign Up Only) */}
                {authMode === "signup" && (
                  <div className="space-y-1">
                    <label className="block font-label text-[11px] font-semibold text-on-surface uppercase tracking-wider pl-1">
                      Full Name or Studio Handle
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Elena Vance (or Latent Studio)"
                      className="w-full bg-surface-container-low text-on-surface font-body text-xs px-3.5 py-2.5 rounded-xl border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary-container"
                    />
                  </div>
                )}

                {/* Email */}
                <div className="space-y-1">
                  <label className="block font-label text-[11px] font-semibold text-on-surface uppercase tracking-wider pl-1">
                    Work Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@studio.design"
                    className="w-full bg-surface-container-low text-on-surface font-body text-xs px-3.5 py-2.5 rounded-xl border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary-container"
                  />
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between pl-1">
                    <label className="block font-label text-[11px] font-semibold text-on-surface uppercase tracking-wider">
                      Passkey / Password
                    </label>
                    {authMode === "signin" && (
                      <a href="#forgot" className="text-[11px] text-primary hover:underline font-medium">
                        Forgot passkey?
                      </a>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••••••"
                      className="w-full bg-surface-container-low text-on-surface font-body text-xs pl-3.5 pr-10 py-2.5 rounded-xl border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary-container"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-on-surface-variant hover:text-on-surface"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Feedback */}
                {authSuccess && (
                  <div className="p-3 rounded-xl bg-secondary-container text-secondary text-xs font-semibold flex items-center gap-2">
                    <BadgeCheck className="w-4 h-4 shrink-0" />
                    <span>{authSuccess}</span>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full mt-2 py-3 px-6 rounded-full bg-primary-container text-on-primary-container font-label text-xs font-bold hover:bg-on-surface hover:text-surface-bright transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-75"
                >
                  <span>
                    {authLoading
                      ? "Processing..."
                      : authMode === "signin"
                      ? "Sign In to Clientora"
                      : `Create ${authRole === "CREATOR" ? "AI Creator" : "Brand"} Account`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Creator Apply Banner */}
              <div className="mt-5 p-3 rounded-xl bg-surface-container-low flex items-center justify-between gap-3 text-left border border-outline-variant/20">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                    <BadgeCheck className="w-4 h-4 text-secondary" />
                  </div>
                  <div className="truncate">
                    <p className="font-label text-xs font-semibold text-on-surface truncate">Are you an AI Creator?</p>
                    <p className="font-body text-[10px] text-on-surface-variant truncate">Pass our model benchmarks & earn verified badges</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => { setAuthMode("signup"); setAuthRole("CREATOR"); }}
                  className="shrink-0 font-label text-xs font-bold text-primary hover:underline flex items-center gap-0.5"
                >
                  Apply ↗
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
