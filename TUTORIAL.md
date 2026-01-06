# 🛠️ AgentFast v1.2: Step-by-Step Launch Tutorial

This tutorial is your fast track to launching a fully functional, monetized AI SaaS application. Follow these steps to go from download to a live, production-ready deployment.

## Phase 1: Prerequisites & Local Setup

### Step 1: Get Your Keys
Create accounts and collect the necessary API keys and connection strings.

| Service | Key/URL Needed | Notes |
| :--- | :--- | :--- |
| **Clerk** | Publishable Key, Secret Key | For secure authentication. |
| **Supabase** | `DATABASE_URL` | Your PostgreSQL connection string. |
| **Lemon Squeezy** | API Key, Store ID, Webhook Secret | For payments and subscription webhooks. |
| **Upstash** | Redis URL, Redis Token | For high-performance rate limiting. |
| **AI Providers** | OpenAI, Anthropic, Groq, etc. | At least one is required for the chat feature. |

### Step 2: Install and Configure
1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/your-repo/agentfast-boilerplate.git
    cd agentfast-boilerplate
    ```
2.  **Install Node Modules**:
    ```bash
    npm install --legacy-peer-deps
    ```
3.  **Configure Environment Variables**:
    ```bash
    cp .env.example .env.local
    ```
    Fill in all the keys collected in **Step 1** into the newly created `.env.local` file.

### Step 3: Database Initialization
1.  Ensure your Supabase/Postgres database is running and the `DATABASE_URL` is set correctly.
2.  Push the Drizzle ORM schema to your database. This creates all necessary tables (`users`, `aiUsage`, etc.):
    ```bash
    npm run db:push
    ```

### Step 4: Local Run & Test
1.  Start the development server:
    ```bash
    npm run dev
    ```
2.  Open `http://localhost:3000`.
3.  **Test Authentication**: Sign up via the Clerk flow. You should be redirected to the dashboard.
4.  **Test AI Chat**: Use the chat feature. Verify that the response streams correctly and that a new entry is created in your `aiUsage` table in Supabase.

## Phase 2: Monetization & Customization

### Step 5: Configure Lemon Squeezy Products
1.  In your Lemon Squeezy dashboard, create your products and pricing variants (e.g., "Pro Monthly", "Lifetime").
2.  **Update Plan Limits**: Open `app/api/chat/route.ts` and update the `PLAN_LIMITS` constant to map your Lemon Squeezy Variant IDs to the usage limits you want to enforce (e.g., `pro_monthly: 1000`).

### Step 6: Customize UI & Branding
1.  **Site Config**: Update `config/site.ts` with your app's name, description, and links.
2.  **Branding**: Modify the Tailwind CSS configuration and the `globals.css` file to match your brand colors and fonts.
3.  **Features**: Customize the pre-built AI templates in the `components/ai` directory to implement your unique AI feature.

## Phase 3: Deployment & Final Checks

### Step 7: Deploy to Vercel
1.  Commit your changes and push your code to a new GitHub repository.
2.  Go to Vercel and create a new project, linking your GitHub repository.
3.  **Configure Environment Variables**: In the Vercel dashboard settings for your project, add all the environment variables from your `.env.local` file. **Ensure all secret keys (Clerk, Lemon Squeezy, AI, Upstash) are set as environment variables on Vercel.**
4.  Deploy the project.

### Step 8: Final Webhook Setup
1.  Once deployed, get your live Vercel URL (e.g., `https://your-app.vercel.app`).
2.  In your Lemon Squeezy dashboard, go to **Settings > Webhooks**.
3.  Add a new webhook URL pointing to your live endpoint: `https://your-app.vercel.app/api/webhooks/lemonsqueezy`.
4.  **Test Payments**: Use a test mode checkout link from Lemon Squeezy to simulate a purchase. Verify that the user's subscription status is updated in your Supabase `users` table.

**Congratulations!** Your AgentFast v1.2 application is live, secure, and ready to generate revenue. Focus on marketing, not maintenance.
