"use client";

import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AgentSkeleton() {
  const { messages, append, isLoading } = useChat({
    api: "/api/agent",
  });

  const runAgent = () => {
    append({
      role: "user",
      content: "Check the weather in San Francisco and suggest an activity.",
    });
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>AI Agent (Tool Calling)</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button onClick={runAgent} disabled={isLoading}>
          {isLoading ? "Agent Running..." : "Run Agent Example"}
        </Button>
        <div className="space-y-4">
          {messages.map((m, i) => (
            <div key={i} className="p-3 bg-muted rounded-md text-sm">
              <span className="font-bold uppercase mr-2">{m.role}:</span>
              {m.content}
              {m.toolInvocations?.map((tool, ti) => (
                <div key={ti} className="mt-2 p-2 bg-background border rounded text-xs">
                  Calling tool: {tool.toolName}
                </div>
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
