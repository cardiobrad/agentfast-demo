# ⚡ AI-Fast Boilerplate: Launch Your AI SaaS in Record Time

The ultimate, production-ready Next.js 16 SaaS starter kit designed for **indie hackers** and **solopreneurs** to launch AI-powered applications (chatbots, content generators, agents, RAG tools) in days, not months.

---

## ✨ Key Features

| Category | Feature | Description |
| :--- | :--- | :--- |
| **Framework** | **Next.js 16.1 (Stable)** | App Router, Server Actions, and React Server Components (RSC) for maximum performance and modern development. |
| **Styling** | **Tailwind CSS + shadcn/ui** | Beautiful, accessible, dark-mode ready UI components. Includes 50+ copy-paste components. |
| **Authentication** | **Clerk** | Full-featured, secure authentication with social login, email, and magic links. |
| **Payments** | **Lemon Squeezy** | Global tax compliance, subscriptions, and lifetime deals with license keys. |
| **Database** | **Supabase + Drizzle ORM** | PostgreSQL database with a modern, type-safe ORM for easy schema management. |
| **AI Core** | **Vercel AI SDK** | Pre-integrated core for streaming, rate limiting, and token tracking. |
| **Multi-Provider AI** | **OpenAI, Anthropic, Groq, Gemini** | Easy configuration switch to use the best model for the job. |
| **Templates** | **5 Starter AI Apps** | Content Generator, Streaming Chatbot, Image Generation, Agent Skeleton, and RAG Q&A. |
| **Polish** | **Admin & Landing Page** | Templates for a beautiful marketing site and a protected admin dashboard. |
| **Emails** | **Resend** | Transactional email setup for welcome, password reset, and billing. |
| **SEO** | **Built-in** | Metadata, sitemap, and OpenGraph tags for optimal search performance. |
| **Deployment** | **Vercel Ready** | One-click Vercel deployment configuration. |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-fast-boilerplate.git
cd ai-fast-boilerplate
```

### 2. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Configure Environment Variables

Copy the example file and fill in your keys.

```bash
cp .env.example .env.local
```

You will need keys for:
- **Clerk**: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`
- **Supabase**: `DATABASE_URL`
- **Lemon Squeezy**: `LEMONSQUEEZY_API_KEY`, `LEMONSQUEEZY_STORE_ID`, `LEMONSQUEEZY_WEBHOOK_SECRET`
- **AI Providers**: `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, etc.
- **Resend**: `RESEND_API_KEY`
- **Upstash**: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`
- **Pinecone**: `PINECONE_API_KEY`, `PINECONE_INDEX_NAME`

### 4. Database Setup (Drizzle)

1.  Ensure your Supabase/Postgres database is running and `DATABASE_URL` is set.
2.  Push the Drizzle schema to your database:

```bash
npm run db:push
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## 🎬 Marketing Video Script Ideas

Use these ideas to create short, punchy marketing videos for your new AI SaaS product built on this boilerplate.

| Title | Hook | Call to Action |
| :--- | :--- | :--- |
| **Launch in 7 Days** | "Stop building boilerplate. Start building features. This kit has everything you need." | "Get the AI-Fast Boilerplate today and launch next week." |
| **The Multi-AI Advantage** | "Why lock yourself into one AI model? Switch between OpenAI, Claude, and Groq with a single config change." | "Future-proof your SaaS. Grab the boilerplate now." |
| **Global Checkout in Minutes** | "Watch me set up a full subscription payment flow in under 5 minutes using the pre-built Lemon Squeezy integration." | "Stop wasting time on taxes. Focus on your AI idea." |
| **The Indie Hacker Stack** | "Next.js 16, Clerk, Supabase, Drizzle, Vercel AI SDK. The most modern, high-performance stack for solo founders." | "Download the code and start your journey." |

---

## 🤝 Contribution Guide


We welcome contributions! If you find a bug or have a feature request, please:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'feat: Add amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

Please ensure your code passes linting and type checks before submitting.
