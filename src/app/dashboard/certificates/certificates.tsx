"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Certificate {
  id: string;
  certificateTitle: string;
  recipientName: string;
  courseAchievement: string;
  issuer: string;
  date: string;
  docLink: string;
  createdAt: string;
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await fetch("/api/certificates/list");
      if (!response.ok) {
        throw new Error("Failed to fetch certificates");
      }
      const data = await response.json();
      setCertificates(data.certificates);
    } catch (error) {
      console.error("Error fetching certificates:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load certificates",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Award className="h-12 w-12 mx-auto mb-4 text-primary animate-spin" />
          <p>Loading your certificates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-8">
        <Award className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">My Certificates</h1>
      </div>

      {certificates.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Award className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No certificates yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first certificate to get started!
            </p>
            <Button asChild>
              <a href="/dashboard">Create Certificate</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <Card key={cert.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">
                  {cert.certificateTitle}
                </CardTitle>
                <CardDescription>
                  Awarded to {cert.recipientName}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <strong>Course:</strong> {cert.courseAchievement}
                  </p>
                  <p>
                    <strong>Issuer:</strong> {cert.issuer}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {format(new Date(cert.date), "MMM dd, yyyy")}
                  </p>
                  <p>
                    <strong>Created:</strong>{" "}
                    {format(new Date(cert.createdAt), "MMM dd, yyyy")}
                  </p>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button asChild size="sm" className="flex-1">
                    <a
                      href={cert.docLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="flex-1"
                  >
                    <a href={cert.docLink} download>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
