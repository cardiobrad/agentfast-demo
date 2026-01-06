"use client";

import { useState } from "react";
import { useCompletion } from "ai/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ContentGenerator() {
  const { completion, complete, isLoading } = useCompletion({
    api: "/api/generate",
  });
  const [prompt, setPrompt] = useState("");

  const handleGenerate = () => {
    complete(prompt);
  };

  return (
    <div className="grid gap-6 w-full max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>AI Content Generator</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Textarea
            placeholder="Describe what you want to generate..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
          />
          <Button onClick={handleGenerate} disabled={isLoading || !prompt}>
            {isLoading ? "Generating..." : "Generate Content"}
          </Button>
        </CardContent>
      </Card>

      {completion && (
        <Card>
          <CardHeader>
            <CardTitle>Output</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap p-4 bg-muted rounded-md">
              {completion}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
