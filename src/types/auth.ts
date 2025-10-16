/**
 * Authentication Types
 * Type definitions for AWS Cognito authentication flows
 */

export interface AuthTokens {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  expiresAt?: number; // Timestamp when tokens expire
}

export interface AuthResponse<T = unknown> {
  success: boolean;
  error?: string;
  data?: T;
}

export interface SignUpResponse {
  userSub: string;
  userConfirmed: boolean;
  codeDeliveryDetails?: {
    destination?: string;
    deliveryMedium?: string;
    attributeName?: string;
  };
}

export interface SignInResponse {
  tokens: AuthTokens;
}

export interface UserAttribute {
  Name: string;
  Value: string;
}

export interface RefreshTokensResponse {
  tokens: AuthTokens;
}

/**
 * OAuth2 Session stored in DynamoDB
 * Used for desktop app authentication flow
 */
export interface OAuth2Session {
  sessionId: string;
  codeChallenge: string;
  codeChallengeMethod: string;
  state: string;
  redirectUri: string;
  clientId: string;
  expiresAt: number; // Unix timestamp
  createdAt: number; // Unix timestamp
}

/**
 * Authorization Code stored in DynamoDB
 * Exchanged for Cognito tokens by desktop app
 */
export interface AuthorizationCode {
  code: string;
  oauthSessionId: string;
  cognitoAccessToken: string;
  cognitoIdToken: string;
  cognitoRefreshToken: string;
  used: boolean; // Flag to prevent code reuse
  expiresAt: number; // Unix timestamp (5 minutes from creation)
  createdAt: number; // Unix timestamp
}
