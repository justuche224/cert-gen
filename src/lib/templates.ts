import {
  type TemplateInfo,
  type ExtendedTemplateInfo,
  type CustomTemplate,
  type CustomTemplateData,
} from "@/lib/types";
import { TemplateModern } from "@/components/templates/modern";
import { TemplateClassic } from "@/components/templates/classic";
import { TemplateFormal } from "@/components/templates/formal";
import { TemplatePlayful } from "@/components/templates/playful";
import { TemplateElegant } from "@/components/templates/elegant";
import { TemplateMinimalist } from "@/components/templates/minimalist";
import { TemplateCorporate } from "@/components/templates/corporate";
import { CustomTemplateRenderer } from "@/components/templates/custom-template-renderer";

export const builtInTemplates: TemplateInfo[] = [
  {
    id: "modern",
    name: "Modern",
    description:
      "A clean and modern certificate design with geometric shapes and a balanced layout.",
    preview: "/templates/modern.png",
    aiHint: "modern certificate",
    component: TemplateModern,
  },
  {
    id: "classic",
    name: "Classic",
    description:
      "A timeless certificate design with elegant borders and a traditional serif font.",
    preview: "/templates/classic.png",
    aiHint: "classic certificate",
    component: TemplateClassic,
  },
  {
    id: "elegant",
    name: "Elegant",
    description:
      "A sophisticated and elegant certificate design, perfect for prestigious awards.",
    preview: "/templates/elegant.png",
    aiHint: "elegant certificate",
    component: TemplateElegant,
  },
  {
    id: "formal",
    name: "Formal",
    description:
      "A formal and official-looking certificate with a seal and sophisticated typography.",
    preview: "/templates/formal.png",
    aiHint: "formal certificate",
    component: TemplateFormal,
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description:
      "A clean, simple design emphasizing typography and white space.",
    preview: "/templates/minimalist.png",
    aiHint: "minimalist certificate",
    component: TemplateMinimalist,
  },
  {
    id: "corporate",
    name: "Corporate",
    description:
      "A professional design suitable for business or official certifications.",
    preview: "/templates/corporate.png",
    aiHint: "corporate certificate",
    component: TemplateCorporate,
  },
  {
    id: "playful",
    name: "Playful",
    description:
      "A fun and creative certificate design with playful icons and colors.",
    preview: "/templates/playful.png",
    aiHint: "playful certificate",
    component: TemplatePlayful,
  },
];

export const templates = builtInTemplates;

export function createCustomTemplateInfo(
  customTemplate: CustomTemplate
): ExtendedTemplateInfo {
  const templateData: CustomTemplateData = JSON.parse(
    customTemplate.templateData
  );

  return {
    id: customTemplate.id,
    name: customTemplate.name,
    description: customTemplate.description,
    preview: customTemplate.preview || "/templates/custom-placeholder.svg",
    aiHint: `custom ${customTemplate.name}`,
    component: (props) =>
      CustomTemplateRenderer({
        ...props,
        templateData,
      }),
    isCustom: true,
    customTemplateData: templateData,
  };
}

export async function fetchCustomTemplates(): Promise<CustomTemplate[]> {
  try {
    const response = await fetch("/api/templates");
    if (!response.ok) {
      throw new Error("Failed to fetch custom templates");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching custom templates:", error);
    return [];
  }
}

export async function getAllTemplates(): Promise<ExtendedTemplateInfo[]> {
  const customTemplates = await fetchCustomTemplates();
  const customTemplateInfos = customTemplates.map(createCustomTemplateInfo);

  return [...builtInTemplates, ...customTemplateInfos];
}
