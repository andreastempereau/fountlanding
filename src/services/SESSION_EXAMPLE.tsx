/**
 * Session Persistence Examples
 *
 * This file demonstrates how to implement persistent authentication
 * where users stay logged in across browser sessions.
 */

import { useEffect, useState } from "react";
import {
  isAuthenticated,
  restoreSession,
  setupAutoTokenRefresh,
  ensureValidSession,
} from "./index";

/**
 * Example 1: Basic App Component with Session Restoration
 *
 * This is the most important pattern - call restoreSession when your app loads
 */
export function AppWithSessionRestoration() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Restore session when app loads
    const initializeAuth = async () => {
      const isValid = await restoreSession();
      setAuthenticated(isValid);
      setLoading(false);

      if (isValid) {
        console.log("User session restored - they stayed logged in! 🎉");
      } else {
        console.log("No valid session - user needs to log in");
      }
    };

    initializeAuth();
  }, []);

  if (loading) {
    return <div>Checking authentication...</div>;
  }

  return (
    <div>
      {authenticated ? (
        <AuthenticatedApp />
      ) : (
        <div>Please log in to continue</div>
      )}
    </div>
  );
}

/**
 * Example 2: App with Auto Token Refresh
 *
 * This pattern automatically refreshes tokens before they expire,
 * keeping the user logged in indefinitely (as long as refresh token is valid)
 */
export function AppWithAutoRefresh() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Restore session when app loads
    const initializeAuth = async () => {
      const isValid = await restoreSession();
      setAuthenticated(isValid);
      setLoading(false);
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    // Set up automatic token refresh
    if (authenticated) {
      console.log("Setting up automatic token refresh...");
      const cleanup = setupAutoTokenRefresh();

      // Cleanup when component unmounts or user logs out
      return cleanup;
    }
  }, [authenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {authenticated ? (
        <div>
          <h1>Welcome back! 👋</h1>
          <p>Your session was automatically restored.</p>
          <p>Tokens will refresh automatically before expiring.</p>
        </div>
      ) : (
        <div>Please log in</div>
      )}
    </div>
  );
}

/**
 * Example 3: Protected API Request with Session Check
 *
 * Always check/refresh session before making API calls
 */
export function ComponentMakingAPICall() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
    // Ensure session is valid before API call
    const sessionValid = await ensureValidSession();

    if (!sessionValid) {
      setError("Session expired. Please log in again.");
      // Redirect to login
      window.location.href = "/login";
      return;
    }

    // Make your API call here
    // The tokens have been refreshed if needed
    try {
      const response = await fetch("/api/user/profile", {
        headers: {
          // Get the fresh access token
          Authorization: `Bearer ${localStorage.getItem("cognitoTokens")}`,
        },
      });
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError("Failed to fetch data");
    }
  };

  return (
    <div>
      <button onClick={fetchUserData}>Fetch User Data</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

/**
 * Example 4: Complete App.tsx Pattern
 *
 * This is how you'd typically structure your main App component
 */
export function CompleteAppExample() {
  const [authState, setAuthState] = useState<{
    loading: boolean;
    authenticated: boolean;
  }>({
    loading: true,
    authenticated: false,
  });

  useEffect(() => {
    // Initialize authentication on app load
    const initialize = async () => {
      // Step 1: Try to restore existing session
      const isValid = await restoreSession();

      // Step 2: Update auth state
      setAuthState({
        loading: false,
        authenticated: isValid,
      });

      // Step 3: If session restored, set up auto-refresh
      if (isValid) {
        const cleanup = setupAutoTokenRefresh();

        // Return cleanup function
        return cleanup;
      }
    };

    const cleanupPromise = initialize();

    // Cleanup on unmount
    return () => {
      cleanupPromise.then((cleanup) => cleanup && cleanup());
    };
  }, []);

  // Handle logout
  const handleLogout = async () => {
    const { signOut } = await import("./index");
    await signOut();
    setAuthState({ loading: false, authenticated: false });
  };

  // Show loading state while checking authentication
  if (authState.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Restoring your session...</div>
      </div>
    );
  }

  // Show authenticated or unauthenticated UI
  return (
    <div>
      {authState.authenticated ? (
        <div>
          <header>
            <h1>Welcome Back!</h1>
            <button onClick={handleLogout}>Sign Out</button>
          </header>
          <main>{/* Your authenticated app content */}</main>
        </div>
      ) : (
        <div>
          {/* Login page */}
          <h1>Please Log In</h1>
        </div>
      )}
    </div>
  );
}

/**
 * Example 5: Simple Authentication Check Hook
 *
 * Create a reusable hook for checking authentication status
 */
export function useAuth() {
  const [authState, setAuthState] = useState({
    loading: true,
    authenticated: false,
  });

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await restoreSession();
      setAuthState({
        loading: false,
        authenticated: isValid,
      });

      if (isValid) {
        // Set up auto-refresh
        return setupAutoTokenRefresh();
      }
    };

    const cleanupPromise = checkAuth();

    return () => {
      cleanupPromise.then((cleanup) => cleanup && cleanup());
    };
  }, []);

  return authState;
}

/**
 * Example 6: Using the Auth Hook
 */
export function AppUsingAuthHook() {
  const { loading, authenticated } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>{authenticated ? <Dashboard /> : <LoginPage />}</div>;
}

// Dummy components for examples
function AuthenticatedApp() {
  return <div>Authenticated App Content</div>;
}

function Dashboard() {
  return <div>Dashboard</div>;
}

function LoginPage() {
  return <div>Login Page</div>;
}
