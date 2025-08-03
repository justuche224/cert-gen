import { Award, Bot, FileText, Settings, Download } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <Award className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-semibold">CertMaster</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button variant="ghost" asChild>
            <Link href="/auth" prefetch={false}>
              Sign In
            </Link>
          </Button>
          <Button asChild>
            <Link href="/auth" prefetch={false}>
              Sign Up
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-24 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Transform Your Achievements into Professional Certificates
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Easily create, customize, and distribute beautiful certificates for any occasion. From workshops to official awards, CertMaster has you covered.
                </p>
              </div>
              <Button asChild size="lg" className="mt-6">
                <Link href="/dashboard" prefetch={false}>
                  Get Started for Free
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Powerful Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Everything You Need to Create Stunning Certificates
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides a complete suite of tools to streamline your certificate generation process, from single downloads to bulk creation.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12 mt-12">
              <div className="grid gap-1">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Settings className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold">Deep Customization</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Personalize every aspect of your certificates, including text, fonts, colors, and logos, to perfectly match your brand.
                </p>
              </div>
              <div className="grid gap-1">
                 <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold">Bulk Generation via CSV</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Generate hundreds of unique certificates in a single click by uploading a CSV file with recipient data.
                </p>
              </div>
              <div className="grid gap-1">
                 <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Download className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold">Instant PDF Downloads</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Download high-quality, print-ready PDFs of your certificates individually or as a single ZIP file for bulk batches.
                </p>
              </div>
              <div className="grid gap-1">
                 <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Bot className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold">AI-Powered Suggestions</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Leverage our AI assistant to get feedback and suggestions for improving the visual appeal and wording of your certificates.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 CertMaster. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
