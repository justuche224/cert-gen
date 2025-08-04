import { NextRequest, NextResponse } from "next/server";
import db from "@/db";
import { customTemplate } from "@/db/schema";
import { serverAuth } from "@/lib/server-auth";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

const updateTemplateSchema = z.object({
  name: z.string().min(1, "Template name is required").optional(),
  description: z.string().optional(),
  templateData: z.string().min(1, "Template data is required").optional(),
  preview: z.string().optional(),
  isPublic: z.boolean().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await serverAuth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const template = await db
      .select()
      .from(customTemplate)
      .where(
        and(
          eq(customTemplate.id, id),
          eq(customTemplate.userId, user.id)
        )
      )
      .limit(1);

    if (template.length === 0) {
      return NextResponse.json(
        { error: "Template not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(template[0]);
  } catch (error) {
    console.error("Error fetching template:", error);
    return NextResponse.json(
      { error: "Failed to fetch template" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await serverAuth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = updateTemplateSchema.parse(body);

    const updatedTemplate = await db
      .update(customTemplate)
      .set({
        ...validatedData,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(customTemplate.id, id),
          eq(customTemplate.userId, user.id)
        )
      )
      .returning();

    if (updatedTemplate.length === 0) {
      return NextResponse.json(
        { error: "Template not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedTemplate[0]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error updating template:", error);
    return NextResponse.json(
      { error: "Failed to update template" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await serverAuth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const deletedTemplate = await db
      .delete(customTemplate)
      .where(
        and(
          eq(customTemplate.id, id),
          eq(customTemplate.userId, user.id)
        )
      )
      .returning();

    if (deletedTemplate.length === 0) {
      return NextResponse.json(
        { error: "Template not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Template deleted successfully" });
  } catch (error) {
    console.error("Error deleting template:", error);
    return NextResponse.json(
      { error: "Failed to delete template" },
      { status: 500 }
    );
  }
}
