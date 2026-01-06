import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, DollarSign, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminAnalyticsPage() {
  const stats = [
    { name: "Total Revenue", value: "$12,450", icon: DollarSign, trend: "+12.5%" },
    { name: "Active Users", value: "1,240", icon: Users, trend: "+5.2%" },
    { name: "Total Tokens", value: "8.5M", icon: Cpu, trend: "+18.1%" },
    { name: "Avg. Response Time", value: "1.2s", icon: BarChart3, trend: "-0.4s" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Analytics</h1>
        <p className="text-muted-foreground">Monitor your SaaS performance and AI usage.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={cn(
                "text-xs font-medium mt-1",
                stat.trend.startsWith("+") ? "text-green-500" : "text-red-500"
              )}>
                {stat.trend} <span className="text-muted-foreground font-normal">from last month</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Token Usage by Model</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { model: "GPT-4o", usage: "4.2M", percentage: 49 },
                { model: "Claude 3.5 Sonnet", usage: "2.8M", percentage: 33 },
                { model: "Llama 3.1 70B", usage: "1.5M", percentage: 18 },
              ].map((m) => (
                <div key={m.model} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{m.model}</span>
                    <span className="text-muted-foreground">{m.usage} tokens</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${m.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                      JD
                    </div>
                    <div>
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="text-xs text-muted-foreground">Lifetime Deal</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold">$299</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
