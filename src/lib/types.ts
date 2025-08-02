import type { ComponentType } from "react";

export interface CertificateData {
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
  logoPosition: { x: number; y: number };
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
