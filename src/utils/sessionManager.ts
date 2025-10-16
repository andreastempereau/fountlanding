import { refreshTokens } from "../services/authService";
import {
  isAuthenticated,
  areTokensExpired,
  getTimeUntilExpiration,
  clearTokens,
} from "./tokenStorage";

/**
 * Session Manager Utilities
 * Handles automatic session restoration and token refresh
 */

/**
 * Restore user session on app load
 * Checks if user has valid tokens and refreshes if needed
 * @returns Promise<boolean> - true if session is valid/restored, false if user needs to login
 */
export async function restoreSession(): Promise<boolean> {
  // Check if user has any tokens
  if (!isAuthenticated()) {
    return false;
  }

  // Check if tokens are expired or about to expire
  if (areTokensExpired()) {
    console.log("Tokens expired, attempting to refresh...");

    // Try to refresh tokens
    const result = await refreshTokens();

    if (result.success) {
      console.log("Session restored successfully with refreshed tokens");
      return true;
    } else {
      console.log("Failed to refresh tokens, clearing session");
      clearTokens();
      return false;
    }
  }

  // Tokens are still valid
  console.log("Session is valid");
  return true;
}

/**
 * Set up automatic token refresh
 * Automatically refreshes tokens before they expire
 * @returns cleanup function to stop the auto-refresh
 */
export function setupAutoTokenRefresh(): () => void {
  let timeoutId: NodeJS.Timeout | null = null;

  const scheduleRefresh = async () => {
    if (!isAuthenticated()) {
      return;
    }

    const timeUntilExpiration = getTimeUntilExpiration();

    if (timeUntilExpiration === 0) {
      // Already expired, try to refresh immediately
      const result = await refreshTokens();
      if (result.success) {
        // Schedule next refresh
        scheduleRefresh();
      }
      return;
    }

    // Refresh 5 minutes before expiration
    const refreshBuffer = 5 * 60 * 1000; // 5 minutes
    const timeUntilRefresh = Math.max(0, timeUntilExpiration - refreshBuffer);

    console.log(
      `Scheduling token refresh in ${Math.round(
        timeUntilRefresh / 1000
      )} seconds`
    );

    timeoutId = setTimeout(async () => {
      console.log("Auto-refreshing tokens...");
      const result = await refreshTokens();

      if (result.success) {
        console.log("Tokens auto-refreshed successfully");
        // Schedule next refresh
        scheduleRefresh();
      } else {
        console.error("Auto-refresh failed:", result.error);
        // Could trigger a logout or show a message to user
      }
    }, timeUntilRefresh);
  };

  // Start the refresh scheduler
  scheduleRefresh();

  // Return cleanup function
  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };
}

/**
 * Check session validity and refresh if needed
 * Useful to call before making API requests
 * @returns Promise<boolean> - true if session is valid, false otherwise
 */
export async function ensureValidSession(): Promise<boolean> {
  if (!isAuthenticated()) {
    return false;
  }

  if (areTokensExpired()) {
    const result = await refreshTokens();
    return result.success;
  }

  return true;
}
