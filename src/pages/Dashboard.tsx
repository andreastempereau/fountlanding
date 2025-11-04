import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LogOut, User, CreditCard, Home } from "lucide-react";
import {
  signOut,
  changePassword,
  deleteAccount,
} from "../services/authService";
import { getUserAccount } from "../services/userService";
import { getIdToken } from "../utils/tokenStorage";
import { getEmailFromToken, getUserSubFromToken } from "../utils/jwtDecoder";
import {
  createCheckoutSession,
  createCustomerPortalSession,
} from "../config/stripe";
import { UserAccountData } from "../types/auth";
import ProfileTab from "../components/ProfileTab";
import PlanTab from "../components/PlanTab";

type Tab = "profile" | "plan";

export default function Dashboard() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [userEmail, setUserEmail] = useState<string>("");
  const [isSigningOut, setIsSigningOut] = useState(false);

  // User account state
  const [userAccountData, setUserAccountData] =
    useState<UserAccountData | null>(null);
  const [isLoadingAccount, setIsLoadingAccount] = useState(false);
  const [accountError, setAccountError] = useState("");

  // Plan state
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [checkoutSuccess, setCheckoutSuccess] = useState("");

  // Change password state
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  // Delete account state
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [deleteError, setDeleteError] = useState("");

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

  useEffect(() => {
    // Get user email from ID token
    const idToken = getIdToken();
    if (idToken) {
      const email = getEmailFromToken(idToken);
      setUserEmail(email || "Unknown");
    }
  }, []);

  // Fetch user account data
  const fetchUserAccount = async () => {
    setIsLoadingAccount(true);
    setAccountError("");

    const result = await getUserAccount();

    if (result.success && result.data) {
      setUserAccountData(result.data);
    } else if (result.error === "not_found") {
      // User account not found in DynamoDB yet - this is normal for new users
      setUserAccountData(null);
    } else {
      setAccountError(result.error || "Failed to load account data");
    }

    setIsLoadingAccount(false);
  };

  // Fetch user account on mount
  useEffect(() => {
    fetchUserAccount();
  }, []);

  // Re-fetch account data after successful checkout
  useEffect(() => {
    if (checkoutSuccess) {
      // Wait a bit for webhook to process
      setTimeout(() => {
        fetchUserAccount();
      }, 2000);
    }
  }, [checkoutSuccess]);

  // Handle checkout success/cancel from URL params
  useEffect(() => {
    const success = searchParams.get("success");
    const canceled = searchParams.get("canceled");

    if (success === "true") {
      setCheckoutSuccess("Successfully subscribed to Pro plan!");
      setActiveTab("plan");
      // Clear URL params after showing message
      setTimeout(() => {
        setSearchParams({});
      }, 100);
      // Clear success message after 5 seconds
      setTimeout(() => {
        setCheckoutSuccess("");
      }, 5000);
    }

    if (canceled === "true") {
      setCheckoutError("Checkout was canceled. You can try again anytime.");
      setActiveTab("plan");
      // Clear URL params after showing message
      setTimeout(() => {
        setSearchParams({});
      }, 100);
      // Clear error message after 5 seconds
      setTimeout(() => {
        setCheckoutError("");
      }, 5000);
    }
  }, [searchParams, setSearchParams]);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    const result = await signOut();

    if (result.success) {
      // Redirect to landing page after successful sign out
      navigate("/");
    } else {
      console.error("Sign out error:", result.error);
      // Even if there's an error, tokens are cleared, so redirect anyway
      navigate("/");
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    // Validate passwords match
    if (newPassword !== confirmNewPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    // Validate password length
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    setIsChangingPassword(true);

    const result = await changePassword(oldPassword, newPassword);

    if (result.success) {
      setPasswordSuccess("Password changed successfully!");
      // Clear form
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      // Hide form after 2 seconds
      setTimeout(() => {
        setShowChangePassword(false);
        setPasswordSuccess("");
      }, 2000);
    } else {
      setPasswordError(result.error || "Failed to change password");
    }

    setIsChangingPassword(false);
  };

  const handleDeleteAccount = async () => {
    setDeleteError("");
    setIsDeletingAccount(true);

    const result = await deleteAccount();

    if (result.success) {
      // Redirect to landing page after successful deletion
      navigate("/");
    } else {
      setDeleteError(result.error || "Failed to delete account");
      setIsDeletingAccount(false);
    }
  };

  const handleSubscribe = async () => {
    setIsCheckingOut(true);
    setCheckoutError("");

    try {
      // Get user information from ID token
      const idToken = getIdToken();
      if (!idToken) {
        throw new Error("Not authenticated");
      }

      const email = getEmailFromToken(idToken);
      const cognitoUserId = getUserSubFromToken(idToken);

      if (!email || !cognitoUserId) {
        throw new Error("Unable to retrieve user information");
      }

      const { url } = await createCheckoutSession(
        "monthly",
        email,
        cognitoUserId
      );
      console.log("checkout session created", url);
      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (error) {
      setCheckoutError(
        error instanceof Error ? error.message : "Failed to start checkout"
      );
      setIsCheckingOut(false);
    }
  };

  const handleManageSubscription = async () => {
    setIsCheckingOut(true);
    setCheckoutError("");

    try {
      if (!userAccountData?.stripe_customer_id) {
        throw new Error("No customer ID found");
      }

      const { url } = await createCustomerPortalSession(
        userAccountData.stripe_customer_id
      );
      console.log("customer portal session created", url);
      // Redirect to Stripe Customer Portal
      window.location.href = url;
    } catch (error) {
      setCheckoutError(
        error instanceof Error
          ? error.message
          : "Failed to open subscription management"
      );
      setIsCheckingOut(false);
    }
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
    <div className="min-h-screen flex relative bg-slate-900">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-700 flex flex-col relative h-screen">
        {/* Logo */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <img
              src="/app-logo-bg-transparent.svg"
              alt="Fount Logo"
              className="w-10 h-10"
            />
            <span className="text-xl font-bold text-white">Fount</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "profile"
                ? "bg-[var(--accent-bg)] text-[var(--accent-text)]"
                : "text-slate-300 hover:bg-slate-700"
            }`}
          >
            <User className="w-5 h-5" />
            <span className="font-medium">Profile</span>
          </button>

          <button
            onClick={() => setActiveTab("plan")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "plan"
                ? "bg-[var(--accent-bg)] text-[var(--accent-text)]"
                : "text-slate-300 hover:bg-slate-700"
            }`}
          >
            <CreditCard className="w-5 h-5" />
            <span className="font-medium">Plan</span>
          </button>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-700 space-y-2">
          <button
            onClick={handleBackToHome}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-[var(--secondary-text)] hover:bg-slate-700 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </button>

          <button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-[var(--secondary-text)]  hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">
              {isSigningOut ? "Signing out..." : "Sign Out"}
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <div className="max-w-4xl mx-auto p-8">
          {activeTab === "profile" && (
            <ProfileTab
              userEmail={userEmail}
              showChangePassword={showChangePassword}
              setShowChangePassword={setShowChangePassword}
              oldPassword={oldPassword}
              setOldPassword={setOldPassword}
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              confirmNewPassword={confirmNewPassword}
              setConfirmNewPassword={setConfirmNewPassword}
              showOldPassword={showOldPassword}
              setShowOldPassword={setShowOldPassword}
              showNewPassword={showNewPassword}
              setShowNewPassword={setShowNewPassword}
              isChangingPassword={isChangingPassword}
              passwordError={passwordError}
              passwordSuccess={passwordSuccess}
              setPasswordError={setPasswordError}
              setPasswordSuccess={setPasswordSuccess}
              handleChangePassword={handleChangePassword}
              showDeleteAccount={showDeleteAccount}
              setShowDeleteAccount={setShowDeleteAccount}
              isDeletingAccount={isDeletingAccount}
              deleteError={deleteError}
              setDeleteError={setDeleteError}
              handleDeleteAccount={handleDeleteAccount}
            />
          )}

          {activeTab === "plan" && (
            <PlanTab
              checkoutSuccess={checkoutSuccess}
              checkoutError={checkoutError}
              userAccountData={userAccountData}
              isLoadingAccount={isLoadingAccount}
              accountError={accountError}
              isCheckingOut={isCheckingOut}
              handleSubscribe={handleSubscribe}
              handleManageSubscription={handleManageSubscription}
            />
          )}
        </div>
      </main>
    </div>
  );
}
