import React from "react";
import { Lock, Eye, EyeOff, Trash2 } from "lucide-react";

interface ProfileTabProps {
  userEmail: string;
  // Change password state
  showChangePassword: boolean;
  setShowChangePassword: (show: boolean) => void;
  oldPassword: string;
  setOldPassword: (password: string) => void;
  newPassword: string;
  setNewPassword: (password: string) => void;
  confirmNewPassword: string;
  setConfirmNewPassword: (password: string) => void;
  showOldPassword: boolean;
  setShowOldPassword: (show: boolean) => void;
  showNewPassword: boolean;
  setShowNewPassword: (show: boolean) => void;
  isChangingPassword: boolean;
  passwordError: string;
  passwordSuccess: string;
  setPasswordError: (error: string) => void;
  setPasswordSuccess: (success: string) => void;
  handleChangePassword: (e: React.FormEvent) => void;
  // Delete account state
  showDeleteAccount: boolean;
  setShowDeleteAccount: (show: boolean) => void;
  isDeletingAccount: boolean;
  deleteError: string;
  setDeleteError: (error: string) => void;
  handleDeleteAccount: () => void;
}

export default function ProfileTab({
  userEmail,
  showChangePassword,
  setShowChangePassword,
  oldPassword,
  setOldPassword,
  newPassword,
  setNewPassword,
  confirmNewPassword,
  setConfirmNewPassword,
  showOldPassword,
  setShowOldPassword,
  showNewPassword,
  setShowNewPassword,
  isChangingPassword,
  passwordError,
  passwordSuccess,
  setPasswordError,
  setPasswordSuccess,
  handleChangePassword,
  showDeleteAccount,
  setShowDeleteAccount,
  isDeletingAccount,
  deleteError,
  setDeleteError,
  handleDeleteAccount,
}: ProfileTabProps) {
  return (
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
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
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
            Keep your account secure by regularly updating your password.
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
                This will permanently delete your account and all associated
                data. Are you sure you want to continue?
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleDeleteAccount}
                disabled={isDeletingAccount}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeletingAccount ? "Deleting..." : "Yes, Delete Account"}
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
            Permanently delete your account and all associated data. This action
            cannot be undone.
          </p>
        )}
      </div>
    </div>
  );
}

