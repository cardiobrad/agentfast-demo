import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { LayoutDashboard, MessageSquare, Image as ImageIcon, PenTool, Bot, Database, Settings } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Chatbot", href: "/dashboard/chat", icon: MessageSquare },
    { name: "Content Gen", href: "/dashboard/content", icon: PenTool },
    { name: "Image Gen", href: "/dashboard/images", icon: ImageIcon },
    { name: "Agent", href: "/dashboard/agent", icon: Bot },
    { name: "RAG Q&A", href: "/dashboard/rag", icon: Database },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-muted/30">
      <aside className="w-64 border-r bg-background hidden md:flex flex-col">
        <div className="p-6 border-b">
          <Link href="/" className="font-bold text-xl flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-md" />
            AI-Fast
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t flex items-center justify-between">
          <UserButton afterSignOutUrl="/" />
          <span className="text-xs text-muted-foreground">Pro Plan</span>
        </div>
      </aside>
      <main className="flex-1 flex flex-col">
        <header className="h-14 border-b bg-background flex items-center px-6 md:hidden">
          <Link href="/" className="font-bold text-xl">AI-Fast</Link>
          <div className="ml-auto">
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>
        <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
