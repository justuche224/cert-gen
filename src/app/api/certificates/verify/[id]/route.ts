import { NextRequest, NextResponse } from "next/server";
import db from "@/db";
import { certificate } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Certificate ID is required" },
        { status: 400 }
      );
    }

    const foundCertificate = await db.query.certificate.findFirst({
      where: eq(certificate.id, id),
    });

    if (!foundCertificate) {
      return NextResponse.json(
        { error: "Certificate not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      certificate: foundCertificate,
    });
  } catch (error) {
    console.error("Error verifying certificate:", error);
    return NextResponse.json(
      { error: "Failed to verify certificate" },
      { status: 500 }
    );
  }
}
