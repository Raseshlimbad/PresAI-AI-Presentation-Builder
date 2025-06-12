"use server";

import { client } from "@/lib/prisma";
import Stripe from "stripe";
import { addMonths } from "date-fns";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export const buySubscription = async (buyUserId: string, buyUserEmail: string) => {
    try {
      const existingUser = await client.user.findUnique({
        where: { id: buyUserId },
      });
  
      if (existingUser?.subscription) {
        return { success: false, message: "User is already subscribed." };
      }
  
      const customer = await stripe.customers.create({
        email: buyUserEmail,
        metadata: {
          userId: buyUserId,
        },
      });
  
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price: process.env.STRIPE_PREMIUM_PRODUCT_PRICE_ID!,
            quantity: 1,
          },
        ],
        customer: customer.id,
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?status=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?status=cancelled`,
        metadata: {
          userId: buyUserId,
        },
        shipping_address_collection: { allowed_countries: [] },
      });
      
  
      return {
        success: true,
        url: session.url,
        message: "Redirecting to Stripe Checkout",
      };
    } catch (err) {
      console.error("[Stripe Error]", err);
      return { success: false, message: "Failed to create checkout session" };
    }
  };
  

export const confirmSubscription = async (sessionId: string) => {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["subscription"],
      });
  
      if (session.payment_status !== "paid") {
        return { success: false, message: "Payment not confirmed." };
      }
  
      const userId = session.metadata?.userId;
  
      if (!userId) {
        return { success: false, message: "User ID missing from metadata" };
      }
  
      const now = new Date();
      await client.user.update({
        where: { id: userId },
        data: {
          subscription: true,
          subscriptionStart: now,
          subscriptionEnd: addMonths(now, 12),
        },
      });
  
      return { success: true, message: "Subscription confirmed and saved." };
    } catch (err) {
      console.error("[Stripe Confirm Error]", err);
      return { success: false, message: "Failed to confirm subscription." };
    }
  };
