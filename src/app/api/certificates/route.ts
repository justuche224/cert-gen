import { NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";
import db from "@/db";
import { certificate } from "@/db/schema";
import { serverAuth } from "@/lib/server-auth";

const utapi = new UTApi();

export async function POST(request: NextRequest) {
  try {
    const user = await serverAuth();
    if (!user) {
      console.log("Unauthorized");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const pdfFile = formData.get("pdf") as File;
    const certificateTitle = formData.get("certificateTitle") as string;
    const recipientName = formData.get("recipientName") as string;
    const courseName = formData.get("courseName") as string;
    const issuer = formData.get("issuer") as string;
    const date = formData.get("date") as string;

    if (!pdfFile) {
      return NextResponse.json(
        { error: "No PDF file provided" },
        { status: 400 }
      );
    }
    const uploadResponse = await utapi.uploadFiles(pdfFile);

    if (!uploadResponse.data) {
      return NextResponse.json(
        { error: "Failed to upload PDF" },
        { status: 500 }
      );
    }
    const certificateId = crypto.randomUUID();
    const docLink = uploadResponse.data.url;

    const newCertificate = await db
      .insert(certificate)
      .values({
        id: certificateId,
        certificateTitle,
        recipientName,
        courseAchievement: courseName,
        issuer,
        date: new Date(date),
        docLink,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: user.id,
      })
      .returning();
    return NextResponse.json({
      success: true,
      certificate: newCertificate[0],
      docLink,
    });
  } catch (error) {
    console.error("Certificate creation error:", error);
    return NextResponse.json(
      { error: "Failed to create certificate" },
      { status: 500 }
    );
  }
}
