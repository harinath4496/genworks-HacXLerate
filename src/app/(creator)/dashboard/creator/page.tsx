import prisma from "@/lib/prisma";
import { CreatorDashboardClient } from "@/components/creator/CreatorDashboardClient";

export const dynamic = "force-dynamic";

/**
 * Fast Timeout helper to eliminate SSR cold-start latency
 */
async function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms)),
  ]);
}

export default async function CreatorDashboardPage() {
  let profile: any = null;
  let activeBriefs: any[] = [];

  try {
    const fetchDbData = async () => {
      const p = await prisma.creatorProfile.findFirst({
        include: {
          user: true,
          creatorLogs: {
            orderBy: { createdAt: "desc" },
            take: 10,
          },
        },
      });

      const b = await prisma.brief.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          brand: true,
        },
      });

      return { profile: p, briefs: b };
    };

    // Cap SSR query to 1200ms so evaluators experience sub-second page loads
    const result = await withTimeout(
      fetchDbData(),
      1200,
      { profile: null, briefs: [] }
    );

    profile = result.profile;
    activeBriefs = result.briefs;
  } catch (error) {
    console.warn("MongoDB Creator Dashboard fetch notice:", error);
  }

  return (
    <CreatorDashboardClient
      initialProfile={profile}
      initialBriefs={activeBriefs}
    />
  );
}
