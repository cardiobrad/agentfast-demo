# ❓ AgentFast v1.1: Frequently Asked Questions

Welcome to AgentFast! We built this boilerplate for founders like you who want to skip the boring setup and jump straight into building their AI product. Here are the most common questions we get.

## 🚀 Setup & Installation

### 1. What are the minimum requirements to use AgentFast v1.1?
You need a basic understanding of Next.js, TypeScript, and Tailwind CSS. You will also need accounts with the following services: Clerk (Authentication), Supabase (Database), Lemon Squeezy (Payments), Upstash (Rate Limiting), and at least one AI provider (OpenAI, Anthropic, Groq, or Google).

### 2. How long does it take to get the boilerplate running locally?
If you have all your API keys ready, you can get the boilerplate running locally in under 30 minutes. The process involves cloning the repo, installing dependencies, setting environment variables, and pushing the database schema.

### 3. Do I need to be an expert in all these technologies?
No. The boilerplate is pre-configured. You need to know how to read and modify Next.js code. We've chosen modern, well-documented tools (Next.js 16, Drizzle ORM, Vercel AI SDK) to make the learning curve as smooth as possible.

### 4. Is the boilerplate compatible with other databases like MySQL or MongoDB?
The current version is tightly integrated with **PostgreSQL** via **Supabase** and **Drizzle ORM**. While you could technically swap the database, it would require significant changes to the Drizzle schema and connection logic. We recommend sticking with PostgreSQL for the fastest setup.

### 5. How do I update the boilerplate when new versions are released?
We will provide a clear changelog and migration guide for major updates. Since you own the code, you will need to manually merge the changes into your repository. We focus on stable, long-term features to minimize breaking changes.

## 💳 Payments & Monetization

### 6. Why did you choose Lemon Squeezy for payments?
Lemon Squeezy handles global sales tax (VAT, GST) compliance automatically, which is a massive headache for indie hackers. It also supports subscriptions, lifetime deals, and license keys out of the box, making it the perfect all-in-one solution for a SaaS.

### 7. Does the boilerplate handle subscriptions and webhooks?
Yes. The boilerplate includes pre-built API routes to handle Lemon Squeezy webhooks (`/api/webhooks/lemonsqueezy`). This automatically updates the user's subscription status in your database when they subscribe, upgrade, or cancel.

### 8. How do I set up my own pricing plans?
You need to create your products and variants in your Lemon Squeezy dashboard. You then update the `PLAN_LIMITS` constant in the chat route to map your Lemon Squeezy Variant IDs to the usage limits you want to enforce (e.g., 1000 messages for the Pro plan).

### 9. Is the usage limit enforcement accurate?
Yes. The chat route uses a precise query to count the user's usage against the limit defined by their subscription plan (fetched from the database). This is a server-side check, making it secure and reliable for monetization.

### 10. What is your refund policy?
Since this is a digital product with full source code access, we generally do not offer refunds. However, if you can demonstrate a critical bug that prevents the boilerplate from functioning as advertised, we will work with you to fix it or issue a refund within 14 days of purchase.

## 🤖 AI & Technology

### 11. Why use the Vercel AI SDK instead of calling the APIs directly?
The Vercel AI SDK provides a unified, stream-friendly interface for all major AI providers. It simplifies the code, handles streaming responses efficiently, and makes it trivial to switch models or providers without rewriting your core logic.

### 12. Can I use a local or self-hosted LLM?
The boilerplate is designed for cloud-based APIs (OpenAI, Anthropic, etc.). If your local LLM can expose an OpenAI-compatible API endpoint, you can configure it as a custom provider in the `providers.ts` file.

### 13. How is token usage tracked?
Token usage (prompt, completion, total) is tracked in the `aiUsage` table. This is done asynchronously in the `onFinish` callback of the `streamText` function, ensuring the user's streaming experience is not delayed by database writes.

### 14. What is the rate limiting for, and how does it work?
Rate limiting prevents abuse and protects your API keys from being hammered. It uses **Upstash Redis** to enforce a limit of 10 requests per 10 seconds per user, returning a `429 Too Many Requests` status if exceeded.

### 15. What is the purpose of the `after` function in the chat route?
The `after` function (from Next.js 15+) ensures that non-critical tasks, like logging token usage to the database, are executed *after* the main response has been sent to the client. This is a best practice for serverless functions to keep the response time fast.

## 🌐 Deployment & Support

### 16. Where should I deploy AgentFast?
We highly recommend **Vercel** for the frontend/API routes, as the boilerplate is optimized for their platform (Next.js 16, Server Actions). **Supabase** is recommended for the database, and **Upstash** for Redis/rate limiting.

### 17. Is there a one-click deploy option?
We provide a Vercel-ready configuration. While it's not a single button, the deployment process is straightforward: push to GitHub, connect to Vercel, and set your environment variables.

### 18. What kind of support do I get with my purchase?
You get lifetime access to the source code and all future updates. Support is provided via email or a private community (details provided after purchase) for critical bug fixes and setup guidance. We do not provide custom feature development support.

### 19. Can I customize the UI and branding?
Absolutely. The entire UI is built with **Tailwind CSS** and **shadcn/ui** components, making it extremely easy to customize colors, fonts, and layouts to match your brand.

### 20. What if I find a bug in the boilerplate?
If you find a bug, please report it immediately. We are committed to maintaining a high-quality product. We will prioritize fixing critical bugs and pushing an update to the repository as quickly as possible.
