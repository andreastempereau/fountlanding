/**
 * Shared Stripe Client
 * Initializes Stripe with the secret key from environment variables
 */

import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-10-29.clover",
});

// Price IDs for subscription plans
export const PRICE_IDS = {
  plus_monthly: "price_1SORQLCnVR8qOLc4qTCiLhEO", // $20/month Plus subscription
  pro_monthly: "price_1SUWOVCnVR8qOLc4fufct1ZX", // $40/month Pro subscription
};
