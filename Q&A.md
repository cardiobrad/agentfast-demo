# ❓ AgentFast v1.2: Essential Questions & Answers

Welcome to AgentFast v1.2! We've refined the boilerplate to be even more secure and production-ready. This Q&A is designed to address every question a potential buyer might have, emphasizing transparency and the speed-to-market advantage.

## 🚀 Setup & Installation

### 1. What are the core technologies in AgentFast v1.2?
AgentFast is built on the most modern, high-performance stack: **Next.js 16** (App Router, Server Actions), **TypeScript**, **Tailwind CSS** (with shadcn/ui), **Clerk** (Auth), **Supabase** (PostgreSQL DB), **Drizzle ORM**, **Lemon Squeezy** (Payments), and the **Vercel AI SDK** for multi-provider AI access.

### 2. How quickly can I get a live, working version deployed?
If you have your API keys ready, you can go from download to a live, deployed application on Vercel in under **one hour**. The tutorial is designed to be a step-by-step checklist for rapid deployment.

### 3. Is this boilerplate suitable for a beginner founder?
Yes, it is beginner-focused in its documentation and structure. While a basic understanding of Next.js and TypeScript is required, the complex parts (Auth, Payments, AI streaming) are pre-built and heavily commented, allowing you to learn by modifying existing, working code.

### 4. What is the role of the Drizzle ORM?
Drizzle is a modern, type-safe ORM that works perfectly with Supabase (PostgreSQL). It allows you to manage your database schema and write queries using TypeScript, eliminating SQL injection risks and making your database interactions much safer and easier to maintain.

### 5. Why did you switch to Next.js 16's `after` function for logging?
The `after` function is a best practice for serverless environments. It ensures that non-critical tasks, like logging token usage to the database, are executed **after** the streaming response has been sent to the user. This guarantees the fastest possible response time and a superior user experience.

## 💳 Payments & Monetization

### 6. How does AgentFast handle global sales tax (VAT/GST)?
We use **Lemon Squeezy** as the payment processor. Lemon Squeezy acts as the Merchant of Record, automatically handling all global sales tax calculation, collection, and remittance. This is a massive time-saver and compliance shield for indie hackers.

### 7. How are usage limits enforced in v1.2?
The chat route performs a secure, server-side check against the `aiUsage` table. It uses a precise Drizzle query to count the user's requests **within the last 30 days** and compares it against the limit defined by their subscription plan (e.g., 1000 messages/month). This is a robust, production-ready enforcement mechanism.

### 8. What is the "circuit breaker" logic in the chat route?
The circuit breaker is a security and stability feature. If the primary AI provider (e.g., OpenAI) fails or returns an error, the code will automatically **retry the request up to 2 times**. If all retries fail, it returns a clean `503 Service Unavailable` error, preventing a full application crash and improving resilience.

### 9. What is the refund policy?
As this is a digital product with full source code access, we maintain a strict no-refund policy. However, we stand by the quality of the code. If you find a critical bug that prevents the boilerplate from functioning as advertised, we will work with you to fix it immediately.

### 10. Can I change the payment processor from Lemon Squeezy?
Yes, but it requires development work. The boilerplate is tightly integrated with Lemon Squeezy's webhook structure. Switching to Stripe or Paddle would require rewriting the webhook handler and the user subscription logic in the database. We recommend sticking with Lemon Squeezy for the fastest path to monetization.

## 🤖 AI & Technology

### 11. How does the multi-provider AI system work?
The boilerplate uses the **Vercel AI SDK** as a unified interface. You can configure multiple providers (OpenAI, Anthropic, Groq, Gemini) in the `providers.ts` file. The frontend simply sends the desired `provider` in the API request, and the backend dynamically selects the correct model and SDK to stream the response.

### 12. How is the rate limiting implemented?
We use **Upstash Redis** and the `@upstash/ratelimit` package. It enforces a strict sliding window limit of **10 requests per 10 seconds per user**. Crucially, the API returns `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `X-RateLimit-Reset` headers, allowing your frontend to display accurate countdown timers to the user.

### 13. What security measures were added in v1.2?
The v1.2 audit focused on:
- **Input Sanitization**: All incoming chat messages are now trimmed and validated to prevent unexpected data or empty requests.
- **Circuit Breaker**: Added retry logic to handle transient AI provider errors.
- **Usage Query Filter**: The usage query now explicitly filters by `type: "chat"` and a `30-day interval` for accurate monthly usage tracking.

### 14. How is token usage tracked for billing?
Token usage (prompt, completion, total) is captured by the Vercel AI SDK's `onFinish` callback. This data is then logged to the `aiUsage` table in your database, providing the raw data you need for cost analysis and potential token-based billing in the future.

### 15. Can I use this for RAG (Retrieval-Augmented Generation)?
Yes. The boilerplate includes a pre-built **RAG Q&A** template and has a dedicated configuration for **Pinecone** (Vector DB). You have the foundation to build powerful RAG applications right out of the box.

## 🌐 Deployment & Support

### 16. Where should I deploy AgentFast?
The boilerplate is optimized for **Vercel** (frontend/API routes), **Supabase** (database), and **Upstash** (Redis/rate limiting). This combination provides a scalable, cost-effective, and high-performance serverless architecture.

### 17. Is there a staging/testing environment setup?
The use of `.env.local` for local development and environment variables in Vercel for production allows for a clear separation between environments. You can easily set up a staging branch in Vercel to test changes before merging to production.

### 18. What kind of support is included with the purchase?
You receive lifetime access to the source code and all future updates. Support is provided for critical bugs and setup guidance via a private channel (details provided upon purchase). We do not offer support for custom feature development.

### 19. Can I customize the UI and branding?
Absolutely. The entire frontend is built with **Tailwind CSS** and **shadcn/ui**, making it highly customizable. You can change the look and feel by simply adjusting the Tailwind configuration and component files.

### 20. Why should I choose AgentFast over building it myself?
AgentFast saves you the **100+ hours** of development time required to build and secure the core infrastructure. It allows you to skip straight to building the unique AI feature that differentiates your product, significantly increasing your chances of a successful and fast launch.
