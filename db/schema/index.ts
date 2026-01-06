import { pgTable, text, timestamp, uuid, integer, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: text("clerk_id").notNull().unique(),
  email: text("email").notNull(),
  name: text("name"),
  lemonSqueezyCustomerId: text("lemon_squeezy_customer_id"),
  lemonSqueezySubscriptionId: text("lemon_squeezy_subscription_id"),
  lemonSqueezyVariantId: text("lemon_squeezy_variant_id"),
  subscriptionStatus: text("subscription_status"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const webhookEvents = pgTable("webhook_events", {
  id: text("id").primaryKey(), // Lemon Squeezy event ID
  processedAt: timestamp("processed_at").defaultNow().notNull(),
});

export const aiUsage = pgTable("ai_usage", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").references(() => users.clerkId).notNull(),
  model: text("model").notNull(),
  promptTokens: integer("prompt_tokens").default(0),
  completionTokens: integer("completion_tokens").default(0),
  totalTokens: integer("total_tokens").default(0),
  type: text("type").notNull(), // 'chat', 'generation', 'image', etc.
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const promptTemplates = pgTable("prompt_templates", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").references(() => users.clerkId).notNull(),
  name: text("name").notNull(),
  content: text("content").notNull(),
  isPublic: boolean("is_public").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
