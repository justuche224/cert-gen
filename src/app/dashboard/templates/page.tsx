"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Copy, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CustomTemplate } from "@/lib/types";

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<CustomTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTemplateId, setDeleteTemplateId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch("/api/templates");
      if (response.ok) {
        const data = await response.json();
        setTemplates(data);
      } else {
        throw new Error("Failed to fetch templates");
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load templates",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteTemplate = async (id: string) => {
    try {
      const response = await fetch(`/api/templates/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTemplates(templates.filter((t) => t.id !== id));
        toast({
          title: "Template deleted",
          description: "Template has been deleted successfully",
        });
      } else {
        throw new Error("Failed to delete template");
      }
    } catch (error) {
      console.error("Error deleting template:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete template",
      });
    }
    setDeleteTemplateId(null);
  };

  const duplicateTemplate = async (template: CustomTemplate) => {
    try {
      const response = await fetch("/api/templates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${template.name} (Copy)`,
          description: template.description,
          templateData: template.templateData,
          isPublic: false,
        }),
      });

      if (response.ok) {
        const newTemplate = await response.json();
        setTemplates([...templates, newTemplate]);
        toast({
          title: "Template duplicated",
          description: "Template has been duplicated successfully",
        });
      } else {
        throw new Error("Failed to duplicate template");
      }
    } catch (error) {
      console.error("Error duplicating template:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to duplicate template",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading templates...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Templates</h1>
          <p className="text-muted-foreground mt-2">
            Create and manage your custom certificate templates
          </p>
        </div>
        <Link href="/dashboard/templates/designer">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Template
          </Button>
        </Link>
      </div>

      {templates.length === 0 ? (
        <Card className="text-center py-16">
          <CardContent>
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-2">No templates yet</h3>
            <p className="text-muted-foreground mb-6">
              Start creating your first custom template to match your brand
            </p>
            <Link href="/dashboard/templates/designer">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Template
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates.map((template) => (
            <Card
              key={template.id}
              className="group hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-2">
                <div className="aspect-[4/3] bg-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                  {template.preview ? (
                    <Image
                      src={template.preview}
                      alt={template.name}
                      width={300}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="text-gray-400 text-4xl">🎨</div>
                  )}
                </div>
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {template.description}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span>{template.isPublic ? "Public" : "Private"}</span>
                  <span>
                    {new Date(template.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/dashboard/templates/designer?edit=${template.id}`}
                    className="flex-1"
                  >
                    <Button variant="outline" size="sm" className="w-full">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => duplicateTemplate(template)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeleteTemplateId(template.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog
        open={!!deleteTemplateId}
        onOpenChange={() => setDeleteTemplateId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Template</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this template? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                deleteTemplateId && deleteTemplate(deleteTemplateId)
              }
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
