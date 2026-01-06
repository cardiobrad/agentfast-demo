"use client";

import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import ErrorBoundary from "@/components/shared/error-boundary";
import { AiFeedback } from "./ai-feedback";

export function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  return (
    <ErrorBoundary>
      <div className="flex flex-col h-[600px] w-full max-w-2xl border rounded-lg bg-background">
      <ScrollArea className="flex-1 p-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "mb-4 flex",
              m.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div className="flex flex-col gap-1 max-w-[80%]">
              <div
                className={cn(
                  "rounded-lg px-4 py-2",
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {m.content}
              </div>
              {m.role === "assistant" && <AiFeedback messageId={m.id} />}
            </div>
          </div>
        ))}
      </ScrollArea>
      <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          Send
        </Button>
      </form>
      </div>
    </ErrorBoundary>
  );
}
