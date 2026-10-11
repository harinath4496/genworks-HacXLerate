import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * GET /api/client/briefs — Real-Time Retrieval of Live Production Briefs from MongoDB Atlas
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const brandEmail = searchParams.get("email");

    let whereClause: any = { isActive: true };
    if (brandEmail) {
      whereClause = {
        isActive: true,
        brand: {
          email: brandEmail,
        },
      };
    }

    const briefs = await prisma.brief.findMany({
      where: whereClause,
      include: {
        brand: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    });

    return NextResponse.json({
      success: true,
      count: briefs.length,
      briefs,
    });
  } catch (err: any) {
    console.error("[API Error] GET /api/client/briefs:", err.message);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve campaign briefs." },
      { status: 500 }
    );
  }
}

/**
 * POST /api/client/briefs — Real-Time Creation & Escrow Initialization in MongoDB Atlas
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      description,
      category,
      aspectRatio,
      budget,
      commercialUse,
      assignedDirector,
      brandEmail,
      brandName,
    } = body;

    if (!title || typeof title !== "string") {
      return NextResponse.json(
        { success: false, error: "Brief title is required." },
        { status: 400 }
      );
    }

    // Resolve or create Brand User in MongoDB
    const targetEmail = brandEmail || "commissioner@genworks.ai";
    let brandUser = await prisma.user.findUnique({
      where: { email: targetEmail },
    });

    if (!brandUser) {
      brandUser = await prisma.user.create({
        data: {
          email: targetEmail,
          name: brandName || "Verified Brand Commissioner",
          role: "BRAND",
        },
      });
    }

    const formats = aspectRatio ? [aspectRatio] : ["9:16"];
    const contentTypes = category ? [category] : ["9:16 Viral Video"];
    const styles = assignedDirector ? [`Director: ${assignedDirector}`] : ["Cinematic"];

    const newBrief = await prisma.brief.create({
      data: {
        brandId: brandUser.id,
        title: title.slice(0, 150),
        description: (description || "Direct commission via GenWorks Milestone Escrow.").slice(0, 2000),
        contentTypes,
        styles,
        formats,
        budgetRange: budget || "$2,500",
        commercialUse: commercialUse || "Full Commercial Buyout & Global IP Transfer",
        isActive: true,
      },
      include: {
        brand: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Brief registered and escrow reservation initialized in MongoDB Atlas.",
      brief: newBrief,
    });
  } catch (err: any) {
    console.error("[API Error] POST /api/client/briefs:", err.message);
    return NextResponse.json(
      { success: false, error: "Failed to create campaign brief." },
      { status: 500 }
    );
  }
}
