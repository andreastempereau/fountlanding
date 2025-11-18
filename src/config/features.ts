/**
 * Feature flags configuration
 * Controls which features are enabled/disabled in different environments
 */

export const features = {
  /**
   * Enable authentication pages (/auth, /auth/login)
   * Set to false in production to disable OAuth/login functionality during beta
   */
  auth: import.meta.env.VITE_ENABLE_AUTH === "true",

  /**
   * Enable dashboard/account management page (/dashboard)
   * Set to false in production to disable account management during beta
   */
  dashboard: import.meta.env.VITE_ENABLE_DASHBOARD === "true",

  /**
   * Enable pricing page (/pricing)
   * Set to false to hide pricing page link from navigation
   */
  pricingPage: import.meta.env.VITE_ENABLE_PRICING_PAGE === "true",
} as const;
