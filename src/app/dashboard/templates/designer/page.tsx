"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TemplateDesigner } from "@/components/template-designer";
import {
  CustomTemplateData,
  CertificateData,
  CustomTemplate,
} from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

function DesignerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const { toast } = useToast();

  const [initialData, setInitialData] = useState<
    CustomTemplateData | undefined
  >();
  const [loading, setLoading] = useState(!!editId);

  const sampleCertificateData: CertificateData = {
    certificateTitle: "Certificate of Completion",
    recipientName: "Jane Doe",
    courseName: "Advanced Web Development",
    issuerName: "Tech Academy",
    date: "2024-01-15",
    textColor: "#1f2937",
    fontFamily: "Inter",
    primaryColor: "#0284c7",
    secondaryColor: "#eab308",
    aspectRatio: "a4-landscape",
    logoUrl: null,
    logoPosition: "top-left",
    logoScale: 20,
    logoOpacity: 1,
  };

  useEffect(() => {
    if (editId) {
      fetchTemplate(editId);
    }
  }, [editId]);

  const fetchTemplate = async (id: string) => {
    try {
      const response = await fetch(`/api/templates/${id}`);
      if (response.ok) {
        const template: CustomTemplate = await response.json();
        setInitialData(JSON.parse(template.templateData));
      } else {
        throw new Error("Failed to fetch template");
      }
    } catch (error) {
      console.error("Error fetching template:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load template for editing",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (
    templateData: CustomTemplateData,
    name: string,
    description: string
  ) => {
    try {
      const url = editId ? `/api/templates/${editId}` : "/api/templates";
      const method = editId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          templateData: JSON.stringify(templateData),
          isPublic: false,
        }),
      });

      if (response.ok) {
        toast({
          title: editId ? "Template updated" : "Template created",
          description: `Template has been ${
            editId ? "updated" : "created"
          } successfully`,
        });
        router.push("/dashboard/templates");
      } else {
        throw new Error(`Failed to ${editId ? "update" : "create"} template`);
      }
    } catch (error) {
      console.error("Error saving template:", error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading template...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/templates">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Templates
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">
            {editId ? "Edit Template" : "Create New Template"}
          </h1>
        </div>
      </div>
      <TemplateDesigner
        onSave={handleSave}
        initialData={initialData}
        certificateData={sampleCertificateData}
      />
    </div>
  );
}

export default function DesignerPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DesignerContent />
    </Suspense>
  );
}
