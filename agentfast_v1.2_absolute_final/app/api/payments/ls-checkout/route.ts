import { auth } from "@clerk/nextjs/server";
import { createCheckout } from "@lemonsqueezy/lemonsqueezy.js";
import { ls } from "@/lib/payments/lemonsqueezy";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { variantId } = await req.json();
    ls();

    const checkout = await createCheckout(
      process.env.LEMONSQUEEZY_STORE_ID!,
      variantId,
      {
        checkoutData: {
          custom: {
            user_id: userId,
          },
        },
        productOptions: {
          redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
        },
      }
    );

    return NextResponse.json({ url: checkout.data?.data.attributes.url });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
