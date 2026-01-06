import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";

export const ls = () => {
  lemonSqueezySetup({
    apiKey: process.env.LEMONSQUEEZY_API_KEY!,
    onError: (error) => console.error("Lemon Squeezy Error:", error),
  });
};

export const LS_PLANS = [
  {
    name: "Lifetime Deal",
    variantId: process.env.LEMONSQUEEZY_VARIANT_ID_LIFETIME,
    price: 299,
    description: "One-time payment, forever access.",
    features: ["All 5 AI Templates", "Lifetime Updates", "Priority Support"],
  },
  {
    name: "Pro Subscription",
    variantId: process.env.LEMONSQUEEZY_VARIANT_ID_SUBSCRIPTION,
    price: 19,
    description: "Monthly access to all features.",
    features: ["All 5 AI Templates", "Regular Updates", "Standard Support"],
  },
];
