import {
  SignUpCommand,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
  ChangePasswordCommand,
  GlobalSignOutCommand,
  DeleteUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { cognitoClient, cognitoConfig } from "../config/cognito";
import {
  AuthResponse,
  SignUpResponse,
  SignInResponse,
  RefreshTokensResponse,
} from "../types/auth";
import {
  storeTokens,
  getTokens,
  clearTokens,
  getAccessToken,
} from "../utils/tokenStorage";

/**
 * Authentication Service
 * Provides all AWS Cognito authentication flows
 */

/**
 * Sign up a new user
 * @param email - User's email address
 * @param password - User's password
 * @returns AuthResponse with user sub and confirmation status
 */
export async function signUp(
  email: string,
  password: string
): Promise<AuthResponse<SignUpResponse>> {
  try {
    const command = new SignUpCommand({
      ClientId: cognitoConfig.userPoolWebClientId,
      Username: email,
      Password: password,
      UserAttributes: [
        {
          Name: "email",
          Value: email,
        },
      ],
    });

    const response = await cognitoClient.send(command);

    return {
      success: true,
      data: {
        userSub: response.UserSub || "",
        userConfirmed: response.UserConfirmed || false,
        codeDeliveryDetails: response.CodeDeliveryDetails
          ? {
              destination: response.CodeDeliveryDetails.Destination,
              deliveryMedium: response.CodeDeliveryDetails.DeliveryMedium,
              attributeName: response.CodeDeliveryDetails.AttributeName,
            }
          : undefined,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Sign up failed",
    };
  }
}

/**
 * Confirm sign up with verification code
 * @param email - User's email address
 * @param confirmationCode - Verification code sent to user's email
 * @returns AuthResponse indicating success or failure
 */
export async function confirmSignUp(
  email: string,
  confirmationCode: string
): Promise<AuthResponse<void>> {
  try {
    const command = new ConfirmSignUpCommand({
      ClientId: cognitoConfig.userPoolWebClientId,
      Username: email,
      ConfirmationCode: confirmationCode,
    });

    await cognitoClient.send(command);

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Confirmation failed",
    };
  }
}

/**
 * Sign in a user
 * @param email - User's email address
 * @param password - User's password
 * @returns AuthResponse with authentication tokens
 */
export async function signIn(
  email: string,
  password: string
): Promise<AuthResponse<SignInResponse>> {
  try {
    const command = new InitiateAuthCommand({
      ClientId: cognitoConfig.userPoolWebClientId,
      AuthFlow: "USER_PASSWORD_AUTH",
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    });

    const response = await cognitoClient.send(command);

    if (!response.AuthenticationResult) {
      return {
        success: false,
        error: "Authentication result not received",
      };
    }

    // Calculate token expiration time (Cognito tokens expire in 1 hour)
    const expiresIn = response.AuthenticationResult.ExpiresIn || 3600; // Default 1 hour
    const expiresAt = Date.now() + expiresIn * 1000;

    const tokens = {
      accessToken: response.AuthenticationResult.AccessToken || "",
      idToken: response.AuthenticationResult.IdToken || "",
      refreshToken: response.AuthenticationResult.RefreshToken || "",
      expiresAt,
    };

    // Store tokens in localStorage
    storeTokens(tokens);

    return {
      success: true,
      data: { tokens },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Sign in failed",
    };
  }
}

/**
 * Initiate forgot password flow
 * @param email - User's email address
 * @returns AuthResponse indicating if reset code was sent
 */
export async function forgotPassword(
  email: string
): Promise<AuthResponse<void>> {
  try {
    const command = new ForgotPasswordCommand({
      ClientId: cognitoConfig.userPoolWebClientId,
      Username: email,
    });

    await cognitoClient.send(command);

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Forgot password request failed",
    };
  }
}

/**
 * Confirm forgot password with verification code and new password
 * @param email - User's email address
 * @param confirmationCode - Verification code sent to user's email
 * @param newPassword - New password to set
 * @returns AuthResponse indicating success or failure
 */
export async function confirmForgotPassword(
  email: string,
  confirmationCode: string,
  newPassword: string
): Promise<AuthResponse<void>> {
  try {
    const command = new ConfirmForgotPasswordCommand({
      ClientId: cognitoConfig.userPoolWebClientId,
      Username: email,
      ConfirmationCode: confirmationCode,
      Password: newPassword,
    });

    await cognitoClient.send(command);

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Password reset confirmation failed",
    };
  }
}

/**
 * Change password for authenticated user
 * @param previousPassword - Current password
 * @param proposedPassword - New password to set
 * @returns AuthResponse indicating success or failure
 */
export async function changePassword(
  previousPassword: string,
  proposedPassword: string
): Promise<AuthResponse<void>> {
  try {
    const accessToken = getAccessToken();

    if (!accessToken) {
      return {
        success: false,
        error: "No access token found. User must be signed in.",
      };
    }

    const command = new ChangePasswordCommand({
      AccessToken: accessToken,
      PreviousPassword: previousPassword,
      ProposedPassword: proposedPassword,
    });

    await cognitoClient.send(command);

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Change password failed",
    };
  }
}

/**
 * Refresh authentication tokens
 * @returns AuthResponse with new tokens
 */
export async function refreshTokens(): Promise<
  AuthResponse<RefreshTokensResponse>
> {
  try {
    const tokens = getTokens();

    if (!tokens || !tokens.refreshToken) {
      return {
        success: false,
        error: "No refresh token found",
      };
    }

    const command = new InitiateAuthCommand({
      ClientId: cognitoConfig.userPoolWebClientId,
      AuthFlow: "REFRESH_TOKEN_AUTH",
      AuthParameters: {
        REFRESH_TOKEN: tokens.refreshToken,
      },
    });

    const response = await cognitoClient.send(command);

    if (!response.AuthenticationResult) {
      return {
        success: false,
        error: "Authentication result not received",
      };
    }

    // Calculate new expiration time
    const expiresIn = response.AuthenticationResult.ExpiresIn || 3600;
    const expiresAt = Date.now() + expiresIn * 1000;

    const newTokens = {
      ...tokens,
      accessToken:
        response.AuthenticationResult.AccessToken || tokens.accessToken,
      idToken: response.AuthenticationResult.IdToken || tokens.idToken,
      expiresAt,
    };

    storeTokens(newTokens);

    return {
      success: true,
      data: { tokens: newTokens },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Token refresh failed",
    };
  }
}

/**
 * Sign out the current user
 * Performs global sign out and clears local storage
 * @returns AuthResponse indicating success or failure
 */
export async function signOut(): Promise<AuthResponse<void>> {
  try {
    const accessToken = getAccessToken();

    if (accessToken) {
      const command = new GlobalSignOutCommand({
        AccessToken: accessToken,
      });

      await cognitoClient.send(command);
    }

    // Clear tokens even if API call fails
    clearTokens();

    return {
      success: true,
    };
  } catch (error) {
    // Still clear local storage even if the API call fails
    clearTokens();

    return {
      success: false,
      error: error instanceof Error ? error.message : "Sign out failed",
    };
  }
}

/**
 * Delete the current user's account
 * Requires authentication token
 * @returns AuthResponse indicating success or failure
 */
export async function deleteAccount(): Promise<AuthResponse<void>> {
  try {
    const accessToken = getAccessToken();

    if (!accessToken) {
      return {
        success: false,
        error: "No access token found. User must be signed in.",
      };
    }

    const command = new DeleteUserCommand({
      AccessToken: accessToken,
    });

    await cognitoClient.send(command);

    // Clear tokens after successful deletion
    clearTokens();

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Account deletion failed",
    };
  }
}
