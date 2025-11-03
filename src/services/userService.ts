import { getIdToken } from "../utils/tokenStorage";
import { AuthResponse, UserAccountData } from "../types/auth";

/**
 * User Service
 * Provides functions to fetch user account information from backend
 */

const USER_ACCOUNT_ENDPOINT =
  "https://aj44ou2ld4.execute-api.us-east-1.amazonaws.com/prod/auth/user/account";

/**
 * Get user account information from DynamoDB via Lambda
 * @returns AuthResponse with user account data including subscription info
 */
export async function getUserAccount(): Promise<AuthResponse<UserAccountData>> {
  try {
    const idToken = getIdToken();

    if (!idToken) {
      return {
        success: false,
        error: "No ID token found. User must be signed in.",
      };
    }

    const response = await fetch(USER_ACCOUNT_ENDPOINT, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 404) {
      return {
        success: false,
        error: "not_found",
      };
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.error || "Failed to fetch user account",
      };
    }

    const data = await response.json();

    return {
      success: true,
      data: data as UserAccountData,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch user account",
    };
  }
}
