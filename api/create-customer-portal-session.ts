/**
 * Stripe Customer Portal Session API
 * Creates a Stripe billing portal session for subscription management
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { stripe } from "./_lib/stripe.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log("customer portal session request received", req, res);
  console.log("body", req.body);
  
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { customerId } = req.body;

    if (!customerId) {
      return res.status(400).json({ error: "Customer ID is required" });
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

    // Create billing portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${YOUR_DOMAIN}/dashboard`,
    });

    console.log("portal session created", session);

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Error creating customer portal session:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    res.status(500).json({ error: errorMessage });
  }
}

