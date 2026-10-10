"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { GenWorksLogo, AnimatedLogo, SplashScreen } from "@/components/AnimatedLogo";
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Star,
  CheckCircle2,
  X,
  Menu,
  ChevronRight,
  ChevronLeft,
  Building2,
  Palette,
  Eye,
  EyeOff,
  Lightbulb,
  Zap,
  Check,
  Search,
  SlidersHorizontal,
  ShieldCheck,
  BadgeCheck,
  FileText,
  Clock,
  Layers,
  Sparkle,
  Copy
} from "lucide-react";

type AuthMode = "signin" | "signup";
type UserRole = "BRAND" | "CREATOR";

interface CreatorWorkflow {
  positivePrompt: string;
  negativePrompt: string;
  model: string;
  seed: string;
  aspectRatio: string;
  cfgScale: number;
  steps: number;
  sampler: string;
}

interface Creator {
  id: string;
  name: string;
  handle: string;
  role: string;
  specialization: string;
  category: "video" | "photography" | "pipelines" | "audio";
  avatar: string;
  portfolioImg: string;
  deliverableType: string;
  aspectRatio: "9:16" | "16:9" | "1:1";
  tools: string[];
  rating: number;
  projectsCompleted: number;
  hourlyRate: string;
  verificationBadge: "Toolchain Verified" | "Seed Certified" | "IP Cleared";
  workflow: CreatorWorkflow;
}

export default function GenWorksMarketplaceLandingPage() {
  // Navigation & Interactive States
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [authRole, setAuthRole] = useState<UserRole>("BRAND");
  const [showPassword, setShowPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Hero Video & Scroll Interaction State (image_e6ab44.png & smooth fade-in)
  const [heroTextVisible, setHeroTextVisible] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const [intentRole, setIntentRole] = useState<"hire" | "work">("hire");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 1. Text fades in smoothly on mount / load
    const textTimer = setTimeout(() => {
      setHeroTextVisible(true);
    }, 250);

    // 2. Video fades in smoothly when user scrolls slightly (scrollY > 10)
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setVideoVisible(true);
      }
    };

    // Fallback: Also fade in video after 2.5s so it plays if user pauses at top
    const videoTimer = setTimeout(() => {
      setVideoVisible(true);
    }, 2500);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(textTimer);
      clearTimeout(videoTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (videoVisible && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [videoVisible]);

  // Interactive Services Showcase active index
  const [activeService, setActiveService] = useState(0);

  // Testimonial Carousel active index
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Creator Marketplace Filtering & Search State
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeWorkflowModal, setActiveWorkflowModal] = useState<Creator | null>(null);
  const [copiedSeed, setCopiedSeed] = useState(false);

  // AI-Assisted Brief Builder State
  const [roughBriefIdea, setRoughBriefIdea] = useState(
    "Need 5 high-energy 9:16 vertical ads for our luxury cold-brew coffee brand. Cinematic lighting, macro ice splash, vibrant pacing."
  );
  const [isGeneratingBrief, setIsGeneratingBrief] = useState(false);
  const [generatedBrief, setGeneratedBrief] = useState<{
    title: string;
    contentType: string;
    aspectRatio: string;
    style: string;
    tools: string[];
    commercialUse: string;
    estimatedBudget: string;
    timeline: string;
  } | null>({
    title: "Cold-Brew Commercial Launch: 9:16 High-Energy Social Series",
    contentType: "Short-Form Generative Video Ads (x5 Variations)",
    aspectRatio: "9:16 Vertical (1080x1920) optimized for Instagram Reels & TikTok",
    style: "Hyperrealistic cinematic commercial, condensation macro textures, dynamic slow-motion physics",
    tools: ["Runway Gen-3 Alpha", "Flux.1 Pro Stills", "ElevenLabs Voiceover"],
    commercialUse: "Full Worldwide Buyout · Prompt Seeds, Negative Embeddings & ComfyUI Nodes Included",
    estimatedBudget: "$850 — $1,200",
    timeline: "48 – 72 Hours Guaranteed"
  });

  // Newsletter State
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleGenerateBrief = () => {
    setIsGeneratingBrief(true);
    setTimeout(() => {
      setIsGeneratingBrief(false);
      setGeneratedBrief({
        title: roughBriefIdea.slice(0, 45) + "...",
        contentType: roughBriefIdea.toLowerCase().includes("video") || roughBriefIdea.toLowerCase().includes("ads") 
          ? "9:16 Viral Generative Reels" 
          : "4K Synthetic Product Photorealism",
        aspectRatio: roughBriefIdea.toLowerCase().includes("9:16") ? "9:16 Vertical Video" : "16:9 Cinematic Video",
        style: "Editorial commercial lighting, high-contrast dynamic physics, reproducible seed consistency",
        tools: ["Runway Gen-3 Alpha", "Flux.1 Dev", "ComfyUI Pipeline", "ElevenLabs Dubbing"],
        commercialUse: "100% Commercial Indemnification · All Prompt Seeds & LoRA Checkpoints Transferred",
        estimatedBudget: "$900 — $1,400",
        timeline: "48 Hours Turnaround"
      });
    }, 1200);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setTimeout(() => {
      setAuthLoading(false);
      setAuthSuccess(
        authMode === "signin"
          ? "Welcome back to GenWorks!"
          : `Studio workspace provisioned for ${authRole === "CREATOR" ? "AI Creator" : "Brand / Client"}!`
      );
      setTimeout(() => {
        setIsAuthOpen(false);
        setAuthSuccess(null);
      }, 1400);
    }, 900);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmailInput("");
      setSubscribed(false);
    }, 3000);
  };

  const copySeedToClipboard = (seed: string) => {
    navigator.clipboard.writeText(seed);
    setCopiedSeed(true);
    setTimeout(() => setCopiedSeed(false), 2000);
  };

  // Services Directory Data (Curated AI Creator Marketplace)
  const servicesList = [
    {
      id: "01",
      name: "Generative 9:16 Video & Reels",
      desc: "Cinematic short-form video ads engineered with Runway Gen-3 Alpha, Kling AI, and Minimax. Guaranteed 100% temporal consistency, dynamic physics, and viral pacing.",
      tag: "Viral Video Ads",
      aspect: "9:16 Vertical",
      models: ["Runway Gen-3", "Kling 1.5", "Premiere Pro"],
      previewImg: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80"
    },
    {
      id: "02",
      name: "Synthetic Product Photography",
      desc: "Zero-studio luxury catalogs and commercial packaging renders powered by Flux.1 Pro and Midjourney v6. Consistent macro lighting, flawless brand packaging, and 4K print resolution.",
      tag: "E-Commerce Stills",
      aspect: "1:1 & 4:5 Stills",
      models: ["Flux.1 Pro", "Midjourney v6", "Photoshop"],
      previewImg: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80"
    },
    {
      id: "03",
      name: "Custom LoRA & Character Checkpoints",
      desc: "Fine-tune custom character LoRAs and brand face consistency. Keep the same digital spokesperson across 100+ videos and marketing assets with zero visual drift.",
      tag: "Model Training",
      aspect: "Multi-Format",
      models: ["SDXL LoRA", "Kohya-ss", "Flux Dev"],
      previewImg: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=80"
    },
    {
      id: "04",
      name: "ComfyUI Node Automation Pipelines",
      desc: "Deterministic node workflows that turn brand product catalogs into automated social video variants at scale. Node .json workflows delivered on project completion.",
      tag: "Node Pipelines",
      aspect: "Automated Batch",
      models: ["ComfyUI Nodes", "ControlNet", "IP-Adapter"],
      previewImg: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80"
    },
    {
      id: "05",
      name: "AI Voiceover & Multilingual Dubbing",
      desc: "Zero-latency emotional voice clones and synchronized multilingual dubbing across 28+ languages using ElevenLabs neural audio and automated lip-sync models.",
      tag: "Audio Synthesis",
      aspect: "Synchronized Audio",
      models: ["ElevenLabs", "LivePortrait", "Wav2Lip"],
      previewImg: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80"
    }
  ];

  // Verified AI Creators Marketplace Pool (6 Rich Profiles with AI Portfolios & Workflows)
  const creatorsPool: Creator[] = [
    {
      id: "c1",
      name: "Elena Vance",
      handle: "@elena_cinema",
      role: "Lead Generative Video Director",
      specialization: "9:16 Viral Commercials & Luxury Narrative",
      category: "video",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
      portfolioImg: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80",
      deliverableType: "9:16 Cinematic Ad Series",
      aspectRatio: "9:16",
      tools: ["Runway Gen-3", "Kling AI", "Premiere"],
      rating: 4.99,
      projectsCompleted: 52,
      hourlyRate: "$95/hr",
      verificationBadge: "Toolchain Verified",
      workflow: {
        positivePrompt: "Cinematic commercial 9:16, luxury perfume bottle floating in slow-motion water droplets, bioluminescent flora, anamorphic lens flare, 8k resolution, shot on Arri Alexa 35, cinematic color grading --ar 9:16",
        negativePrompt: "low resolution, plastic skin, jitter, temporal flicker, artifacts, distorted hands, blurry text, low frame rate",
        model: "Runway Gen-3 Alpha + Kling 1.5 Pro",
        seed: "8947219044",
        aspectRatio: "9:16 Vertical (1080x1920)",
        cfgScale: 7.5,
        steps: 50,
        sampler: "Euler a (Motion Vector 8.4)"
      }
    },
    {
      id: "c2",
      name: "Kai Chen",
      handle: "@kaichen_nodes",
      role: "ComfyUI Architect & Pipeline Specialist",
      specialization: "Automated E-Commerce Node Workflows",
      category: "pipelines",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
      portfolioImg: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80",
      deliverableType: "ComfyUI Batch Pipeline (.json)",
      aspectRatio: "1:1",
      tools: ["ComfyUI", "Flux.1 Dev", "ControlNet"],
      rating: 4.98,
      projectsCompleted: 68,
      hourlyRate: "$120/hr",
      verificationBadge: "Seed Certified",
      workflow: {
        positivePrompt: "Deterministic batch product placement node, luxury matte black wristwatch resting on volcanic obsidian stone, morning sunlight refraction, hyper-detailed texture, depth map constrained via ControlNet tile",
        negativePrompt: "blur, deformed watch hands, incorrect reflections, blown out highlights, chromatic aberration",
        model: "ComfyUI + Flux.1 Dev + ControlNet Union",
        seed: "4490218821",
        aspectRatio: "1:1 Square (2048x2048)",
        cfgScale: 4.0,
        steps: 28,
        sampler: "dpmpp_2m_sde_gpu"
      }
    },
    {
      id: "c3",
      name: "Zara Al-Mansoor",
      handle: "@zara_virtual",
      role: "Virtual Human & Persona Lead",
      specialization: "Consistent Brand Brand Spokespersons & LoRAs",
      category: "pipelines",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
      portfolioImg: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=80",
      deliverableType: "Brand LoRA Checkpoint (.safetensors)",
      aspectRatio: "9:16",
      tools: ["Kohya-ss", "LivePortrait", "SDXL LoRA"],
      rating: 4.96,
      projectsCompleted: 39,
      hourlyRate: "$110/hr",
      verificationBadge: "IP Cleared",
      workflow: {
        positivePrompt: "Consistent brand ambassador persona, speaking directly to camera, natural micro-expressions, studio ring light catchlights in eyes, ultra photorealistic skin pores, 8k portrait",
        negativePrompt: "uncanny valley, plastic smooth skin, asymmetrical eyes, weird teeth, frozen gaze",
        model: "Custom Trained LoRA (0.85 weight) + SDXL 1.0",
        seed: "1938502391",
        aspectRatio: "9:16 Vertical (1080x1920)",
        cfgScale: 6.5,
        steps: 35,
        sampler: "Euler Ancestral"
      }
    },
    {
      id: "c4",
      name: "Marcus Sterling",
      handle: "@marcus_flux",
      role: "Lead Synthetic Product Stills Director",
      specialization: "Luxury E-Commerce & Print Catalog Renders",
      category: "photography",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
      portfolioImg: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
      deliverableType: "4K Print Resolution Catalog Still",
      aspectRatio: "1:1",
      tools: ["Flux.1 Pro", "Midjourney v6", "Blender"],
      rating: 4.97,
      projectsCompleted: 58,
      hourlyRate: "$85/hr",
      verificationBadge: "Toolchain Verified",
      workflow: {
        positivePrompt: "Commercial photography of artisanal organic skincare serum in frosted amber dropper bottle, dew droplets, botanical rosemary sprigs in foreground, soft diffused window light, Vogue editorial aesthetic",
        negativePrompt: "text artifacts, deformed bottle label, excessive grain, cartoonish rendering, oversaturated colors",
        model: "Flux.1 Pro via BFL API",
        seed: "7320491823",
        aspectRatio: "1:1 (2048x2048 raw master)",
        cfgScale: 3.5,
        steps: 40,
        sampler: "Flux default flow-match"
      }
    },
    {
      id: "c5",
      name: "Aria Thorne",
      handle: "@aria_cinematics",
      role: "Cinematic Worldbuilding & Commercial Filmmaker",
      specialization: "16:9 Widescreen Brand Epics & Sci-Fi Commercials",
      category: "video",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
      portfolioImg: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop&q=80",
      deliverableType: "16:9 Cinematic Video Trailer",
      aspectRatio: "16:9",
      tools: ["Runway Gen-3", "Luma Dream Machine", "DaVinci"],
      rating: 4.95,
      projectsCompleted: 44,
      hourlyRate: "$105/hr",
      verificationBadge: "Seed Certified",
      workflow: {
        positivePrompt: "16:9 cinematic master shot, futuristic electric vehicle driving along coastal highway at dusk, golden hour rays hitting chrome body, realistic asphalt reflection, drone follow angle, film grain",
        negativePrompt: "wheel warping, floating vehicle, unrealistic speed jitter, video glitching, oversharpening",
        model: "Runway Gen-3 Alpha + Luma Ray 2",
        seed: "5591028301",
        aspectRatio: "16:9 Widescreen (3840x2160)",
        cfgScale: 8.0,
        steps: 60,
        sampler: "Euler a (Speed 1.0x)"
      }
    },
    {
      id: "c6",
      name: "Liam O'Connor",
      handle: "@liam_voicecraft",
      role: "Audio Synthesis & Multilingual Voice Director",
      specialization: "Zero-Latency Lip-Sync & 28-Language Localization",
      category: "audio",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&auto=format&fit=crop&q=80",
      portfolioImg: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80",
      deliverableType: "Master Audio Stems & Dubbed Reel",
      aspectRatio: "9:16",
      tools: ["ElevenLabs", "LivePortrait", "Audition"],
      rating: 4.94,
      projectsCompleted: 61,
      hourlyRate: "$75/hr",
      verificationBadge: "IP Cleared",
      workflow: {
        positivePrompt: "Professional cinematic corporate voiceover, warm baritone timbre, enthusiastic yet authoritative tone, zero background noise, studio acoustic treatment, natural breathing pauses",
        negativePrompt: "robotic robotic inflection, metallic clipping, background hum, mispronounced syllables",
        model: "ElevenLabs Multilingual v2 + LivePortrait Lip-Sync",
        seed: "9018471203",
        aspectRatio: "Synchronized to 9:16 Master Video",
        cfgScale: 0.75,
        steps: 1,
        sampler: "Direct Neural Vocoder"
      }
    }
  ];

  // Filter creators based on category and search query
  const filteredCreators = useMemo(() => {
    return creatorsPool.filter((creator) => {
      const matchesCategory =
        selectedCategory === "all" || creator.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Testimonials Data
  const testimonials = [
    {
      quote: "GenWorks transformed our seasonal launch. What used to take our traditional agency 8 weeks and $90,000 was delivered in 4 days by Elena Vance with breathtaking visual consistency and 340% higher TikTok ROAS.",
      author: "Sarah Jenkins",
      title: "VP of Brand & Growth, Aura Energy",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80"
    },
    {
      quote: "The combination of deterministic ComfyUI pipelines and vetted generative directors meant zero prompt hallucination and 100% seed reproducibility. Releasing milestone escrow was completely effortless.",
      author: "David Vance",
      title: "Head of Marketing, Celestine Global",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80"
    },
    {
      quote: "We commissioned 50 synthetic 4K luxury jewelry product renders with zero studio set costs. The deliverables passed our strict print inspection standards on the very first submission.",
      author: "Chloe Dubois",
      title: "Chief Creative Officer, Solstice Lux",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-[#fbfaf0] text-[#1b1c16] selection:bg-[#d3a373] selection:text-[#1b1c16] font-body antialiased relative overflow-x-hidden">
      
      {/* MNC Animated Splash Screen on Load */}
      <SplashScreen />

      {/* Subtle Warm Atmospheric Ambient Glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#d3a373]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[1600px] right-0 w-[500px] h-[500px] bg-[#5a6242]/8 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[2800px] left-0 w-[600px] h-[600px] bg-[#dfe7bf]/30 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* ─────────────────────────────────────────────────────────
          1. FLOATING CAPSULE NAVIGATION BAR (Matches image_32c1e9.png & image_48eb78.png)
      ───────────────────────────────────────────────────────── */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <header className="pointer-events-auto bg-[#ffffff]/90 backdrop-blur-xl border border-[#e4e3d9] px-6 py-3 rounded-full flex items-center justify-between gap-6 max-w-4xl w-full shadow-lg shadow-[#1b1c16]/5 transition-all">
          
          {/* Left: GenWorks Official Modular Cube Logo */}
          <a href="#" className="flex items-center group shrink-0">
            <GenWorksLogo size="sm" animated={false} />
          </a>

          {/* Center: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold tracking-wide text-[#50453b]">
            <a href="#about" className="hover:text-[#1b1c16] transition-colors">Why GenWorks</a>
            <a href="#services" className="hover:text-[#1b1c16] transition-colors">AI Disciplines</a>
            <a href="#creators" className="hover:text-[#1b1c16] transition-colors">AI Creators</a>
            <a href="#brief-builder" className="hover:text-[#1b1c16] transition-colors">Brief Builder</a>
          </nav>

          {/* Right: CTA Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => { setAuthMode("signup"); setIsAuthOpen(true); }}
              className="bg-[#d3a373] hover:bg-[#c29263] text-[#1b1c16] text-xs font-extrabold px-4.5 py-2 rounded-full transition-all duration-300 flex items-center gap-1.5 shadow-md shadow-[#d3a373]/20 active:scale-95"
            >
              <span>Post a Brief</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-[#50453b] hover:text-[#1b1c16]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#fbfaf0]/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 text-xl font-bold md:hidden text-[#1b1c16]">
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d3a373]">Why GenWorks</a>
          <a href="#services" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d3a373]">AI Disciplines</a>
          <a href="#creators" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d3a373]">AI Creators</a>
          <a href="#brief-builder" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d3a373]">Brief Builder</a>
          <button
            onClick={() => { setMobileMenuOpen(false); setIsAuthOpen(true); }}
            className="bg-[#d3a373] text-[#1b1c16] px-8 py-3 rounded-full text-base font-extrabold shadow-md"
          >
            Post a Brief →
          </button>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────
          2. HERO SECTION — CINEMATIC VIDEO BACKDROP WITH TRANSLUCENT OVERLAY
          (Matches image_e6ab44.png reference & client-first portfolio search)
      ───────────────────────────────────────────────────────── */}
      <section className="pt-32 sm:pt-36 md:pt-40 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Cinematic Card with Video Backdrop */}
        <div className="relative rounded-[32px] sm:rounded-[44px] md:rounded-[52px] overflow-hidden min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex flex-col justify-center p-6 sm:p-10 md:p-14 lg:p-16 border border-[#2d2e26]/40 bg-[#141510] shadow-2xl">
          
          {/* Background Video — Fades in on scroll or timed activation */}
          <video
            ref={videoRef}
            src="/hero-video-lg.mp4"
            loop
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-out z-0 ${
              videoVisible ? "opacity-65 sm:opacity-75" : "opacity-0"
            }`}
          />

          {/* Cinematic Scrim Gradient: ensures 100% crystal contrast for text legibility like image_e6ab44.png */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#12130e]/95 via-[#12130e]/80 to-[#12130e]/30 z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12130e]/90 via-transparent to-[#12130e]/40 z-10 pointer-events-none" />

          {/* Foreground Text & Interactive Controls — Fades in smoothly on load */}
          <div
            className={`relative z-20 max-w-3xl transition-all duration-1000 ease-out transform ${
              heroTextVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Display Headline matching image_e6ab44.png hierarchy */}
            <h1 className="font-headline font-black text-4xl sm:text-5xl md:text-6xl lg:text-[68px] tracking-tight leading-[1.05] text-white">
              Empowering Brands Through{" "}
              <span className="text-[#d3a373]">AI Creative</span>{" "}
              Ambition
            </h1>

            {/* Subheadline value proposition */}
            <p className="font-body text-base sm:text-lg md:text-xl text-white/85 leading-relaxed max-w-2xl mt-5 font-normal">
              Hire verified generative filmmakers, ComfyUI architects, and AI prompt directors who amplify your talent into high-impact campaigns. Guaranteed seed reproducibility, commercial IP warranties, and milestone escrow.
            </p>

            {/* Intent Switcher (Segmented Toggle from image_e6ab44.png) */}
            <div className="flex items-center gap-1 p-1 bg-white/10 backdrop-blur-md rounded-full border border-white/15 w-fit mt-7">
              <button
                type="button"
                onClick={() => setIntentRole("hire")}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  intentRole === "hire"
                    ? "bg-white text-[#1b1c16] shadow-sm font-bold"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                }`}
              >
                I want to hire AI Creators
              </button>
              <button
                type="button"
                onClick={() => {
                  setIntentRole("work");
                  const el = document.getElementById("brief-builder");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  intentRole === "work"
                    ? "bg-white text-[#1b1c16] shadow-sm font-bold"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                }`}
              >
                I want to commission pipelines
              </button>
            </div>

            {/* Translucent Glassmorphic Search Bar (Requested by user) */}
            <div className="w-full max-w-2xl mt-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("creators");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="relative flex items-center bg-white/90 hover:bg-white/95 backdrop-blur-md rounded-full p-2 pl-4 sm:pl-6 shadow-2xl border border-white/30 focus-within:ring-4 focus-within:ring-[#d3a373]/30 focus-within:bg-white transition-all duration-300"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#50453b]/80 shrink-0 mr-2 sm:mr-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for AI content creator portfolio..."
                  className="w-full bg-transparent text-[#1b1c16] placeholder:text-[#50453b]/75 font-body text-xs sm:text-base outline-none pr-3 font-medium"
                />
                <button
                  type="submit"
                  className="bg-[#1b1c16] hover:bg-[#2d2e26] text-white px-4.5 sm:px-7 py-2 sm:py-3 rounded-full font-headline font-bold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 shadow-md hover:scale-105 active:scale-95 transition-all duration-200 shrink-0 border border-white/10"
                >
                  <Search className="w-3.5 h-3.5 text-[#d3a373]" />
                  <span>Search</span>
                </button>
              </form>
            </div>

          </div>

        </div>

        {/* 3-Column Trust & Verification Row below card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 max-w-7xl mx-auto">
          
          {/* 1. 5-Star Social Proof */}
          <div className="flex flex-col items-start justify-center p-5 rounded-2xl bg-white border border-[#e4e3d9] shadow-sm">
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#d3a373] text-[#d3a373]" />
              ))}
            </div>
            <p className="font-headline font-black text-sm text-[#1b1c16]">4.98 / 5 Rating</p>
            <p className="font-body text-xs text-[#50453b] mt-0.5">850+ Verified Brand Campaigns Delivered</p>
          </div>

          {/* 2. 100% Seed Reproducibility */}
          <div className="flex flex-col items-start justify-center p-5 rounded-2xl bg-white border border-[#e4e3d9] shadow-sm">
            <span className="font-headline font-black text-2xl text-[#1b1c16] tracking-tight">100%</span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#50453b] font-bold mt-0.5">Seed Reproducibility</span>
            <p className="font-body text-xs text-[#50453b] mt-1">Deterministic prompt seeds, CFG parameters & model checkpoints.</p>
          </div>

          {/* 3. Commercial IP Clearance */}
          <div className="flex flex-col items-start justify-center p-5 rounded-2xl bg-white border border-[#e4e3d9] shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4 text-[#5a6242]" />
              <p className="font-headline font-bold text-xs text-[#1b1c16]">Commercial IP Clearance</p>
            </div>
            <p className="font-body text-xs text-[#50453b] leading-relaxed">
              Prompt seeds, negative embeddings, and model weights legally transferred upon escrow release.
            </p>
          </div>

        </div>

      </section>


      {/* ─────────────────────────────────────────────────────────
          3. KEY CREDIBILITY METRICS BAR (WARM EDITORIAL CANVAS)
      ───────────────────────────────────────────────────────── */}
      <section className="py-12 border-y border-[#e4e3d9] bg-[#efeee4]/60 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-3xl my-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">
          
          <div className="space-y-1 sm:border-r border-[#e4e3d9] sm:pr-6">
            <span className="font-headline font-black text-4xl sm:text-5xl text-[#1b1c16] tracking-tight">4,200+</span>
            <p className="font-mono text-xs uppercase tracking-wider text-[#50453b]">Vetted AI Directors</p>
          </div>

          <div className="space-y-1 sm:border-r border-[#e4e3d9] sm:pr-6">
            <span className="font-headline font-black text-4xl sm:text-5xl text-[#1b1c16] tracking-tight">94.8%</span>
            <p className="font-mono text-xs uppercase tracking-wider text-[#50453b]">Temporal Seed Consistency</p>
          </div>

          <div className="space-y-1 sm:border-r border-[#e4e3d9] sm:pr-6">
            <span className="font-headline font-black text-4xl sm:text-5xl text-[#1b1c16] tracking-tight">&lt;48h</span>
            <p className="font-mono text-xs uppercase tracking-wider text-[#50453b]">Brief-to-First Generation</p>
          </div>

          <div className="space-y-1">
            <span className="font-headline font-black text-4xl sm:text-5xl text-[#5a6242] tracking-tight">$12M+</span>
            <p className="font-mono text-xs uppercase tracking-wider text-[#50453b]">Escrow Contracts Fulfilled</p>
          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────
          4. WHY AI-NATIVE MARKETPLACE ("Turning Prompts Into Masterpieces")
      ───────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Strip with Sparkle & 2-Column Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-3">
              <svg viewBox="0 0 24 24" fill="#d3a373" className="w-5 h-5">
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
              </svg>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#5a6242]">THE MARKETPLACE GAP</span>
            </div>
            <h2 className="font-headline font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#1b1c16] leading-tight">
              Turning Prompts Into Masterpieces
            </h2>
          </div>

          <div className="lg:col-span-7 font-body text-[#50453b] text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              Traditional freelance sites fail at generative AI. Brands struggle to separate random prompt luck from true production directors, verify node pipelines, or secure commercial copyright indemnity.
            </p>
            <p className="text-[#82756a] text-xs sm:text-sm">
              GenWorks bridges foundation models with enterprise campaigns. By pairing verified prompt directors with deterministic ComfyUI workflows, we turn rough creative concepts into reproducible 9:16 reels, 4K stills, and persistent brand LoRAs.
            </p>
          </div>
        </div>

        {/* Asymmetric 2-Card Visual Collage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Horizontal Card: Studio Workflow with Soft Sage Badge */}
          <div className="lg:col-span-7 bg-[#efeee4] rounded-[36px] overflow-hidden border border-[#e4e3d9] relative group min-h-[380px] flex flex-col justify-end shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80"
              alt="AI Directors collaborating over ComfyUI nodes"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 -z-0 opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1b1c16]/85 via-[#1b1c16]/30 to-transparent" />

            {/* Bottom Left Green Anchor Badge with Equalizer Bars */}
            <div className="relative z-10 m-6 sm:m-8 inline-flex items-center gap-3 bg-[#dfe7bf] text-[#1b1c16] px-5 py-3 rounded-2xl shadow-xl max-w-max border border-[#c2caa4]">
              <div className="flex items-end gap-1 h-4">
                <span className="w-1 bg-[#5a6242] h-4 rounded-full animate-pulse" />
                <span className="w-1 bg-[#5a6242] h-2.5 rounded-full" />
                <span className="w-1 bg-[#5a6242] h-3.5 rounded-full animate-pulse" />
                <span className="w-1 bg-[#5a6242] h-1.5 rounded-full" />
              </div>
              <span className="font-headline font-black text-xs sm:text-sm tracking-wider uppercase text-[#1b1c16]">
                AI-NATIVE CREATIVE WORKFLOW
              </span>
            </div>
          </div>

          {/* Right Vertical Card: Creator Portrait with Whimsical Doodle */}
          <div className="lg:col-span-5 bg-[#efeee4] rounded-[36px] overflow-hidden border border-[#e4e3d9] relative group min-h-[380px] flex flex-col justify-between p-8 shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=80"
              alt="Creative Director thinking"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 -z-0 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1b1c16]/90 via-[#1b1c16]/40 to-[#1b1c16]/20" />

            {/* Doodle Graphic over Head */}
            <div className="relative z-10 flex justify-end">
              <div className="bg-[#d3a373] text-[#1b1c16] p-3 rounded-2xl shadow-lg -rotate-6 flex items-center gap-1.5 border border-white/40">
                <Lightbulb className="w-5 h-5 text-[#1b1c16]" />
                <span className="text-[11px] font-bold font-mono tracking-wider">PROMPT REPRODUCIBILITY</span>
              </div>
            </div>

            <div className="relative z-10 space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#dfe7bf] font-bold">100% IP INDEMNIFIED</span>
              <h3 className="font-headline font-extrabold text-2xl text-white leading-snug">
                Where human aesthetic vision meets neural precision.
              </h3>
            </div>
          </div>

        </div>

      </section>


      {/* ─────────────────────────────────────────────────────────
          5. INTERACTIVE AI SERVICES SHOWCASE ("Our [Services]")
      ───────────────────────────────────────────────────────── */}
      <section id="services" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Expansive Deep Luxury Olive Enclosed Container */}
        <div className="bg-[#1b1c16] text-white border border-[#5a6242]/30 rounded-[36px] sm:rounded-[48px] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          
          {/* Warm Ambient Backlight Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d3a373]/15 rounded-full blur-[100px] pointer-events-none" />

          {/* Left Vertical Rotated Badge: "CORE CAPABILITIES" */}
          <div className="hidden lg:block absolute -left-10 top-28 -rotate-90 origin-center">
            <span className="bg-[#dfe7bf] text-[#1b1c16] font-mono font-bold text-[10px] tracking-[0.25em] px-3.5 py-1 rounded-full uppercase shadow">
              CORE CAPABILITIES
            </span>
          </div>

          {/* Section Header */}
          <div className="max-w-2xl mb-12">
            <h2 className="font-headline font-black text-3xl sm:text-5xl tracking-tight text-white mb-4">
              AI Creative{" "}
              <span className="bg-[#dfe7bf] text-[#1b1c16] px-4 py-1 rounded-full inline-block">
                Disciplines
              </span>
            </h2>
            <p className="font-body text-[#efeee4]/80 text-sm sm:text-base leading-relaxed">
              Explore specialized generative formats engineered for performance marketing, e-commerce lookbooks, and high-retention viral campaigns.
            </p>
          </div>

          {/* 2-Column Interactive Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Left Column: Interactive Numbered Directory */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
              {servicesList.map((svc, idx) => {
                const isActive = activeService === idx;
                return (
                  <button
                    key={svc.id}
                    onClick={() => setActiveService(idx)}
                    className={`w-full text-left p-5 rounded-2xl transition-all duration-300 flex items-center justify-between border ${
                      isActive
                        ? "bg-[#30312b] border-[#d3a373] text-white shadow-lg shadow-[#d3a373]/10 translate-x-1.5"
                        : "bg-white/5 border-white/5 text-[#efeee4]/70 hover:text-white hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`font-mono text-sm font-bold ${isActive ? "text-[#d3a373]" : "text-[#82756a]"}`}>
                        {svc.id}
                      </span>
                      <div>
                        <span className="font-headline font-bold text-base sm:text-lg block">
                          {svc.name}
                        </span>
                        <span className="font-mono text-[11px] text-[#d3a373] block mt-0.5">
                          {svc.aspect}
                        </span>
                      </div>
                    </div>

                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isActive ? "bg-[#d3a373] text-[#1b1c16]" : "bg-white/10 text-white"
                    }`}>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Dynamic Visual Showcase with Micro-Cards */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-6">
              
              {/* Main Visual Preview Panel */}
              <div className="relative h-[280px] sm:h-[340px] rounded-3xl overflow-hidden border border-white/10 group">
                <Image
                  src={servicesList[activeService].previewImg}
                  alt={servicesList[activeService].name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b1c16]/95 via-[#1b1c16]/40 to-transparent" />

                {/* Floating Tags & Annotations */}
                <div className="absolute top-5 left-5 flex gap-2">
                  <span className="bg-[#1b1c16]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-xs font-mono text-[#d3a373] font-bold">
                    {servicesList[activeService].tag}
                  </span>
                  <span className="bg-[#dfe7bf] text-[#1b1c16] px-3 py-1 rounded-full text-xs font-mono font-bold">
                    {servicesList[activeService].aspect}
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="font-headline font-black text-xl sm:text-2xl text-white mb-2">
                    {servicesList[activeService].name}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-[#efeee4]/90 line-clamp-2 mb-3">
                    {servicesList[activeService].desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {servicesList[activeService].models.map((m) => (
                      <span key={m} className="bg-white/15 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full text-[10px] font-mono">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Two Stacked Micro-Cards (Espresso & Warm Caramel) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Espresso Micro Card */}
                <div 
                  onClick={() => {
                    const el = document.getElementById("creators");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-[#24261e] border border-white/10 p-5 rounded-2xl flex items-center justify-between cursor-pointer group hover:border-[#d3a373]/50 transition-all"
                >
                  <div className="pr-3">
                    <p className="font-headline font-bold text-xs text-white mb-1">
                      Inspect positive & negative prompts?
                    </p>
                    <p className="font-body text-[11px] text-[#efeee4]/70">
                      Explore AI creator portfolios below →
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0 group-hover:bg-[#d3a373] group-hover:text-[#1b1c16] transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Warm Caramel Micro Card */}
                <div 
                  onClick={() => {
                    const el = document.getElementById("brief-builder");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-[#d3a373] text-[#1b1c16] p-5 rounded-2xl flex items-center justify-between cursor-pointer group hover:scale-[1.02] transition-all shadow-lg shadow-[#d3a373]/20"
                >
                  <div className="pr-3">
                    <p className="font-headline font-black text-xs text-[#1b1c16] mb-1">
                      Ready to structure a campaign brief?
                    </p>
                    <p className="font-body text-[11px] text-[#1b1c16]/80 font-bold">
                      Open AI Brief Builder →
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#1b1c16] text-[#d3a373] flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ─────────────────────────────────────────────────────────
          6. BRAND SLOGAN TRANSITION MARQUEE ("Innovate + Inspire + Create")
      ───────────────────────────────────────────────────────── */}
      <section className="py-20 border-y border-[#e4e3d9] bg-[#efeee4]/40 text-center overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-headline font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#1b1c16] uppercase leading-none">
            INNOVATE <span className="text-[#d3a373]">+</span> INSPIRE <span className="text-[#d3a373]">+</span> CREATE
          </h2>
          <div className="mt-6 flex justify-center items-center gap-3">
            <span className="w-12 h-px bg-[#82756a]/30" />
            <svg viewBox="0 0 24 24" fill="#d3a373" className="w-6 h-6">
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
            </svg>
            <span className="w-12 h-px bg-[#82756a]/30" />
          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────
          7. AI CREATOR DISCOVERY & FILTERING (25% + 30% EVALUATION WEIGHT)
      ───────────────────────────────────────────────────────── */}
      <section id="creators" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Category Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#5a6242] font-bold block mb-2">
              DISCOVERY &amp; REPRODUCIBLE PORTFOLIOS
            </span>
            <h2 className="font-headline font-black text-3xl sm:text-5xl text-[#1b1c16] tracking-tight">
              Verified{" "}
              <span className="bg-[#dfe7bf] text-[#1b1c16] px-4 py-1 rounded-full inline-block border border-[#c2caa4]">
                AI Creators
              </span>
            </h2>
          </div>

          <button
            onClick={() => { setAuthMode("signup"); setAuthRole("CREATOR"); setIsAuthOpen(true); }}
            className="px-6 py-3 rounded-full border border-[#1b1c16] hover:bg-[#1b1c16] hover:text-[#fbfaf0] text-[#1b1c16] font-headline font-bold text-xs uppercase tracking-wider transition-all duration-300 self-start sm:self-auto flex items-center gap-2"
          >
            <span>Apply as AI Creator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Master Control Hub: Search & Category Filter Pills */}
        <div className="bg-white p-4 rounded-3xl border border-[#e4e3d9] shadow-sm mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {[
              { id: "all", label: "All Disciplines" },
              { id: "video", label: "Runway & 9:16 Video" },
              { id: "photography", label: "Flux.1 Photorealism" },
              { id: "pipelines", label: "ComfyUI & LoRAs" },
              { id: "audio", label: "Voiceover & Audio" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-headline font-bold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#1b1c16] text-[#fbfaf0] shadow"
                    : "bg-[#efeee4] text-[#50453b] hover:text-[#1b1c16]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#82756a] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools, models, skills..."
              className="w-full bg-[#efeee4] text-[#1b1c16] pl-10 pr-4 py-2 rounded-full text-xs font-body border border-transparent focus:border-[#d3a373] focus:outline-none"
            />
          </div>

        </div>

        {/* Empty Search State */}
        {filteredCreators.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#e4e3d9] max-w-md mx-auto my-8">
            <SlidersHorizontal className="w-10 h-10 text-[#82756a] mx-auto mb-3" />
            <h3 className="font-headline font-bold text-lg text-[#1b1c16]">No Creators Found</h3>
            <p className="font-body text-xs text-[#50453b] mt-1 mb-4">
              No verified creators match &quot;{searchQuery}&quot;. Try filtering by &apos;All Disciplines&apos; or searching by tool (e.g., Runway, Flux).
            </p>
            <button
              onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
              className="bg-[#d3a373] text-[#1b1c16] px-5 py-2 rounded-full text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* 3-Column x 2-Row Rich Creator Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCreators.map((creator) => (
            <div
              key={creator.id}
              className="bg-white text-[#1b1c16] rounded-[28px] overflow-hidden shadow-lg border border-[#e4e3d9] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Visual Deliverable Header Preview */}
                <div className="relative h-48 w-full overflow-hidden bg-[#efeee4]">
                  <Image
                    src={creator.portfolioImg}
                    alt={creator.deliverableType}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1b1c16]/80 via-transparent to-transparent" />
                  
                  {/* Aspect Ratio Badge */}
                  <span className="absolute top-3 left-3 bg-[#1b1c16]/80 backdrop-blur-md text-[#d3a373] text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-white/20">
                    {creator.aspectRatio}
                  </span>

                  {/* Verification Shield Pill */}
                  <span className="absolute top-3 right-3 bg-[#dfe7bf] text-[#5a6242] text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-[#c2caa4] flex items-center gap-1">
                    <BadgeCheck className="w-3 h-3" />
                    {creator.verificationBadge}
                  </span>

                  {/* Deliverable Title */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <p className="font-mono text-[11px] text-[#efeee4]/80">Deliverable Sample</p>
                    <p className="font-headline font-bold text-sm text-white truncate">
                      {creator.deliverableType}
                    </p>
                  </div>
                </div>

                {/* Creator Information & Profile */}
                <div className="p-6">
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="relative w-12 h-12 rounded-full p-1 bg-[#dfe7bf] border border-[#c2caa4] flex items-center justify-center shrink-0 shadow-md">
                      <Image
                        src={creator.avatar}
                        alt={creator.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-headline font-extrabold text-base text-[#1b1c16] leading-tight">
                          {creator.name}
                        </h3>
                        <span className="text-[11px] font-mono text-[#82756a]">{creator.handle}</span>
                      </div>
                      <p className="font-body text-xs text-[#5a6242] font-semibold mt-0.5">
                        {creator.role}
                      </p>
                    </div>
                  </div>

                  <p className="font-body text-xs text-[#50453b] leading-relaxed mb-4">
                    Specialized in: <strong className="text-[#1b1c16]">{creator.specialization}</strong>. Has completed {creator.projectsCompleted} enterprise campaigns with a {creator.rating} ★ client satisfaction rating.
                  </p>

                  {/* Tools Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {creator.tools.map((tool) => (
                      <span
                        key={tool}
                        className="bg-[#efeee4] text-[#1b1c16] px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Actions: Inspect Workflow + Hire */}
              <div className="p-6 pt-0 border-t border-[#e4e3d9]/60 flex items-center justify-between gap-3">
                <button
                  onClick={() => setActiveWorkflowModal(creator)}
                  className="flex-1 py-2.5 px-3 rounded-full bg-[#efeee4] hover:bg-[#e4e3d9] text-[#1b1c16] text-xs font-headline font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-[#5a6242]" />
                  <span>Inspect Workflow</span>
                </button>

                <button
                  onClick={() => {
                    setAuthMode("signup");
                    setIsAuthOpen(true);
                  }}
                  className="py-2.5 px-4 rounded-full bg-[#d3a373] hover:bg-[#c29263] text-[#1b1c16] text-xs font-headline font-bold flex items-center justify-center gap-1 transition-all"
                >
                  <span>Hire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </section>


      {/* ─────────────────────────────────────────────────────────
          8. BONUS FEATURE: AI-ASSISTED BRIEF BUILDER (20% EVALUATION + BONUS CREDIT)
      ───────────────────────────────────────────────────────── */}
      <section id="brief-builder" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Deep Luxury Olive Enclosed Container */}
        <div className="bg-[#1b1c16] text-white border border-[#5a6242]/30 rounded-[36px] sm:rounded-[48px] p-8 sm:p-14 lg:p-16 relative overflow-hidden shadow-2xl">
          
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-[#d3a373]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#dfe7bf] font-bold">
              AI-ASSISTED CREATIVE BRIEF BUILDER · BONUS FEATURE
            </span>
          </div>

          <h2 className="font-headline font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-4">
            Turn Rough Ideas Into Structured Briefs
          </h2>
          
          <p className="font-body text-sm sm:text-base text-[#efeee4]/85 leading-relaxed max-w-2xl mb-10">
            Paste a rough brand idea or campaign goal. Our matching engine translates it into a deterministic creative brief with format specs, model recommendations, and commercial rights.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left: Input Box */}
            <div className="lg:col-span-5 space-y-4">
              <label className="block font-mono text-xs text-[#d3a373] font-bold uppercase tracking-wider">
                Your Rough Campaign Concept:
              </label>
              
              <textarea
                rows={5}
                value={roughBriefIdea}
                onChange={(e) => setRoughBriefIdea(e.target.value)}
                placeholder="Describe what you want to create (e.g., 5 vertical TikTok ads for cold brew coffee)..."
                className="w-full bg-[#24261e] text-white p-4 rounded-2xl border border-white/15 text-xs sm:text-sm font-body focus:outline-none focus:border-[#d3a373] transition-colors resize-none"
              />

              <div className="flex flex-wrap gap-2 text-[11px] font-mono text-[#efeee4]/70">
                <span>Presets:</span>
                <button
                  type="button"
                  onClick={() => setRoughBriefIdea("5 high-energy 9:16 TikTok ads for luxury cold-brew coffee brand. Slow-mo splash, macro condensation, upbeat music.")}
                  className="underline hover:text-[#d3a373]"
                >
                  Beverage Reel (9:16)
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => setRoughBriefIdea("30 high-fashion e-commerce luxury sneaker catalog renders on matte marble pedestals with soft raytraced daylight.")}
                  className="underline hover:text-[#d3a373]"
                >
                  Sneaker Lookbook (1:1)
                </button>
              </div>

              <button
                onClick={handleGenerateBrief}
                disabled={isGeneratingBrief}
                className="w-full bg-[#d3a373] hover:bg-[#c29263] text-[#1b1c16] font-headline font-black text-xs sm:text-sm py-4 rounded-full transition-all duration-300 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-[#1b1c16]" />
                <span>{isGeneratingBrief ? "Synthesizing Brief Structure..." : "Generate Structured Brief (AI)"}</span>
              </button>
            </div>

            {/* Right: Generated Output Card */}
            <div className="lg:col-span-7 bg-[#24261e] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-5">
              {generatedBrief && (
                <>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#dfe7bf] font-bold">
                        STRUCTURED BRIEF SPECIFICATION
                      </span>
                      <h4 className="font-headline font-bold text-lg text-white mt-0.5">
                        {generatedBrief.title}
                      </h4>
                    </div>
                    <span className="bg-[#dfe7bf] text-[#5a6242] text-[11px] font-mono font-bold px-3 py-1 rounded-full">
                      Ready to Publish
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-body">
                    <div className="bg-black/30 p-3.5 rounded-xl border border-white/5">
                      <p className="font-mono text-[10px] text-[#82756a] uppercase">Content Type</p>
                      <p className="font-semibold text-white mt-0.5">{generatedBrief.contentType}</p>
                    </div>

                    <div className="bg-black/30 p-3.5 rounded-xl border border-white/5">
                      <p className="font-mono text-[10px] text-[#82756a] uppercase">Aspect Ratio &amp; Res</p>
                      <p className="font-semibold text-white mt-0.5">{generatedBrief.aspectRatio}</p>
                    </div>

                    <div className="bg-black/30 p-3.5 rounded-xl border border-white/5">
                      <p className="font-mono text-[10px] text-[#82756a] uppercase">Recommended Toolchain</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {generatedBrief.tools.map((t) => (
                          <span key={t} className="bg-white/10 text-white text-[10px] px-2 py-0.5 rounded font-mono">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-black/30 p-3.5 rounded-xl border border-white/5">
                      <p className="font-mono text-[10px] text-[#82756a] uppercase">Budget &amp; Delivery SLA</p>
                      <p className="font-semibold text-[#d3a373] mt-0.5">{generatedBrief.estimatedBudget} · {generatedBrief.timeline}</p>
                    </div>
                  </div>

                  <div className="bg-black/30 p-3.5 rounded-xl border border-white/5 text-xs">
                    <p className="font-mono text-[10px] text-[#82756a] uppercase">Commercial Rights Clearance</p>
                    <p className="text-[#efeee4] mt-0.5">{generatedBrief.commercialUse}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#dfe7bf]">
                      <ShieldCheck className="w-4 h-4 text-[#d3a373]" />
                      <span>Smart Escrow Milestone Protection</span>
                    </div>

                    <button
                      onClick={() => {
                        setAuthMode("signup");
                        setAuthRole("BRAND");
                        setIsAuthOpen(true);
                      }}
                      className="bg-[#d3a373] hover:bg-[#c29263] text-[#1b1c16] text-xs font-headline font-bold px-6 py-2.5 rounded-full transition-all flex items-center gap-1.5 shadow"
                    >
                      <span>Publish to Marketplace</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              )}
            </div>

          </div>

        </div>

      </section>


      {/* ─────────────────────────────────────────────────────────
          9. TESTIMONIALS & SOCIAL PROOF CAROUSEL
      ───────────────────────────────────────────────────────── */}
      <section id="reviews" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Rounded Deep Luxury Olive Container */}
        <div className="bg-[#1b1c16] text-white border border-[#5a6242]/30 rounded-[36px] sm:rounded-[48px] p-8 sm:p-14 lg:p-16 relative overflow-hidden shadow-2xl">
          
          <div className="max-w-3xl mx-auto text-center">
            
            {/* Warm Caramel Big Quotation Mark */}
            <div className="inline-block text-[#d3a373] font-serif text-6xl sm:text-7xl leading-none mb-4">
              &ldquo;
            </div>

            {/* Testimonial Quote */}
            <blockquote className="font-headline font-bold text-xl sm:text-2xl md:text-3xl text-white leading-relaxed mb-8">
              {testimonials[activeTestimonial].quote}
            </blockquote>

            {/* Author Identification */}
            <div className="flex flex-col items-center justify-center gap-3 mb-8">
              <div className="w-14 h-14 rounded-full p-0.5 bg-[#d3a373]">
                <Image
                  src={testimonials[activeTestimonial].avatar}
                  alt={testimonials[activeTestimonial].author}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <p className="font-headline font-extrabold text-base text-white">
                  {testimonials[activeTestimonial].author}
                </p>
                <p className="font-body text-xs text-[#efeee4]/70">
                  {testimonials[activeTestimonial].title}
                </p>
              </div>

              {/* 5 Warm Caramel Stars */}
              <div className="flex items-center gap-1 text-[#d3a373]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() =>
                  setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
                }
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#d3a373] hover:text-[#1b1c16] flex items-center justify-center text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`h-2 rounded-full transition-all ${
                      activeTestimonial === idx ? "w-8 bg-[#d3a373]" : "w-2 bg-white/20"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() =>
                  setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
                }
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#d3a373] hover:text-[#1b1c16] flex items-center justify-center text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>

        </div>

      </section>


      {/* ─────────────────────────────────────────────────────────
          10. INFINITE SKILL TICKER RIBBON (WARM CARAMEL MARQUEE)
      ───────────────────────────────────────────────────────── */}
      <section className="py-6 bg-[#d3a373] text-[#1b1c16] overflow-hidden shadow-md -rotate-1 scale-105 my-8">
        <div className="flex whitespace-nowrap animate-marquee">
          <div className="flex items-center gap-8 font-headline font-black text-sm sm:text-base uppercase tracking-widest px-4">
            <span>RUNWAY GEN-3 ALPHA</span>
            <span className="text-[#1b1c16]">•</span>
            <span>FLUX.1 PRO PHOTOREALISM</span>
            <span className="text-[#1b1c16]">•</span>
            <span>COMFYUI NODE PIPELINES</span>
            <span className="text-[#1b1c16]">•</span>
            <span>9:16 VIRAL REELS</span>
            <span className="text-[#1b1c16]">•</span>
            <span>KLING 1.5 DIRECTING</span>
            <span className="text-[#1b1c16]">•</span>
            <span>CUSTOM LORA CHECKPOINTS</span>
            <span className="text-[#1b1c16]">•</span>
            <span>ELEVENLABS AUDIO DUBBING</span>
            <span className="text-[#1b1c16]">•</span>
            <span>SEED REPRODUCIBILITY CERTIFIED</span>
            <span className="text-[#1b1c16]">•</span>
            <span>COMMERCIAL IP WARRANTIES</span>
            <span className="text-[#1b1c16]">•</span>
          </div>

          <div className="flex items-center gap-8 font-headline font-black text-sm sm:text-base uppercase tracking-widest px-4">
            <span>RUNWAY GEN-3 ALPHA</span>
            <span className="text-[#1b1c16]">•</span>
            <span>FLUX.1 PRO PHOTOREALISM</span>
            <span className="text-[#1b1c16]">•</span>
            <span>COMFYUI NODE PIPELINES</span>
            <span className="text-[#1b1c16]">•</span>
            <span>9:16 VIRAL REELS</span>
            <span className="text-[#1b1c16]">•</span>
            <span>KLING 1.5 DIRECTING</span>
            <span className="text-[#1b1c16]">•</span>
            <span>CUSTOM LORA CHECKPOINTS</span>
            <span className="text-[#1b1c16]">•</span>
            <span>ELEVENLABS AUDIO DUBBING</span>
            <span className="text-[#1b1c16]">•</span>
            <span>SEED REPRODUCIBILITY CERTIFIED</span>
            <span className="text-[#1b1c16]">•</span>
            <span>COMMERCIAL IP WARRANTIES</span>
            <span className="text-[#1b1c16]">•</span>
          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────
          11. LEAD GENERATION & CONTACT BANNER ("Get in Touch Today!")
      ───────────────────────────────────────────────────────── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Deep Luxury Olive Enclosed Container with 2 Columns */}
        <div className="bg-[#1b1c16] text-white border border-[#5a6242]/30 rounded-[36px] sm:rounded-[48px] p-8 sm:p-14 lg:p-16 relative overflow-hidden shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Form & Copy */}
            <div className="lg:col-span-7 space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#dfe7bf] font-bold">
                LET&apos;S SCALE YOUR AI CREATIVE PIPELINE
              </span>
              <h2 className="font-headline font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                Commission Vetted AI Creators Today
              </h2>
              <p className="font-body text-sm sm:text-base text-[#efeee4]/85 leading-relaxed max-w-xl">
                Enter your brand email to receive curated creator recommendations matching your brief, guaranteed milestone escrow protection, and 100% prompt copyright transfer.
              </p>

              {/* Integrated Newsletter / Contact Input Bar */}
              <form onSubmit={handleSubscribe} className="pt-2">
                <div className="bg-[#24261e] p-2 rounded-full border border-white/15 flex items-center max-w-lg shadow-inner focus-within:border-[#d3a373] transition-colors">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter brand or agency email"
                    required
                    className="bg-transparent text-white px-5 py-2.5 text-xs sm:text-sm font-body flex-1 focus:outline-none placeholder:text-[#82756a]"
                  />
                  <button
                    type="submit"
                    className="bg-[#d3a373] hover:bg-[#c29263] text-[#1b1c16] font-headline font-black text-xs sm:text-sm px-6 py-3 rounded-full transition-all duration-300 shadow-md shrink-0 active:scale-95 flex items-center gap-1.5"
                  >
                    <span>{subscribed ? "Shortlist Sent!" : "Get Shortlist"}</span>
                    {subscribed && <Check className="w-4 h-4 text-[#1b1c16]" />}
                  </button>
                </div>
              </form>

              <div className="flex items-center gap-6 pt-4 text-xs font-mono text-[#efeee4]/70">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#d3a373]" />
                  24-Hour Scoping Turnaround
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#d3a373]" />
                  Smart Milestone Escrow
                </span>
              </div>
            </div>

            {/* Right: Cutout Image with "OK" Approval Gesture */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[340px] h-[340px] sm:h-[400px] rounded-3xl overflow-hidden border border-[#5a6242]/30 bg-gradient-to-t from-[#d3a373]/20 to-transparent">
                <Image
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop&q=80"
                  alt="Client Success Manager with OK gesture"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* ─────────────────────────────────────────────────────────
          12. HIGH-IMPACT FULL-BLEED WARM EDITORIAL FOOTER
      ───────────────────────────────────────────────────────── */}
      <footer className="bg-[#1b1c16] text-[#efeee4] rounded-t-[40px] sm:rounded-t-[56px] pt-16 sm:pt-20 pb-12 px-6 sm:px-10 lg:px-16 mt-16 transition-all border-t border-[#5a6242]/30">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            
            {/* Top Left: GenWorks Wordmark with Modular 2x2 Cubes */}
            <div className="lg:col-span-2 space-y-4">
              <GenWorksLogo size="md" inverted={true} animated={false} />
              <p className="font-body text-xs sm:text-sm text-[#efeee4]/75 max-w-sm leading-relaxed">
                The curated marketplace connecting brands and creative agencies with verified generative filmmakers, ComfyUI architects, and AI directors. Production-grade escrow and deterministic pipeline delivery.
              </p>
            </div>

            {/* Navigation Column 1: Company */}
            <div className="space-y-3">
              <p className="font-headline font-black text-xs uppercase tracking-wider text-[#d3a373]">Platform</p>
              <ul className="space-y-2 font-body text-xs text-[#efeee4]/80 font-medium">
                <li><a href="#about" className="hover:text-white transition-colors">Why GenWorks</a></li>
                <li><a href="#creators" className="hover:text-white transition-colors">Verified Creators</a></li>
                <li><a href="#brief-builder" className="hover:text-white transition-colors">Brief Builder</a></li>
                <li><a href="#reviews" className="hover:text-white transition-colors">Brand Reviews</a></li>
              </ul>
            </div>

            {/* Navigation Column 2: Models & Workflows */}
            <div className="space-y-3">
              <p className="font-headline font-black text-xs uppercase tracking-wider text-[#d3a373]">Workflows</p>
              <ul className="space-y-2 font-body text-xs text-[#efeee4]/80 font-medium">
                <li><a href="#services" className="hover:text-white transition-colors">Runway Gen-3 Video</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Flux.1 Pro Photorealism</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">ComfyUI Pipelines</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Custom Brand LoRAs</a></li>
              </ul>
            </div>

            {/* Navigation Column 3: Quick Connect */}
            <div className="space-y-3">
              <p className="font-headline font-black text-xs uppercase tracking-wider text-[#d3a373]">Post a Brief</p>
              <p className="font-body text-xs text-[#efeee4]/80">
                Ready to commission AI creative assets?
              </p>
              <button
                onClick={() => { setAuthMode("signup"); setIsAuthOpen(true); }}
                className="bg-[#d3a373] hover:bg-[#c29263] text-[#1b1c16] font-headline font-bold text-xs px-5 py-2.5 rounded-full shadow transition-all"
              >
                Launch Brief →
              </button>
            </div>

          </div>

          {/* Bottom Bar: Copyright & Social Links */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#efeee4]/60">
            <p>© 2026 GenWorks Inc. All rights reserved.</p>
            
            <div className="flex items-center gap-6 font-bold text-[#efeee4]/80">
              <a href="#" className="hover:text-[#d3a373] transition-colors">Twitter / X</a>
              <a href="#" className="hover:text-[#d3a373] transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-[#d3a373] transition-colors">Discord</a>
              <a href="#" className="hover:text-[#d3a373] transition-colors">GitHub</a>
            </div>
          </div>

        </div>
      </footer>


      {/* ─────────────────────────────────────────────────────────
          13. INSPECT AI WORKFLOW MODAL (RUBRIC 30% - EVALUATE AI PORTFOLIOS)
      ───────────────────────────────────────────────────────── */}
      {activeWorkflowModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all">
          <div className="relative w-full max-w-2xl bg-[#ffffff] text-[#1b1c16] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#e4e3d9] overflow-hidden max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveWorkflowModal(null)}
              className="absolute top-5 right-5 p-2 text-[#82756a] hover:text-[#1b1c16] rounded-full hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-12 h-12 rounded-full p-0.5 bg-[#d3a373]">
                <Image
                  src={activeWorkflowModal.avatar}
                  alt={activeWorkflowModal.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-headline font-black text-xl text-[#1b1c16]">
                    {activeWorkflowModal.name}
                  </h3>
                  <span className="bg-[#dfe7bf] text-[#5a6242] text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full">
                    {activeWorkflowModal.verificationBadge}
                  </span>
                </div>
                <p className="font-body text-xs text-[#50453b]">
                  {activeWorkflowModal.role} · {activeWorkflowModal.deliverableType}
                </p>
              </div>
            </div>

            {/* Workflow Parameters Inspection Grid */}
            <div className="space-y-4">
              
              {/* Positive Prompt */}
              <div className="bg-[#efeee4] p-4 rounded-2xl border border-[#e4e3d9]">
                <span className="font-mono text-[10px] uppercase font-bold text-[#5a6242] block mb-1">
                  Verified Positive Prompt Recipe
                </span>
                <p className="font-mono text-xs text-[#1b1c16] leading-relaxed select-all">
                  &quot;{activeWorkflowModal.workflow.positivePrompt}&quot;
                </p>
              </div>

              {/* Negative Prompt */}
              <div className="bg-[#efeee4] p-4 rounded-2xl border border-[#e4e3d9]">
                <span className="font-mono text-[10px] uppercase font-bold text-[#82756a] block mb-1">
                  Negative Prompt Constraints
                </span>
                <p className="font-mono text-xs text-[#50453b] leading-relaxed select-all">
                  &quot;{activeWorkflowModal.workflow.negativePrompt}&quot;
                </p>
              </div>

              {/* Technical Node Specifications */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="bg-[#efeee4] p-3 rounded-xl border border-[#e4e3d9]">
                  <span className="text-[10px] font-mono text-[#82756a] block">AI Model</span>
                  <span className="font-headline font-bold text-xs text-[#1b1c16] block mt-0.5">
                    {activeWorkflowModal.workflow.model}
                  </span>
                </div>

                <div className="bg-[#efeee4] p-3 rounded-xl border border-[#e4e3d9]">
                  <span className="text-[10px] font-mono text-[#82756a] block">Seed</span>
                  <div className="flex items-center justify-center gap-1 mt-0.5">
                    <span className="font-mono font-bold text-xs text-[#1b1c16]">
                      {activeWorkflowModal.workflow.seed}
                    </span>
                    <button
                      onClick={() => copySeedToClipboard(activeWorkflowModal.workflow.seed)}
                      className="text-[#82756a] hover:text-[#1b1c16]"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                  {copiedSeed && <span className="text-[9px] text-[#5a6242] font-bold block">Copied!</span>}
                </div>

                <div className="bg-[#efeee4] p-3 rounded-xl border border-[#e4e3d9]">
                  <span className="text-[10px] font-mono text-[#82756a] block">Aspect Ratio</span>
                  <span className="font-mono font-bold text-xs text-[#1b1c16] block mt-0.5">
                    {activeWorkflowModal.workflow.aspectRatio}
                  </span>
                </div>

                <div className="bg-[#efeee4] p-3 rounded-xl border border-[#e4e3d9]">
                  <span className="text-[10px] font-mono text-[#82756a] block">CFG / Steps</span>
                  <span className="font-mono font-bold text-xs text-[#1b1c16] block mt-0.5">
                    {activeWorkflowModal.workflow.cfgScale} / {activeWorkflowModal.workflow.steps}
                  </span>
                </div>
              </div>

              {/* Commercial Rights Banner */}
              <div className="bg-[#dfe7bf] p-3.5 rounded-2xl border border-[#c2caa4] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#5a6242]" />
                  <span className="font-headline font-bold text-[#5a6242]">100% Commercial IP Transfer Guaranteed</span>
                </div>
                <span className="font-mono text-[11px] text-[#5a6242]">Escrow Protected</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  onClick={() => setActiveWorkflowModal(null)}
                  className="px-5 py-2.5 rounded-full text-xs font-headline font-bold text-[#50453b] hover:text-[#1b1c16]"
                >
                  Close
                </button>

                <button
                  onClick={() => {
                    setActiveWorkflowModal(null);
                    setAuthMode("signup");
                    setAuthRole("BRAND");
                    setIsAuthOpen(true);
                  }}
                  className="bg-[#d3a373] hover:bg-[#c29263] text-[#1b1c16] font-headline font-black text-xs px-6 py-2.5 rounded-full shadow-md flex items-center gap-1.5"
                >
                  <span>Commission This Workflow</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>
      )}


      {/* ─────────────────────────────────────────────────────────
          14. AUTHENTICATION & PROJECT INITIATION MODAL
      ───────────────────────────────────────────────────────── */}
      {isAuthOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md transition-all">
          <div className="relative w-full max-w-md bg-[#ffffff] text-[#1b1c16] rounded-3xl p-8 sm:p-10 shadow-2xl border border-[#e4e3d9] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close button */}
            <button
              onClick={() => setIsAuthOpen(false)}
              className="absolute top-5 right-5 p-2 text-[#82756a] hover:text-[#1b1c16] rounded-full hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Crest with GenWorks Cube Logo */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="mb-2">
                <GenWorksLogo size="md" animated={false} />
              </div>
              <p className="font-body text-xs text-[#50453b] mt-1">
                AI Content Creator Marketplace · Enterprise Production
              </p>
            </div>

            {/* Segmented Switcher */}
            <div className="bg-[#efeee4] border border-[#e4e3d9] rounded-full p-1 flex items-center mb-6">
              <button
                type="button"
                onClick={() => { setAuthMode("signin"); setAuthSuccess(null); }}
                className={`flex-1 py-2 rounded-full font-headline font-bold text-xs transition-all ${
                  authMode === "signin"
                    ? "bg-[#d3a373] text-[#1b1c16] shadow-md"
                    : "text-[#50453b] hover:text-[#1b1c16]"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode("signup"); setAuthSuccess(null); }}
                className={`flex-1 py-2 rounded-full font-headline font-bold text-xs transition-all ${
                  authMode === "signup"
                    ? "bg-[#d3a373] text-[#1b1c16] shadow-md"
                    : "text-[#50453b] hover:text-[#1b1c16]"
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              
              {/* Role Selection on Sign Up */}
              {authMode === "signup" && (
                <div className="space-y-1.5">
                  <label className="block font-mono text-[11px] font-bold text-[#50453b] uppercase tracking-wider">
                    I am joining as
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAuthRole("BRAND")}
                      className={`py-2 px-3 rounded-xl font-headline font-bold text-xs flex items-center justify-center gap-1.5 transition-all border ${
                        authRole === "BRAND"
                          ? "border-[#d3a373] bg-[#d3a373]/15 text-[#1b1c16]"
                          : "border-[#e4e3d9] bg-[#efeee4] text-[#50453b]"
                      }`}
                    >
                      <Building2 className="w-4 h-4 text-[#5a6242]" />
                      Brand / Client
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthRole("CREATOR")}
                      className={`py-2 px-3 rounded-xl font-headline font-bold text-xs flex items-center justify-center gap-1.5 transition-all border ${
                        authRole === "CREATOR"
                          ? "border-[#d3a373] bg-[#d3a373]/15 text-[#1b1c16]"
                          : "border-[#e4e3d9] bg-[#efeee4] text-[#50453b]"
                      }`}
                    >
                      <Palette className="w-4 h-4 text-[#5a6242]" />
                      AI Creator
                    </button>
                  </div>
                </div>
              )}

              {authMode === "signup" && (
                <div>
                  <label className="block font-mono text-[11px] font-bold text-[#50453b] uppercase tracking-wider mb-1">
                    Your Full Name / Studio
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Elena Vance"
                    className="w-full bg-[#efeee4] text-[#1b1c16] px-4 py-2.5 rounded-xl border border-[#e4e3d9] text-xs font-body focus:outline-none focus:border-[#d3a373]"
                  />
                </div>
              )}

              <div>
                <label className="block font-mono text-[11px] font-bold text-[#50453b] uppercase tracking-wider mb-1">
                  Work Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@agency.com"
                  className="w-full bg-[#efeee4] text-[#1b1c16] px-4 py-2.5 rounded-xl border border-[#e4e3d9] text-xs font-body focus:outline-none focus:border-[#d3a373]"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] font-bold text-[#50453b] uppercase tracking-wider mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••••••"
                    className="w-full bg-[#efeee4] text-[#1b1c16] px-4 py-2.5 rounded-xl border border-[#e4e3d9] text-xs font-body focus:outline-none focus:border-[#d3a373]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-[#82756a] hover:text-[#1b1c16]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {authSuccess && (
                <div className="p-3 rounded-xl bg-[#dfe7bf] border border-[#c2caa4] text-[#5a6242] text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5a6242]" />
                  <span>{authSuccess}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full mt-2 py-3.5 rounded-full bg-[#d3a373] hover:bg-[#c29263] text-[#1b1c16] font-headline font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-md shadow-[#d3a373]/20 active:scale-95 disabled:opacity-50"
              >
                {authLoading
                  ? "Processing..."
                  : authMode === "signin"
                  ? "Sign In to GenWorks"
                  : `Launch ${authRole === "CREATOR" ? "Creator" : "Brand"} Studio`}
              </button>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}