import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { groq } from "@ai-sdk/groq";

export const providers = {
  openai: {
    name: "OpenAI",
    models: ["gpt-4o", "gpt-4o-mini"],
    sdk: openai,
  },
  anthropic: {
    name: "Anthropic",
    models: ["claude-3-5-sonnet-20240620", "claude-3-haiku-20240307"],
    sdk: anthropic,
  },
  google: {
    name: "Google",
    models: ["gemini-1.5-pro", "gemini-1.5-flash"],
    sdk: google,
  },
  groq: {
    name: "Groq",
    models: ["llama-3.1-70b-versatile", "mixtral-8x7b-32768"],
    sdk: groq,
  },
};

export type Provider = keyof typeof providers;
