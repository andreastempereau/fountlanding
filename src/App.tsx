import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import OAuth2LoginPage from "./pages/OAuth2LoginPage";
import Dashboard from "./pages/Dashboard";
import DownloadPage from "./pages/DownloadPage";
import PricingPage from "./pages/PricingPage";
import FAQPage from "./pages/FAQPage";
import BlogPage from "./pages/BlogPage";
import RoadmapPage from "./pages/RoadmapPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { restoreSession, setupAutoTokenRefresh } from "./utils/sessionManager";
import { isAuthenticated } from "./utils/tokenStorage";
import { features } from "./config/features";
import "../sunlit/index.css";

function App() {
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    // Apply twilight theme during loading
    if (isCheckingSession) {
      document.body.classList.add("twilight");
    }

    // Restore session on app load
    const initializeAuth = async () => {
      await restoreSession();
      setIsCheckingSession(false);
      // Remove twilight class if not on landing page
      if (window.location.pathname !== "/") {
        document.body.classList.remove("twilight");
      }
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
  }, [isCheckingSession]);

  // Show loading state while checking session
  if (isCheckingSession) {
    return null;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/download" element={<DownloadPage />} /> */}
        {/* <Route path="/pricing" element={<PricingPage />} /> */}
        {/* <Route path="/blog" element={<BlogPage />} /> */}
        {/* <Route path="/roadmap" element={<RoadmapPage />} /> */}
        {/* <Route path="/faq" element={<FAQPage />} /> */}
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        {/* Auth routes - conditionally enabled via feature flags */}
        {/* {features.auth && (
          <>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/auth/login" element={<OAuth2LoginPage />} />
          </>
        )} */}
        {/* Dashboard route - conditionally enabled via feature flags */}
        {/* {features.dashboard && (
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        )} */}
        {/* Redirect any unknown routes to landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
