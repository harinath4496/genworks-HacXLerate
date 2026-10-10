import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import {
  requireClientAuth,
  sanitizeInput,
  applySecurityHeaders,
} from "@/lib/security";

/**
 * GET /api/client/briefs - Secure Retrieval of Client Briefs
 */
export async function GET(req: NextRequest) {
  const auth = await requireClientAuth(req);
  if (!auth.authenticated) {
    return auth.response;
  }

  try {
    const db = await getDb();
    const briefs = db.collection("Brief");

    const clientBriefs = await briefs
      .find({ clientEmail: auth.user.email })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    const res = NextResponse.json({
      success: true,
      count: clientBriefs.length,
      briefs: clientBriefs,
    });

    return applySecurityHeaders(res);
  } catch (err: unknown) {
    console.error("[API Error] GET /api/client/briefs:", err);
    const res = NextResponse.json(
      { success: false, error: "Failed to retrieve campaign briefs." },
      { status: 500 }
    );
    return applySecurityHeaders(res);
  }
}

/**
 * POST /api/client/briefs - Secure Creation of Client Campaign Brief
 */
export async function POST(req: NextRequest) {
  const auth = await requireClientAuth(req);
  if (!auth.authenticated) {
    return auth.response;
  }

  try {
    const rawBody = await req.json();
    const body = sanitizeInput(rawBody);

    const {
      title,
      aspectRatio,
      aiPipeline,
      deliverablesCount,
      budgetUsd,
      timeline,
      visualDirective,
    } = body;

    if (!title || typeof title !== "string") {
      const res = NextResponse.json(
        { success: false, error: "Brief title is required." },
        { status: 400 }
      );
      return applySecurityHeaders(res);
    }

    const db = await getDb();
    const briefs = db.collection("Brief");

    const newBrief = {
      clientEmail: auth.user.email,
      clientName: auth.user.name,
      title: title.slice(0, 150),
      aspectRatio: aspectRatio || "9:16",
      aiPipeline: aiPipeline || "ComfyUI + Runway Gen-3",
      deliverablesCount: Number(deliverablesCount) || 1,
      budgetUsd: Number(budgetUsd) || 1200,
      timeline: timeline || "48 Hours",
      visualDirective: typeof visualDirective === "string" ? visualDirective.slice(0, 2000) : "",
      status: "OPEN_FOR_DIRECTORS",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const insertResult = await briefs.insertOne(newBrief);

    const res = NextResponse.json({
      success: true,
      message: "Brief registered and escrow reservation initialized.",
      briefId: insertResult.insertedId,
      brief: newBrief,
    });

    return applySecurityHeaders(res);
  } catch (err: unknown) {
    console.error("[API Error] POST /api/client/briefs:", err);
    const res = NextResponse.json(
      { success: false, error: "Failed to create campaign brief." },
      { status: 500 }
    );
    return applySecurityHeaders(res);
  }
}
