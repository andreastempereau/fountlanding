# OAuth2 Desktop Authentication Implementation

This document describes the OAuth2 PKCE flow implementation for desktop app authentication.

## Overview

The implementation provides a secure OAuth2 authorization code flow with PKCE (Proof Key for Code Exchange) for authenticating desktop applications through the web interface.

## Architecture

### Flow Diagram

```
Desktop App → API Gateway → Website Login → DynamoDB → Desktop App
     |            |              |              |           |
     |            |              |              |           |
  Initiates    Validates      Authenticates   Stores    Exchanges
   OAuth2      Request        User + Stores   Auth      Code for
   Flow                       Auth Code       Code      Tokens
```

### Step-by-Step Flow

1. **Desktop app initiates OAuth2 flow**

   - Generates PKCE code verifier and challenge
   - Opens browser to API Gateway `/auth/desktop` endpoint
   - Passes: `response_type=code`, `client_id`, `redirect_uri=fount://auth`, `code_challenge`, `state`

2. **API Gateway creates session**

   - Validates OAuth2 parameters
   - Creates session in DynamoDB (`fount-oauth2-sessions` table)
   - Redirects to website: `https://yoursite.com/auth/login?session=<sessionId>`

3. **Website displays login page** (`/auth/login`)

   - Extracts session ID from URL parameter
   - Shows login form to user

4. **User authenticates**

   - Enters email and password
   - Website authenticates with Cognito User Pool
   - Receives Cognito tokens (access, ID, refresh)

5. **Website completes OAuth2 flow**

   - Exchanges ID token for temporary AWS credentials via Cognito Identity Pool
   - Uses credentials to access DynamoDB
   - Validates OAuth2 session from `fount-oauth2-sessions` table
   - Generates secure authorization code
   - Stores code with Cognito tokens in `fount-auth-codes` table (5 min TTL)

6. **Website redirects to desktop app**

   - Redirects to: `fount://auth?code=<authCode>&state=<state>`

7. **Desktop app exchanges code for tokens**
   - Sends code + code_verifier to API Gateway `/auth/token`
   - API Gateway validates PKCE and returns Cognito tokens

## Implementation Files

### 1. Types (`src/types/auth.ts`)

```typescript
export interface OAuth2Session {
  sessionId: string;
  codeChallenge: string;
  codeChallengeMethod: string;
  state: string;
  redirectUri: string;
  clientId: string;
  expiresAt: number; // 10 minute TTL
  createdAt: number;
}

export interface AuthorizationCode {
  code: string;
  sessionId: string;
  accessToken: string;
  idToken: string;
  refreshToken: string;
  expiresAt: number; // 5 minute TTL
  createdAt: number;
}
```

### 2. Configuration (`src/config/cognito.ts`)

Extended with:

- `identityPoolId`: Cognito Identity Pool for temporary credentials
- `oauth2Config`: DynamoDB table names for OAuth2 flow

### 3. OAuth2 Service (`src/services/oauth2Service.ts`)

**Key Functions:**

- `createDynamoDBClient(idToken)`: Creates DynamoDB client with temporary AWS credentials
- `generateAuthorizationCode()`: Generates cryptographically secure random code
- `validateOAuth2Session(sessionId, idToken)`: Fetches and validates session from DynamoDB
- `storeAuthorizationCode(...)`: Stores auth code with tokens in DynamoDB
- `completeOAuth2Flow(...)`: Orchestrates the entire flow

### 4. Login Page (`src/pages/OAuth2LoginPage.tsx`)

React component that:

- Validates session parameter
- Displays login form
- Handles authentication
- Completes OAuth2 flow
- Redirects to desktop app

### 5. Routing (`src/App.tsx`)

Added route: `/auth/login` → `OAuth2LoginPage` (public, no auth required)

## Environment Variables

Required environment variables (see `.env.example`):

```bash
# Cognito User Pool
VITE_COGNITO_USER_POOL_ID=us-east-1_bT420YtZu
VITE_COGNITO_CLIENT_ID=2msbcnhq522rp53i2kib091u76
VITE_COGNITO_REGION=us-east-1

# Cognito Identity Pool (for temporary credentials)
VITE_IDENTITY_POOL_ID=us-east-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# DynamoDB Tables
VITE_OAUTH2_SESSIONS_TABLE=fount-oauth2-sessions
VITE_AUTH_CODES_TABLE=fount-auth-codes
```

## Security Features

1. **PKCE (Proof Key for Code Exchange)**

   - Prevents authorization code interception attacks
   - Desktop app must provide code_verifier to exchange code for tokens

2. **Temporary AWS Credentials**

   - Website never stores AWS credentials
   - Uses Cognito Identity Pool to exchange ID token for temporary credentials
   - Credentials are scoped to specific DynamoDB operations

3. **Short-Lived Tokens**

   - OAuth2 sessions expire in 10 minutes
   - Authorization codes expire in 5 minutes
   - Expired items are automatically removed by DynamoDB TTL

4. **Session Validation**

   - Session ID is validated before authentication
   - Session data (code challenge, state) is verified before issuing code

5. **Secure Random Generation**
   - Authorization codes use `crypto.getRandomValues()` (32 bytes)
   - Base64URL encoding for URL-safe tokens

## Testing the Flow

### Prerequisites

1. Deploy AWS infrastructure (API Gateway, Lambda, DynamoDB, Cognito)
2. Set environment variables in `.env` file
3. Update Cognito Identity Pool to allow authenticated access to DynamoDB tables

### Manual Test

1. **Simulate desktop app initiation**:

   ```bash
   # Desktop app would do this, but for testing, get a session ID from API Gateway
   curl "https://your-api-gateway.amazonaws.com/auth/desktop?response_type=code&client_id=desktop_app&redirect_uri=fount://auth&code_challenge=CHALLENGE&code_challenge_method=S256&state=random123"
   ```

2. **Extract session ID from redirect**:
   The API Gateway will redirect to: `https://yoursite.com/auth/login?session=<sessionId>`

3. **Visit login page**:
   Open browser to: `http://localhost:5173/auth/login?session=<sessionId>`

4. **Sign in**:
   Enter valid Cognito credentials

5. **Verify redirect**:
   Should redirect to: `fount://auth?code=<authCode>&state=random123`

### Troubleshooting

**Error: "Invalid or expired session"**

- Session may have expired (10 min TTL)
- Session ID may be incorrect
- Check DynamoDB table has the session

**Error: "Failed to validate session"**

- Check Identity Pool ID is correct
- Verify Identity Pool allows authenticated access to DynamoDB
- Check IAM role attached to Identity Pool has DynamoDB permissions

**Error: "Failed to store authorization code"**

- Check DynamoDB table exists
- Verify table name matches environment variable
- Check IAM permissions for PutItem operation

**Browser shows "Invalid OAuth2 request"**

- Missing `session` URL parameter
- Must initiate flow from desktop app first

## DynamoDB Table Structure

### `fount-oauth2-sessions` Table

```
Partition Key: sessionId (String)
TTL Attribute: expiresAt (Number, Unix timestamp)

Item Example:
{
  "sessionId": "abc123...",
  "codeChallenge": "xyz789...",
  "codeChallengeMethod": "S256",
  "state": "random123",
  "redirectUri": "fount://auth",
  "clientId": "desktop_app",
  "expiresAt": 1234567890,
  "createdAt": 1234567290
}
```

### `fount-auth-codes` Table

```
Partition Key: code (String)
TTL Attribute: expiresAt (Number, Unix timestamp)

Item Example:
{
  "code": "authcode123...",
  "sessionId": "abc123...",
  "accessToken": "eyJ...",
  "idToken": "eyJ...",
  "refreshToken": "eyJ...",
  "expiresAt": 1234567590,
  "createdAt": 1234567290
}
```

## IAM Permissions Required

The Cognito Identity Pool's authenticated role needs:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["dynamodb:GetItem", "dynamodb:PutItem"],
      "Resource": [
        "arn:aws:dynamodb:us-east-1:ACCOUNT_ID:table/fount-oauth2-sessions",
        "arn:aws:dynamodb:us-east-1:ACCOUNT_ID:table/fount-auth-codes"
      ]
    }
  ]
}
```

## Next Steps

1. **Deploy Infrastructure**: Ensure API Gateway and DynamoDB tables are deployed
2. **Configure Identity Pool**: Set up authenticated role with DynamoDB permissions
3. **Set Environment Variables**: Update `.env` with actual resource IDs
4. **Test Flow**: Verify complete OAuth2 flow works end-to-end
5. **Desktop App Integration**: Implement OAuth2 client in desktop app
6. **Production Deployment**: Deploy website to Vercel/production environment

## Additional Resources

- [OAuth2 RFC 6749](https://tools.ietf.org/html/rfc6749)
- [PKCE RFC 7636](https://tools.ietf.org/html/rfc7636)
- [AWS Cognito Identity Pools](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-identity.html)
- [DynamoDB TTL](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html)
