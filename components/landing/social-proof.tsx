import { Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Alex Rivera",
      role: "Solopreneur",
      content: "AI-Fast saved me at least 3 weeks of development. The multi-provider support is a game changer.",
      avatar: "AR",
    },
    {
      name: "Sarah Chen",
      role: "SaaS Founder",
      content: "The cleanest Next.js 15 boilerplate I've used. The AI templates are actually production-ready.",
      avatar: "SC",
    },
    {
      name: "James Wilson",
      role: "Indie Hacker",
      content: "Built and launched my AI agent in a weekend. The Lemon Squeezy integration is seamless.",
      avatar: "JW",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">Loved by Indie Hackers</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="p-6 rounded-2xl border bg-muted/50">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">"{t.content}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrustBadges() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all py-12">
      <span className="text-xl font-bold tracking-tighter">PRODUCT HUNT</span>
      <span className="text-xl font-bold tracking-tighter">HACKER NEWS</span>
      <span className="text-xl font-bold tracking-tighter">INDIE HACKERS</span>
      <span className="text-xl font-bold tracking-tighter">REDDIT</span>
    </div>
  );
}
