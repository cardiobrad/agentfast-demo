"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AiFeedbackProps {
  messageId: string;
}

export function AiFeedback({ messageId }: AiFeedbackProps) {
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  const handleFeedback = async (type: "up" | "down") => {
    setFeedback(type);
    // Simulate API call to save feedback
    console.log(`Feedback for ${messageId}: ${type}`);
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-8 w-8",
          feedback === "up" && "text-green-500 bg-green-500/10"
        )}
        onClick={() => handleFeedback("up")}
      >
        <ThumbsUp className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-8 w-8",
          feedback === "down" && "text-red-500 bg-red-500/10"
        )}
        onClick={() => handleFeedback("down")}
      >
        <ThumbsDown className="h-4 w-4" />
      </Button>
    </div>
  );
}
