# Session Persistence Guide 🔐

## Overview

Yes! **Users stay logged in across browser sessions**. When a user logs in once, they won't need to log in again when they return to your site - their authentication persists automatically.

## How It Works

### 1. **Tokens Stored in localStorage**

When a user signs in, their authentication tokens are automatically saved to browser `localStorage`:

```typescript
await signIn(email, password);
// ✅ Tokens automatically stored in localStorage
// ✅ Survives browser close/restart
```

### 2. **Session Restoration on App Load**

When the user returns, call `restoreSession()` to automatically restore their session:

```typescript
const isValid = await restoreSession();
if (isValid) {
  // User is still logged in! 🎉
  // No need to show login form
}
```

### 3. **Automatic Token Refresh**

Cognito tokens expire after 1 hour. The system can automatically refresh them before expiration:

```typescript
setupAutoTokenRefresh();
// ✅ Tokens automatically refresh every ~55 minutes
// ✅ User stays logged in indefinitely (until they explicitly log out)
```

## Quick Implementation

### Step 1: Update Your App.tsx

```typescript
import { useEffect, useState } from "react";
import { restoreSession, setupAutoTokenRefresh } from "./services";

function App() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Restore session when app loads
    const initializeAuth = async () => {
      const isValid = await restoreSession();
      setAuthenticated(isValid);
      setLoading(false);

      // Set up auto-refresh if user is authenticated
      if (isValid) {
        return setupAutoTokenRefresh();
      }
    };

    const cleanupPromise = initializeAuth();

    // Cleanup on unmount
    return () => {
      cleanupPromise.then((cleanup) => cleanup && cleanup());
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return authenticated ? <Dashboard /> : <LoginPage />;
}
```

### Step 2: That's It! 🎉

Users now:

- ✅ Stay logged in after closing browser
- ✅ Stay logged in after refreshing page
- ✅ Stay logged in for days/weeks (as long as refresh token is valid)
- ✅ Have tokens automatically refreshed before expiration

## Features Included

### Core Persistence Features

| Feature              | Function                  | Description                                   |
| -------------------- | ------------------------- | --------------------------------------------- |
| **Token Storage**    | `storeTokens()`           | Automatically saves tokens to localStorage    |
| **Session Check**    | `isAuthenticated()`       | Checks if user has valid tokens               |
| **Session Restore**  | `restoreSession()`        | Restores session and refreshes expired tokens |
| **Auto Refresh**     | `setupAutoTokenRefresh()` | Keeps user logged in indefinitely             |
| **Expiration Check** | `areTokensExpired()`      | Checks if tokens need refreshing              |
| **Valid Session**    | `ensureValidSession()`    | Ensures tokens are valid before API calls     |

### Token Lifecycle

```
User Signs In
     ↓
Tokens Stored in localStorage with expiration time
     ↓
User Closes Browser ❌
     ↓
User Returns to Site 🎉
     ↓
restoreSession() checks tokens
     ↓
If expired → refreshTokens() → User stays logged in ✅
If valid → User immediately authenticated ✅
If refresh fails → User needs to log in again
```

### Token Expiration Times

- **Access Token**: 1 hour (automatically tracked)
- **ID Token**: 1 hour (automatically tracked)
- **Refresh Token**: 30 days (Cognito default)

The system automatically refreshes access/ID tokens **5 minutes before** they expire.

## Real-World Usage Examples

### Example 1: Check Before API Calls

```typescript
import { ensureValidSession, getAccessToken } from "./services";

async function fetchUserProfile() {
  // Ensure tokens are valid (auto-refreshes if needed)
  const sessionValid = await ensureValidSession();

  if (!sessionValid) {
    window.location.href = "/login";
    return;
  }

  // Make API call with fresh token
  const response = await fetch("/api/profile", {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}
```

### Example 2: Protected Route Component

```typescript
import { restoreSession } from "./services";
import { useEffect, useState } from "react";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    restoreSession().then((valid) => {
      setAuthenticated(valid);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Checking authentication...</div>;
  if (!authenticated) return <Navigate to="/login" />;

  return children;
}
```

### Example 3: Custom Auth Hook

```typescript
import { useEffect, useState } from "react";
import { restoreSession, setupAutoTokenRefresh } from "./services";

export function useAuth() {
  const [auth, setAuth] = useState({ loading: true, authenticated: false });

  useEffect(() => {
    const initialize = async () => {
      const valid = await restoreSession();
      setAuth({ loading: false, authenticated: valid });

      if (valid) {
        return setupAutoTokenRefresh();
      }
    };

    const cleanupPromise = initialize();
    return () => {
      cleanupPromise.then((cleanup) => cleanup && cleanup());
    };
  }, []);

  return auth;
}

// Usage:
function App() {
  const { loading, authenticated } = useAuth();
  // ...
}
```

## Testing the Persistence

### Test 1: Basic Persistence

1. Sign in to your app
2. Close the browser completely
3. Open the browser and visit your site
4. ✅ You should be automatically logged in!

### Test 2: Token Refresh

1. Sign in to your app
2. Wait for 55+ minutes (or adjust expiration time in testing)
3. ✅ Tokens should auto-refresh in the background
4. ✅ You stay logged in without interruption

### Test 3: Manual Session Check

```typescript
// In browser console:
import { isAuthenticated, getTokens } from "./services";

console.log("Authenticated:", isAuthenticated());
console.log("Tokens:", getTokens());
```

## Security Considerations

### Current Implementation

- ✅ Tokens stored in `localStorage` (persists across sessions)
- ✅ Tokens automatically expire after 1 hour
- ✅ Refresh tokens expire after 30 days (Cognito default)
- ✅ Automatic token refresh before expiration
- ✅ Global sign out clears all tokens

### Production Recommendations

1. **HttpOnly Cookies**: For web apps, consider storing tokens in HttpOnly cookies instead of localStorage (more secure against XSS attacks)

2. **Token Encryption**: For sensitive applications, encrypt tokens before storing

3. **Inactivity Timeout**: Add automatic logout after X minutes of inactivity

4. **Device Tracking**: Track which devices/sessions are active

5. **MFA**: Enable Multi-Factor Authentication in Cognito

## Troubleshooting

### User Not Staying Logged In?

**Check if restoreSession() is being called:**

```typescript
// In your App.tsx or main component
useEffect(() => {
  restoreSession().then((valid) => {
    console.log("Session restored:", valid);
  });
}, []);
```

**Check localStorage:**

```typescript
// In browser console
console.log(localStorage.getItem("cognitoTokens"));
```

**Check for errors:**

```typescript
// In browser console, look for:
// "Failed to refresh tokens"
// "Tokens expired"
```

### Tokens Expiring Too Quickly?

Make sure `setupAutoTokenRefresh()` is called after successful authentication:

```typescript
useEffect(() => {
  if (authenticated) {
    return setupAutoTokenRefresh();
  }
}, [authenticated]);
```

## Summary

✅ **YES, authentication persists!** Users stay logged in across browser sessions.

✅ **Automatic token refresh** keeps users logged in indefinitely (until they explicitly log out or refresh token expires).

✅ **Easy to implement** - just call `restoreSession()` when your app loads.

✅ **Production-ready** - handles all edge cases (expired tokens, refresh failures, etc.)

See `src/services/SESSION_EXAMPLE.tsx` for complete working examples!
