"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Zap, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    toast({
      title: "Success!",
      description: "You've been added to the waitlist.",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="p-3 bg-primary/10 rounded-2xl">
            <Zap className="h-10 w-10 text-primary" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Something Big is Coming</h1>
          <p className="text-muted-foreground text-lg">
            The ultimate AI SaaS boilerplate is almost ready. Join the waitlist for an exclusive early-bird discount.
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12"
            />
            <Button type="submit" size="lg" className="w-full h-12 text-lg">
              Join the Waitlist
            </Button>
            <p className="text-xs text-muted-foreground">
              No spam. Just early access and a massive discount.
            </p>
          </form>
        ) : (
          <div className="p-6 bg-primary/5 border border-primary/20 rounded-xl flex flex-col items-center gap-3">
            <CheckCircle className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-semibold">You're on the list!</h3>
            <p className="text-sm text-muted-foreground">
              We'll email you as soon as we launch. Keep an eye on your inbox.
            </p>
          </div>
        )}

        <div className="pt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span>Next.js 15</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span>Multi-AI</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span>Stripe/LS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
