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
    monthly: "price_1SORQLCnVR8qOLc4qTCiLhEO", // $20/month subscription (legacy)
    yearly: "price_1SOiqWCnVR8qOLc4784hAQ3q", // $192/year subscription (legacy)
    plus_monthly: "price_1SORQLCnVR8qOLc4qTCiLhEO", // $20/month Plus subscription
    pro_monthly: "price_PLACEHOLDER_PRO_MONTHLY", // $60/month Pro subscription - TODO: Replace with actual price ID
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
    plus_monthly: {
      amount: 20,
      currency: "USD",
      interval: "month",
    },
    pro_monthly: {
      amount: 60,
      currency: "USD",
      interval: "month",
    },
  },
};

/**
 * Create a Stripe checkout session
 * @param planType - 'monthly', 'yearly', 'plus_monthly', or 'pro_monthly'
 * @param userEmail - User's email address
 * @param cognitoUserId - User's Cognito sub (user ID)
 * @returns Promise with the checkout URL
 */
export async function createCheckoutSession(
  planType: "monthly" | "yearly" | "plus_monthly" | "pro_monthly",
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

/**
 * Create a Stripe customer portal session
 * @param customerId - Stripe customer ID
 * @returns Promise with the portal URL
 */
export async function createCustomerPortalSession(
  customerId: string
): Promise<{ url: string }> {
  console.log("creating customer portal session", customerId, stripeConfig.apiUrl);
  
  const response = await fetch(
    `${stripeConfig.apiUrl}/create-customer-portal-session`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerId,
      }),
    }
  );
  console.log("response", response);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create customer portal session");
  }

  return response.json();
}
