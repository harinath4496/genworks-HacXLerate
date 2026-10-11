export interface CreatorWorkflow {
  positivePrompt: string;
  negativePrompt: string;
  model: string;
  seed: string;
  aspectRatio: string;
  cfgScale: number;
  steps: number;
  sampler: string;
}

export interface CreatorPortfolioItem {
  id: string;
  title: string;
  category: string;
  mediaUrl: string;
  aspectRatio: "9:16" | "16:9" | "1:1";
  toolsUsed: string[];
  workflow: CreatorWorkflow;
  views: string;
  likes: string;
}

export interface Creator {
  id: string;
  name: string;
  handle: string;
  role: string;
  bio: string;
  specialization: string;
  category: "video" | "pipelines" | "audio" | "3d";
  avatar: string;
  portfolioImg: string;
  deliverableType: string;
  aspectRatio: string;
  tools: string[];
  rating: number;
  projectsCompleted: number;
  hourlyRate: string;
  verificationBadge: "Toolchain Verified" | "Seed Certified" | "IP Cleared";
  verificationScore: number;
  location: string;
  turnaroundTime: string;
  commercialLicense: string;
  workflow: CreatorWorkflow;
  portfolioItems: CreatorPortfolioItem[];
}

export const CREATORS_POOL: Creator[] = [
  {
    id: "c1",
    name: "Elena Vance",
    handle: "@elena_cinema",
    role: "Lead Generative Video Director",
    bio: "Pioneering commercial AI cinematography. Specializing in high-fashion, perfume commercials, and hyper-engaging 9:16 TikTok reels powered by Runway Gen-3 and Kling 1.5 Pro.",
    specialization: "9:16 Viral Commercials & Luxury Narrative",
    category: "video",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    portfolioImg: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80",
    deliverableType: "9:16 Cinematic Ad Series",
    aspectRatio: "9:16",
    tools: ["Runway Gen-3", "Kling AI", "Premiere", "Topaz Video AI"],
    rating: 4.99,
    projectsCompleted: 52,
    hourlyRate: "$95/hr",
    verificationBadge: "Toolchain Verified",
    verificationScore: 98,
    location: "London, UK",
    turnaroundTime: "48 Hours",
    commercialLicense: "Full Commercial Buyout & Global Digital Transfer",
    workflow: {
      positivePrompt: "Cinematic commercial 9:16, luxury perfume bottle floating in slow-motion water droplets, bioluminescent flora, anamorphic lens flare, 8k resolution, shot on Arri Alexa 35, cinematic color grading --ar 9:16",
      negativePrompt: "low resolution, plastic skin, jitter, temporal flicker, artifacts, distorted hands, blurry text, low frame rate",
      model: "Runway Gen-3 Alpha + Kling 1.5 Pro",
      seed: "8947219044",
      aspectRatio: "9:16 Vertical (1080x1920)",
      cfgScale: 7.5,
      steps: 50,
      sampler: "Euler a (Motion Vector 8.4)",
    },
    portfolioItems: [
      {
        id: "p1-1",
        title: "L'Aura Celestial Perfume Commercial",
        category: "9:16 Luxury Reel",
        mediaUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80",
        aspectRatio: "9:16",
        toolsUsed: ["Runway Gen-3", "Midjourney v6", "Topaz AI"],
        workflow: {
          positivePrompt: "Liquid gold droplets coalescing around crystal glass flacon, soft cinematic lighting, 9:16 vertical luxury ad",
          negativePrompt: "blur, pixelation, stutter, watermark",
          model: "Runway Gen-3 Alpha",
          seed: "8947219044",
          aspectRatio: "9:16",
          cfgScale: 7.5,
          steps: 50,
          sampler: "Euler a",
        },
        views: "1.4M",
        likes: "182K",
      },
      {
        id: "p1-2",
        title: "Aetheria High-Fashion Runway Pass",
        category: "Fashion Editorial",
        mediaUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80",
        aspectRatio: "9:16",
        toolsUsed: ["Kling 1.5 Pro", "Magnific AI"],
        workflow: {
          positivePrompt: "Haute couture silk fabric billowing in zero gravity, neon Tokyo runway background, photorealistic texture",
          negativePrompt: "jitter, morphing body, low resolution",
          model: "Kling 1.5 Pro",
          seed: "3104928173",
          aspectRatio: "9:16",
          cfgScale: 8.0,
          steps: 45,
          sampler: "DPM++ 2M Karras",
        },
        views: "890K",
        likes: "94K",
      },
    ],
  },
  {
    id: "c2",
    name: "Kai Chen",
    handle: "@kaichen_nodes",
    role: "AI Video Architect & Pipeline Specialist",
    bio: "Building enterprise-grade ComfyUI node graphs and AnimateDiff pipelines for automated brand asset rendering. Reproducible JSON workflows delivered on completion.",
    specialization: "Automated AI Video Generation & Motion Pipelines",
    category: "pipelines",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    portfolioImg: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80",
    deliverableType: "AnimateDiff & Generative Video Pipeline (.json)",
    aspectRatio: "16:9",
    tools: ["ComfyUI", "AnimateDiff", "Runway Gen-3", "ControlNet"],
    rating: 4.98,
    projectsCompleted: 68,
    hourlyRate: "$120/hr",
    verificationBadge: "Seed Certified",
    verificationScore: 99,
    location: "Singapore",
    turnaroundTime: "24 Hours",
    commercialLicense: "Full Commercial Buyout with Node Source Code",
    workflow: {
      positivePrompt: "Deterministic multi-pass AI video generation pipeline, cinematic anamorphic camera orbit around futuristic architecture, volumetric haze, temporal consistency with AnimateDiff motion LoRA",
      negativePrompt: "temporal flicker, morphing jitter, low framerate, deformed perspective, artifacts",
      model: "ComfyUI + AnimateDiff v3 + Runway Gen-3",
      seed: "4490218821",
      aspectRatio: "16:9 Widescreen (1920x1080)",
      cfgScale: 4.5,
      steps: 32,
      sampler: "dpmpp_2m_sde_gpu",
    },
    portfolioItems: [
      {
        id: "p2-1",
        title: "Metropolis 2088 Architecture Tour",
        category: "Architectural Sci-Fi",
        mediaUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
        aspectRatio: "16:9",
        toolsUsed: ["ComfyUI", "ControlNet Depth", "SDXL Turbo"],
        workflow: {
          positivePrompt: "Futuristic organic skyscraper complex, hyperloop transit lines, volumetric dusk light, photoreal 8k octane render",
          negativePrompt: "blur, morphing, low poly, noisy",
          model: "ComfyUI SDXL",
          seed: "4490218821",
          aspectRatio: "16:9",
          cfgScale: 5.0,
          steps: 40,
          sampler: "dpmpp_2m_sde_gpu",
        },
        views: "640K",
        likes: "78K",
      },
    ],
  },
  {
    id: "c3",
    name: "Zara Al-Mansoor",
    handle: "@zara_virtual",
    role: "AI Digital Human & Video Persona Lead",
    bio: "Creating indistinguishable AI spokespersons, digital brand ambassadors, and micro-expression video presenters for global DTC brands.",
    specialization: "Consistent AI Video Presenters & Spokesperson Avatars",
    category: "pipelines",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
    portfolioImg: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=80",
    deliverableType: "Synchronized AI Video Presenter (.mp4)",
    aspectRatio: "9:16",
    tools: ["LivePortrait", "SadTalker", "Runway Gen-3", "HeyGen"],
    rating: 4.96,
    projectsCompleted: 39,
    hourlyRate: "$110/hr",
    verificationBadge: "IP Cleared",
    verificationScore: 96,
    location: "Dubai, UAE",
    turnaroundTime: "36 Hours",
    commercialLicense: "Full Commercial Buyout & Persona Transfer",
    workflow: {
      positivePrompt: "Consistent AI brand presenter video, speaking directly to camera with natural micro-expressions and eye contact, studio lighting, perfectly synchronized lip movements, 4k ultra-realistic portrait motion",
      negativePrompt: "uncanny valley, robotic jaw motion, temporal jitter, plastic smooth skin, asymmetrical eyes",
      model: "LivePortrait + Custom Persona LoRA + Runway Gen-3",
      seed: "1938502391",
      aspectRatio: "9:16 Vertical Video (1080x1920)",
      cfgScale: 6.5,
      steps: 35,
      sampler: "Euler Ancestral (Video Lip-Sync)",
    },
    portfolioItems: [
      {
        id: "p3-1",
        title: "Fintech App Interactive Ambassador",
        category: "Digital Spokesperson",
        mediaUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=80",
        aspectRatio: "9:16",
        toolsUsed: ["LivePortrait", "ElevenLabs", "Runway Gen-3"],
        workflow: {
          positivePrompt: "Natural fintech ambassador explaining smart investing, studio key light, natural blinks and micro-nodding",
          negativePrompt: "uncanny valley, stiff neck, desync",
          model: "LivePortrait Persona",
          seed: "1938502391",
          aspectRatio: "9:16",
          cfgScale: 6.5,
          steps: 35,
          sampler: "Euler Ancestral",
        },
        views: "980K",
        likes: "112K",
      },
    ],
  },
  {
    id: "c4",
    name: "Marcus Sterling",
    handle: "@marcus_visuals",
    role: "AI Product Video & Commercial Motion Director",
    bio: "Translating physical consumer products into high-octane 4K generative commercial commercials. Trusted by premium luxury watch, footwear, and consumer tech brands.",
    specialization: "AI Product Commercials & Dynamic Motion Ads",
    category: "video",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    portfolioImg: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    deliverableType: "4K Commercial Product Video Ad (.mp4)",
    aspectRatio: "16:9",
    tools: ["Runway Gen-3", "Kling AI", "Luma Dream Machine", "Midjourney v6"],
    rating: 4.97,
    projectsCompleted: 58,
    hourlyRate: "$95/hr",
    verificationBadge: "Toolchain Verified",
    verificationScore: 97,
    location: "New York, USA",
    turnaroundTime: "48 Hours",
    commercialLicense: "Full Commercial Buyout & Raw Asset Package",
    workflow: {
      positivePrompt: "Cinematic 4K commercial product video, artisanal luxury perfume bottle floating in pristine slow-motion liquid ripples, dynamic volumetric studio lighting, macro anamorphic lens flare, photorealistic physics, 60fps",
      negativePrompt: "temporal flicker, jitter, stutter, morphing artifacts, deformed bottle geometry, low resolution",
      model: "Runway Gen-3 Alpha + Kling 1.5 Pro",
      seed: "7320491823",
      aspectRatio: "16:9 4K Master Video (3840x2160)",
      cfgScale: 7.5,
      steps: 50,
      sampler: "Euler a (Motion Vector 9.2)",
    },
    portfolioItems: [
      {
        id: "p4-1",
        title: "Chronos Chronograph Luxury Commercial",
        category: "Product Ad",
        mediaUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80",
        aspectRatio: "16:9",
        toolsUsed: ["Runway Gen-3", "Midjourney v6"],
        workflow: {
          positivePrompt: "Mechanical watch tourbillon movement exploding outward in zero gravity, obsidian watch case, studio macro lens",
          negativePrompt: "distorted gears, low frame rate, artifacts",
          model: "Runway Gen-3 Alpha",
          seed: "7320491823",
          aspectRatio: "16:9",
          cfgScale: 7.5,
          steps: 50,
          sampler: "Euler a",
        },
        views: "1.1M",
        likes: "145K",
      },
    ],
  },
  {
    id: "c5",
    name: "Aria Thorne",
    handle: "@aria_cinematics",
    role: "Cinematic Worldbuilding & Commercial Filmmaker",
    bio: "Directing cinematic brand narratives, sci-fi worldbuilding, and full-length generative movie trailers. Combines Runway Gen-3 with custom DaVinci cinematic LUTs.",
    specialization: "16:9 Widescreen Brand Epics & Sci-Fi Commercials",
    category: "video",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
    portfolioImg: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80",
    deliverableType: "16:9 Cinematic Video Trailer",
    aspectRatio: "16:9",
    tools: ["Runway Gen-3", "Luma Dream Machine", "DaVinci", "Sora"],
    rating: 4.95,
    projectsCompleted: 44,
    hourlyRate: "$105/hr",
    verificationBadge: "Seed Certified",
    verificationScore: 95,
    location: "Berlin, Germany",
    turnaroundTime: "72 Hours",
    commercialLicense: "Full Commercial Buyout & Festival Exhibition Rights",
    workflow: {
      positivePrompt: "16:9 cinematic master shot, futuristic electric vehicle driving along coastal highway at dusk, golden hour rays hitting chrome body, realistic asphalt reflection, drone follow angle, film grain",
      negativePrompt: "wheel warping, floating vehicle, unrealistic speed jitter, video glitching, oversharpening",
      model: "Runway Gen-3 Alpha + Luma Ray 2",
      seed: "5591028301",
      aspectRatio: "16:9 Widescreen (3840x2160)",
      cfgScale: 8.0,
      steps: 60,
      sampler: "Euler a (Speed 1.0x)",
    },
    portfolioItems: [
      {
        id: "p5-1",
        title: "Terra Nova: Electric Horizon Commercial",
        category: "Automotive Cinematic",
        mediaUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80",
        aspectRatio: "16:9",
        toolsUsed: ["Runway Gen-3", "Luma Ray 2", "DaVinci Resolve"],
        workflow: {
          positivePrompt: "Concept hypercar carving misty mountain curves at sunrise, anamorphic lens flares, dynamic camera tracking",
          negativePrompt: "warping wheels, jitter, artificial blur",
          model: "Runway Gen-3 Alpha",
          seed: "5591028301",
          aspectRatio: "16:9",
          cfgScale: 8.0,
          steps: 60,
          sampler: "Euler a",
        },
        views: "2.3M",
        likes: "240K",
      },
    ],
  },
  {
    id: "c6",
    name: "Liam O'Connor",
    handle: "@liam_voicecraft",
    role: "AI Voice Synthesis & Multilingual Video Dubbing Director",
    bio: "Global voice architecture and zero-latency video dubbing across 28+ languages. Synchronizing natural emotional tonality and frame-perfect lip movement.",
    specialization: "Zero-Latency Lip-Synced Video Dubbing in 28+ Languages",
    category: "audio",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&auto=format&fit=crop&q=80",
    portfolioImg: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80",
    deliverableType: "Multilingual Dubbed 4K Video Reel (.mp4)",
    aspectRatio: "9:16",
    tools: ["ElevenLabs", "LivePortrait", "Wav2Lip", "Audition"],
    rating: 4.94,
    projectsCompleted: 61,
    hourlyRate: "$85/hr",
    verificationBadge: "IP Cleared",
    verificationScore: 94,
    location: "Dublin, Ireland",
    turnaroundTime: "24 Hours",
    commercialLicense: "Full Commercial Voice Clone Clearance",
    workflow: {
      positivePrompt: "Master multilingual video dubbing pipeline, synchronized emotional speech across European and Asian language pairs, natural vocal acoustics matching original video environment, frame-accurate lip-sync",
      negativePrompt: "robotic cadence, audio de-sync, unnatural mouth deformation, robotic pitch drift",
      model: "ElevenLabs Neural Voice + LivePortrait Lip-Sync",
      seed: "2094817294",
      aspectRatio: "9:16 Vertical Master (1080x1920)",
      cfgScale: 5.0,
      steps: 25,
      sampler: "Neural Acoustic Resampler",
    },
    portfolioItems: [
      {
        id: "p6-1",
        title: "Global Tech Keynote: 14 Language Dub",
        category: "Localization Pipeline",
        mediaUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80",
        aspectRatio: "9:16",
        toolsUsed: ["ElevenLabs", "LivePortrait", "Wav2Lip"],
        workflow: {
          positivePrompt: "Emotionally congruent audio synthesis matching presenter cadence in Japanese, German, and Spanish",
          negativePrompt: "metallic voice artifacts, jitter",
          model: "ElevenLabs Neural Voice",
          seed: "2094817294",
          aspectRatio: "9:16",
          cfgScale: 5.0,
          steps: 25,
          sampler: "Neural Acoustic Resampler",
        },
        views: "720K",
        likes: "89K",
      },
    ],
  },
];

export function getCreatorById(id: string): Creator | undefined {
  return CREATORS_POOL.find((c) => c.id === id || c.handle.replace("@", "") === id);
}
