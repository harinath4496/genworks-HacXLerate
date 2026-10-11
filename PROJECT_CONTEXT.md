# GenWorks — Production Knowledge & HacXLerate Hackathon Blueprint

> **ByteXL Challenge:** Challenge 2 — AI Content Creator Marketplace (by Kampus.VC)  
> **Team:** CODE NOVA  
> **Event:** HacXLerate 2026 Round 1 — QIS College Of Engineering And Technology  
> **Repository:** https://github.com/harinath4496/genworks-HacXLerate.git  
> **Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Prisma ORM, MongoDB Atlas, Firebase Auth, Google Generative AI (Gemini 1.5 Flash), Brevo Mail API.

---

## 1. Rubric & Evaluation Criteria Mapping (100 Points + 10 Bonus)

| Criteria | Weight | GenWorks Implementation | Route / File |
|---|---|---|---|
| **1. Creator Profiles & AI Portfolios** | **30%** | Rich creator profiles with AI video/image showcase, exact tools/models used (Midjourney v6, Runway Gen-3, Sora, Kling, ComfyUI, Stable Diffusion), detailed AI workflow (prompts, seeds, CFG, samplers), and creator logs. | `/dashboard/creator`<br>`src/app/(creator)/dashboard/creator/page.tsx`<br>`src/app/profile/edit/page.tsx` |
| **2. Brand / Agency Briefs** | **20%** | Comprehensive creative brief creation system capturing campaign requirements, content types, styles, aspect ratios (`9:16`, `16:9`, `1:1`), budget range, commercial licensing/IP transfer, and milestone escrow. | `/dashboard` (Brief Modal)<br>`src/app/api/client/briefs/route.ts`<br>`prisma/schema.prisma` (`Brief` model) |
| **3. Creator Search & Filtering** | **25%** | Multi-faceted search and discovery engine: filter by AI tools, specializations, aspect ratios, content styles, with fallback handling for empty states. | `/dashboard`<br>`src/app/dashboard/page.tsx` (Masonry discovery & filter bar) |
| **4. User Experience (UX)** | **15%** | Editorial soft-luxury design system (`#FAF9F5` cream, `#D3A373` gold, `#1B1C16` charcoal), smooth transitions, interactive modal previews, Pinterest-style masonry grid, mobile responsiveness. | Entire app theme & layout |
| **5. Presentation & Working Prototype** | **10%** | Fully functional, end-to-end prototype with live SSR, zero runtime crashes, persistent MongoDB database, and live Firebase authentication. | Live Vercel deployment & GitHub repo |
| **★ Bonus 1: Creator Verification Signals** | **+5%** | AI-Powered Technical Verification Interview: interactive Gemini 1.5 Flash chat assessing prompt engineering, diffusion pipelines, style consistency, and issuing verified trust badges. | `/profile/verify`<br>`/api/ai/verify`<br>`src/app/profile/verify/page.tsx` |
| **★ Bonus 2: AI-Assisted Brief Builder** | **+5%** | Transforms rough brand campaign thoughts into structured, technical production briefs with suggested AI pipelines, budgets, and aspect ratios. | `/api/client/briefs/generate` & Brief Builder Modal |

---

## 2. System Architecture & Routes

### A. Public & Landing Routes
- `/` — High-converting landing page with cinematic hero, AI creator showcase, brand trust metrics, and dual-role modal.
- `/?auth=creator` or `/?auth=client` — Triggers dedicated sign-in/registration modals directly.

### B. Client & Agency Portal
- `/dashboard` — Pinterest-style Masonry Reel discovery feed, AI workflow inspector, creative brief management, milestone escrow vault, and creator pipeline.
- `/api/client/briefs` — Secure REST endpoint for fetching and creating campaign briefs with MongoDB Atlas persistence.

### C. Creator Studio Portal
- `/(auth)/login` — 3D Editorial Creator login with Google SSO, email authentication, and demo quick-fill.
- `/(auth)/register` — Creator onboarding registration with email verification.
- `/profile/verification-choice` — Selection screen to verify creator credentials via AI Interview or portfolio review.
- `/profile/verify` — Interactive AI Technical Quiz interview powered by Google Gemini 1.5 Flash.
- `/profile/edit` — Creator profile editor for updating tools, models, bio, specializations, and portfolio items.
- `/dashboard/creator` — Full Creator Studio Dashboard with metrics (Views, Briefs, AI Match Score), curated commercial briefs (e.g. Nike India, ₹25k), and creative logs.
- `/dashboard/briefs` — Dedicated listing of all open brand briefs ready for proposals.

### D. API & Security Layer
- `/api/auth/sync-user` — Synchronizes Firebase authenticated users to MongoDB Atlas (`User`, `CreatorProfile`, `BrandProfile`).
- `/api/auth/send-otp` — Brevo email OTP service for passwordless verification.
- `/api/ai/verify` — Gemini 1.5 Flash technical evaluation engine for creator certification.
- `src/middleware.ts` — Edge middleware protecting private client/creator dashboards while preventing redirect loops.

---

## 3. Data Models (Prisma MongoDB)

- **`User`**: ID, name, email, role (`CREATOR` | `BRAND`), image, timestamps.
- **`CreatorProfile`**: bio, experienceLevel, skills (`String[]`), specializations (`String[]`), tools (`String[]`), isVerified (`Boolean`), verificationScore (`Int`), portfolioItems, creatorLogs.
- **`PortfolioItem`**: title, mediaUrl, contentType ("Video", "Image", "3D"), toolsUsed (`String[]`), workflow (prompts, pipeline, model).
- **`CreatorLog`**: micro-updates and experiments documenting prompt pipelines.
- **`BrandProfile`**: companyName, industry, website.
- **`Brief`**: title, description, contentTypes, styles, formats (`16:9`, `9:16`), budgetRange, commercialUse ("Full Ownership", "Limited"), isActive.

---

## 4. Key Design System Tokens

- **Background Surface**: `#FAF9F5` (Warm Alabaster / Editorial Cream)
- **Primary Text**: `#1B1C16` (Deep Charcoal Ink)
- **Accent Brand Gold**: `#D3A373` (Caramel Gold)
- **Card Background**: `#FFFFFF` with `#E4E3D9` border accents
- **Muted Text**: `#50453B` and `#82756A`
- **Success / Escrow Badge**: `#DFE7BF` with `#5A6242` text
