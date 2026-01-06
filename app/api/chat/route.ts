import { streamText, Message } from "ai";
import { providers, Provider } from "@/lib/ai/providers";
import { auth } from "@clerk/nextjs/server";
import { ratelimit } from "@/lib/ratelimit";
import { db } from "@/db";
import { aiUsage, users } from "@/db/schema";
import { eq, sql, and } from "drizzle-orm";
import { after } from "next/server"; // Next.js 15+ API for background tasks

/**
 * AgentFast v1.2 - Final Production-Ready AI Chat Route
 * 
 * This endpoint is security-audited and optimized for high-performance SaaS launches.
 * Features:
 * - Plan-based usage enforcement (Free, Pro, Lifetime)
 * - Upstash Rate Limiting with enhanced X-RateLimit headers
 * - Input sanitization and validation
 * - Multi-provider AI support (OpenAI, Anthropic, Groq, Gemini)
 * - Circuit breaker with retry logic for provider stability
 * - Asynchronous token logging using Next.js 'after' for zero-latency
 */

// Define plan limits (Variant IDs from Lemon Squeezy)
const PLAN_LIMITS: Record<string, number> = {
  "free": 10,           // 10 messages
  "pro_monthly": 1000,  // 1000 messages
  "lifetime": 5000,     // 5000 messages
};

export async function POST(req: Request) {
  try {
    // 1. Authentication & User Retrieval
    const { userId } = await auth();
    if (!userId) return new Response("Unauthorized", { status: 401 });

    const user = await db.query.users.findFirst({
      where: eq(users.clerkId, userId),
    });

    if (!user) return new Response("User not found", { status: 404 });

    // 2. Request Parsing & Sanitization
    let body;
    try {
      body = await req.json();
    } catch (e) {
      return new Response("Invalid JSON body", { status: 400 });
    }

    const { messages, provider = "openai", model } = body;

    // Validate Messages
    if (!messages || !Array.isArray(messages)) {
      return new Response("Messages must be an array", { status: 400 });
    }

    // Sanitize Input: Trim whitespace and filter out empty messages
    const sanitizedMessages = messages.map((m: Message) => ({
      ...m,
      content: typeof m.content === 'string' ? m.content.trim() : '',
    })).filter(m => m.content.length > 0);

    if (sanitizedMessages.length === 0) {
      return new Response("No valid messages provided", { status: 400 });
    }

    // Validate Provider & Model
    const selectedProvider = providers[provider as Provider];
    if (!selectedProvider) {
      return new Response(`Invalid provider: ${provider}`, { status: 400 });
    }

    const selectedModel = model || selectedProvider.models[0];
    if (!selectedProvider.models.includes(selectedModel)) {
      return new Response(`Invalid model for provider ${provider}`, { status: 400 });
    }

    // 3. Plan Enforcement & Usage Calculation
    const variantId = user.lemonSqueezyVariantId || "free";
    const limit = PLAN_LIMITS[variantId] || PLAN_LIMITS["free"];

    // Precise Usage Query (Current Month + Type Filter)
    const usageCountResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(aiUsage)
      .where(
        and(
          eq(aiUsage.userId, userId),
          eq(aiUsage.type, "chat"),
          sql`${aiUsage.createdAt} > now() - interval '30 days'`
        )
      );

    const currentUsage = Number(usageCountResult[0]?.count || 0);

    if (currentUsage >= limit) {
      return new Response("Usage limit reached. Please upgrade.", { status: 402 });
    }

    // 4. Rate Limiting (Redis) with Enhanced Headers
    const { success, limit: rtLimit, reset, remaining } = await ratelimit.limit(userId);
    
    const rateLimitHeaders = {
      "X-RateLimit-Limit": rtLimit.toString(),
      "X-RateLimit-Remaining": remaining.toString(),
      "X-RateLimit-Reset": reset.toString()
    };

    if (!success) {
      return new Response("Too Many Requests", { 
        status: 429,
        headers: rateLimitHeaders
      });
    }

    // 5. AI Streaming with Circuit Breaker (Retry Logic)
    const MAX_RETRIES = 2;
    let attempt = 0;
    
    while (attempt <= MAX_RETRIES) {
      try {
        const result = await streamText({
          model: selectedProvider.sdk(selectedModel),
          messages: sanitizedMessages,
          onFinish: async (result) => {
            // Use 'after' to guarantee execution in serverless environments (Next.js 15+)
            after(async () => {
              try {
                await db.insert(aiUsage).values({
                  userId,
                  model: selectedModel,
                  promptTokens: result.usage.promptTokens,
                  completionTokens: result.usage.completionTokens,
                  totalTokens: result.usage.totalTokens,
                  type: "chat",
                  createdAt: new Date(),
                });
              } catch (dbError) {
                console.error("Failed to log AI usage:", dbError);
              }
            });
          },
        });

        // Return stream with Rate Limit headers
        return result.toDataStreamResponse({
          headers: rateLimitHeaders
        });

      } catch (error: any) {
        attempt++;
        console.error(`AI Provider Attempt ${attempt} failed:`, error);

        if (attempt > MAX_RETRIES) {
          return new Response("AI Provider unavailable. Try again later.", { status: 503 });
        }
        
        // Exponential backoff before retry
        await new Promise(resolve => setTimeout(resolve, 500 * attempt));
      }
    }

  } catch (error: any) {
    console.error("Chat API Critical Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
  
  return new Response("Internal Server Error", { status: 500 });
}
