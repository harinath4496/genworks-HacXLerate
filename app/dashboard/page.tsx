"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Home,
  Compass,
  Bookmark,
  Plus,
  Bell,
  MessageSquare,
  Settings,
  Search,
  Camera,
  Mic,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Heart,
  Share2,
  MoreHorizontal,
  Sliders,
  DollarSign,
  Clock,
  Play,
  Film,
  Layers,
  Cpu,
  User,
  LogOut,
  X,
  Send,
  Zap,
  Briefcase,
  FileCheck,
  ArrowRight,
  Filter,
} from "lucide-react";

// --- Types ---
interface PinItem {
  id: string;
  title: string;
  aspectRatio: "9:16" | "16:9" | "1:1";
  category: "viral" | "commercial" | "pipeline" | "human" | "cinematic";
  categoryLabel: string;
  previewImg: string;
  director: {
    name: string;
    handle: string;
    avatar: string;
    rating: number;
    completed: number;
    rate: string;
  };
  tools: string[];
  workflow: {
    model: string;
    seed: string;
    cfgScale: number;
    steps: number;
    sampler: string;
    positivePrompt: string;
  };
  likes: number;
  saved: boolean;
}

interface ClientBrief {
  id: string;
  title: string;
  category: string;
  budget: string;
  status: "Active Escrow" | "In Review" | "Delivered";
  assignedDirector: string;
  deliverable: string;
  deadline: string;
  escrowLocked: number;
}

// --- Initial Mock Pins Data (Diverse aspect ratios for authentic Masonry waterfall) ---
const INITIAL_PINS: PinItem[] = [
  {
    id: "pin-1",
    title: "9:16 Cinematic Perfume Ad — Ethereal Water Drops",
    aspectRatio: "9:16",
    category: "viral",
    categoryLabel: "9:16 Viral Ad",
    previewImg: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80",
    director: {
      name: "Elena Vance",
      handle: "@elena_cinema",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
      rating: 4.99,
      completed: 52,
      rate: "$95/hr",
    },
    tools: ["Runway Gen-3", "Kling 1.5", "Premiere"],
    workflow: {
      model: "Runway Gen-3 Alpha + Kling 1.5 Pro",
      seed: "8947219044",
      cfgScale: 7.5,
      steps: 50,
      sampler: "Euler a (Motion Vector 8.4)",
      positivePrompt: "Cinematic commercial 9:16, luxury perfume bottle floating in slow-motion water droplets, bioluminescent flora, anamorphic lens flare, 8k resolution, shot on Arri Alexa 35 --ar 9:16",
    },
    likes: 342,
    saved: true,
  },
  {
    id: "pin-2",
    title: "AnimateDiff Multi-Pass Architectural Orbit Pipeline",
    aspectRatio: "16:9",
    category: "pipeline",
    categoryLabel: "ComfyUI Pipeline",
    previewImg: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
    director: {
      name: "Kai Chen",
      handle: "@kaichen_nodes",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
      rating: 4.98,
      completed: 68,
      rate: "$120/hr",
    },
    tools: ["ComfyUI", "AnimateDiff", "Runway Gen-3"],
    workflow: {
      model: "ComfyUI + AnimateDiff v3 + Runway Gen-3",
      seed: "4490218821",
      cfgScale: 4.5,
      steps: 32,
      sampler: "dpmpp_2m_sde_gpu",
      positivePrompt: "Deterministic multi-pass AI video generation pipeline, cinematic anamorphic camera orbit around futuristic architecture, volumetric haze, temporal consistency with AnimateDiff motion LoRA",
    },
    likes: 512,
    saved: false,
  },
  {
    id: "pin-3",
    title: "AI Digital Human Spokesperson — Multilingual Lip Sync",
    aspectRatio: "9:16",
    category: "human",
    categoryLabel: "AI Human & Dubbing",
    previewImg: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=80",
    director: {
      name: "Zara Al-Mansoor",
      handle: "@zara_virtual",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
      rating: 4.96,
      completed: 39,
      rate: "$110/hr",
    },
    tools: ["LivePortrait", "SadTalker", "Runway Gen-3"],
    workflow: {
      model: "LivePortrait + Custom Persona LoRA + Runway Gen-3",
      seed: "1938502391",
      cfgScale: 6.5,
      steps: 35,
      sampler: "Euler Ancestral (Video Lip-Sync)",
      positivePrompt: "Consistent AI brand presenter video, speaking directly to camera with natural micro-expressions and eye contact, studio lighting, perfectly synchronized lip movements, 4k ultra-realistic portrait motion",
    },
    likes: 278,
    saved: true,
  },
  {
    id: "pin-4",
    title: "4K Commercial Product Ad — Artisanal Glass & Fluid Ripple",
    aspectRatio: "1:1",
    category: "commercial",
    categoryLabel: "Product Motion",
    previewImg: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    director: {
      name: "Marcus Sterling",
      handle: "@marcus_visuals",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
      rating: 4.97,
      completed: 58,
      rate: "$95/hr",
    },
    tools: ["Runway Gen-3", "Kling AI", "Luma Ray 2"],
    workflow: {
      model: "Runway Gen-3 Alpha + Kling 1.5 Pro",
      seed: "7320491823",
      cfgScale: 7.5,
      steps: 50,
      sampler: "Euler a (Motion Vector 9.2)",
      positivePrompt: "Cinematic 4K commercial product video, artisanal luxury perfume bottle floating in pristine slow-motion liquid ripples, dynamic volumetric studio lighting, macro anamorphic lens flare",
    },
    likes: 429,
    saved: false,
  },
  {
    id: "pin-5",
    title: "Cyberpunk High-Speed Coastal Chase — Sci-Fi Master Shot",
    aspectRatio: "16:9",
    category: "cinematic",
    categoryLabel: "Cinematic Trailer",
    previewImg: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80",
    director: {
      name: "Aria Thorne",
      handle: "@aria_cinematics",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
      rating: 4.95,
      completed: 44,
      rate: "$105/hr",
    },
    tools: ["Runway Gen-3", "Luma Dream Machine", "DaVinci"],
    workflow: {
      model: "Runway Gen-3 Alpha + Luma Ray 2",
      seed: "5591028301",
      cfgScale: 8.0,
      steps: 60,
      sampler: "Euler a (Speed 1.0x)",
      positivePrompt: "16:9 cinematic master shot, futuristic electric vehicle driving along coastal highway at dusk, golden hour rays hitting chrome body, realistic asphalt reflection, drone follow angle, film grain",
    },
    likes: 620,
    saved: true,
  },
  {
    id: "pin-6",
    title: "Zero-Latency Lip-Sync Multilingual Dubbing — 28 Languages",
    aspectRatio: "9:16",
    category: "human",
    categoryLabel: "AI Human & Dubbing",
    previewImg: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80",
    director: {
      name: "Liam O'Connor",
      handle: "@liam_voicecraft",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&auto=format&fit=crop&q=80",
      rating: 4.94,
      completed: 61,
      rate: "$85/hr",
    },
    tools: ["ElevenLabs", "LivePortrait", "Wav2Lip"],
    workflow: {
      model: "ElevenLabs Neural Voice + LivePortrait Lip-Sync",
      seed: "9018471203",
      cfgScale: 0.75,
      steps: 1,
      sampler: "Neural Vocoder + Video Warp",
      positivePrompt: "Master multilingual video dubbing pipeline, synchronized emotional speech across European and Asian language pairs, natural vocal acoustics matching original video environment",
    },
    likes: 189,
    saved: false,
  },
  {
    id: "pin-7",
    title: "Futuristic Sneaker Reveal — Particle Morphing & Motion Physics",
    aspectRatio: "1:1",
    category: "commercial",
    categoryLabel: "Product Motion",
    previewImg: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80",
    director: {
      name: "Elena Vance",
      handle: "@elena_cinema",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
      rating: 4.99,
      completed: 52,
      rate: "$95/hr",
    },
    tools: ["Runway Gen-3", "ComfyUI", "Blender"],
    workflow: {
      model: "Runway Gen-3 + Custom Footwear LoRA",
      seed: "6321901452",
      cfgScale: 7.0,
      steps: 45,
      sampler: "Euler a",
      positivePrompt: "Hyper-detailed 3D athletic sneaker deconstructing into glowing aerodynamic energy particles and reassembling in mid-air, studio dark backdrop, neon orange ambient backlight",
    },
    likes: 384,
    saved: true,
  },
  {
    id: "pin-8",
    title: "Dystopian Sand Dune Odyssey — Atmospheric Drone Pullback",
    aspectRatio: "16:9",
    category: "cinematic",
    categoryLabel: "Cinematic Trailer",
    previewImg: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80",
    director: {
      name: "Aria Thorne",
      handle: "@aria_cinematics",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
      rating: 4.95,
      completed: 44,
      rate: "$105/hr",
    },
    tools: ["Runway Gen-3", "Midjourney v6", "DaVinci"],
    workflow: {
      model: "Runway Gen-3 + Luma Ray 2",
      seed: "3182746199",
      cfgScale: 8.5,
      steps: 60,
      sampler: "Euler a",
      positivePrompt: "Massive scale wide shot, lone nomad walking through towering orange sand dunes during twilight, twin moons in sky, cinematic film grain, Hans Zimmer soundtrack vibe",
    },
    likes: 712,
    saved: false,
  },
];

const INITIAL_BRIEFS: ClientBrief[] = [
  {
    id: "brief-101",
    title: "Q4 Luxury Fragrance TikTok Series (3x 9:16)",
    category: "9:16 Viral Ad",
    budget: "$2,400",
    status: "Active Escrow",
    assignedDirector: "Elena Vance",
    deliverable: "3x 15s 4K Reels (.mp4) + Seed Parameters",
    deadline: "Oct 18, 2026",
    escrowLocked: 2400,
  },
  {
    id: "brief-102",
    title: "SaaS Explainer AI Avatar Lip-Sync in Spanish & German",
    category: "AI Human & Dubbing",
    budget: "$1,850",
    status: "In Review",
    assignedDirector: "Zara Al-Mansoor",
    deliverable: "2x 60s Localized Product Demos",
    deadline: "Oct 22, 2026",
    escrowLocked: 1850,
  },
];

export default function ClientDashboardPage() {
  const router = useRouter();

  // Navigation & Filter States
  const [activeNav, setActiveNav] = useState<"home" | "explore" | "boards" | "escrow" | "briefs">("home");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // User Profile Dropdown State (Pinterest Style popover)
  const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Client User Data (matches Hostlekid / GenWorks enterprise profile)
  const [clientUser, setClientUser] = useState({
    name: "Hostlekid",
    email: "hostlekid629@gmail.com",
    role: "Client • Enterprise Partner",
    avatarInitial: "H",
    balanceInEscrow: 4250,
    activeCampaigns: 2,
    savedMoodboardsCount: 6,
  });

  // Pins & Saved State
  const [pins, setPins] = useState<PinItem[]>(INITIAL_PINS);
  const [briefs, setBriefs] = useState<ClientBrief[]>(INITIAL_BRIEFS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals
  const [selectedPin, setSelectedPin] = useState<PinItem | null>(null);
  const [createBriefModalOpen, setCreateBriefModalOpen] = useState<boolean>(false);
  const [commissionDirectorModalOpen, setCommissionDirectorModalOpen] = useState<PinItem | null>(null);

  // Create Brief Form State
  const [newBriefTitle, setNewBriefTitle] = useState("");
  const [newBriefCategory, setNewBriefCategory] = useState("9:16 Viral Video");
  const [newBriefBudget, setNewBriefBudget] = useState("$2,500");
  const [newBriefDetails, setNewBriefDetails] = useState("");
  const [newBriefDirector, setNewBriefDirector] = useState("Elena Vance");

  // Close profile dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter Pins
  const filteredPins = useMemo(() => {
    return pins.filter((pin) => {
      const matchesSearch =
        searchQuery === "" ||
        pin.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pin.director.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pin.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        pin.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedFilter === "all") return true;
      if (selectedFilter === "saved") return pin.saved;
      if (selectedFilter === "viral") return pin.category === "viral";
      if (selectedFilter === "commercial") return pin.category === "commercial";
      if (selectedFilter === "pipeline") return pin.category === "pipeline";
      if (selectedFilter === "human") return pin.category === "human";
      if (selectedFilter === "cinematic") return pin.category === "cinematic";
      return true;
    });
  }, [pins, selectedFilter, searchQuery]);

  // Actions
  const toggleSavePin = (pinId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPins((prev) =>
      prev.map((p) => {
        if (p.id === pinId) {
          const nextSaved = !p.saved;
          triggerToast(
            nextSaved
              ? `Saved to 'Q4 Campaign Moodboard'`
              : `Removed from Moodboard`
          );
          return { ...p, saved: nextSaved, likes: nextSaved ? p.likes + 1 : p.likes - 1 };
        }
        return p;
      })
    );
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleCreateBriefSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBriefTitle) return;

    const newBrief: ClientBrief = {
      id: `brief-${Date.now().toString().slice(-4)}`,
      title: newBriefTitle,
      category: newBriefCategory,
      budget: newBriefBudget,
      status: "Active Escrow",
      assignedDirector: newBriefDirector,
      deliverable: "Custom 4K AI Video Master & Verified JSON Workflow",
      deadline: "7 Days from Approval",
      escrowLocked: parseInt(newBriefBudget.replace(/[^0-9]/g, "")) || 2000,
    };

    setBriefs([newBrief, ...briefs]);
    setClientUser((prev) => ({
      ...prev,
      balanceInEscrow: prev.balanceInEscrow + newBrief.escrowLocked,
      activeCampaigns: prev.activeCampaigns + 1,
    }));
    setCreateBriefModalOpen(false);
    setNewBriefTitle("");
    setNewBriefDetails("");
    triggerToast("✨ New Video Production Brief Created & Locked in Escrow!");
  };

  return (
    <div className="min-h-screen bg-[#fbfaf0] text-[#1b1c16] font-body flex flex-col md:flex-row antialiased selection:bg-[#d3a373]/30">
      {/* ========================================================
          LEFT FIXED NAVIGATION RAIL (Pinterest Dock Style)
      ======================================================== */}
      <aside className="w-full md:w-20 md:min-w-[80px] md:h-screen md:sticky md:top-0 bg-[#f5f4ea] border-r border-[#e4e3d9] flex md:flex-col items-center justify-between p-3 md:py-6 z-30 shadow-[1px_0_12px_rgba(0,0,0,0.02)]">
        {/* Brand Monogram / Logo at Top Left */}
        <div className="flex md:flex-col items-center gap-3">
          <Link
            href="/"
            title="GenWorks — Back to Home"
            className="w-12 h-12 rounded-2xl bg-[#1b1c16] flex items-center justify-center text-[#d3a373] shadow-md hover:scale-105 active:scale-95 transition-all group relative"
          >
            {/* GenWorks Geometric Monogram */}
            <svg
              className="w-6 h-6 transform group-hover:rotate-12 transition-transform duration-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
            {/* Tooltip on Hover */}
            <span className="hidden md:group-hover:block absolute left-16 bg-[#1b1c16] text-[#fbfaf0] text-[11px] font-bold py-1 px-2.5 rounded-lg whitespace-nowrap shadow-xl z-50">
              GenWorks Home
            </span>
          </Link>
        </div>

        {/* Center Navigation Dock Items */}
        <nav className="flex md:flex-col items-center gap-2 md:gap-3.5 my-auto">
          {/* Home / Feed */}
          <button
            onClick={() => {
              setActiveNav("home");
              setSelectedFilter("all");
            }}
            title="Home Feed"
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 relative group ${
              activeNav === "home"
                ? "bg-[#1b1c16] text-[#fbfaf0] shadow-md"
                : "text-[#50453b] hover:bg-[#eae8df] hover:text-[#1b1c16]"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="hidden md:group-hover:block absolute left-14 bg-[#1b1c16] text-[#fbfaf0] text-[11px] font-semibold py-1 px-2.5 rounded-lg whitespace-nowrap z-50">
              Home Feed
            </span>
          </button>

          {/* Explore / Video Reels */}
          <button
            onClick={() => {
              setActiveNav("explore");
              setSelectedFilter("viral");
            }}
            title="Explore AI Reels"
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 relative group ${
              activeNav === "explore"
                ? "bg-[#1b1c16] text-[#fbfaf0] shadow-md"
                : "text-[#50453b] hover:bg-[#eae8df] hover:text-[#1b1c16]"
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="hidden md:group-hover:block absolute left-14 bg-[#1b1c16] text-[#fbfaf0] text-[11px] font-semibold py-1 px-2.5 rounded-lg whitespace-nowrap z-50">
              Explore Reels
            </span>
          </button>

          {/* Saved Boards / Moodboards */}
          <button
            onClick={() => {
              setActiveNav("boards");
              setSelectedFilter("saved");
            }}
            title="Saved Moodboards"
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 relative group ${
              activeNav === "boards"
                ? "bg-[#1b1c16] text-[#fbfaf0] shadow-md"
                : "text-[#50453b] hover:bg-[#eae8df] hover:text-[#1b1c16]"
            }`}
          >
            <Bookmark className="w-5 h-5" />
            <span className="hidden md:group-hover:block absolute left-14 bg-[#1b1c16] text-[#fbfaf0] text-[11px] font-semibold py-1 px-2.5 rounded-lg whitespace-nowrap z-50">
              Saved Moodboards
            </span>
          </button>

          {/* Create Brief Button (Pinterest + icon) */}
          <button
            onClick={() => setCreateBriefModalOpen(true)}
            title="Commission New Brief"
            className="w-11 h-11 rounded-2xl bg-[#d3a373] text-[#1b1c16] hover:bg-[#c29263] flex items-center justify-center transition-all duration-200 shadow-md hover:scale-105 active:scale-95 relative group"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
            <span className="hidden md:group-hover:block absolute left-14 bg-[#1b1c16] text-[#fbfaf0] text-[11px] font-bold py-1 px-2.5 rounded-lg whitespace-nowrap z-50">
              Create Client Brief
            </span>
          </button>

          {/* Milestone Escrow Contracts */}
          <button
            onClick={() => setActiveNav("escrow")}
            title="Milestone Escrow Vault"
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 relative group ${
              activeNav === "escrow"
                ? "bg-[#1b1c16] text-[#fbfaf0] shadow-md"
                : "text-[#50453b] hover:bg-[#eae8df] hover:text-[#1b1c16]"
            }`}
          >
            <ShieldCheck className="w-5 h-5 text-[#7d562d]" />
            <span className="hidden md:group-hover:block absolute left-14 bg-[#1b1c16] text-[#fbfaf0] text-[11px] font-semibold py-1 px-2.5 rounded-lg whitespace-nowrap z-50">
              Escrow Vault ($4,250)
            </span>
          </button>

          {/* Notifications with red indicator dot */}
          <button
            onClick={() => triggerToast("2 New Reel Deliverables Ready for Inspection")}
            title="Notifications"
            className="w-11 h-11 rounded-2xl flex items-center justify-center text-[#50453b] hover:bg-[#eae8df] hover:text-[#1b1c16] transition-all relative group"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-[#f5f4ea]" />
            <span className="hidden md:group-hover:block absolute left-14 bg-[#1b1c16] text-[#fbfaf0] text-[11px] font-semibold py-1 px-2.5 rounded-lg whitespace-nowrap z-50">
              Notifications (2)
            </span>
          </button>

          {/* Direct Creator Messages */}
          <button
            onClick={() => triggerToast("Elena Vance sent 2 new ComfyUI video variations")}
            title="Messages"
            className="w-11 h-11 rounded-2xl flex items-center justify-center text-[#50453b] hover:bg-[#eae8df] hover:text-[#1b1c16] transition-all relative group"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="hidden md:group-hover:block absolute left-14 bg-[#1b1c16] text-[#fbfaf0] text-[11px] font-semibold py-1 px-2.5 rounded-lg whitespace-nowrap z-50">
              Director Messages
            </span>
          </button>
        </nav>

        {/* Bottom Rail / Settings */}
        <div className="flex md:flex-col items-center gap-2">
          <button
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            title="Settings & Workspace"
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-[#82756a] hover:bg-[#eae8df] hover:text-[#1b1c16] transition-colors relative group"
          >
            <Settings className="w-5 h-5" />
            <span className="hidden md:group-hover:block absolute left-14 bg-[#1b1c16] text-[#fbfaf0] text-[11px] font-semibold py-1 px-2.5 rounded-lg whitespace-nowrap z-50">
              Client Settings
            </span>
          </button>
        </div>
      </aside>

      {/* ========================================================
          MAIN VIEWPORT (Header + Filters + Waterfall Canvas)
      ======================================================== */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* --- STICKY TOP APPLICATION HEADER --- */}
        <header className="sticky top-0 z-20 bg-[#fbfaf0]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 border-b border-[#e4e3d9]/80 flex items-center justify-between gap-4">
          {/* Left: Brand Identity & Portal Pill */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/" className="flex items-center gap-2.5 group">
              <span className="font-headline font-black text-xl tracking-tight text-[#1b1c16]">
                GenWorks
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full bg-[#1b1c16] text-[#d3a373] shadow-xs">
                Client Portal
              </span>
            </Link>
          </div>

          {/* Center: Pinterest Universal Pill Search Bar */}
          <div className="flex-1 max-w-3xl relative">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-[#82756a] absolute left-4.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search AI directors, prompt styles, LoRA pipelines, seed numbers..."
                className="w-full bg-[#efeee4] hover:bg-[#eae8df] focus:bg-white text-[#1b1c16] placeholder-[#82756a] text-sm font-medium rounded-full pl-11 pr-24 py-2.5 border border-transparent focus:border-[#d3a373] focus:outline-none focus:ring-2 focus:ring-[#d3a373]/20 transition-all shadow-inner"
              />
              {/* Visual Search (Lens) & Voice Search Icons */}
              <div className="absolute right-3.5 flex items-center gap-1.5 text-[#82756a]">
                <button
                  type="button"
                  title="Search by Reference Visual / Seed"
                  onClick={() => triggerToast("Upload reference moodboard image to match AI Directors")}
                  className="p-1.5 hover:text-[#1b1c16] hover:bg-[#e4e3d9] rounded-full transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  title="Voice Search"
                  onClick={() => triggerToast("Listening for creative brief intent...")}
                  className="p-1.5 hover:text-[#1b1c16] hover:bg-[#e4e3d9] rounded-full transition-colors"
                >
                  <Mic className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Quick Action & User Profile Trigger (Pinterest Popover Anchor) */}
          <div className="flex items-center gap-2.5 shrink-0 relative" ref={profileMenuRef}>
            {/* Create Brief Quick CTA */}
            <button
              onClick={() => setCreateBriefModalOpen(true)}
              className="hidden lg:flex items-center gap-1.5 bg-[#1b1c16] hover:bg-[#30312b] text-[#fbfaf0] text-xs font-bold py-2.5 px-4 rounded-full transition-all shadow-sm active:scale-95"
            >
              <Plus className="w-3.5 h-3.5 text-[#d3a373]" />
              <span>Commission Brief</span>
            </button>

            {/* User Profile Avatar with Initial 'H' and Chevron (image_3d56aa.png) */}
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center gap-1.5 p-1 rounded-full hover:bg-[#efeee4] transition-colors focus:outline-none"
              title="Open Client Account Menu"
            >
              {/* Magenta / Bronze Avatar Initial 'H' */}
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#9d2466] to-[#d83b89] text-white flex items-center justify-center font-headline font-black text-sm shadow-sm ring-2 ring-white">
                {clientUser.avatarInitial}
              </div>
              <ChevronDown
                className={`w-4 h-4 text-[#50453b] transition-transform duration-200 ${
                  profileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* ========================================================
                USER PROFILE DROPDOWN MENU (Exact Pinterest Style Match)
            ======================================================== */}
            {profileMenuOpen && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-3xl shadow-2xl border border-[#e4e3d9] p-4 text-[#1b1c16] animate-scale-in z-50">
                {/* Section Header */}
                <div className="text-[11px] font-bold text-[#82756a] uppercase tracking-wider mb-2 px-1">
                  Currently in
                </div>

                {/* Profile Card Box (Hostlekid Card from screenshot) */}
                <div className="p-3.5 rounded-2xl bg-[#fbfaf0] border border-[#e4e3d9] flex items-center gap-3.5 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#9d2466] to-[#d83b89] text-white flex items-center justify-center font-headline font-black text-lg shadow-sm shrink-0">
                    {clientUser.avatarInitial}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-headline font-bold text-sm text-[#1b1c16] truncate">
                      {clientUser.name}
                    </div>
                    <div className="text-[11px] font-semibold text-[#7d562d] flex items-center gap-1">
                      <span>Client Account</span>
                      <span className="w-1 h-1 rounded-full bg-[#7d562d]" />
                      <span>Verified</span>
                    </div>
                    <div className="text-[11px] text-[#82756a] truncate">
                      {clientUser.email}
                    </div>
                  </div>
                </div>

                {/* Escrow Balance Metric Strip */}
                <div className="p-3 rounded-2xl bg-[#f5f4ea] border border-[#e4e3d9] mb-3 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-bold text-[#82756a] uppercase">
                      Protected in Escrow
                    </div>
                    <div className="text-base font-headline font-black text-[#1b1c16]">
                      ${clientUser.balanceInEscrow.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-[#82756a] uppercase">
                      Active Briefs
                    </div>
                    <div className="text-base font-headline font-bold text-[#7d562d]">
                      {clientUser.activeCampaigns} Campaigns
                    </div>
                  </div>
                </div>

                {/* Account Actions & Links (Pinterest list style) */}
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      setCreateBriefModalOpen(true);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold hover:bg-[#efeee4] transition-colors flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <Plus className="w-3.5 h-3.5 text-[#d3a373]" />
                      <span>Post New Production Brief</span>
                    </span>
                    <span className="text-[10px] font-bold text-[#d3a373] bg-[#1b1c16] px-2 py-0.5 rounded-full">
                      Escrow
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      setActiveNav("boards");
                      setSelectedFilter("saved");
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold hover:bg-[#efeee4] transition-colors flex items-center gap-2"
                  >
                    <Bookmark className="w-3.5 h-3.5 text-[#50453b]" />
                    <span>Saved Video Moodboards</span>
                  </button>

                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      setActiveNav("escrow");
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold hover:bg-[#efeee4] transition-colors flex items-center gap-2"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Escrow Contracts & Invoices</span>
                  </button>
                </div>

                <div className="border-t border-[#e4e3d9] my-2 pt-2">
                  <div className="text-[11px] font-bold text-[#82756a] uppercase px-1 mb-1">
                    Your accounts
                  </div>
                  <button
                    onClick={() => triggerToast("Client profile switch is active")}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold hover:bg-[#efeee4] transition-colors flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5 text-[#50453b]" />
                    <span>Add Brand Team Account</span>
                  </button>

                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      router.push("/");
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 mt-1"
                  >
                    <LogOut className="w-3.5 h-3.5 text-red-500" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* --- HORIZONTAL FILTER TABS (Pinterest "All" bar style) --- */}
        <section className="px-4 sm:px-8 pt-4 pb-2 border-b border-[#e4e3d9]/40 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 sm:gap-2.5">
            {[
              { id: "all", label: "All Reels" },
              { id: "viral", label: "9:16 Viral TikTok" },
              { id: "commercial", label: "4K Product Commercials" },
              { id: "pipeline", label: "ComfyUI Motion Pipelines" },
              { id: "human", label: "AI Humans & Lip-Sync" },
              { id: "cinematic", label: "Sci-Fi & Cinematic" },
              { id: "saved", label: "⭐ My Moodboards" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  selectedFilter === tab.id
                    ? "bg-[#1b1c16] text-[#fbfaf0] shadow-sm scale-[1.02]"
                    : "bg-[#efeee4] hover:bg-[#e4e3d9] text-[#50453b]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs text-[#82756a] font-medium shrink-0">
            <span>{filteredPins.length} curated deliverables</span>
          </div>
        </section>

        {/* --- TOAST NOTIFICATION --- */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#1b1c16] text-[#fbfaf0] text-xs font-bold py-3 px-5 rounded-2xl shadow-2xl flex items-center gap-2.5 border border-[#d3a373]/30 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-[#d3a373]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* ========================================================
            VIEW: ESCROW CONTRACTS & BRIEFS
        ======================================================== */}
        {activeNav === "escrow" ? (
          <div className="p-4 sm:p-8 max-w-5xl mx-auto w-full">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-headline font-black text-[#1b1c16]">
                  Milestone Escrow Vault
                </h1>
                <p className="text-xs text-[#82756a] font-medium mt-1">
                  100% Client Protected: Creator funds are held in escrow and only released when you approve reproducible pipeline deliverables.
                </p>
              </div>
              <button
                onClick={() => setCreateBriefModalOpen(true)}
                className="bg-[#d3a373] text-[#1b1c16] text-xs font-bold py-2.5 px-4 rounded-full flex items-center gap-2 hover:bg-[#c29263] transition-all shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Escrow Brief</span>
              </button>
            </div>

            {/* Escrow Briefs Cards */}
            <div className="space-y-4">
              {briefs.map((b) => (
                <div
                  key={b.id}
                  className="bg-white rounded-3xl p-5 border border-[#e4e3d9] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                        {b.status}
                      </span>
                      <span className="text-xs font-semibold text-[#82756a]">
                        ID: {b.id}
                      </span>
                    </div>
                    <h3 className="font-headline font-bold text-base text-[#1b1c16]">
                      {b.title}
                    </h3>
                    <p className="text-xs text-[#50453b]">
                      Director: <strong className="text-[#1b1c16]">{b.assignedDirector}</strong> • Deliverable: {b.deliverable}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 border-t md:border-t-0 pt-3 md:pt-0">
                    <div className="text-right">
                      <div className="text-[10px] font-bold text-[#82756a] uppercase">
                        Locked Amount
                      </div>
                      <div className="text-lg font-headline font-black text-[#1b1c16]">
                        {b.budget}
                      </div>
                    </div>
                    <button
                      onClick={() => triggerToast(`Inspecting deliverable assets for ${b.id}`)}
                      className="bg-[#1b1c16] hover:bg-[#30312b] text-[#fbfaf0] text-xs font-bold py-2.5 px-4 rounded-full transition-all"
                    >
                      Inspect Deliverables
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ========================================================
              VIEW: PINTEREST WATERFALL MASONRY FEED CANVAS
          ======================================================== */
          <div className="p-4 sm:p-6 md:p-8 flex-1">
            {filteredPins.length === 0 ? (
              <div className="text-center py-24">
                <Bookmark className="w-12 h-12 text-[#82756a]/40 mx-auto mb-3" />
                <h3 className="font-headline font-bold text-lg text-[#1b1c16]">
                  No Reels Found
                </h3>
                <p className="text-xs text-[#82756a] mt-1">
                  Try adjusting your search keywords or explore all disciplines.
                </p>
              </div>
            ) : (
              /* Pinterest CSS Columns Masonry Grid */
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5">
                {filteredPins.map((pin) => (
                  <div
                    key={pin.id}
                    onClick={() => setSelectedPin(pin)}
                    className="break-inside-avoid group cursor-pointer"
                  >
                    <div className="bg-white rounded-3xl overflow-hidden border border-[#e4e3d9] hover:border-[#d3a373] transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1">
                      {/* Media Container with Dynamic Aspect Ratio */}
                      <div className="relative overflow-hidden bg-[#efeee4]">
                        {/* Aspect Ratio Sizing Wrapper */}
                        <div
                          className={`w-full ${
                            pin.aspectRatio === "9:16"
                              ? "aspect-[9/16]"
                              : pin.aspectRatio === "16:9"
                              ? "aspect-[16/9]"
                              : "aspect-square"
                          } relative`}
                        >
                          <img
                            src={pin.previewImg}
                            alt={pin.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />

                          {/* Top Badges Overlay */}
                          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#fbfaf0] shadow-sm">
                              {pin.categoryLabel}
                            </span>
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-[#1b1c16]/80 text-[#d3a373] backdrop-blur-md">
                              {pin.aspectRatio}
                            </span>
                          </div>

                          {/* Hover Action Overlay (Pinterest Pin Hover Style) */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3.5 z-20">
                            <div className="flex justify-end gap-2">
                              {/* Quick Save to Moodboard Button */}
                              <button
                                onClick={(e) => toggleSavePin(pin.id, e)}
                                title={pin.saved ? "Remove from Moodboard" : "Save to Moodboard"}
                                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                                  pin.saved
                                    ? "bg-red-500 text-white shadow-md scale-105"
                                    : "bg-white/90 text-[#1b1c16] hover:bg-white"
                                }`}
                              >
                                <Heart
                                  className={`w-4 h-4 ${
                                    pin.saved ? "fill-current" : ""
                                  }`}
                                />
                              </button>
                            </div>

                            {/* Bottom Commission Director Quick Trigger */}
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-extrabold text-white/90 drop-shadow">
                                {pin.director.rate}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCommissionDirectorModalOpen(pin);
                                }}
                                className="bg-[#d3a373] hover:bg-[#c29263] text-[#1b1c16] text-xs font-headline font-black py-2 px-3.5 rounded-full shadow-lg transition-transform active:scale-95 flex items-center gap-1.5"
                              >
                                <span>Commission</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Content & Metadata */}
                      <div className="p-4 space-y-2.5">
                        <h4 className="font-headline font-bold text-xs sm:text-sm text-[#1b1c16] leading-snug line-clamp-2">
                          {pin.title}
                        </h4>

                        {/* Director Chip & Rating */}
                        <div className="flex items-center justify-between pt-1 border-t border-[#e4e3d9]/60">
                          <div className="flex items-center gap-2 min-w-0">
                            <img
                              src={pin.director.avatar}
                              alt={pin.director.name}
                              className="w-6 h-6 rounded-full object-cover ring-1 ring-[#d3a373]"
                            />
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-[#1b1c16] truncate">
                                {pin.director.name}
                              </div>
                              <div className="text-[10px] text-[#82756a] truncate">
                                {pin.director.handle}
                              </div>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <div className="text-[11px] font-extrabold text-[#7d562d] flex items-center gap-0.5 justify-end">
                              <span>★</span>
                              <span>{pin.director.rating}</span>
                            </div>
                            <div className="text-[9px] font-medium text-[#82756a]">
                              {pin.director.completed} jobs
                            </div>
                          </div>
                        </div>

                        {/* Tools Pill Strip */}
                        <div className="flex flex-wrap gap-1 pt-1">
                          {pin.tools.slice(0, 2).map((t, idx) => (
                            <span
                              key={idx}
                              className="text-[9px] font-semibold px-2 py-0.5 rounded-md bg-[#f5f4ea] text-[#50453b]"
                            >
                              {t}
                            </span>
                          ))}
                          {pin.tools.length > 2 && (
                            <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-md bg-[#f5f4ea] text-[#82756a]">
                              +{pin.tools.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ========================================================
          MODAL 1: REEL SEED & PIPELINE INSPECTION MODAL
      ======================================================== */}
      {selectedPin && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full border border-[#e4e3d9] shadow-2xl overflow-hidden my-auto animate-scale-in">
            {/* Modal Header */}
            <div className="p-5 border-b border-[#e4e3d9] flex items-center justify-between bg-[#fbfaf0]">
              <div className="flex items-center gap-3">
                <img
                  src={selectedPin.director.avatar}
                  alt={selectedPin.director.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-[#d3a373]"
                />
                <div>
                  <h3 className="font-headline font-bold text-sm sm:text-base text-[#1b1c16]">
                    {selectedPin.director.name}
                  </h3>
                  <p className="text-xs text-[#82756a]">
                    {selectedPin.director.handle} • {selectedPin.director.rate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleSavePin(selectedPin.id)}
                  className={`p-2 rounded-full border transition-colors ${
                    selectedPin.saved
                      ? "bg-red-50 border-red-200 text-red-500"
                      : "border-[#e4e3d9] text-[#50453b] hover:bg-[#efeee4]"
                  }`}
                  title="Bookmark"
                >
                  <Heart className={`w-4 h-4 ${selectedPin.saved ? "fill-current" : ""}`} />
                </button>
                <button
                  onClick={() => setSelectedPin(null)}
                  className="p-2 rounded-full border border-[#e4e3d9] text-[#82756a] hover:bg-[#efeee4] hover:text-[#1b1c16] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[75vh] overflow-y-auto">
              {/* Media Preview Column */}
              <div className="space-y-3">
                <div className="rounded-2xl overflow-hidden bg-[#1b1c16] border border-[#e4e3d9]">
                  <img
                    src={selectedPin.previewImg}
                    alt={selectedPin.title}
                    className="w-full h-auto object-cover max-h-[380px]"
                  />
                </div>
                <div className="text-xs font-semibold text-[#82756a] flex items-center justify-between px-1">
                  <span>Aspect: {selectedPin.aspectRatio}</span>
                  <span>Category: {selectedPin.categoryLabel}</span>
                </div>
              </div>

              {/* Seed & Workflow Details Column */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-headline font-bold text-base text-[#1b1c16]">
                    {selectedPin.title}
                  </h4>
                  <p className="text-xs text-[#50453b] mt-1">
                    Deterministic seed workflow verified with full commercial IP transfer.
                  </p>
                </div>

                {/* Workflow Parameters Box */}
                <div className="p-3.5 rounded-2xl bg-[#f5f4ea] border border-[#e4e3d9] space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-[#e4e3d9]">
                    <span className="text-[#82756a]">Model:</span>
                    <strong className="text-[#1b1c16]">{selectedPin.workflow.model}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#e4e3d9]">
                    <span className="text-[#82756a]">Seed Number:</span>
                    <code className="text-[#7d562d] font-mono">{selectedPin.workflow.seed}</code>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#e4e3d9]">
                    <span className="text-[#82756a]">CFG Scale / Steps:</span>
                    <span className="text-[#1b1c16]">
                      {selectedPin.workflow.cfgScale} CFG • {selectedPin.workflow.steps} Steps
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#82756a]">Sampler:</span>
                    <span className="text-[#1b1c16]">{selectedPin.workflow.sampler}</span>
                  </div>
                </div>

                {/* Prompt Excerpt */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#82756a]">
                    Verified Positive Prompt
                  </span>
                  <p className="text-xs font-mono bg-[#fbfaf0] p-3 rounded-xl border border-[#e4e3d9] text-[#1b1c16] leading-relaxed">
                    {selectedPin.workflow.positivePrompt}
                  </p>
                </div>

                {/* Action CTA */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      const target = selectedPin;
                      setSelectedPin(null);
                      setCommissionDirectorModalOpen(target);
                    }}
                    className="w-full bg-[#1b1c16] hover:bg-[#30312b] text-[#fbfaf0] text-xs font-headline font-black py-3 rounded-full flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-98"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#d3a373]" />
                    <span>Commission {selectedPin.director.name} via Escrow</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 2: CREATE CLIENT BRIEF (Pinterest Plus Button)
      ======================================================== */}
      {createBriefModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-[#e4e3d9] shadow-2xl p-6 sm:p-8 my-auto animate-scale-in">
            <div className="flex items-center justify-between pb-4 border-b border-[#e4e3d9] mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#1b1c16] text-[#d3a373] flex items-center justify-center">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-lg text-[#1b1c16]">
                    Post New Client Production Brief
                  </h3>
                  <p className="text-xs text-[#82756a]">
                    Protected under Milestone Escrow Vault
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCreateBriefModalOpen(false)}
                className="p-2 rounded-full border border-[#e4e3d9] text-[#82756a] hover:bg-[#efeee4] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateBriefSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1b1c16] mb-1.5">
                  Campaign Title / Deliverable Goal
                </label>
                <input
                  type="text"
                  required
                  value={newBriefTitle}
                  onChange={(e) => setNewBriefTitle(e.target.value)}
                  placeholder="e.g. 3x 9:16 Viral TikTok Reels for Cyberpunk Footwear"
                  className="w-full bg-[#fbfaf0] border border-[#e4e3d9] rounded-2xl px-4 py-3 text-sm text-[#1b1c16] focus:outline-none focus:border-[#d3a373]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#1b1c16] mb-1.5">
                    Category Format
                  </label>
                  <select
                    value={newBriefCategory}
                    onChange={(e) => setNewBriefCategory(e.target.value)}
                    className="w-full bg-[#fbfaf0] border border-[#e4e3d9] rounded-2xl px-4 py-3 text-sm text-[#1b1c16] focus:outline-none focus:border-[#d3a373]"
                  >
                    <option value="9:16 Viral Video">9:16 Viral TikTok / Reel</option>
                    <option value="4K Product Commercial">4K Product Commercial</option>
                    <option value="ComfyUI Motion Pipeline">ComfyUI Motion Pipeline</option>
                    <option value="AI Human & Lip-Sync">AI Human & Lip-Sync</option>
                    <option value="Cinematic Trailer">Cinematic Sci-Fi Trailer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1b1c16] mb-1.5">
                    Escrow Budget (USD)
                  </label>
                  <input
                    type="text"
                    value={newBriefBudget}
                    onChange={(e) => setNewBriefBudget(e.target.value)}
                    className="w-full bg-[#fbfaf0] border border-[#e4e3d9] rounded-2xl px-4 py-3 text-sm text-[#1b1c16] focus:outline-none focus:border-[#d3a373]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1b1c16] mb-1.5">
                  Assigned Verified AI Director
                </label>
                <select
                  value={newBriefDirector}
                  onChange={(e) => setNewBriefDirector(e.target.value)}
                  className="w-full bg-[#fbfaf0] border border-[#e4e3d9] rounded-2xl px-4 py-3 text-sm text-[#1b1c16] focus:outline-none focus:border-[#d3a373]"
                >
                  <option value="Elena Vance">Elena Vance (@elena_cinema)</option>
                  <option value="Kai Chen">Kai Chen (@kaichen_nodes)</option>
                  <option value="Zara Al-Mansoor">Zara Al-Mansoor (@zara_virtual)</option>
                  <option value="Marcus Sterling">Marcus Sterling (@marcus_visuals)</option>
                  <option value="Aria Thorne">Aria Thorne (@aria_cinematics)</option>
                  <option value="Liam O'Connor">Liam O'Connor (@liam_voicecraft)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1b1c16] mb-1.5">
                  Creative Direction & Visual References
                </label>
                <textarea
                  rows={3}
                  value={newBriefDetails}
                  onChange={(e) => setNewBriefDetails(e.target.value)}
                  placeholder="Outline key visual motifs, lighting style, required seed reproducibility, and desired turnaround..."
                  className="w-full bg-[#fbfaf0] border border-[#e4e3d9] rounded-2xl p-4 text-sm text-[#1b1c16] focus:outline-none focus:border-[#d3a373]"
                />
              </div>

              <div className="p-3 rounded-2xl bg-[#efeee4] text-xs text-[#50453b] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Funds are securely locked in escrow. Payment is released strictly upon milestone video approval.
                </span>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCreateBriefModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-[#e4e3d9] text-xs font-bold text-[#50453b] hover:bg-[#efeee4]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#1b1c16] text-[#fbfaf0] text-xs font-headline font-bold hover:bg-[#30312b] shadow-md transition-all active:scale-95 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#d3a373]" />
                  <span>Lock Escrow & Dispatch</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 3: DIRECT COMMISSION MODAL
      ======================================================== */}
      {commissionDirectorModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full border border-[#e4e3d9] shadow-2xl p-6 my-auto animate-scale-in">
            <div className="text-center pb-4 border-b border-[#e4e3d9]">
              <img
                src={commissionDirectorModalOpen.director.avatar}
                alt={commissionDirectorModalOpen.director.name}
                className="w-16 h-16 rounded-full object-cover mx-auto ring-4 ring-[#d3a373] shadow-md mb-2"
              />
              <h3 className="font-headline font-bold text-lg text-[#1b1c16]">
                Commission {commissionDirectorModalOpen.director.name}
              </h3>
              <p className="text-xs text-[#82756a]">
                Deliverable: {commissionDirectorModalOpen.title}
              </p>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#f5f4ea] border border-[#e4e3d9] space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#82756a]">Hourly / Deliverable Rate:</span>
                  <strong className="text-[#1b1c16]">{commissionDirectorModalOpen.director.rate}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#82756a]">Estimated Turnaround:</span>
                  <span className="text-[#1b1c16]">48 Hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#82756a]">Escrow Protection:</span>
                  <span className="text-emerald-700 font-bold">100% Guaranteed</span>
                </div>
              </div>

              <p className="text-[#50453b] leading-relaxed">
                By confirming, a milestone escrow contract is initialized between your client account ({clientUser.name}) and {commissionDirectorModalOpen.director.name}.
              </p>
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setCommissionDirectorModalOpen(null)}
                className="flex-1 py-3 rounded-full border border-[#e4e3d9] text-xs font-bold text-[#50453b] hover:bg-[#efeee4]"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setCommissionDirectorModalOpen(null);
                  triggerToast(`✨ Escrow contract initiated with ${commissionDirectorModalOpen.director.name}!`);
                }}
                className="flex-1 py-3 rounded-full bg-[#1b1c16] text-[#fbfaf0] text-xs font-headline font-bold hover:bg-[#30312b] shadow-md flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-[#d3a373]" />
                <span>Initialize Escrow</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
