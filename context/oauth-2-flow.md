## Website Integration Changes for OAuth2 PKCE Flow

Based on your infrastructure, here are the specific changes you need to make to your website to integrate with the OAuth2 PKCE flow:

### 1. Environment Variables Setup

You'll need to add these environment variables to your website (e.g., in Vercel):

```env
VITE_USER_POOL_ID=us-east-1_bT420YtZu
VITE_WEB_CLIENT_ID=2msbcnhq522rp53i2kib091u76
VITE_AWS_REGION=us-east-1
VITE_OAUTH2_SESSIONS_TABLE=fount-oauth2-sessions
VITE_AUTH_CODES_TABLE=fount-auth-codes
```

### 2. Create OAuth2 Login Page (`/auth/login`)

This is the **most critical** change. Your website needs a new route at `/auth/login` that:

- **Receives the session parameter**: When desktop users initiate OAuth2, they'll be redirected to `https://yoursite.com/auth/login?session=<sessionId>`
- **Validates the session**: Fetch the session data from DynamoDB to ensure it's valid
- **Shows login form**: Present your normal login UI
- **Handles authentication**: Use Cognito's `USER_PASSWORD_AUTH` flow
- **Generates authorization code**: Create a unique code and store it with the Cognito tokens
- **Redirects back to desktop**: Send user back to the desktop app with the auth code

### 3. Required Dependencies

You'll need to install these AWS SDK packages:

```bash
npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb @aws-sdk/client-cognito-identity-provider
```

### 4. The OAuth2 Flow Implementation

Here's how the flow works from your website's perspective:

1. **Desktop app** opens browser → `API Gateway /auth/desktop` → redirects to your website
2. **Your website** receives `?session=<sessionId>` parameter
3. **Your website** fetches session data from DynamoDB to get PKCE challenge
4. **User logs in** through your normal login form
5. **Your website** authenticates with Cognito using `USER_PASSWORD_AUTH`
6. **Your website** generates an authorization code and stores it with the Cognito tokens
7. **Your website** redirects back to desktop app: `fount://auth?code=<code>&state=<state>`
8. **Desktop app** exchanges the code for tokens via `API Gateway /auth/token`

### 5. Key Implementation Details

**Session Validation**: Your login page needs to validate that the session exists and hasn't expired (10-minute TTL).

**Authorization Code Storage**: After successful login, generate a random code and store it in the `fount-auth-codes` table with:

- The authorization code as the key
- Associated OAuth2 session ID
- Cognito access, ID, and refresh tokens
- 5-minute expiration

**Redirect Handling**: After storing the auth code, redirect to the desktop app's callback URL with the code and state parameters.
