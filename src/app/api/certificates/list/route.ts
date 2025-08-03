import { NextRequest, NextResponse } from "next/server";
import db from "@/db";
import { certificate } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { serverAuth } from "@/lib/server-auth";

export async function GET(request: NextRequest) {
  try {
    const user = await serverAuth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const certificates = await db
      .select()
      .from(certificate)
      .where(eq(certificate.userId, user.id))
      .orderBy(desc(certificate.createdAt));

    return NextResponse.json({
      success: true,
      certificates,
    });

  } catch (error) {
    console.error("Error fetching certificates:", error);
    return NextResponse.json(
      { error: "Failed to fetch certificates" },
      { status: 500 }
    );
  }
}