import { type TemplateInfo } from "@/lib/types";
import { TemplateModern } from "@/components/templates/modern";
import { TemplateClassic } from "@/components/templates/classic";
import { TemplateFormal } from "@/components/templates/formal";

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
    id: "formal",
    name: "Formal",
    description: "A formal and official-looking certificate with a seal and sophisticated typography.",
    preview: "https://placehold.co/300x210.png",
    aiHint: "formal certificate",
    component: TemplateFormal,
  },
];
