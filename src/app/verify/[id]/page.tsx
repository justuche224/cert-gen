"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  XCircle,
  Loader,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { format } from "date-fns";
import type { Certificate } from "@/lib/types";

export default function VerifyCertificatePage() {
  const params = useParams();
  const id = params.id as string;

  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchCertificate = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`/api/certificates/verify/${id}`);
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.error || "Failed to verify certificate.");
          }
          setCertificate(data.certificate);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchCertificate();
    }
  }, [id]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center gap-4">
          <Loader className="w-12 h-12 animate-spin text-primary" />
          <p className="text-lg text-muted-foreground">
            Verifying certificate...
          </p>
        </div>
      );
    }

    if (error) {
      return (
        <Card className="w-full max-w-2xl border-destructive bg-destructive/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <XCircle className="w-8 h-8" />
              Verification Failed
            </CardTitle>
            <CardDescription className="text-destructive">
              This certificate could not be verified. It may be invalid or
              tampered with.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-mono bg-destructive/20 p-2 rounded-md">
              {error}
            </p>
          </CardContent>
        </Card>
      );
    }

    if (certificate) {
      return (
        <Card className="w-full max-w-2xl border-green-500 bg-green-500/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-green-600">
              <CheckCircle className="w-8 h-8" />
              Certificate Verified
            </CardTitle>
            <CardDescription className="text-green-700">
              This certificate is authentic and has been verified in our
              records.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-background/50 border">
              <h3 className="text-2xl font-bold text-primary">
                {certificate.certificateTitle}
              </h3>
              <p className="text-muted-foreground mt-1">
                Awarded To:
                <span className="font-semibold text-foreground ml-2">
                  {certificate.recipientName}
                </span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-3 rounded-md bg-background/50 border">
                <p className="text-muted-foreground">Achievement</p>
                <p className="font-semibold">{certificate.courseAchievement}</p>
              </div>
              <div className="p-3 rounded-md bg-background/50 border">
                <p className="text-muted-foreground">Issuer</p>
                <p className="font-semibold">{certificate.issuer}</p>
              </div>
              <div className="p-3 rounded-md bg-background/50 border">
                <p className="text-muted-foreground">Date Issued</p>
                <p className="font-semibold">
                  {format(new Date(certificate.date), "MMMM dd, yyyy")}
                </p>
              </div>
              <div className="p-3 rounded-md bg-background/50 border">
                <p className="text-muted-foreground">Unique ID</p>
                <p className="font-mono text-xs">{certificate.id}</p>
              </div>
            </div>

            <Button asChild className="w-full mt-4">
              <a
                href={certificate.docLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2" />
                View Original Document
              </a>
            </Button>
          </CardContent>
        </Card>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-muted p-4 sm:p-6 md:p-8">
      <div className="flex items-center gap-2 mb-8">
        <ShieldCheck className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-center">
          Certificate Verification
        </h1>
      </div>
      <div className="w-full max-w-2xl">{renderContent()}</div>
      <Button variant="link" asChild className="mt-8">
        <a href="/">Return to Home</a>
      </Button>
    </div>
  );
}
