/**
 * Example Usage of Authentication Services
 *
 * This file demonstrates how to use the authentication services
 * in React components. It's not meant to be used directly, but
 * rather as a reference for implementing your own auth UI.
 */

import { useState } from "react";
import {
  signUp,
  confirmSignUp,
  signIn,
  forgotPassword,
  confirmForgotPassword,
  changePassword,
  signOut,
  isAuthenticated,
  getTokens,
} from "./index";

/**
 * Example: Sign Up Flow
 */
export function ExampleSignUpComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signUp(email, password);

    if (result.success) {
      setNeedsConfirmation(true);
      console.log("Sign up successful! Check email for verification code.");
    } else {
      setError(result.error || "Sign up failed");
    }

    setLoading(false);
  };

  const handleConfirmation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await confirmSignUp(email, confirmationCode);

    if (result.success) {
      console.log("Email confirmed! You can now sign in.");
      // Redirect to sign in page or auto sign-in
    } else {
      setError(result.error || "Confirmation failed");
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {!needsConfirmation ? (
        <form onSubmit={handleSignUp}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleConfirmation}>
          <p>Please enter the verification code sent to your email</p>
          <input
            type="text"
            placeholder="Verification Code"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}

/**
 * Example: Sign In Flow
 */
export function ExampleSignInComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn(email, password);

    if (result.success) {
      console.log("Signed in successfully!");
      console.log("Tokens:", result.data?.tokens);
      // Redirect to dashboard or home page
      window.location.href = "/dashboard";
    } else {
      setError(result.error || "Sign in failed");
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}

/**
 * Example: Forgot Password Flow
 */
export function ExampleForgotPasswordComponent() {
  const [email, setEmail] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState<"request" | "confirm">("request");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await forgotPassword(email);

    if (result.success) {
      setStep("confirm");
      console.log("Reset code sent to email!");
    } else {
      setError(result.error || "Request failed");
    }

    setLoading(false);
  };

  const handleConfirmReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await confirmForgotPassword(
      email,
      confirmationCode,
      newPassword
    );

    if (result.success) {
      console.log("Password reset successful!");
      // Redirect to sign in page
    } else {
      setError(result.error || "Reset failed");
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Reset Password</h2>
      {step === "request" ? (
        <form onSubmit={handleRequestReset}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Code"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleConfirmReset}>
          <input
            type="text"
            placeholder="Verification Code"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}

/**
 * Example: Change Password (for authenticated users)
 */
export function ExampleChangePasswordComponent() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const result = await changePassword(oldPassword, newPassword);

    if (result.success) {
      setSuccess(true);
      setOldPassword("");
      setNewPassword("");
      console.log("Password changed successfully!");
    } else {
      setError(result.error || "Password change failed");
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handleChangePassword}>
        <input
          type="password"
          placeholder="Current Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Changing..." : "Change Password"}
        </button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && (
        <div style={{ color: "green" }}>Password changed successfully!</div>
      )}
    </div>
  );
}

/**
 * Example: User Profile (showing auth status)
 */
export function ExampleUserProfileComponent() {
  const [loading, setLoading] = useState(false);
  const authenticated = isAuthenticated();
  const tokens = getTokens();

  const handleSignOut = async () => {
    setLoading(true);
    const result = await signOut();

    if (result.success) {
      console.log("Signed out successfully!");
      // Redirect to home or login page
      window.location.href = "/";
    }

    setLoading(false);
  };

  if (!authenticated) {
    return (
      <div>
        <p>You are not signed in.</p>
        <a href="/login">Sign In</a>
      </div>
    );
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>You are signed in!</p>
      <details>
        <summary>View Tokens (Debug)</summary>
        <pre>{JSON.stringify(tokens, null, 2)}</pre>
      </details>
      <button onClick={handleSignOut} disabled={loading}>
        {loading ? "Signing out..." : "Sign Out"}
      </button>
    </div>
  );
}

/**
 * Example: Protected Route Component
 */
export function ExampleProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticated = isAuthenticated();

  if (!authenticated) {
    // Redirect to login or show login prompt
    return (
      <div>
        <h2>Access Denied</h2>
        <p>You must be signed in to view this page.</p>
        <a href="/login">Sign In</a>
      </div>
    );
  }

  return <>{children}</>;
}

/**
 * Example: Using with React Router (pseudo-code)
 *
 * import { Navigate } from 'react-router-dom';
 * import { isAuthenticated } from './services';
 *
 * function ProtectedRoute({ children }) {
 *   return isAuthenticated() ? children : <Navigate to="/login" />;
 * }
 *
 * // In your router:
 * <Route path="/dashboard" element={
 *   <ProtectedRoute>
 *     <Dashboard />
 *   </ProtectedRoute>
 * } />
 */
