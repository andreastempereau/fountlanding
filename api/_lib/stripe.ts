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
  monthly: "price_1SORQLCnVR8qOLc4qTCiLhEO", // $20/month subscription
  yearly: "price_1SOiqWCnVR8qOLc4784hAQ3q", // $192/year subscription
};
