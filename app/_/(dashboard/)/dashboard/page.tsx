import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, MessageSquare, Image as ImageIcon, PenTool } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { name: "Total Credits", value: "1,250", icon: Zap },
    { name: "Chat Sessions", value: "42", icon: MessageSquare },
    { name: "Images Generated", value: "12", icon: ImageIcon },
    { name: "Content Pieces", value: "85", icon: PenTool },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome back!</h1>
        <p className="text-muted-foreground">Here's what's happening with your AI apps.</p>
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
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Generated a blog post about Next.js 15</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <button className="w-full text-left px-4 py-2 text-sm rounded-md hover:bg-muted border transition-colors">
              Create New Chatbot
            </button>
            <button className="w-full text-left px-4 py-2 text-sm rounded-md hover:bg-muted border transition-colors">
              Generate Marketing Copy
            </button>
            <button className="w-full text-left px-4 py-2 text-sm rounded-md hover:bg-muted border transition-colors">
              Upload Knowledge Base
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
