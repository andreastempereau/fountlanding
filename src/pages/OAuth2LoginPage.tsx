import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Shield, Mail, Lock, AlertCircle } from "lucide-react";
import { signIn } from "../services/authService";
import { completeOAuth2Flow } from "../services/oauth2Service";

export default function OAuth2LoginPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const sessionId = searchParams.get("session");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Validate session ID on mount
  useEffect(() => {
    if (!sessionId) {
      setError("Invalid OAuth2 request. Missing session parameter.");
    }
  }, [sessionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!sessionId) {
      setError("Invalid OAuth2 request. Missing session parameter.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // Step 1: Authenticate user with Cognito
      const signInResult = await signIn(email, password);

      if (!signInResult.success || !signInResult.data) {
        setError(signInResult.error || "Authentication failed");
        setIsLoading(false);
        return;
      }

      const { tokens } = signInResult.data;

      // Step 2: Complete OAuth2 flow - validate session and store auth code
      const oauth2Result = await completeOAuth2Flow(
        sessionId, // oauthSessionId
        tokens.accessToken, // cognitoAccessToken
        tokens.idToken, // cognitoIdToken
        tokens.refreshToken // cognitoRefreshToken
      );

      if (!oauth2Result.success || !oauth2Result.data) {
        setError(oauth2Result.error || "Failed to complete OAuth2 flow");
        setIsLoading(false);
        return;
      }

      const { code, state, redirectUri } = oauth2Result.data;

      // Step 3: Redirect back to desktop app with authorization code
      const redirectUrl = new URL(redirectUri);
      redirectUrl.searchParams.set("code", code);
      redirectUrl.searchParams.set("state", state);

      // Show success message before redirect
      setIsLoading(false);

      // Redirect to desktop app
      window.location.href = redirectUrl.toString();
    } catch (err) {
      console.error("OAuth2 login error:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  // Show error state if no session ID
  if (!sessionId) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold text-white">Fount</span>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
            <div className="flex items-start space-x-3 text-red-400">
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
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
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold text-white">Fount</span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Desktop Authentication
          </h2>
          <p className="text-slate-400 mt-2">
            Sign in to authorize your desktop application
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Info Message */}
          <div className="mb-6 p-3 bg-blue-500/10 border border-blue-500/50 rounded-lg text-blue-400 text-sm">
            <p className="font-medium mb-1">Desktop Login</p>
            <p className="text-xs text-slate-400">
              After signing in, you'll be redirected back to your desktop
              application.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
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
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
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

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500">
              Don't have an account?{" "}
              <button
                onClick={handleBackToHome}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Sign up on our website
              </button>
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">
            This is a secure OAuth2 authentication flow. Your credentials are
            encrypted and never shared with the desktop application.
          </p>
        </div>
      </div>
    </div>
  );
}
