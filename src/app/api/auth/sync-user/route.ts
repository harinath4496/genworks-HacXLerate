/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firebaseUid, email, name, role } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Connect to MongoDB using Prisma
    // Upsert User: if exists, return. if not, create.
    const user = await prisma.user.upsert({
      where: { email },
      update: {}, // No updates if they exist
      create: {
        email,
        name: name || "",
        role: role || "CREATOR",
      },
    });

    // If it's a creator, create an empty profile linked to them
    if (user.role === "CREATOR") {
      const existingProfile = await prisma.creatorProfile.findUnique({
        where: { userId: user.id },
      });

      if (!existingProfile) {
        await prisma.creatorProfile.create({
          data: {
            userId: user.id,
          },
        });
      }
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error: any) {
    console.error("Error syncing user to MongoDB:", error);
    return NextResponse.json({ error: "Failed to sync user" }, { status: 500 });
  }
}
