import { NextRequest, NextResponse } from "next/server";
import db from "@/db";
import { customTemplate } from "@/db/schema";
import { serverAuth } from "@/lib/server-auth";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

const createTemplateSchema = z.object({
  name: z.string().min(1, "Template name is required"),
  description: z.string().optional().default(""),
  templateData: z.string().min(1, "Template data is required"),
  preview: z.string().optional(),
  isPublic: z.boolean().default(false),
});

export async function GET() {
  try {
    const user = await serverAuth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userTemplates = await db
      .select()
      .from(customTemplate)
      .where(eq(customTemplate.userId, user.id));

    const publicTemplates = await db
      .select()
      .from(customTemplate)
      .where(
        and(
          eq(customTemplate.isPublic, true),
          eq(customTemplate.userId, user.id)
        )
      );

    return NextResponse.json([...userTemplates, ...publicTemplates]);
  } catch (error) {
    console.error("Error fetching templates:", error);
    return NextResponse.json(
      { error: "Failed to fetch templates" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await serverAuth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = createTemplateSchema.parse(body);
    const newTemplate = await db
      .insert(customTemplate)
      .values({
        id: crypto.randomUUID(),
        ...validatedData,
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
    return NextResponse.json(newTemplate[0], { status: 201 });
  } catch (error) {
    console.error("Error creating template:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: error.errors,
          message: error.errors
            .map((e) => `${e.path.join(".")}: ${e.message}`)
            .join(", "),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create template" },
      { status: 500 }
    );
  }
}
