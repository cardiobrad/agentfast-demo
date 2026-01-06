"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { LS_PLANS } from "@/lib/payments/lemonsqueezy";

export function Pricing() {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleCheckout = async (variantId: string) => {
    setIsLoading(variantId);
    try {
      const response = await fetch("/api/payments/ls-checkout", {
        method: "POST",
        body: JSON.stringify({ variantId }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Simple, Transparent Pricing</h2>
          <p className="mt-4 text-lg text-muted-foreground">Choose the plan that fits your needs.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {LS_PLANS.map((plan) => (
            <Card key={plan.name} className={plan.name.includes("Lifetime") ? "border-primary shadow-lg" : ""}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="text-4xl font-bold">${plan.price}</div>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={plan.name.includes("Lifetime") ? "default" : "outline"}
                  onClick={() => handleCheckout(plan.variantId!)}
                  disabled={isLoading !== null}
                >
                  {isLoading === plan.variantId ? "Loading..." : "Get Started"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
