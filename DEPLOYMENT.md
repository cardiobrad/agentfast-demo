# 🚀 Deployment Guide: AgentFast v1

Follow these steps to deploy your AgentFast boilerplate to production in minutes.

## 1. Prerequisites
- A [Vercel](https://vercel.com) account.
- A [GitHub](https://github.com) repository for your project.
- Accounts for: Clerk, Supabase, Lemon Squeezy, Upstash, and your chosen AI providers.

## 2. Vercel One-Click Setup
1.  Push your code to a GitHub repository.
2.  Import the project into Vercel.
3.  Add all environment variables from `.env.example` to the Vercel project settings.
4.  Click **Deploy**.

## 3. Database Setup
1.  Ensure your `DATABASE_URL` is correctly set in Vercel.
2.  Run the following command locally to push your schema to the production database:
    ```bash
    npm run db:push
    ```

## 4. Lemon Squeezy Webhook Configuration
To handle payments and subscriptions, you must configure a webhook in Lemon Squeezy:
1.  Go to **Settings > Webhooks** in your Lemon Squeezy dashboard.
2.  Click **Add Webhook**.
3.  Set the **URL** to: `https://your-domain.com/api/webhooks/lemonsqueezy`.
4.  Set the **Secret** to a random string and add it to your `LEMONSQUEEZY_WEBHOOK_SECRET` environment variable.
5.  Select the following events:
    - `order_created`
    - `subscription_created`
    - `subscription_updated`
6.  **Testing**: Use the "Test Webhook" button in Lemon Squeezy to send a test payload to your production URL. Check your database `users` and `webhook_events` tables to verify processing.

## 5. Clerk Authentication
1.  In the Clerk dashboard, go to **Settings > Paths**.
2.  Ensure the sign-in, sign-up, and after-auth paths match your `.env` configuration.
3.  Add your production domain to the **Allowed Origins** in Clerk.

## 6. Upstash Rate Limiting
1.  Create a Redis database in Upstash.
2.  Copy the `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to your Vercel environment variables.
3.  The middleware will automatically start rate-limiting your AI endpoints.

## 7. Final Verification
- Visit your production URL.
- Sign up as a new user.
- Verify that you can access the dashboard.
- Test the AI features to ensure rate limiting and token tracking are working.
