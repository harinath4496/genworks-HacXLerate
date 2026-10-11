import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * GET /api/creators — Real-Time Retrieval of Verified AI Creators & Portfolios from MongoDB
 */
export async function GET() {
  try {
    const creators = await prisma.creatorProfile.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
          },
        },
        portfolioItems: true,
        creatorLogs: {
          orderBy: {
            createdAt: "desc",
          },
          take: 5,
        },
      },
      orderBy: {
        verificationScore: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      count: creators.length,
      creators,
    });
  } catch (error: any) {
    console.error("[API Error] GET /api/creators:", error.message);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch creators from database",
      },
      { status: 500 }
    );
  }
}
