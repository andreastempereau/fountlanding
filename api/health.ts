/**
 * Health Check API
 * Simple endpoint to verify the API is running
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  console.log("health check request received", req, res);

  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "Stripe Checkout API",
  });
}
