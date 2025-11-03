import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  LogOut,
  Lock,
  Eye,
  EyeOff,
  User,
  CreditCard,
  Home,
  Trash2,
  Check,
} from "lucide-react";
import {
  signOut,
  changePassword,
  deleteAccount,
} from "../services/authService";
import { getUserAccount } from "../services/userService";
import { getIdToken } from "../utils/tokenStorage";
import { getEmailFromToken, getUserSubFromToken } from "../utils/jwtDecoder";
import { createCheckoutSession, createCustomerPortalSession } from "../config/stripe";
import { UserAccountData } from "../types/auth";

type Tab = "profile" | "plan";

export default function Dashboard() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [userEmail, setUserEmail] = useState<string>("");
  const [isSigningOut, setIsSigningOut] = useState(false);

  // User account state
  const [userAccountData, setUserAccountData] = useState<UserAccountData | null>(null);
  const [isLoadingAccount, setIsLoadingAccount] = useState(false);
  const [accountError, setAccountError] = useState("");

  // Plan state
  const [isYearly, setIsYearly] = useState(false);
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
    const plan = searchParams.get("plan");

    if (success === "true") {
      setCheckoutSuccess(
        `Successfully subscribed to Pro ${
          plan === "yearly" ? "Yearly" : "Monthly"
        } plan!`
      );
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

  const handleSubscribe = async (planType: "monthly" | "yearly") => {
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
        planType,
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
        error instanceof Error ? error.message : "Failed to open subscription management"
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
      <aside className="w-64 border-r border-slate-700 flex flex-col relative">
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
            <div className="space-y-3">
              <h2 className="text-xl mb-4 text-[var(--secondary-text)]">
                Account Information
              </h2>
              {/* Email Section */}
              <div className="text-[var(--secondary-text)] rounded-lg">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="">Email:</span>
                    <span className="font-medium">{userEmail}</span>
                  </div>
                </div>
              </div>

              {/* Change Password Section */}
              <div className="rounded-lg ">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl text-white">Change Password</h2>
                  {!showChangePassword && (
                    <button
                      onClick={() => setShowChangePassword(true)}
                      className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      <Lock className="w-4 h-4" />
                      <span>Change Password</span>
                    </button>
                  )}
                </div>

                {showChangePassword ? (
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    {/* Error Message */}
                    {passwordError && (
                      <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                        {passwordError}
                      </div>
                    )}

                    {/* Success Message */}
                    {passwordSuccess && (
                      <div className="p-3 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-sm">
                        {passwordSuccess}
                      </div>
                    )}

                    {/* Current Password */}
                    <div>
                      <label
                        htmlFor="old-password"
                        className="block text-sm font-medium text-slate-300 mb-2"
                      >
                        Current Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                          id="old-password"
                          type={showOldPassword ? "text" : "password"}
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          placeholder="Enter current password"
                          className="w-full pl-10 pr-12 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowOldPassword(!showOldPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                        >
                          {showOldPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* New Password */}
                    <div>
                      <label
                        htmlFor="new-password"
                        className="block text-sm font-medium text-slate-300 mb-2"
                      >
                        New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                          id="new-password"
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
                          className="w-full pl-10 pr-12 py-2 bg-[var(--accent-bg)] border border-slate-600 rounded-lg text-[var(--accent-text)] placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                          required
                          minLength={8}
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                        >
                          {showNewPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">
                        Minimum 8 characters
                      </p>
                    </div>

                    {/* Confirm New Password */}
                    <div>
                      <label
                        htmlFor="confirm-new-password"
                        className="block text-sm font-medium text-slate-300 mb-2"
                      >
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                          id="confirm-new-password"
                          type="password"
                          value={confirmNewPassword}
                          onChange={(e) =>
                            setConfirmNewPassword(e.target.value)
                          }
                          placeholder="Confirm new password"
                          className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                          required
                          minLength={8}
                        />
                      </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex space-x-3 pt-2">
                      <button
                        type="submit"
                        disabled={isChangingPassword}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isChangingPassword ? "Changing..." : "Change Password"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowChangePassword(false);
                          setOldPassword("");
                          setNewPassword("");
                          setConfirmNewPassword("");
                          setPasswordError("");
                          setPasswordSuccess("");
                        }}
                        className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <p className="text-slate-400 text-sm">
                    Keep your account secure by regularly updating your
                    password.
                  </p>
                )}
              </div>

              {/* Delete Account Section */}
              <div className="rounded-lg ">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl text-white">Delete Account</h2>
                  {!showDeleteAccount && (
                    <button
                      onClick={() => setShowDeleteAccount(true)}
                      className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete Account</span>
                    </button>
                  )}
                </div>

                {showDeleteAccount ? (
                  <div className="space-y-4">
                    {deleteError && (
                      <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                        {deleteError}
                      </div>
                    )}
                    <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
                      <p className="text-red-400 text-sm font-medium mb-2">
                        Warning: This action cannot be undone
                      </p>
                      <p className="text-slate-400 text-sm">
                        This will permanently delete your account and all
                        associated data. Are you sure you want to continue?
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={handleDeleteAccount}
                        disabled={isDeletingAccount}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isDeletingAccount
                          ? "Deleting..."
                          : "Yes, Delete Account"}
                      </button>
                      <button
                        onClick={() => {
                          setShowDeleteAccount(false);
                          setDeleteError("");
                        }}
                        disabled={isDeletingAccount}
                        className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-400 text-sm">
                    Permanently delete your account and all associated data.
                    This action cannot be undone.
                  </p>
                )}
              </div>
            </div>
          )}

          {activeTab === "plan" && (
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-white mb-3">
                Subscription Plan
              </h2>

              {/* Success Message */}
              {checkoutSuccess && (
                <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400">
                  {checkoutSuccess}
                </div>
              )}

              {/* Error Message */}
              {checkoutError && (
                <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
                  {checkoutError}
                </div>
              )}

              {/* Current Plan Status */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">
                  Current Plan
                </h3>
                
                {/* Loading State */}
                {isLoadingAccount && (
                  <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                    <p className="text-slate-400">Loading subscription data...</p>
                  </div>
                )}

                {/* Error State */}
                {accountError && !isLoadingAccount && (
                  <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/50">
                    <p className="text-red-400 text-sm">{accountError}</p>
                  </div>
                )}

                {/* Free Plan Card */}
                {!isLoadingAccount && (
                  <div className={`bg-slate-800 rounded-lg p-4 border-2 transition-all ${
                    !userAccountData?.subscription_status || userAccountData.subscription_status !== 'active'
                      ? 'border-blue-500/50'
                      : 'border-slate-700'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                          Free (BYOK)
                          {(!userAccountData?.subscription_status || userAccountData.subscription_status !== 'active') && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-blue-500 text-white rounded-full">
                              Current
                            </span>
                          )}
                        </h4>
                        <p className="text-slate-400 text-sm mt-1">
                          Bring Your Own API Key
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Pro Plan Card (if active) */}
                {!isLoadingAccount && userAccountData?.subscription_status === 'active' && (
                  <div className="bg-slate-800 rounded-lg p-4 border-2 border-green-500/50">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                          Pro Plan
                          <span className="px-2 py-0.5 text-xs font-medium bg-green-500 text-white rounded-full">
                            Active
                          </span>
                        </h4>
                        <p className="text-slate-400 text-sm mt-1">
                          {userAccountData.subscription_plan === 'yearly' ? 'Annual' : 'Monthly'} Subscription
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1 text-sm">
                      <p className="text-slate-300">
                        <span className="text-slate-500">Status:</span>{' '}
                        <span className="font-medium text-green-400">
                          {userAccountData.subscription_status === 'active' ? 'Active' :
                           userAccountData.subscription_status === 'canceled' ? 'Cancelled' :
                           userAccountData.subscription_status === 'past_due' ? 'Payment Issue' :
                           userAccountData.subscription_status === 'trialing' ? 'Trial' :
                           userAccountData.subscription_status === 'incomplete' ? 'Incomplete' :
                           userAccountData.subscription_status === 'incomplete_expired' ? 'Expired' :
                           userAccountData.subscription_status === 'unpaid' ? 'Unpaid' :
                           userAccountData.subscription_status}
                        </span>
                      </p>
                      {userAccountData.subscription_created_at && (
                        <p className="text-slate-400">
                          <span className="text-slate-500">Subscribed since:</span>{' '}
                          {new Date(userAccountData.subscription_created_at).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Monthly/Yearly Toggle */}
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-row items-center gap-3">
                  <span
                    className={`text-base transition-opacity ${
                      !isYearly
                        ? "opacity-100 text-white"
                        : "opacity-50 text-slate-400"
                    }`}
                  >
                    Monthly
                  </span>
                  <button
                    onClick={() => setIsYearly(!isYearly)}
                    className="relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none"
                    style={{
                      backgroundColor: isYearly ? "#60a5fa" : "#475569",
                    }}
                    aria-label="Toggle between monthly and yearly pricing"
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                        isYearly ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                  <span
                    className={`text-base transition-opacity ${
                      isYearly
                        ? "opacity-100 text-white"
                        : "opacity-50 text-slate-400"
                    }`}
                  >
                    Yearly
                  </span>
                </div>
                {isYearly && (
                  <p className="text-sm text-green-400">
                    Save $48/year with annual billing!
                  </p>
                )}
              </div>

              {/* Pro Plan Card */}
              <div className="bg-slate-800 rounded-lg p-4 border-2 border-blue-500/50 relative">
                {/* Popular badge */}
                <div className="absolute top-0 right-8 transform -translate-y-1/2 px-4 py-1 rounded-full text-sm font-medium bg-blue-500 text-white">
                  Recommended
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    Pro Plan
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">
                      ${isYearly ? "16" : "20"}
                    </span>
                    <span className="text-slate-400">/month</span>
                  </div>
                  {isYearly && (
                    <p className="text-sm text-slate-400 mt-2">
                      Billed annually at $192/year
                    </p>
                  )}
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">
                      Managed API access - no setup required
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">Priority support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">Advanced features</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">Automatic updates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">
                      Full privacy & local storage
                    </span>
                  </li>
                </ul>

                {/* Subscribe/Manage Button */}
                <button
                  onClick={() =>
                    userAccountData?.subscription_status === 'active'
                      ? handleManageSubscription()
                      : handleSubscribe(isYearly ? "yearly" : "monthly")
                  }
                  disabled={isCheckingOut}
                  className={`w-full font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    userAccountData?.subscription_status === 'active'
                      ? 'bg-slate-600 hover:bg-slate-500 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isCheckingOut
                    ? userAccountData?.subscription_status === 'active'
                      ? "Opening portal..."
                      : "Redirecting to checkout..."
                    : userAccountData?.subscription_status === 'active'
                    ? "Manage Subscription"
                    : `Subscribe to Pro ${isYearly ? "Yearly" : "Monthly"}`}
                </button>

                <p className="text-xs text-slate-400 text-center mt-4">
                  {userAccountData?.subscription_status === 'active'
                    ? "Update payment method, view invoices, or cancel subscription"
                    : "Cancel anytime. No questions asked."}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
