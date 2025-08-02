import type { ComponentType } from "react";

export interface CertificateData {
  recipientName: string;
  courseName: string;
  issuerName: string;
  date: string;
  textColor: string;
  fontFamily: string;
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
