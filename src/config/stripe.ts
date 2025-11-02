/**
 * Stripe Configuration
 * Configuration for Stripe checkout and subscription management
 */

export const stripeConfig = {
  // Stripe publishable key (test mode)
  // TODO: Replace with production key when going live
  publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_...",

  // Backend API URL - uses /api for Vercel serverless functions
  // In development with Vercel CLI, this will be http://localhost:3000/api
  // In production, it will be your-domain.vercel.app/api
  apiUrl: import.meta.env.VITE_STRIPE_API_URL || "/api",

  // Price IDs for subscription plans
  priceIds: {
    monthly: "price_1SORQLCnVR8qOLc4qTCiLhEO", // $20/month subscription
    yearly: "price_1SOiqWCnVR8qOLc4784hAQ3q", // $192/year subscription
  },

  // Plan pricing for display
  pricing: {
    monthly: {
      amount: 20,
      currency: "USD",
      interval: "month",
    },
    yearly: {
      amount: 192,
      monthlyEquivalent: 16,
      currency: "USD",
      interval: "year",
    },
  },
};

/**
 * Create a Stripe checkout session
 * @param planType - 'monthly' or 'yearly'
 * @param userEmail - User's email address
 * @param cognitoUserId - User's Cognito sub (user ID)
 * @returns Promise with the checkout URL
 */
export async function createCheckoutSession(
  planType: "monthly" | "yearly",
  userEmail: string,
  cognitoUserId: string
): Promise<{ url: string }> {
  console.log(
    "creating checkout session",
    planType,
    userEmail,
    cognitoUserId,
    stripeConfig.apiUrl
  );
  const response = await fetch(
    `${stripeConfig.apiUrl}/create-checkout-session`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        planType,
        userEmail,
        cognitoUserId,
      }),
    }
  );
  console.log("response", response);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create checkout session");
  }

  return response.json();
}
