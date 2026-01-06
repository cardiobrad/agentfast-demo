import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle, Zap, Shield, Globe } from "lucide-react";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { Pricing } from "@/components/landing/pricing";
import { Testimonials, TrustBadges } from "@/components/landing/social-proof";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="#">
          <Zap className="h-6 w-6 text-primary" />
          <span className="ml-2 font-bold text-xl">AI-Fast</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#pricing">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/sign-in">
            Sign In
          </Link>
          <ModeToggle />
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Launch Your AI SaaS in <span className="text-primary">Record Time</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  The ultimate Next.js 15 boilerplate with AI, Auth, Payments, and DB pre-configured.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild size="lg">
                  <Link href="/sign-up">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button variant="outline" size="lg">
                  View Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border p-6 rounded-xl bg-background">
                <Zap className="h-10 w-10 text-primary mb-2" />
                <h3 className="text-xl font-bold">Next.js 15 Ready</h3>
                <p className="text-muted-foreground text-center">App Router, Server Actions, and React Server Components.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border p-6 rounded-xl bg-background">
                <Shield className="h-10 w-10 text-primary mb-2" />
                <h3 className="text-xl font-bold">Secure Auth</h3>
                <p className="text-muted-foreground text-center">Clerk integration for seamless social and email login.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border p-6 rounded-xl bg-background">
                <Globe className="h-10 w-10 text-primary mb-2" />
                <h3 className="text-xl font-bold">Multi-Provider AI</h3>
                <p className="text-muted-foreground text-center">OpenAI, Anthropic, Groq, and Gemini support out of the box.</p>
              </div>
            </div>
          </div>
        </section>
        <TrustBadges />
        <Testimonials />
        <Pricing />
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2026 AI-Fast Boilerplate. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">Terms of Service</Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">Privacy</Link>
        </nav>
      </footer>
    </div>
  );
}
