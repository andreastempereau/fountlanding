import { AuthTokens } from "../types/auth";

const TOKENS_KEY = "cognitoTokens";

/**
 * Token Storage Utilities
 * Manages authentication tokens in localStorage
 */

/**
 * Store authentication tokens in localStorage
 */
export function storeTokens(tokens: AuthTokens): void {
  try {
    localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
  } catch (error) {
    console.error("Failed to store tokens:", error);
  }
}

/**
 * Retrieve authentication tokens from localStorage
 */
export function getTokens(): AuthTokens | null {
  try {
    const tokensJson = localStorage.getItem(TOKENS_KEY);
    if (!tokensJson) {
      return null;
    }
    return JSON.parse(tokensJson) as AuthTokens;
  } catch (error) {
    console.error("Failed to retrieve tokens:", error);
    return null;
  }
}

/**
 * Clear authentication tokens from localStorage
 */
export function clearTokens(): void {
  try {
    localStorage.removeItem(TOKENS_KEY);
  } catch (error) {
    console.error("Failed to clear tokens:", error);
  }
}

/**
 * Check if user is authenticated (has valid tokens)
 */
export function isAuthenticated(): boolean {
  const tokens = getTokens();
  return tokens !== null && !!tokens.accessToken;
}

/**
 * Get access token for API requests
 */
export function getAccessToken(): string | null {
  const tokens = getTokens();
  return tokens?.accessToken ?? null;
}

/**
 * Get ID token for user information
 */
export function getIdToken(): string | null {
  const tokens = getTokens();
  return tokens?.idToken ?? null;
}

/**
 * Get refresh token for token renewal
 */
export function getRefreshToken(): string | null {
  const tokens = getTokens();
  return tokens?.refreshToken ?? null;
}

/**
 * Check if tokens are expired
 * @returns true if tokens are expired or about to expire (within 5 minutes)
 */
export function areTokensExpired(): boolean {
  const tokens = getTokens();
  if (!tokens || !tokens.expiresAt) {
    return true;
  }
  // Consider expired if within 5 minutes of expiration (300000ms)
  const bufferTime = 5 * 60 * 1000;
  return Date.now() >= tokens.expiresAt - bufferTime;
}

/**
 * Get time until token expiration in milliseconds
 * @returns milliseconds until expiration, or 0 if expired/no tokens
 */
export function getTimeUntilExpiration(): number {
  const tokens = getTokens();
  if (!tokens || !tokens.expiresAt) {
    return 0;
  }
  const timeLeft = tokens.expiresAt - Date.now();
  return Math.max(0, timeLeft);
}
