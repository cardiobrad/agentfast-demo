import crypto from "crypto";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { users, webhookEvents } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("x-signature") || "";
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET || "";

  // 1. Verify signature
  const hmac = crypto.createHmac("sha256", secret);
  const digest = Buffer.from(hmac.update(body).digest("hex"), "utf8");
  const signatureBuffer = Buffer.from(signature, "utf8");

  if (!crypto.timingSafeEqual(digest, signatureBuffer)) {
    return new NextResponse("Invalid signature", { status: 400 });
  }

  const payload = JSON.parse(body);
  const eventId = payload.meta.event_id;
  const eventName = payload.meta.event_name;
  const customData = payload.meta.custom_data;

  // 2. Webhook Deduplication
  try {
    const existingEvent = await db.query.webhookEvents.findFirst({
      where: eq(webhookEvents.id, eventId),
    });

    if (existingEvent) {
      return new NextResponse("Event already processed", { status: 200 });
    }

    // Mark event as processing
    await db.insert(webhookEvents).values({ id: eventId });
  } catch (error) {
    console.error("Error checking/inserting webhook event:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }

  // 3. Process Event
  if (eventName === "order_created" || eventName === "subscription_created" || eventName === "subscription_updated") {
    const userId = customData.user_id;
    const attributes = payload.data.attributes;
    
    await db.update(users)
      .set({ 
        lemonSqueezyCustomerId: attributes.customer_id?.toString(),
        lemonSqueezySubscriptionId: attributes.subscription_id?.toString(),
        lemonSqueezyVariantId: attributes.variant_id?.toString(),
        subscriptionStatus: attributes.status || "active",
        updatedAt: new Date() 
      })
      .where(eq(users.clerkId, userId));
  }

  return new NextResponse("Webhook processed", { status: 200 });
}
