/**
 * Stripe Subscription Update API
 * Updates an existing subscription to a new price (Pro or Plus)
 * with immediate billing (proration_behavior: none, billing_cycle_anchor: now)
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
    const { subscriptionId, newPriceId } = req.body;

    if (!subscriptionId) {
      return res.status(400).json({ error: "Subscription ID is required" });
    }

    if (!newPriceId || !Object.values(PRICE_IDS).includes(newPriceId)) {
      return res.status(400).json({ error: "Invalid price ID" });
    }

    // Retrieve the current subscription
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    if (!subscription) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    // Get the subscription item ID (subscriptions can have multiple items, we assume one)
    const subscriptionItemId = subscription.items.data[0].id;

    // Update the subscription with the new price
    // proration_behavior: 'none' means no proration charges
    // billing_cycle_anchor: 'now' means restart billing cycle immediately
    const updatedSubscription = await stripe.subscriptions.update(
      subscriptionId,
      {
        items: [
          {
            id: subscriptionItemId,
            price: newPriceId,
          },
        ],
        proration_behavior: "none",
        billing_cycle_anchor: "now",
      }
    );

    console.log("Subscription updated successfully:", updatedSubscription.id);

    res.status(200).json({
      success: true,
      subscription: {
        id: updatedSubscription.id,
        status: updatedSubscription.status,
        current_period_start: updatedSubscription.current_period_start,
        current_period_end: updatedSubscription.current_period_end,
      },
    });
  } catch (error) {
    console.error("Error updating subscription:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    res.status(500).json({ error: errorMessage });
  }
}
