import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  LogOut,
  Lock,
  Eye,
  EyeOff,
  User,
  CreditCard,
  Home,
  Trash2,
} from "lucide-react";
import {
  signOut,
  changePassword,
  deleteAccount,
} from "../services/authService";
import { getIdToken } from "../utils/tokenStorage";
import { getEmailFromToken } from "../utils/jwtDecoder";

type Tab = "profile" | "billing";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [userEmail, setUserEmail] = useState<string>("");
  const [isSigningOut, setIsSigningOut] = useState(false);

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
    <div className="min-h-screen flex relative">
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
            onClick={() => setActiveTab("billing")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "billing"
                ? "bg-[var(--accent-bg)] text-[var(--accent-text)]"
                : "text-slate-300 hover:bg-slate-700"
            }`}
          >
            <CreditCard className="w-5 h-5" />
            <span className="font-medium">Billing</span>
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
            <div className="space-y-6">
              {/* Email Section */}
              <div className="text-[var(--secondary-text)] rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Account Information</h2>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="">Email:</span>
                    <span className="font-medium">{userEmail}</span>
                  </div>
                </div>
              </div>

              {/* Change Password Section */}
              <div className="rounded-lg p-6 ">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">
                    Change Password
                  </h2>
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
              <div className=" rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">
                  Delete Account
                </h2>
                {!showDeleteAccount ? (
                  <div className="space-y-4">
                    <p className="text-slate-400 text-sm">
                      Permanently delete your account and all associated data.
                      This action cannot be undone.
                    </p>
                    <button
                      onClick={() => setShowDeleteAccount(true)}
                      className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete Account</span>
                    </button>
                  </div>
                ) : (
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
                )}
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-4">Billing</h2>
              <p className="text-slate-400">Billing information coming soon.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
