import prisma from "@/lib/prisma";
import { CreatorDashboardClient } from "@/components/creator/CreatorDashboardClient";

export const dynamic = "force-dynamic";

export default async function CreatorDashboardPage() {
  let profile: any = null;
  let activeBriefs: any[] = [];

  try {
    profile = await prisma.creatorProfile.findFirst({
      include: {
        user: true,
        creatorLogs: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });

    activeBriefs = await prisma.brief.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        brand: true,
      },
    });
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
