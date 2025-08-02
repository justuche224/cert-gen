"use client";

import React, { useState, useRef, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import JSZip from "jszip";
import Papa from "papaparse";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Award, Bot, Download, FileText, Loader2, Upload, X, Zap } from "lucide-react";
import Image from "next/image";

import { certificateImprovementFeedback } from "@/ai/flows/certificate-improvement-feedback";
import { type CertificateData, type TemplateComponent } from "@/lib/types";
import { templates } from "@/lib/templates";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  recipientName: z.string().min(1, "Recipient name is required."),
  courseName: z.string().min(1, "Course or achievement is required."),
  issuerName: z.string().min(1, "Issuer name is required."),
  date: z.string().min(1, "Date is required."),
  textColor: z.string().regex(/^#[0-9a-f]{6}$/i, "Must be a valid hex color."),
  fontFamily: z.string().min(1, "Font is required."),
  primaryColor: z.string().regex(/^#[0-9a-f]{6}$/i, "Must be a valid hex color."),
  secondaryColor: z.string().regex(/^#[0-9a-f]{6}$/i, "Must be a valid hex color."),
  aspectRatio: z.string().min(1, "Aspect ratio is required."),
});

const aspectRatios: { [key: string]: { name: string, className: string, pdfOptions: { w: number, h: number} } } = {
  'landscape': { name: 'Landscape (16:9)', className: 'w-[1000px] h-[563px]', pdfOptions: { w: 1000, h: 563 } },
  'portrait': { name: 'Portrait (9:16)', className: 'w-[563px] h-[1000px]', pdfOptions: { w: 563, h: 1000 } },
  'square': { name: 'Square (1:1)', className: 'w-[800px] h-[800px]', pdfOptions: { w: 800, h: 800 } },
  'a4-landscape': { name: 'A4 Landscape', className: 'w-[1000px] h-[707px]', pdfOptions: { w: 1000, h: 707 } },
};

export default function CertMasterPage() {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(templates[0].id);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isGeneratingZip, setIsGeneratingZip] = useState(false);
  const [isGettingFeedback, setIsGettingFeedback] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  const certificateRef = useRef<HTMLDivElement>(null);
  const csvInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipientName: "Jane Doe",
      courseName: "Mastering Next.js",
      issuerName: "CertMaster Academy",
      date: format(new Date(), "yyyy-MM-dd"),
      textColor: "#1f2937",
      fontFamily: "Inter",
      primaryColor: "#0284c7",
      secondaryColor: "#eab308",
      aspectRatio: "a4-landscape",
    },
  });

  const watchedData = form.watch();
  const selectedAspectRatio = aspectRatios[watchedData.aspectRatio] || aspectRatios['a4-landscape'];

  const SelectedTemplateComponent = useMemo(() => {
    return templates.find((t) => t.id === selectedTemplateId)?.component as TemplateComponent | undefined;
  }, [selectedTemplateId]);

  const handleSingleDownload = async () => {
    if (!certificateRef.current) return;
    setIsGeneratingPdf(true);
    try {
      const canvas = await html2canvas(certificateRef.current, { scale: 3, backgroundColor: null });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ 
        orientation: selectedAspectRatio.pdfOptions.w > selectedAspectRatio.pdfOptions.h ? "landscape" : "portrait", 
        unit: "px", 
        format: [selectedAspectRatio.pdfOptions.w, selectedAspectRatio.pdfOptions.h] 
      });
      pdf.addImage(imgData, "PNG", 0, 0, selectedAspectRatio.pdfOptions.w, selectedAspectRatio.pdfOptions.h);
      pdf.save(`${watchedData.recipientName.replace(/ /g, "_")}_certificate.pdf`);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate PDF.",
      });
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleBulkGenerate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsGeneratingZip(true);
    Papa.parse<Omit<CertificateData, 'textColor' | 'fontFamily' | 'primaryColor' | 'secondaryColor'>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          const zip = new JSZip();
          
          for (const row of results.data) {
            if(!row.recipientName || !row.courseName || !row.issuerName || !row.date) continue;
            
            const tempFormValues = { ...watchedData, ...row };
            
            const tempDiv = document.createElement('div');
            tempDiv.style.position = 'absolute';
            tempDiv.style.left = '-9999px';
            const { w, h } = selectedAspectRatio.pdfOptions;
            tempDiv.style.width = `${w}px`;
            tempDiv.style.height = `${h}px`;
            document.body.appendChild(tempDiv);
            
            const { renderToStaticMarkup } = await import('react-dom/server');
            const { default: React } = await import('react');

            if (SelectedTemplateComponent) {
                const staticCert = React.createElement(SelectedTemplateComponent, tempFormValues);
                tempDiv.innerHTML = renderToStaticMarkup(staticCert);
                
                const canvas = await html2canvas(tempDiv, { scale: 2, backgroundColor: null });
                const pdf = new jsPDF({ 
                  orientation: w > h ? "landscape" : "portrait", 
                  unit: "px", 
                  format: [w, h] 
                });
                pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, w, h);
                const pdfBlob = pdf.output('blob');
                zip.file(`${row.recipientName.replace(/ /g, "_")}.pdf`, pdfBlob);

                document.body.removeChild(tempDiv);
            }
          }
          
          const zipBlob = await zip.generateAsync({ type: "blob" });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(zipBlob);
          link.download = "certificates.zip";
          link.click();

          toast({
            title: "Success!",
            description: `Successfully generated ${results.data.length} certificates.`,
          });
        } catch (error) {
          console.error(error);
          toast({
            variant: "destructive",
            title: "Bulk Generation Error",
            description: "An error occurred while generating certificates.",
          });
        } finally {
          setIsGeneratingZip(false);
          if (csvInputRef.current) csvInputRef.current.value = "";
        }
      },
      error: (error) => {
        console.error(error);
        toast({
          variant: "destructive",
          title: "CSV Parsing Error",
          description: "Could not parse the CSV file.",
        });
        setIsGeneratingZip(false);
      },
    });
  };

  const handleGetFeedback = async () => {
    setIsGettingFeedback(true);
    setFeedback(null);
    setFeedbackError(null);
    try {
      const currentValues = form.getValues();
      const templateStyle = templates.find(t => t.id === selectedTemplateId)?.description || 'default';
      const result = await certificateImprovementFeedback({
        certificateText: `Recipient: ${currentValues.recipientName}, Course: ${currentValues.courseName}, Issuer: ${currentValues.issuerName}, Date: ${currentValues.date}`,
        templateStyle: templateStyle,
      });
      setFeedback(result.feedback);
    } catch (error) {
      console.error("AI Feedback Error:", error);
      setFeedbackError("Failed to get AI feedback. Please try again.");
    } finally {
      setIsGettingFeedback(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <header className="flex items-center h-16 px-4 md:px-6 border-b shrink-0 bg-card">
        <div className="flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-semibold tracking-tight">CertMaster</h1>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-[1fr_2fr] gap-0">
        <div className="lg:col-span-1 xl:col-span-1 bg-card border-r">
          <ScrollArea className="h-[calc(100vh-4rem)]">
            <div className="p-6 space-y-8">
              <section>
                <h2 className="text-xl font-semibold mb-4">1. Select a Template</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplateId(template.id)}
                      className={`rounded-lg border-2 overflow-hidden transition-all duration-200 ${
                        selectedTemplateId === template.id
                          ? "border-primary ring-2 ring-primary ring-offset-2"
                          : "border-transparent hover:border-primary"
                      }`}
                    >
                      <Image
                        src={template.preview}
                        alt={template.name}
                        width={150}
                        height={105}
                        className="object-cover w-full h-auto"
                        data-ai-hint={template.aiHint}
                      />
                      <p className="text-xs p-1 bg-muted/50 truncate">{template.name}</p>
                    </button>
                  ))}
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold mb-4">2. Customize Content</h2>
                <Form {...form}>
                  <form className="space-y-4">
                    <FormField
                      control={form.control}
                      name="recipientName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Recipient Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="courseName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course / Achievement</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="issuerName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Issuer</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                     <h3 className="text-lg font-medium pt-4">Design</h3>
                     <FormField
                        control={form.control}
                        name="aspectRatio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Aspect Ratio</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select an aspect ratio" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Object.entries(aspectRatios).map(([key, value]) => (
                                  <SelectItem key={key} value={key}>{value.name}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="textColor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Text Color</FormLabel>
                             <FormControl>
                                <div className="relative">
                                    <Input {...field} className="pr-10"/>
                                    <Input type="color" value={field.value} onChange={field.onChange} className="absolute top-0 right-0 h-full w-8 p-1 appearance-none bg-transparent border-none cursor-pointer"/>
                                </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="fontFamily"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Font</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a font" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Inter">Inter</SelectItem>
                                <SelectItem value="Georgia">Georgia</SelectItem>
                                <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                                <SelectItem value="Arial">Arial</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="primaryColor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Primary Color</FormLabel>
                             <FormControl>
                                <div className="relative">
                                    <Input {...field} className="pr-10"/>
                                    <Input type="color" value={field.value} onChange={field.onChange} className="absolute top-0 right-0 h-full w-8 p-1 appearance-none bg-transparent border-none cursor-pointer"/>
                                </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="secondaryColor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Secondary Color</FormLabel>
                             <FormControl>
                                <div className="relative">
                                    <Input {...field} className="pr-10"/>
                                    <Input type="color" value={field.value} onChange={field.onChange} className="absolute top-0 right-0 h-full w-8 p-1 appearance-none bg-transparent border-none cursor-pointer"/>
                                </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </form>
                </Form>
              </section>

              <Separator />

              <section className="space-y-4">
                <h2 className="text-xl font-semibold">3. Generate & Download</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={handleSingleDownload} disabled={isGeneratingPdf || isGeneratingZip} className="w-full">
                    {isGeneratingPdf ? <Loader2 className="animate-spin" /> : <Download />}
                    Download PDF
                  </Button>
                  <Button onClick={() => csvInputRef.current?.click()} disabled={isGeneratingZip || isGeneratingPdf} variant="outline" className="w-full">
                    {isGeneratingZip ? <Loader2 className="animate-spin" /> : <Upload />}
                    Bulk from CSV
                  </Button>
                  <input
                    type="file"
                    ref={csvInputRef}
                    onChange={handleBulkGenerate}
                    accept=".csv"
                    className="hidden"
                  />
                </div>
                <p className="text-xs text-muted-foreground">For bulk generation, use a CSV with headers: `recipientName`, `courseName`, `issuerName`, `date`.</p>
              </section>
              
              <Separator />

              <section>
                 <Card className="bg-primary/5 border-primary/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Zap className="text-primary"/>
                            AI Improvement Tool
                        </CardTitle>
                        <CardDescription>Get AI-powered feedback on your certificate's design and content.</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button onClick={handleGetFeedback} disabled={isGettingFeedback} className="w-full" variant="secondary">
                           {isGettingFeedback ? <Loader2 className="animate-spin"/> : <Bot/>}
                            Analyze Certificate
                        </Button>
                    </CardFooter>
                 </Card>
              </section>
            </div>
          </ScrollArea>
        </div>

        <div className="lg:col-span-2 xl:col-span-1 bg-background flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
          <div
            ref={certificateRef}
            className={cn(
              "transform scale-[0.35] sm:scale-[0.5] md:scale-[0.6] lg:scale-[0.5] xl:scale-[0.7] 2xl:scale-[0.8] origin-center shadow-2xl rounded-lg bg-white transition-all duration-300",
               selectedAspectRatio.className
            )}
          >
            {SelectedTemplateComponent && <SelectedTemplateComponent {...watchedData} />}
          </div>
        </div>
      </main>

      <AlertDialog open={!!feedback || !!feedbackError} onOpenChange={() => { setFeedback(null); setFeedbackError(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
                <Bot /> AI Feedback
            </AlertDialogTitle>
            <AlertDialogDescription>
              {feedback && <div className="prose prose-sm max-w-none whitespace-pre-wrap">{feedback}</div>}
              {feedbackError && <p className="text-destructive">{feedbackError}</p>}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Got it!</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
