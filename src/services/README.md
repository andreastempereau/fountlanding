# Authentication Services

This directory contains the AWS Cognito authentication implementation for the application.

## Structure

```
services/
├── authService.ts      # Core authentication functions
├── index.ts           # Central export point
└── README.md          # This file

config/
└── cognito.ts         # Cognito client configuration

types/
└── auth.ts            # TypeScript type definitions

utils/
└── tokenStorage.ts    # Token management utilities
```

## Usage

### Basic Sign Up Flow

```typescript
import { signUp, confirmSignUp } from "./services";

// 1. Sign up a new user
const signUpResult = await signUp("user@example.com", "SecurePassword123!");
if (signUpResult.success) {
  console.log("User created:", signUpResult.data?.userSub);

  // 2. Confirm with verification code sent to email
  const confirmResult = await confirmSignUp("user@example.com", "123456");
  if (confirmResult.success) {
    console.log("Email confirmed!");
  }
}
```

### Sign In Flow

```typescript
import { signIn, isAuthenticated } from "./services";

const result = await signIn("user@example.com", "SecurePassword123!");
if (result.success) {
  console.log("Signed in successfully!");
  console.log("Access Token:", result.data?.tokens.accessToken);

  // Check authentication status
  if (isAuthenticated()) {
    console.log("User is authenticated");
  }
}
```

### Forgot Password Flow

```typescript
import { forgotPassword, confirmForgotPassword } from "./services";

// 1. Request password reset
const resetResult = await forgotPassword("user@example.com");
if (resetResult.success) {
  console.log("Reset code sent to email");

  // 2. Confirm with code and new password
  const confirmResult = await confirmForgotPassword(
    "user@example.com",
    "123456",
    "NewSecurePassword123!"
  );
  if (confirmResult.success) {
    console.log("Password reset successfully");
  }
}
```

### Change Password (Authenticated Users)

```typescript
import { changePassword } from "./services";

const result = await changePassword("OldPassword123!", "NewPassword123!");
if (result.success) {
  console.log("Password changed successfully");
}
```

### Token Management

```typescript
import {
  getTokens,
  getAccessToken,
  refreshTokens,
  isAuthenticated,
} from "./services";

// Get all tokens
const tokens = getTokens();
console.log("Tokens:", tokens);

// Get specific token
const accessToken = getAccessToken();
console.log("Access Token:", accessToken);

// Check if user is authenticated
if (isAuthenticated()) {
  console.log("User has valid tokens");
}

// Refresh expired tokens
const refreshResult = await refreshTokens();
if (refreshResult.success) {
  console.log("Tokens refreshed!");
}
```

### Sign Out

```typescript
import { signOut } from "./services";

const result = await signOut();
if (result.success) {
  console.log("Signed out successfully");
  // Redirect to login page
}
```

## Response Format

All authentication functions return a standardized response:

```typescript
interface AuthResponse<T> {
  success: boolean;
  error?: string; // Present if success is false
  data?: T; // Present if success is true and there's data to return
}
```

## Token Storage

Tokens are automatically stored in `localStorage` under the key `cognitoTokens`:

```typescript
{
  accessToken: string;
  idToken: string;
  refreshToken: string;
}
```

## Configuration

Current configuration uses placeholder credentials from the sample documentation:

- **User Pool ID**: `us-east-1_bT420YtZu`
- **Client ID**: `47k6iig97cu1nf739csm7cjkin`
- **Region**: `us-east-1`

⚠️ **Important**: Replace these with your actual Cognito credentials in `src/config/cognito.ts` before deploying to production.

## Security Notes

1. **Token Storage**: Currently using `localStorage`. For production, consider:

   - HttpOnly cookies for web applications
   - Secure storage solutions for mobile apps
   - Token encryption for sensitive applications

2. **Auth Flow**: Using `USER_PASSWORD_AUTH` flow. For enhanced security, consider:

   - Enabling SRP (Secure Remote Password) if your Cognito setup supports it
   - Implementing MFA (Multi-Factor Authentication)

3. **Error Handling**: Always check the `success` field and handle errors appropriately in your UI.

## Next Steps

To integrate these services into your UI:

1. Create login/signup components
2. Add protected route logic
3. Implement token refresh on API calls
4. Add loading and error states
5. Handle session expiration
