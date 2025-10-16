import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";

/**
 * AWS Cognito Configuration
 * Values are loaded from environment variables.
 * See .env.example for setup instructions.
 */
export const cognitoConfig = {
  region: import.meta.env.VITE_COGNITO_REGION || "us-east-1",
  userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID || "",
  userPoolWebClientId: import.meta.env.VITE_COGNITO_CLIENT_ID || "",
  identityPoolId: import.meta.env.VITE_IDENTITY_POOL_ID || "",
};

/**
 * OAuth2 Configuration
 * DynamoDB table names for OAuth2 flow
 */
export const oauth2Config = {
  sessionsTableName:
    import.meta.env.VITE_OAUTH2_SESSIONS_TABLE || "fount-oauth2-sessions",
  authCodesTableName:
    import.meta.env.VITE_AUTH_CODES_TABLE || "fount-auth-codes",
};

// Validate configuration on load
if (!cognitoConfig.userPoolId || !cognitoConfig.userPoolWebClientId) {
  console.error(
    "⚠️ AWS Cognito configuration is incomplete. Please set environment variables:\n" +
      "  - VITE_COGNITO_USER_POOL_ID\n" +
      "  - VITE_COGNITO_CLIENT_ID\n" +
      "  - VITE_COGNITO_REGION\n\n" +
      "See .env.example for details."
  );
}

// Validate OAuth2 configuration for desktop authentication
if (!cognitoConfig.identityPoolId) {
  console.warn(
    "⚠️ OAuth2 configuration is incomplete. Desktop authentication will not work.\n" +
      "Please set:\n" +
      "  - VITE_IDENTITY_POOL_ID\n" +
      "  - VITE_OAUTH2_SESSIONS_TABLE (optional)\n" +
      "  - VITE_AUTH_CODES_TABLE (optional)\n\n" +
      "See .env.example for details."
  );
}

/**
 * Cognito Identity Provider Client
 * Used for all authentication operations
 */
export const cognitoClient = new CognitoIdentityProviderClient({
  region: cognitoConfig.region,
});
