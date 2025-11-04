/**
 * Stripe Checkout Session API
 * Creates a Stripe checkout session for Pro plan subscriptions
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { stripe, PRICE_IDS } from "./_lib/stripe.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { planType, userEmail, cognitoUserId } = req.body;

    if (!planType || !PRICE_IDS[planType as keyof typeof PRICE_IDS]) {
      return res.status(400).json({ error: "Invalid plan type" });
    }

    if (!userEmail || !cognitoUserId) {
      return res.status(400).json({ error: "User information required" });
    }

    // Get the domain using Vercel's environment variables (most robust)
    // VERCEL_URL is automatically set by Vercel for all deployments
    let YOUR_DOMAIN: string;

    if (process.env.VERCEL_URL) {
      // VERCEL_URL doesn't include protocol, so prepend https://
      // Use http:// only for local development
      const protocol =
        process.env.VERCEL_ENV === "development" ? "http://" : "https://";
      YOUR_DOMAIN = `${protocol}${process.env.VERCEL_URL}`.replace(/\/$/, "");
    } else {
      // Fallback to headers for local development when VERCEL_URL is not set
      const origin =
        req.headers.origin || req.headers.referer || "http://localhost:5173";
      YOUR_DOMAIN = origin.replace(/\/$/, ""); // Remove trailing slash if present
    }

    // Check if customer already exists with this email
    const existingCustomers = await stripe.customers.list({
      email: userEmail,
      limit: 1,
    });

    let customerId;
    console.log(
      "existingCustomers",
      existingCustomers,
      userEmail,
      cognitoUserId
    );
    if (existingCustomers.data.length > 0) {
      // Customer exists, update metadata to ensure it has cognitoUserId
      customerId = existingCustomers.data[0].id;
      await stripe.customers.update(customerId, {
        metadata: {
          cognitoUserId: cognitoUserId,
        },
      });
    } else {
      // Create new customer with metadata
      const customer = await stripe.customers.create({
        email: userEmail,
        metadata: {
          cognitoUserId: cognitoUserId,
        },
      });
      customerId = customer.id;
    }

    // Create checkout session with the customer
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: PRICE_IDS[planType as keyof typeof PRICE_IDS],
          quantity: 1,
        },
      ],
      mode: "subscription",
      subscription_data: {
        metadata: {
          cognitoUserId: cognitoUserId,
          userEmail: userEmail,
        },
      },
      success_url: `${YOUR_DOMAIN}/dashboard?success=true&plan=${planType}`,
      cancel_url: `${YOUR_DOMAIN}/dashboard?canceled=true`,
    });
    console.log("session", session);

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    res.status(500).json({ error: errorMessage });
  }
}
