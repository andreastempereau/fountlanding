import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { cognitoConfig, oauth2Config } from "../config/cognito";
import { OAuth2Session, AuthorizationCode, AuthResponse } from "../types/auth";

/**
 * Create DynamoDB client with temporary credentials from Cognito Identity Pool
 * @param idToken - Cognito ID token from user authentication
 * @returns DynamoDB Document Client with temporary credentials
 */
function createDynamoDBClient(idToken: string): DynamoDBDocumentClient {
  const credentials = fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: cognitoConfig.region }),
    identityPoolId: cognitoConfig.identityPoolId,
    logins: {
      [`cognito-idp.${cognitoConfig.region}.amazonaws.com/${cognitoConfig.userPoolId}`]:
        idToken,
    },
  });

  const dynamoClient = new DynamoDBClient({
    region: cognitoConfig.region,
    credentials,
  });

  return DynamoDBDocumentClient.from(dynamoClient);
}

/**
 * Generate a cryptographically secure random authorization code
 * @returns Base64URL encoded random string
 */
export function generateAuthorizationCode(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);

  // Convert to base64url encoding
  const base64 = btoa(String.fromCharCode(...array));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

/**
 * Validate and retrieve OAuth2 session from DynamoDB
 * @param sessionId - OAuth2 session ID from URL parameter
 * @param idToken - Cognito ID token for temporary credentials
 * @returns OAuth2Session data if valid, error otherwise
 */
export async function validateOAuth2Session(
  sessionId: string,
  idToken: string
): Promise<AuthResponse<OAuth2Session>> {
  try {
    if (!sessionId) {
      return {
        success: false,
        error: "Session ID is required",
      };
    }

    const dynamoClient = createDynamoDBClient(idToken);

    const command = new GetCommand({
      TableName: oauth2Config.sessionsTableName,
      Key: {
        sessionId: sessionId,
      },
    });

    const response = await dynamoClient.send(command);

    if (!response.Item) {
      return {
        success: false,
        error:
          "Invalid or expired session. Please try again from your desktop app.",
      };
    }

    const session = response.Item as OAuth2Session;

    // Check if session has expired (10 minute TTL)
    if (session.expiresAt && session.expiresAt < Date.now() / 1000) {
      return {
        success: false,
        error: "Session has expired. Please try again from your desktop app.",
      };
    }

    return {
      success: true,
      data: session,
    };
  } catch (error) {
    console.error("Error validating OAuth2 session:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to validate session",
    };
  }
}

/**
 * Store authorization code in DynamoDB with Cognito tokens
 * @param code - Generated authorization code
 * @param oauthSessionId - OAuth2 session ID
 * @param cognitoAccessToken - Cognito access token
 * @param cognitoIdToken - Cognito ID token (also used for DynamoDB credentials)
 * @param cognitoRefreshToken - Cognito refresh token
 * @returns Success or error response
 */
export async function storeAuthorizationCode(
  code: string,
  oauthSessionId: string,
  cognitoAccessToken: string,
  cognitoIdToken: string,
  cognitoRefreshToken: string
): Promise<AuthResponse<void>> {
  try {
    const dynamoClient = createDynamoDBClient(cognitoIdToken);

    const now = Math.floor(Date.now() / 1000); // Unix timestamp in seconds
    const expiresAt = now + 5 * 60; // 5 minutes from now in seconds

    const authCode: AuthorizationCode = {
      code,
      oauthSessionId,
      cognitoAccessToken,
      cognitoIdToken,
      cognitoRefreshToken,
      used: false, // Initialize as unused
      expiresAt,
      createdAt: now,
    };

    const command = new PutCommand({
      TableName: oauth2Config.authCodesTableName,
      Item: authCode,
    });

    await dynamoClient.send(command);

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error storing authorization code:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to store authorization code",
    };
  }
}

/**
 * Complete OAuth2 flow: validate session and store authorization code
 * @param oauthSessionId - OAuth2 session ID
 * @param cognitoAccessToken - Cognito access token
 * @param cognitoIdToken - Cognito ID token
 * @param cognitoRefreshToken - Cognito refresh token
 * @returns Authorization code and state for redirect, or error
 */
export async function completeOAuth2Flow(
  oauthSessionId: string,
  cognitoAccessToken: string,
  cognitoIdToken: string,
  cognitoRefreshToken: string
): Promise<AuthResponse<{ code: string; state: string; redirectUri: string }>> {
  try {
    // First, validate the session to get the state and redirect URI
    const sessionResult = await validateOAuth2Session(
      oauthSessionId,
      cognitoIdToken
    );

    if (!sessionResult.success || !sessionResult.data) {
      return {
        success: false,
        error: sessionResult.error || "Invalid session",
      };
    }

    const session = sessionResult.data;

    // Generate authorization code
    const code = generateAuthorizationCode();
    console.log("Authorization code:", code);

    // Store the authorization code with tokens
    const storeResult = await storeAuthorizationCode(
      code,
      oauthSessionId,
      cognitoAccessToken,
      cognitoIdToken,
      cognitoRefreshToken
    );
    console.log("Store result:", storeResult);

    if (!storeResult.success) {
      return {
        success: false,
        error: storeResult.error || "Failed to generate authorization code",
      };
    }

    return {
      success: true,
      data: {
        code,
        state: session.state,
        redirectUri: session.redirectUri,
      },
    };
  } catch (error) {
    console.error("Error completing OAuth2 flow:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to complete OAuth2 flow",
    };
  }
}
