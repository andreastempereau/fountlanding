/**
 * Authentication Services Export
 * Central export point for all authentication functionality
 */

// Export user service functions
export { getUserAccount } from "./userService";

// Export token utilities
export {
  storeTokens,
  getTokens,
  clearTokens,
  isAuthenticated,
  getAccessToken,
  getIdToken,
  getRefreshToken,
  areTokensExpired,
  getTimeUntilExpiration,
} from "../utils/tokenStorage";

// Export session management utilities
export {
  restoreSession,
  setupAutoTokenRefresh,
  ensureValidSession,
} from "../utils/sessionManager";

// Export types
export type {
  AuthTokens,
  AuthResponse,
  SignUpResponse,
  SignInResponse,
  UserAttribute,
  RefreshTokensResponse,
  UserAccountData,
} from "../types/auth";
