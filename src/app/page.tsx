import { Award, Bot, FileText, Zap, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float-reverse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-emerald-400/15 rounded-full blur-3xl animate-float-slow"></div>
      </div>
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-slate-800 relative z-10 backdrop-blur-sm bg-slate-950/80">
        <Link
          href="#"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <Award className="h-7 w-7 text-emerald-400" />
          <span className="ml-2 text-xl font-bold text-white">CertMaster</span>
        </Link>
        <nav className="ml-auto flex gap-6 items-center">
          {/* <Link
            href="#"
            className="text-sm text-slate-300 hover:text-white transition-colors"
          >
            About Us
          </Link>
          <Link
            href="#"
            className="text-sm text-slate-300 hover:text-white transition-colors"
          >
            Demo
          </Link>
          <Link
            href="#"
            className="text-sm text-slate-300 hover:text-white transition-colors"
          >
            Pricing
          </Link> */}
          <Button
            variant="ghost"
            className="text-slate-300 hover:text-white hover:bg-slate-800"
            asChild
          >
            <Link href="/auth" prefetch={false}>
              Sign In
            </Link>
          </Button>
          <Button
            className="bg-emerald-500 hover:bg-emerald-600 text-black font-medium"
            asChild
          >
            <Link href="/auth" prefetch={false}>
              Sign Up
            </Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1 relative z-10">
        <section className="w-full py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="space-y-8 animate-fade-in-up">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-900/20 border border-emerald-800 text-emerald-300 text-sm font-medium hover:bg-emerald-900/30 transition-all duration-300 hover:scale-105">
                  <Bot className="w-4 h-4 mr-2" />
                  AI-Powered Generation
                </div>

                <div className="space-y-6">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                    Transform Ideas into{" "}
                    <span className="text-emerald-400">
                      Professional Certificates
                    </span>
                  </h1>
                  <p className="text-lg text-slate-300 max-w-2xl">
                    Create stunning, customizable certificates in seconds. Our
                    AI-powered platform makes professional certificate
                    generation effortless for individuals and organizations.
                  </p>
                </div>

                <div className="space-y-4">
                  <Button
                    size="lg"
                    className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-8 py-3 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25 group"
                    asChild
                  >
                    <Link href="/dashboard" prefetch={false}>
                      Get Started{" "}
                      <span className="inline-block transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </Button>
                  <div className="flex items-center text-sm text-slate-400">
                    <Check className="w-4 h-4 mr-2 text-emerald-400" />
                    No credit card required
                  </div>
                </div>
              </div>

              <div className="relative animate-fade-in-right">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 hover:bg-slate-800/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 group cursor-pointer">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500 text-black font-bold text-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-emerald-500/50">
                          1
                        </div>
                        <span className="text-emerald-400 font-medium transition-all duration-300 group-hover:text-emerald-300">
                          Design
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 group cursor-pointer">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-600 text-slate-300 font-bold text-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-slate-500">
                          2
                        </div>
                        <span className="text-slate-400 font-medium transition-all duration-300 group-hover:text-slate-300">
                          Generate
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 group cursor-pointer">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-600 text-slate-300 font-bold text-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-slate-500">
                          3
                        </div>
                        <span className="text-slate-400 font-medium max-sm:hidden transition-all duration-300 group-hover:text-slate-300">
                          Download
                        </span>
                      </div>
                    </div>

                    <div className="bg-slate-900/60 rounded-xl p-6 border border-slate-600">
                      <h3 className="text-xl font-semibold text-white mb-4">
                        Customize Your Certificate
                      </h3>
                      <p className="text-slate-300 text-sm mb-6">
                        Choose from professional templates, customize colors,
                        fonts, and add your branding. Our intuitive editor makes
                        it simple to create certificates that match your style.
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-slate-300">
                          <Check className="w-4 h-4 mr-3 text-emerald-400" />
                          Professional templates
                        </div>
                        <div className="flex items-center text-sm text-slate-300">
                          <Check className="w-4 h-4 mr-3 text-emerald-400" />
                          Custom branding & logos
                        </div>
                        <div className="flex items-center text-sm text-slate-300">
                          <Check className="w-4 h-4 mr-3 text-emerald-400" />
                          Unlimited customization
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-20 bg-slate-900/30 relative">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center space-y-4 mb-16 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Powerful Features
              </h2>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                Everything you need to create effective certificates and
                streamline your workflow
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700 p-8 transition-all duration-500 hover:bg-slate-800/60 hover:border-emerald-500/30 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/10 group animate-fade-in-up">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-6 transition-all duration-300 group-hover:bg-emerald-500/20 group-hover:scale-110">
                  <FileText className="w-6 h-6 text-emerald-400 transition-all duration-300 group-hover:text-emerald-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 transition-colors duration-300 group-hover:text-emerald-100">
                  Multiple Templates
                </h3>
                <p className="text-slate-300 transition-colors duration-300 group-hover:text-slate-200">
                  Choose from professional certificate templates and customize
                  every element to match your brand and requirements.
                </p>
              </div>

              <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700 p-8 transition-all duration-500 hover:bg-slate-800/60 hover:border-emerald-500/30 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/10 group animate-fade-in-up animation-delay-200">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-6 transition-all duration-300 group-hover:bg-emerald-500/20 group-hover:scale-110">
                  <Bot className="w-6 h-6 text-emerald-400 transition-all duration-300 group-hover:text-emerald-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 transition-colors duration-300 group-hover:text-emerald-100">
                  AI-Powered Suggestions
                </h3>
                <p className="text-slate-300 transition-colors duration-300 group-hover:text-slate-200">
                  Get intelligent feedback and design recommendations to improve
                  your certificates using advanced AI algorithms.
                </p>
              </div>

              <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700 p-8 transition-all duration-500 hover:bg-slate-800/60 hover:border-emerald-500/30 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/10 group animate-fade-in-up animation-delay-400">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-6 transition-all duration-300 group-hover:bg-emerald-500/20 group-hover:scale-110">
                  <Zap className="w-6 h-6 text-emerald-400 transition-all duration-300 group-hover:text-emerald-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 transition-colors duration-300 group-hover:text-emerald-100">
                  Instant Results
                </h3>
                <p className="text-slate-300 transition-colors duration-300 group-hover:text-slate-200">
                  Generate high-quality certificates in seconds, with instant
                  PDF downloads and bulk processing capabilities.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
