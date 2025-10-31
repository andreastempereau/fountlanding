import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import {
  signUp,
  confirmSignUp,
  signIn,
  forgotPassword,
  confirmForgotPassword,
} from "../services/authService";

type AuthMode =
  | "signin"
  | "signup"
  | "confirm"
  | "forgot-password"
  | "reset-password";

export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");
  const [pendingPassword, setPendingPassword] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await signIn(email, password);

    if (result.success) {
      // Redirect to dashboard on successful sign in
      navigate("/dashboard");
    } else {
      setError(result.error || "Sign in failed");
    }

    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

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

    setIsLoading(false);
  };

  const handleConfirmSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Confirm the signup
    const confirmResult = await confirmSignUp(pendingEmail, confirmationCode);

    if (confirmResult.success) {
      // Auto sign-in after successful confirmation
      const signInResult = await signIn(pendingEmail, pendingPassword);

      if (signInResult.success) {
        // Clear sensitive data
        setPendingPassword("");
        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        setError("Account confirmed! Please sign in.");
        setMode("signin");
        setEmail(pendingEmail);
      }
    } else {
      setError(confirmResult.error || "Confirmation failed");
    }

    setIsLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    const result = await forgotPassword(email);

    if (result.success) {
      setPendingEmail(email);
      setMode("reset-password");
      setSuccessMessage("Password reset code sent to your email");
    } else {
      setError(result.error || "Failed to send reset code");
    }

    setIsLoading(false);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    const result = await confirmForgotPassword(
      pendingEmail,
      confirmationCode,
      newPassword
    );

    if (result.success) {
      setSuccessMessage("Password reset successful! You can now sign in.");
      setMode("signin");
      setEmail(pendingEmail);
      setPassword("");
      setConfirmationCode("");
      setNewPassword("");
    } else {
      setError(result.error || "Password reset failed");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    // Add animation-ready class after component mounts
    // document.body.classList.add("animation-ready");
    document.body.classList.add("twilight");

    // Cleanup on unmount
    return () => {
      // document.body.classList.remove("animation-ready");
      document.body.classList.remove("twilight");
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Dappled light background */}
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

      <div className="max-w-md w-full relative z-10 text-[var(--secondary-text)]">
        {/* Demo Mode Switcher */}
        {/* <div className="mb-6 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg shadow-md">
          <p className="text-sm font-semibold text-yellow-900 mb-3">
            🎨 Demo Mode - Switch between auth phases:
          </p>
          <div className="flex flex-wrap gap-2">
            {(
              [
                "signin",
                "signup",
                "confirm",
                "forgot-password",
                "reset-password",
              ] as AuthMode[]
            ).map((authMode) => (
              <button
                key={authMode}
                type="button"
                onClick={() => {
                  setMode(authMode);
                  setError("");
                  setSuccessMessage("");
                  // Set sample data for demo
                  if (authMode === "confirm" || authMode === "reset-password") {
                    setPendingEmail("demo@example.com");
                    setConfirmationCode("123456");
                  }
                  if (authMode === "reset-password") {
                    setNewPassword("newpassword123");
                  }
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-all ${
                  mode === authMode
                    ? "bg-yellow-600 text-white shadow-md"
                    : "bg-white text-yellow-700 border border-yellow-300 hover:bg-yellow-100"
                }`}
              >
                {authMode === "signin"
                  ? "Sign In"
                  : authMode === "signup"
                  ? "Sign Up"
                  : authMode === "confirm"
                  ? "Confirm"
                  : authMode === "forgot-password"
                  ? "Forgot Password"
                  : "Reset Password"}
              </button>
            ))}
          </div>
        </div> */}

        {/* Logo and Title */}
        <div className="text-center mb-0">
          <div className="inline-flex items-center justify-center space-x-3 mb-2 text-[var(--dark)]">
            <img
              src="/app-logo-bg-transparent.svg"
              alt="Fount"
              className="w-12 h-12"
            />
            <span className="text-3xl font-bold bg-clip-text">Fount</span>
          </div>
          <p className="mt-2" style={{ color: "var(--dark)" }}>
            {mode === "confirm"
              ? "Enter the verification code sent to your email"
              : mode === "signup"
              ? "Sign up to get started with Fount"
              : mode === "forgot-password"
              ? "Enter your email and we'll send you a reset code"
              : mode === "reset-password"
              ? "Enter the code and your new password"
              : "Sign in to your account"}
          </p>
        </div>

        {/* Auth Forms Container */}
        <div className="backdrop-blur-sm rounded-lg ">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-300 rounded-lg text-green-700 text-sm">
              {successMessage}
            </div>
          )}

          {/* Confirmation Form */}
          {mode === "confirm" && (
            <form onSubmit={handleConfirmSignUp} className="space-y-4">
              <div>
                <label
                  htmlFor="code"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--dark)" }}
                >
                  Verification Code
                </label>
                <input
                  id="code"
                  type="text"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="w-full px-4 py-2 bg-white  rounded-lg placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors"
                  style={{ color: "var(--light)" }}
                  required
                  autoFocus
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full font-semibold py-3 px-4 rounded-lg transition-all hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: "var(--dark)",
                  color: "var(--light)",
                }}
              >
                {isLoading ? "Verifying..." : "Verify & Sign In"}
              </button>
            </form>
          )}

          {/* Sign In Form */}
          {mode === "signin" && (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-2 bg-white rounded-lg placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors"
                    style={{ color: "var(--light)" }}
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2 bg-white rounded-lg placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors"
                    style={{ color: "var(--light)" }}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full font-semibold py-3 px-4 rounded-lg transition-all hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: "var(--dark)",
                  color: "var(--light)",
                }}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>

              {/* Forgot Password Link */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setMode("forgot-password");
                    setError("");
                    setSuccessMessage("");
                  }}
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors underline"
                >
                  Forgot your password?
                </button>
              </div>
            </form>
          )}

          {/* Sign Up Form */}
          {mode === "signup" && (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label
                  htmlFor="signup-email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-2 bg-white rounded-lg placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors"
                    style={{ color: "var(--light)" }}
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="signup-password"
                  className="block text-sm font-medium mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2 bg-white rounded-lg placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors"
                    style={{ color: "var(--light)" }}
                    required
                    minLength={8}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Minimum 8 characters
                </p>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full font-semibold py-3 px-4 rounded-lg transition-all hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: "var(--dark)",
                  color: "var(--light)",
                }}
              >
                {isLoading ? "Creating account..." : "Sign Up"}
              </button>
            </form>
          )}

          {/* Forgot Password Form */}
          {mode === "forgot-password" && (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label
                  htmlFor="forgot-email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="forgot-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-2 bg-white rounded-lg placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors"
                    style={{ color: "var(--light)" }}
                    required
                    autoFocus
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full font-semibold py-3 px-4 rounded-lg transition-all hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: "var(--dark)",
                  color: "var(--light)",
                }}
              >
                {isLoading ? "Sending code..." : "Send Reset Code"}
              </button>

              {/* Back to Sign In */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setMode("signin");
                    setError("");
                    setSuccessMessage("");
                  }}
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors underline"
                >
                  Back to sign in
                </button>
              </div>
            </form>
          )}

          {/* Reset Password Form */}
          {mode === "reset-password" && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label
                  htmlFor="reset-code"
                  className="block text-sm font-medium mb-2"
                >
                  Verification Code
                </label>
                <input
                  id="reset-code"
                  type="text"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="w-full px-4 py-2 bg-white rounded-lg placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors"
                  style={{ color: "var(--light)" }}
                  required
                  autoFocus
                />
              </div>
              <div>
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium mb-2"
                >
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2 bg-white rounded-lg placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors"
                    style={{ color: "var(--light)" }}
                    required
                    minLength={8}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Minimum 8 characters
                </p>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full font-semibold py-3 px-4 rounded-lg transition-all hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: "var(--dark)",
                  color: "var(--light)",
                }}
              >
                {isLoading ? "Resetting password..." : "Reset Password"}
              </button>
            </form>
          )}

          {/* Toggle between Sign In and Sign Up */}
          {(mode === "signin" || mode === "signup") && (
            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setMode(mode === "signin" ? "signup" : "signin");
                  setError("");
                  setEmail("");
                  setPassword("");
                }}
                className="text-gray-600 hover:text-gray-800 text-sm transition-colors underline"
              >
                {mode === "signin"
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
