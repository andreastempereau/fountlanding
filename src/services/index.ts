/**
 * Authentication Services Export
 * Central export point for all authentication functionality
 */

// Export all auth service functions
export {
  signUp,
  confirmSignUp,
  signIn,
  forgotPassword,
  confirmForgotPassword,
  changePassword,
  refreshTokens,
  signOut,
} from "./authService";

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
} from "../types/auth";

// Export config (useful for debugging or advanced usage)
export { cognitoConfig, cognitoClient } from "../config/cognito";
