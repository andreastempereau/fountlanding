import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { signIn, signUp, confirmSignUp } from "../services/authService";
import { completeOAuth2Flow, validateOAuth2Session } from "../services/oauth2Service";
import { cognitoConfig } from "../config/cognito";

export default function OAuth2LoginPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const sessionId = searchParams.get("session");

  type AuthMode = "signin" | "signup" | "confirm";
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [pendingEmail, setPendingEmail] = useState("");
  const [pendingPassword, setPendingPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Validate session ID on mount
  useEffect(() => {
    if (!sessionId) {
      setError("Invalid OAuth2 request. Missing session parameter.");
    }
  }, [sessionId]);

  // Reusable function to complete OAuth2 flow after authentication
  const completeOAuth2Authentication = async (tokens: {
    accessToken: string;
    idToken: string;
    refreshToken: string;
  }) => {
    if (!sessionId) {
      setError("Invalid OAuth2 request. Missing session parameter.");
      return false;
    }

    // Complete OAuth2 flow - validate session and store auth code
    const oauth2Result = await completeOAuth2Flow(
      sessionId, // oauthSessionId
      tokens.accessToken, // cognitoAccessToken
      tokens.idToken, // cognitoIdToken
      tokens.refreshToken // cognitoRefreshToken
    );

    if (!oauth2Result.success || !oauth2Result.data) {
      setError(oauth2Result.error || "Failed to complete OAuth2 flow");
      return false;
    }

    const { code, state, redirectUri } = oauth2Result.data;

    // Redirect back to desktop app with authorization code
    const redirectUrl = new URL(redirectUri);
    redirectUrl.searchParams.set("code", code);
    redirectUrl.searchParams.set("state", state);

    // Redirect to desktop app
    window.location.href = redirectUrl.toString();
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!sessionId) {
      setError("Invalid OAuth2 request. Missing session parameter.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // Step 1: Authenticate user with Cognito using desktop client ID
      const signInResult = await signIn(email, password, cognitoConfig.userPoolDesktopClientId);

      if (!signInResult.success || !signInResult.data) {
        setError(signInResult.error || "Authentication failed");
        setIsLoading(false);
        return;
      }

      const { tokens } = signInResult.data;

      // Step 2: Validate OAuth2 session and check client ID
      const sessionResult = await validateOAuth2Session(sessionId, tokens.idToken);

      if (!sessionResult.success || !sessionResult.data) {
        setError(sessionResult.error || "Invalid OAuth2 session");
        setIsLoading(false);
        return;
      }

      // Step 3: Validate that the session's client ID matches the desktop client ID
      if (sessionResult.data.clientId !== cognitoConfig.userPoolDesktopClientId) {
        setError("Invalid client ID. Please ensure you're using the desktop application.");
        setIsLoading(false);
        return;
      }

      // Complete OAuth2 flow and redirect
      setIsLoading(false);
      await completeOAuth2Authentication(tokens);
    } catch (err) {
      console.error("OAuth2 login error:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validate that passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const result = await signUp(email, password);

      if (result.success) {
        // Store credentials for auto sign-in after confirmation
        setPendingEmail(email);
        setPendingPassword(password);
        // Switch to confirmation mode
        setMode("confirm");
        setError("");
      } else {
        setError(result.error || "Sign up failed");
      }
    } catch (err) {
      console.error("Sign up error:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    }

    setIsLoading(false);
  };

  const handleConfirmSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Confirm the signup
      const confirmResult = await confirmSignUp(pendingEmail, confirmationCode);

      if (confirmResult.success) {
        // Auto sign-in after successful confirmation using desktop client ID
        const signInResult = await signIn(pendingEmail, pendingPassword, cognitoConfig.userPoolDesktopClientId);

        if (signInResult.success && signInResult.data) {
          // Clear sensitive data
          setPendingPassword("");
          const { tokens } = signInResult.data;

          // Validate OAuth2 session and check client ID
          const sessionResult = await validateOAuth2Session(sessionId!, tokens.idToken);

          if (!sessionResult.success || !sessionResult.data) {
            setError(sessionResult.error || "Invalid OAuth2 session");
            setIsLoading(false);
            return;
          }

          // Validate that the session's client ID matches the desktop client ID
          if (sessionResult.data.clientId !== cognitoConfig.userPoolDesktopClientId) {
            setError("Invalid client ID. Please ensure you're using the desktop application.");
            setIsLoading(false);
            return;
          }

          // Complete OAuth2 flow and redirect
          setIsLoading(false);
          await completeOAuth2Authentication(tokens);
        } else {
          setError("Account confirmed! Please sign in.");
          setMode("signin");
          setEmail(pendingEmail);
          setIsLoading(false);
        }
      } else {
        setError(confirmResult.error || "Confirmation failed");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Confirmation error:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate("/auth?mode=signup");
  };

  // Show error state if no session ID
  if (!sessionId) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center space-x-3 mb-4">
              <img
                src="/app-logo-bg-transparent.svg"
                alt="Fount Logo"
                className="w-10 h-10"
              />
              <span className="text-3xl font-bold text-[var(--dark)]">
                Fount
              </span>
            </div>
          </div>

          <div className="bg-[var(--dark)] rounded-lg p-8 border border-[var(--shadow)] text-[var(--light)]">
            <div className="flex items-start space-x-3 text-red-400">
              <div>
                <h3 className="font-semibold mb-2">Invalid OAuth2 Request</h3>
                <p className="text-sm text-slate-400 mb-4">
                  This page requires a valid session parameter. Please initiate
                  the login from your desktop application.
                </p>
                <button
                  onClick={handleBackToHome}
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Return to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div id="dappled-light">
        <div id="glow"></div>
        <div id="glow-bounce"></div>
        <div className="perspective">
          <div id="blinds">
            <div className="shutters">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="shutter"></div>
              ))}
            </div>
            <div className="vertical">
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
          </div>
        </div>
        <div id="progressive-blur">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="max-w-md w-full relative">
        {/* Logo and Title */}
        <div className="text-center mb-8 text-[var(--dark)]">
          <div className="inline-flex items-center justify-center space-x-3 mb-4">
            <img
              src="/app-logo-bg-transparent.svg"
              alt="Fount Logo"
              className="w-10 h-10"
            />
            <span className="text-3xl font-bold">Fount</span>
          </div>
          <h2 className="text-2xl font-bold">Desktop Authentication</h2>
          <p className="text-slate-400 mt-2">
            {mode === "confirm"
              ? "Enter the verification code sent to your email"
              : mode === "signup"
              ? "Create an account to authorize your desktop application"
              : "Sign in to authorize your desktop application"}
          </p>
        </div>

        {/* Login Form */}
        <div className="rounded-lg p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Info Message */}
          <div className="mb-6 p-3 bg-blue-500/10 border border-blue-500/50 rounded-lg text-blue-400 text-sm">
            <p className="font-medium mb-1">
              {mode === "confirm"
                ? "Email Verification"
                : mode === "signup"
                ? "Create Account"
                : "Desktop Login"}
            </p>
            <p className="text-xs text-slate-400">
              {mode === "confirm"
                ? "Enter the code sent to your email to verify your account."
                : "After authenticating, you'll be redirected back to your desktop application."}
            </p>
          </div>

          {/* Confirmation Form */}
          {mode === "confirm" && (
            <form onSubmit={handleConfirmSignUp} className="space-y-4">
              <div>
                <label
                  htmlFor="code"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Verification Code
                </label>
                <input
                  id="code"
                  type="text"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="w-full px-2 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  autoComplete="off"
                  required
                  autoFocus
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Verifying...</span>
                  </span>
                ) : (
                  "Verify & Authorize"
                )}
              </button>
            </form>
          )}

          {/* Sign In Form */}
          {mode === "signin" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-2 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                    autoFocus
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-2 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Authenticating...</span>
                  </span>
                ) : (
                  "Sign In & Authorize"
                )}
              </button>
            </form>
          )}

          {/* Sign Up Form */}
          {mode === "signup" && (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label
                  htmlFor="signup-email"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-2 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    autoComplete="off"
                    required
                    autoFocus
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="signup-password"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-2 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    autoComplete="off"
                    required
                    minLength={8}
                    disabled={isLoading}
                  />
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Minimum 8 characters
                </p>
              </div>
              <div>
                <label
                  htmlFor="signup-confirm-password"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="signup-confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-2 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    autoComplete="off"
                    required
                    minLength={8}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating account...</span>
                  </span>
                ) : (
                  "Sign Up & Authorize"
                )}
              </button>
            </form>
          )}

          {/* Toggle between Sign In and Sign Up */}
          {(mode === "signin" || mode === "signup") && (
            <div className="mt-6 text-center">
              <p className="text-xs text-slate-500">
                {mode === "signin"
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  onClick={() => {
                    setMode(mode === "signin" ? "signup" : "signin");
                    setError("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                  }}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {mode === "signin" ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
