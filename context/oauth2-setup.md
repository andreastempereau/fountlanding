# OAuth2 Proxy Setup Guide

This guide explains how to use the OAuth2 infrastructure for desktop authentication through your React website.

## Architecture Overview

1. **Desktop App** initiates OAuth2 flow by opening browser to API Gateway
2. **API Gateway** redirects to your React website with session parameters
3. **React Website** handles user authentication and generates authorization code
4. **Desktop App** exchanges authorization code for tokens via API Gateway

## Infrastructure Components

### DynamoDB Tables

- `fount-oauth2-sessions`: Stores PKCE challenges and OAuth2 session state (10 min TTL)
- `fount-auth-codes`: Stores temporary authorization codes (5 min TTL)
- `fount-users`: Stores user subscription and usage data

### Lambda Functions

- **Authorization Endpoint** (`/auth/desktop`): Validates OAuth2 parameters and redirects to login
- **Token Exchange** (`/auth/token`): Exchanges authorization codes for Cognito tokens

### API Gateway

- Base URL: Will be provided in CDK outputs after deployment
- Endpoints:
  - `GET /auth/desktop` - OAuth2 authorization endpoint
  - `POST /auth/token` - Token exchange endpoint

## Deployment

1. **Update the production website URL** in `lib/fount-infra-stack.ts` line 196:

   ```typescript
   ? "https://your-vercel-domain.vercel.app" // Update this with your actual production domain
   ```

   The stack is already configured to use `http://localhost:3000` for development.

2. **Deploy the stack**:

   ```bash
   cdk deploy
   ```

3. **Note the outputs** - you'll need these for integration:
   - `OAuth2ApiUrl`: API Gateway base URL
   - `UserPoolId`, `WebUserPoolClientId`: For Cognito integration
   - Table names: For direct database access if needed

## React Website Integration

Your React app needs to implement these endpoints/pages:

### 1. Login Page (`/auth/login`)

- Receives `?session=<sessionId>` parameter
- Shows login form
- On successful login:
  1. Authenticate with Cognito using `USER_PASSWORD_AUTH`
  2. Generate authorization code
  3. Store code in `fount-auth-codes` table
  4. Redirect to desktop app

### 2. Environment Variables

Add these to your Vercel environment:

```
VITE_USER_POOL_ID=us-east-1_bT420YtZu
VITE_WEB_CLIENT_ID=2msbcnhq522rp53i2kib091u76
VITE_AWS_REGION=us-east-1
VITE_OAUTH2_SESSIONS_TABLE=fount-oauth2-sessions
VITE_AUTH_CODES_TABLE=fount-auth-codes
```

## Desktop App Integration

### 1. Initiate OAuth2 Flow

```javascript
const codeVerifier = generateCodeVerifier(); // Base64URL random string
const codeChallenge = await generateCodeChallenge(codeVerifier); // SHA256 hash

const authUrl = new URL(`${API_GATEWAY_URL}/auth/desktop`);
authUrl.searchParams.set("response_type", "code");
authUrl.searchParams.set("client_id", "desktop_app");
authUrl.searchParams.set("redirect_uri", "fount://auth");
authUrl.searchParams.set("code_challenge", codeChallenge);
authUrl.searchParams.set("code_challenge_method", "S256");
authUrl.searchParams.set("state", generateRandomState());

// Open browser to authUrl
```

### 2. Handle Callback

```javascript
// Listen for fount://auth?code=<code>&state=<state>
const handleCallback = async (code, state) => {
  const tokenResponse = await fetch(`${API_GATEWAY_URL}/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: "fount://auth",
      client_id: "desktop_app",
      code_verifier: codeVerifier,
    }),
  });

  const tokens = await tokenResponse.json();
  // Store tokens securely
};
```

## Security Notes

- Authorization codes expire in 5 minutes
- OAuth2 sessions expire in 10 minutes
- PKCE is required for all desktop authentication
- All redirect URIs must start with `fount://`
- CORS is enabled for all origins (restrict in production)

## Troubleshooting

1. **"Invalid redirect_uri"**: Ensure desktop uses `fount://auth` exactly
2. **"Invalid PKCE code verifier"**: Verify SHA256 hashing and base64url encoding
3. **"Authorization code expired"**: Codes are only valid for 5 minutes
4. **CORS errors**: Check API Gateway CORS configuration

## Next Steps

1. Deploy the infrastructure: `cdk deploy`
2. Update `WEBSITE_BASE_URL` with your actual Vercel domain
3. Implement login page in your React app
4. Implement OAuth2 client in your desktop app
5. Test the complete flow
