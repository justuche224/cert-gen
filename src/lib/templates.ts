import { type TemplateInfo } from "@/lib/types";
import { TemplateModern } from "@/components/templates/modern";
import { TemplateClassic } from "@/components/templates/classic";
import { TemplateFormal } from "@/components/templates/formal";
import { TemplatePlayful } from "@/components/templates/playful";
import { TemplateElegant } from "@/components/templates/elegant";
import { TemplateMinimalist } from "@/components/templates/minimalist";
import { TemplateCorporate } from "@/components/templates/corporate";

export const templates: TemplateInfo[] = [
  {
    id: "modern",
    name: "Modern",
    description: "A clean and modern certificate design with geometric shapes and a balanced layout.",
    preview: "https://placehold.co/300x210.png",
    aiHint: "modern certificate",
    component: TemplateModern,
  },
  {
    id: "classic",
    name: "Classic",
    description: "A timeless certificate design with elegant borders and a traditional serif font.",
    preview: "https://placehold.co/300x210.png",
    aiHint: "classic certificate",
    component: TemplateClassic,
  },
    {
    id: "elegant",
    name: "Elegant",
    description: "A sophisticated and elegant certificate design, perfect for prestigious awards.",
    preview: "https://placehold.co/300x210.png",
    aiHint: "elegant certificate",
    component: TemplateElegant,
  },
  {
    id: "formal",
    name: "Formal",
    description: "A formal and official-looking certificate with a seal and sophisticated typography.",
    preview: "https://placehold.co/300x210.png",
    aiHint: "formal certificate",
    component: TemplateFormal,
  },
    {
    id: "minimalist",
    name: "Minimalist",
    description: "A clean, simple design emphasizing typography and white space.",
    preview: "https://placehold.co/300x210.png",
    aiHint: "minimalist certificate",
    component: TemplateMinimalist,
  },
   {
    id: "corporate",
    name: "Corporate",
    description: "A professional design suitable for business or official certifications.",
    preview: "https://placehold.co/300x210.png",
    aiHint: "corporate certificate",
    component: TemplateCorporate,
  },
  {
    id: "playful",
    name: "Playful",
    description: "A fun and creative certificate design with playful icons and colors.",
    preview: "https://placehold.co/300x210.png",
    aiHint: "playful certificate",
    component: TemplatePlayful,
  },
];
