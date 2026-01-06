"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/images/generate", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setImageUrl(data.url);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-6 w-full max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>AI Image Generator</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Input
            placeholder="A futuristic city at sunset..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button onClick={handleGenerate} disabled={isLoading || !prompt}>
            {isLoading ? "Generating..." : "Generate Image"}
          </Button>
        </CardContent>
      </Card>

      {imageUrl && (
        <Card>
          <CardContent className="pt-6">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg">
              <Image
                src={imageUrl}
                alt={prompt}
                fill
                className="object-cover"
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
