# AWS Cognito Configuration Instructions

## Step 1: Get Your AWS Cognito Credentials

1. Go to [AWS Cognito Console](https://console.aws.amazon.com/cognito/)
2. Select your User Pool
3. Note these values:

### User Pool ID

- Found on the **"User pool overview"** page
- Format: `us-east-1_xxxxxxxxx` (region_randomstring)
- Example: `us-east-1_bT420YtZu`

### App Client ID

- Go to **"App integration"** tab → **"App clients"**
- Copy the **Client ID** (not the secret!)
- Format: random alphanumeric string
- Example: `47k6iig97cu1nf739csm7cjkin`

### Region

- This is the AWS region where you created your User Pool
- Common values: `us-east-1`, `us-west-2`, `eu-west-1`, etc.

## Step 2: Configure Your Application

1. Open the `.env.local` file in your project root
2. Replace the placeholder values with your actual Cognito credentials:

```env
VITE_COGNITO_USER_POOL_ID=us-east-1_YOUR_ACTUAL_ID
VITE_COGNITO_CLIENT_ID=YOUR_ACTUAL_CLIENT_ID
VITE_COGNITO_REGION=us-east-1
```

## Step 3: Restart Your Dev Server

After updating `.env.local`, restart your development server:

```bash
npm run dev
```

Environment variables in Vite are loaded at build time, so you need to restart for changes to take effect.

## Step 4: Verify Configuration

Open your browser console. If configuration is missing, you'll see a warning message with instructions.

## Security Notes

### ✅ Safe to Expose (NOT secrets)

- User Pool ID
- App Client ID
- Region

These are **public identifiers** that are included in your frontend JavaScript bundle. They just tell your app which Cognito pool to connect to. Security is handled by AWS Cognito through username/password authentication.

### ⚠️ NEVER Commit to Git

- `.env.local` - Your actual credentials (already in .gitignore)
- `.env` - Already in .gitignore

### ✅ Safe to Commit

- `.env.example` - Template with placeholder values

## Troubleshooting

### "Configuration is incomplete" error

- Check that `.env.local` exists in project root
- Verify all three variables are set
- Restart your dev server after changes

### Authentication not working

- Verify User Pool ID format matches `region_id` pattern
- Confirm App Client ID is from the correct User Pool
- Check AWS region matches where your User Pool was created
- Ensure your Cognito App Client has required auth flows enabled:
  - ALLOW_USER_PASSWORD_AUTH
  - ALLOW_REFRESH_TOKEN_AUTH
  - ALLOW_USER_SRP_AUTH (optional, for SRP authentication)

### App Client Settings in AWS

Go to AWS Cognito → Your User Pool → App integration → App clients → Your app client:

1. **Authentication flows**: Enable the flows listed above
2. **Prevent user existence errors**: Enabled (recommended)
3. **Token expiration**: Configure based on your needs
   - Access token: 1 hour (default)
   - ID token: 1 hour (default)
   - Refresh token: 30 days (default)

## Environment Files in This Project

- `.env.local` - Your actual credentials (NOT tracked by git)
- `.env.example` - Template file (tracked by git)
- `.gitignore` - Already configured to ignore `.env` and `.env.local`

## Need Help?

If you're still having issues:

1. Double-check the values in AWS Cognito console
2. Ensure environment variables start with `VITE_` (required for Vite)
3. Check browser console for specific error messages
4. Verify your Cognito User Pool settings allow the authentication flows you're using
