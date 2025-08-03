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
