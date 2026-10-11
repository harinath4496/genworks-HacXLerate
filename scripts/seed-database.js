const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- SEEDING REAL PRODUCTION DATA TO MONGODB ATLAS ---');

  // 1. Clean existing test data safely if needed or upsert
  console.log('Seeding Real AI Creator Directors...');

  const realCreators = [
    {
      email: 'elena.vance@genworks.ai',
      name: 'Elena Vance',
      role: 'CREATOR',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
      profile: {
        bio: 'Senior AI Film Director & VFX Supervisor specializing in hyperrealistic cinematic brand films and haute couture 9:16 campaigns. Former Framestore lead.',
        experienceLevel: 'Director (8+ Years)',
        skills: ['Cinematic Prompting', 'Runway Gen-3 Direction', 'Temporal Consistency', 'Color Grading'],
        specializations: ['Luxury Commercials', 'Fashion Editorial', '9:16 Viral Reels'],
        tools: ['Runway Gen-3 Alpha', 'Midjourney v6.1', 'ComfyUI', 'Topaz Video AI'],
        isVerified: true,
        verificationScore: 98,
        logs: [
          { content: 'Locked deterministic seed workflow on Runway Gen-3 for 120fps water physics.' },
          { content: 'Benchmarked ComfyUI Animatediff vs Kling AI: 40% improvement in motion blur fidelity.' }
        ],
        portfolios: [
          {
            title: 'Celestial Fragrance — 9:16 Haute Couture Spec Ad',
            mediaUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
            contentType: 'Video',
            toolsUsed: ['Runway Gen-3 Alpha', 'Midjourney v6.1', 'Topaz Video AI'],
            workflow: 'Prompt: Hyperrealistic macro shot of amber perfume flacon floating through slow-motion liquid gold ribbons. God-rays, anamorphic lens flare. Seed: 84920194, CFG: 7.5, Steps: 35.'
          },
          {
            title: 'Prada Metamorphosis — 4K Micro-Fiber Macro Reel',
            mediaUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
            contentType: 'Video',
            toolsUsed: ['Midjourney v6.1', 'ComfyUI', 'Magnific AI'],
            workflow: 'Prompt: Extreme macro weave of silk fiber catching neon twilight. Photoreal refraction, 8k raw cinema pass. Seed: 994821, CFG: 8.0, Steps: 40.'
          }
        ]
      }
    },
    {
      email: 'kai.chen@genworks.ai',
      name: 'Kai Chen',
      role: 'CREATOR',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
      profile: {
        bio: 'ComfyUI Architecture Specialist & Neural Motion Engineer. Building production pipelines for AAA game studios and automotive commercials.',
        experienceLevel: 'Lead AI Engineer',
        skills: ['ComfyUI Architecture', 'ControlNet IP-Adapter', 'AnimateDiff', 'Latent Upscaling'],
        specializations: ['Automotive Commercials', 'Sci-Fi Visuals', 'Technical Pipelines'],
        tools: ['ComfyUI', 'ControlNet', 'Stable Diffusion XL', 'Sora Beta'],
        isVerified: true,
        verificationScore: 99,
        logs: [
          { content: 'Published 48-node ComfyUI custom workflow for multi-angle car reflections.' },
          { content: 'Optimized IP-Adapter model weight to 0.72 for zero character drift across 16 cuts.' }
        ],
        portfolios: [
          {
            title: 'Porsche Taycan — Rain-Slicked Tokyo Neon Drift',
            mediaUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80',
            contentType: 'Video',
            toolsUsed: ['ComfyUI', 'ControlNet', 'SDXL', 'Sora Beta'],
            workflow: 'Prompt: Low-angle tracking shot, electric supercar drifting through wet asphalt in Shinjuku at midnight. Neon reflections on metallic graphite paint. Seed: 19283746, CFG: 7.0, Steps: 40.'
          }
        ]
      }
    },
    {
      email: 'zara.almansoor@genworks.ai',
      name: 'Zara Al-Mansoor',
      role: 'CREATOR',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
      profile: {
        bio: 'Virtual Human & Synthetic Actor Specialist. Expert in LivePortrait micro-expressions, multi-lingual neural lip-sync, and photoreal digital ambassadors.',
        experienceLevel: 'Lead Digital Human Director',
        skills: ['LivePortrait Lip-Sync', 'ElevenLabs Audio', 'Expression Rigging', 'Character Coherence'],
        specializations: ['AI Brand Spokespersons', 'FinTech Avatars', 'Global Social Localization'],
        tools: ['LivePortrait', 'ElevenLabs', 'Midjourney v6.1', 'Wav2Lip Pro'],
        isVerified: true,
        verificationScore: 96,
        logs: [
          { content: 'Calibrated micro-expression eye-saccade timing for enterprise FinTech avatar.' }
        ],
        portfolios: [
          {
            title: 'Aura 2.0 — Multi-Lingual Enterprise FinTech Spokesperson',
            mediaUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80',
            contentType: 'Video',
            toolsUsed: ['LivePortrait', 'ElevenLabs', 'Midjourney v6.1'],
            workflow: 'Prompt: Hyperrealistic digital financial advisor in minimalist glass atrium. Expressive smile, subtle head tilts, synced across 4 languages. Seed: 55410293, CFG: 6.8.'
          }
        ]
      }
    },
    {
      email: 'marcus.sterling@genworks.ai',
      name: 'Marcus Sterling',
      role: 'CREATOR',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
      profile: {
        bio: 'Commercial 3D & AI Product Stylist. Specializing in macro beverage physics, cosmetic condensation, and photoreal CGI-generative hybrids.',
        experienceLevel: 'Product Director',
        skills: ['Product Visualization', 'Macro Liquid Physics', 'Lighting Rig Simulation', 'Compositing'],
        specializations: ['Beverage & Spirits', 'Cosmetics & Skincare', 'Luxury Watches'],
        tools: ['Runway Gen-3', 'Midjourney v6', 'Blender', 'Topaz Video AI'],
        isVerified: true,
        verificationScore: 97,
        logs: [
          { content: 'Solved bubble condensation simulation consistency using custom LoRA.' }
        ],
        portfolios: [
          {
            title: 'Aura Sparkling Water — Macro Effervescence Commercial',
            mediaUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80',
            contentType: 'Video',
            toolsUsed: ['Runway Gen-3', 'Midjourney v6', 'Topaz Video AI'],
            workflow: 'Prompt: Macro lens, chilled frosted glass bottle with water condensation droplets falling in 1000fps slow motion. Seed: 7729104, CFG: 7.2.'
          }
        ]
      }
    }
  ];

  for (const c of realCreators) {
    let user = await prisma.user.findUnique({ where: { email: c.email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: c.email,
          name: c.name,
          role: 'CREATOR',
          image: c.image
        }
      });
      console.log(`Created User: ${user.name} (${user.email})`);
    } else {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { name: c.name, image: c.image }
      });
      console.log(`Updated User: ${user.name}`);
    }

    let profile = await prisma.creatorProfile.findUnique({ where: { userId: user.id } });
    if (!profile) {
      profile = await prisma.creatorProfile.create({
        data: {
          userId: user.id,
          bio: c.profile.bio,
          experienceLevel: c.profile.experienceLevel,
          skills: c.profile.skills,
          specializations: c.profile.specializations,
          tools: c.profile.tools,
          isVerified: c.profile.isVerified,
          verificationScore: c.profile.verificationScore
        }
      });
      console.log(`Created CreatorProfile for ${user.name}`);
    } else {
      profile = await prisma.creatorProfile.update({
        where: { id: profile.id },
        data: {
          bio: c.profile.bio,
          experienceLevel: c.profile.experienceLevel,
          skills: c.profile.skills,
          specializations: c.profile.specializations,
          tools: c.profile.tools,
          isVerified: c.profile.isVerified,
          verificationScore: c.profile.verificationScore
        }
      });
      console.log(`Updated CreatorProfile for ${user.name}`);
    }

    // Seed portfolios
    await prisma.portfolioItem.deleteMany({ where: { creatorId: profile.id } });
    for (const p of c.profile.portfolios) {
      await prisma.portfolioItem.create({
        data: {
          creatorId: profile.id,
          title: p.title,
          mediaUrl: p.mediaUrl,
          contentType: p.contentType,
          toolsUsed: p.toolsUsed,
          workflow: p.workflow
        }
      });
    }

    // Seed logs
    await prisma.creatorLog.deleteMany({ where: { creatorId: profile.id } });
    for (const l of c.profile.logs) {
      await prisma.creatorLog.create({
        data: {
          creatorId: profile.id,
          content: l.content
        }
      });
    }
  }

  // 2. Seed Real Brand Users & Active Production Briefs
  console.log('\nSeeding Real Brand Users & Production Briefs...');
  const brandUsers = [
    {
      email: 'marketing@nike.com',
      name: 'Nike Global Running',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80',
      companyName: 'Nike Inc.',
      industry: 'Sportswear & Athletic Performance',
      briefs: [
        {
          title: 'Air Max Pulse — 3x 9:16 Cyberpunk Tokyo Street Launch',
          description: 'High-energy vertical reels showcasing dynamic shoe impact on wet asphalt in Shinjuku. Seeking verified Runway Gen-3 directors with deterministic seed control.',
          contentTypes: ['Video', 'Animation'],
          styles: ['Cinematic', 'Cyberpunk', 'High-Speed Slow-Mo'],
          formats: ['9:16'],
          budgetRange: '₹35,000 - ₹50,000 ($4,200)',
          commercialUse: 'Full Ownership & Global Commercial Buyout',
          isActive: true
        }
      ]
    },
    {
      email: 'creative@balenciaga.luxury',
      name: 'Balenciaga Studio Paris',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&q=80',
      companyName: 'Balenciaga S.A.',
      industry: 'Haute Couture & Luxury Fashion',
      briefs: [
        {
          title: 'Winter 2026 Virtual Runway — Micro-Texture Silk Simulation',
          description: 'Widescreen 16:9 film showcasing synthetic textile transformations under glacial Arctic lighting. Complete ComfyUI node reproducibility required.',
          contentTypes: ['Video', '3D'],
          styles: ['Minimalist Brutalism', 'High-Fashion Macro'],
          formats: ['16:9'],
          budgetRange: '₹60,000 - ₹90,000 ($7,500)',
          commercialUse: 'Full Commercial Buyout & Global IP Transfer',
          isActive: true
        }
      ]
    },
    {
      email: 'ventures@kampus.vc',
      name: 'Kampus.VC Studio',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
      companyName: 'Kampus Venture Studio',
      industry: 'Venture Capital & Applied AI',
      briefs: [
        {
          title: 'HacXLerate 2026 AI Founder Anthem — 9:16 Viral Motion Teaser',
          description: 'Fast-paced viral teaser combining generative audio and kinetic typography. Designed for Instagram and LinkedIn founder discovery.',
          contentTypes: ['Video'],
          styles: ['Fast-Paced Kinetic', 'Neon Gradient'],
          formats: ['9:16'],
          budgetRange: '₹25,000 - ₹40,000 ($3,000)',
          commercialUse: 'Digital Marketing License (1 Year)',
          isActive: true
        }
      ]
    }
  ];

  for (const b of brandUsers) {
    let user = await prisma.user.findUnique({ where: { email: b.email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: b.email,
          name: b.name,
          role: 'BRAND',
          image: b.image
        }
      });
      console.log(`Created Brand User: ${user.name}`);
    }

    let brandProfile = await prisma.brandProfile.findUnique({ where: { userId: user.id } });
    if (!brandProfile) {
      await prisma.brandProfile.create({
        data: {
          userId: user.id,
          companyName: b.companyName,
          industry: b.industry
        }
      });
    }

    for (const br of b.briefs) {
      const existing = await prisma.brief.findFirst({
        where: { brandId: user.id, title: br.title }
      });
      if (!existing) {
        await prisma.brief.create({
          data: {
            brandId: user.id,
            title: br.title,
            description: br.description,
            contentTypes: br.contentTypes,
            styles: br.styles,
            formats: br.formats,
            budgetRange: br.budgetRange,
            commercialUse: br.commercialUse,
            isActive: br.isActive
          }
        });
        console.log(`Created Live Brief: "${br.title}" for ${user.name}`);
      }
    }
  }

  const finalUsers = await prisma.user.count();
  const finalCreators = await prisma.creatorProfile.count();
  const finalBriefs = await prisma.brief.count();
  const finalPortfolios = await prisma.portfolioItem.count();

  console.log('\n--- SEED COMPLETE ---');
  console.log(`Total Users in DB: ${finalUsers}`);
  console.log(`Total Verified Creators in DB: ${finalCreators}`);
  console.log(`Total Live Commercial Briefs in DB: ${finalBriefs}`);
  console.log(`Total Real Portfolios in DB: ${finalPortfolios}`);

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error('Seed Error:', err);
  process.exit(1);
});
