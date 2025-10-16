import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import OAuth2LoginPage from "./pages/OAuth2LoginPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { restoreSession, setupAutoTokenRefresh } from "./utils/sessionManager";
import { isAuthenticated } from "./utils/tokenStorage";

function App() {
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    // Restore session on app load
    const initializeAuth = async () => {
      await restoreSession();
      setIsCheckingSession(false);
    };

    initializeAuth();

    // Set up automatic token refresh for authenticated users
    let cleanupRefresh: (() => void) | undefined;

    if (isAuthenticated()) {
      cleanupRefresh = setupAutoTokenRefresh();
    }

    // Cleanup on unmount
    return () => {
      if (cleanupRefresh) {
        cleanupRefresh();
      }
    };
  }, []);

  // Show loading state while checking session
  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/auth/login" element={<OAuth2LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* Redirect any unknown routes to landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
