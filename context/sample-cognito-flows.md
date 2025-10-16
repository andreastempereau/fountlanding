Perfect! Building your own custom login page gives you full control over the user experience. Here's how to integrate it with your Cognito setup:

## Frontend SDK Setup

First, you'll need the AWS Cognito SDK. The approach depends on your frontend framework:

**For React/Next.js:**

```bash
npm install aws-amplify
# or
npm install @aws-sdk/client-cognito-identity-provider
```

**For vanilla JavaScript:**

```bash
npm install @aws-sdk/client-cognito-identity-provider
```

## Configuration

Set up your Cognito configuration:

```javascript
const cognitoConfig = {
  region: "us-east-1",
  userPoolId: "us-east-1_bT420YtZu",
  userPoolWebClientId: "47k6iig97cu1nf739csm7cjkin",
};
```

## Custom Login Page Implementation

### 1. **Sign Up Flow**

```javascript
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ConfirmSignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

// Sign up function
async function signUp(email, password) {
  try {
    const command = new SignUpCommand({
      ClientId: "47k6iig97cu1nf739csm7cjkin",
      Username: email,
      Password: password,
      UserAttributes: [
        {
          Name: "email",
          Value: email,
        },
      ],
    });

    const response = await client.send(command);
    return { success: true, userSub: response.UserSub };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Confirm sign up with verification code
async function confirmSignUp(email, confirmationCode) {
  try {
    const command = new ConfirmSignUpCommand({
      ClientId: "47k6iig97cu1nf739csm7cjkin",
      Username: email,
      ConfirmationCode: confirmationCode,
    });

    await client.send(command);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

### 2. **Sign In Flow**

```javascript
import { InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";

async function signIn(email, password) {
  try {
    const command = new InitiateAuthCommand({
      ClientId: "47k6iig97cu1nf739csm7cjkin",
      AuthFlow: "USER_SRP_AUTH",
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    });

    const response = await client.send(command);

    // Store tokens securely
    const tokens = {
      accessToken: response.AuthenticationResult.AccessToken,
      idToken: response.AuthenticationResult.IdToken,
      refreshToken: response.AuthenticationResult.RefreshToken,
    };

    // Store in secure storage (localStorage for web, keychain for desktop)
    localStorage.setItem("cognitoTokens", JSON.stringify(tokens));

    return { success: true, tokens };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

### 3. **Forgot Password Flow**

```javascript
import {
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
} from "@aws-sdk/client-cognito-identity-provider";

async function forgotPassword(email) {
  try {
    const command = new ForgotPasswordCommand({
      ClientId: "47k6iig97cu1nf739csm7cjkin",
      Username: email,
    });

    await client.send(command);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function confirmForgotPassword(email, confirmationCode, newPassword) {
  try {
    const command = new ConfirmForgotPasswordCommand({
      ClientId: "47k6iig97cu1nf739csm7cjkin",
      Username: email,
      ConfirmationCode: confirmationCode,
      Password: newPassword,
    });

    await client.send(command);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

### 4. **Change Password (for authenticated users)**

```javascript
import { ChangePasswordCommand } from "@aws-sdk/client-cognito-identity-provider";

async function changePassword(previousPassword, proposedPassword) {
  try {
    const tokens = JSON.parse(localStorage.getItem("cognitoTokens"));

    const command = new ChangePasswordCommand({
      AccessToken: tokens.accessToken,
      PreviousPassword: previousPassword,
      ProposedPassword: proposedPassword,
    });

    await client.send(command);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

### 5. **Token Refresh**

```javascript
import { InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";

async function refreshTokens() {
  try {
    const tokens = JSON.parse(localStorage.getItem("cognitoTokens"));

    const command = new InitiateAuthCommand({
      ClientId: "47k6iig97cu1nf739csm7cjkin",
      AuthFlow: "REFRESH_TOKEN_AUTH",
      AuthParameters: {
        REFRESH_TOKEN: tokens.refreshToken,
      },
    });

    const response = await client.send(command);

    const newTokens = {
      ...tokens,
      accessToken: response.AuthenticationResult.AccessToken,
      idToken: response.AuthenticationResult.IdToken,
    };

    localStorage.setItem("cognitoTokens", JSON.stringify(newTokens));
    return { success: true, tokens: newTokens };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

### 6. **Sign Out**

```javascript
import { GlobalSignOutCommand } from "@aws-sdk/client-cognito-identity-provider";

async function signOut() {
  try {
    const tokens = JSON.parse(localStorage.getItem("cognitoTokens"));

    const command = new GlobalSignOutCommand({
      AccessToken: tokens.accessToken,
    });

    await client.send(command);

    // Clear local storage
    localStorage.removeItem("cognitoTokens");

    return { success: true };
  } catch (error) {
    // Even if the API call fails, clear local storage
    localStorage.removeItem("cognitoTokens");
    return { success: false, error: error.message };
  }
}
```

## Sample Login Form (React)

```jsx
import React, { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (needsConfirmation) {
      const result = await confirmSignUp(email, confirmationCode);
      if (result.success) {
        setNeedsConfirmation(false);
        setIsSignUp(false);
        // Show success message
      }
    } else if (isSignUp) {
      const result = await signUp(email, password);
      if (result.success) {
        setNeedsConfirmation(true);
      }
    } else {
      const result = await signIn(email, password);
      if (result.success) {
        // Redirect to app
        window.location.href = "/dashboard";
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {!needsConfirmation && (
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      )}

      {needsConfirmation && (
        <input
          type="text"
          placeholder="Verification Code"
          value={confirmationCode}
          onChange={(e) => setConfirmationCode(e.target.value)}
          required
        />
      )}

      <button type="submit">
        {needsConfirmation ? "Verify" : isSignUp ? "Sign Up" : "Sign In"}
      </button>

      {!needsConfirmation && (
        <button type="button" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "Already have an account?" : "Need an account?"}
        </button>
      )}
    </form>
  );
}
```

## Key Benefits of Custom Implementation

1. **Full UI Control**: Design matches your brand
2. **Better UX**: No redirects to Cognito hosted UI
3. **Custom Validation**: Add your own form validation
4. **Error Handling**: Custom error messages and handling
5. **Analytics**: Track user interactions on your own forms

This approach gives you complete control while still leveraging all the security and infrastructure benefits of AWS Cognito!
