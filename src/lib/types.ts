import type { ComponentType } from "react";

export interface CertificateData {
  id?: string;
  certificateTitle: string;
  recipientName: string;
  courseName: string;
  issuerName: string;
  date: string;
  textColor: string;
  fontFamily: string;
  primaryColor: string;
  secondaryColor: string;
  aspectRatio: string;
  logoUrl: string | null;
  logoPosition: string;
  logoScale: number;
  logoOpacity: number;
}

export type TemplateComponent = ComponentType<CertificateData>;

export interface TemplateInfo {
  id: string;
  name: string;
  description: string;
  preview: string;
  aiHint: string;
  component: TemplateComponent;
}

export interface Certificate {
  id: string;
  certificateTitle: string;
  recipientName: string;
  courseAchievement: string;
  issuer: string;
  date: Date;
  docLink: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface TemplateElement {
  id: string;
  type: "text" | "shape" | "image" | "divider";
  content: string;
  shapeType?:
    | "rectangle"
    | "circle"
    | "triangle"
    | "diamond"
    | "star"
    | "hexagon";
  style: {
    position: { x: number; y: number };
    size: { width: number; height: number };
    color?: string;
    backgroundColor?: string;
    fontSize?: number;
    fontWeight?: string;
    fontFamily?: string;
    textAlign?: "left" | "center" | "right";
    borderRadius?: number;
    border?: string;
    opacity?: number;
    zIndex?: number;
  };
  binding?: keyof CertificateData;
}

export interface CustomTemplateData {
  elements: TemplateElement[];
  dimensions: { width: number; height: number };
  backgroundColor: string;
}

export interface CustomTemplate {
  id: string;
  name: string;
  description: string;
  templateData: string;
  preview?: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface ExtendedTemplateInfo extends TemplateInfo {
  isCustom?: boolean;
  customTemplateData?: CustomTemplateData;
}
