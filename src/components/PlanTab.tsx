import { Check, Loader2 } from "lucide-react";
import { UserAccountData } from "../types/auth";

interface PlanTabProps {
  checkoutSuccess: string;
  checkoutError: string;
  userAccountData: UserAccountData | null;
  isLoadingAccount: boolean;
  accountError: string;
  isCheckingOut: boolean;
  handleSubscribe: (tier: "plus" | "pro") => void;
  handleManageSubscription: () => void;
  handleUpdateSubscription: (tier: "plus" | "pro") => void;
}

// Test state options
type TestState =
  | "live" // Use real props
  | "loading"
  | "free-plan"
  | "active-subscription"
  | "canceled-subscription"
  | "past-due"
  | "trialing"
  | "incomplete"
  | "checkout-success"
  | "checkout-error"
  | "account-error"
  | "checking-out";

export default function PlanTab({
  checkoutSuccess,
  checkoutError,
  userAccountData,
  isLoadingAccount,
  accountError,
  isCheckingOut,
  handleSubscribe,
  handleManageSubscription,
  handleUpdateSubscription,
}: PlanTabProps) {
  const testState: TestState = "live";

  // Override props based on test state
  const getTestProps = () => {
    if (testState === "live") {
      return {
        checkoutSuccess,
        checkoutError,
        userAccountData,
        isLoadingAccount,
        accountError,
        isCheckingOut,
      };
    }

    const baseUser: UserAccountData = {
      userId: "test-user-id",
      email: "test@example.com",
      subscription_status: undefined,
      subscription_created_at: undefined,
    };

    switch (testState) {
      case "loading":
        return {
          checkoutSuccess: "",
          checkoutError: "",
          userAccountData: null,
          isLoadingAccount: true,
          accountError: "",
          isCheckingOut: false,
        };
      case "free-plan":
        return {
          checkoutSuccess: "",
          checkoutError: "",
          userAccountData: baseUser,
          isLoadingAccount: false,
          accountError: "",
          isCheckingOut: false,
        };
      case "active-subscription":
        return {
          checkoutSuccess: "",
          checkoutError: "",
          userAccountData: {
            ...baseUser,
            subscription_status: "active",
            subscription_created_at: new Date("2024-01-15").toISOString(),
          },
          isLoadingAccount: false,
          accountError: "",
          isCheckingOut: false,
        };
      case "canceled-subscription":
        return {
          checkoutSuccess: "",
          checkoutError: "",
          userAccountData: {
            ...baseUser,
            subscription_status: "canceled",
            subscription_created_at: new Date("2024-01-15").toISOString(),
          },
          isLoadingAccount: false,
          accountError: "",
          isCheckingOut: false,
        };
      case "past-due":
        return {
          checkoutSuccess: "",
          checkoutError: "",
          userAccountData: {
            ...baseUser,
            subscription_status: "past_due",
            subscription_created_at: new Date("2024-01-15").toISOString(),
          },
          isLoadingAccount: false,
          accountError: "",
          isCheckingOut: false,
        };
      case "trialing":
        return {
          checkoutSuccess: "",
          checkoutError: "",
          userAccountData: {
            ...baseUser,
            subscription_status: "trialing",
            subscription_created_at: new Date("2024-01-15").toISOString(),
          },
          isLoadingAccount: false,
          accountError: "",
          isCheckingOut: false,
        };
      case "incomplete":
        return {
          checkoutSuccess: "",
          checkoutError: "",
          userAccountData: {
            ...baseUser,
            subscription_status: "incomplete",
            subscription_created_at: new Date("2024-01-15").toISOString(),
          },
          isLoadingAccount: false,
          accountError: "",
          isCheckingOut: false,
        };
      case "checkout-success":
        return {
          checkoutSuccess:
            "Payment successful! Your subscription is now active.",
          checkoutError: "",
          userAccountData: {
            ...baseUser,
            subscription_status: "active",
            subscription_created_at: new Date().toISOString(),
          },
          isLoadingAccount: false,
          accountError: "",
          isCheckingOut: false,
        };
      case "checkout-error":
        return {
          checkoutSuccess: "",
          checkoutError: "Payment failed. Please try again or contact support.",
          userAccountData: baseUser,
          isLoadingAccount: false,
          accountError: "",
          isCheckingOut: false,
        };
      case "account-error":
        return {
          checkoutSuccess: "",
          checkoutError: "",
          userAccountData: null,
          isLoadingAccount: false,
          accountError: "Failed to load account data. Please refresh the page.",
          isCheckingOut: false,
        };
      case "checking-out":
        return {
          checkoutSuccess: "",
          checkoutError: "",
          userAccountData: baseUser,
          isLoadingAccount: false,
          accountError: "",
          isCheckingOut: true,
        };
      default:
        return {
          checkoutSuccess,
          checkoutError,
          userAccountData,
          isLoadingAccount,
          accountError,
          isCheckingOut,
        };
    }
  };

  const testProps = getTestProps();

  // Determine current subscription tier based on subscription_plan_id
  const getCurrentTier = (): "plus" | "pro" | null => {
    if (
      testProps.userAccountData?.subscription_status !== "active" ||
      !testProps.userAccountData?.subscription_plan_id
    ) {
      return null;
    }

    const planId = testProps.userAccountData.subscription_plan_id;

    // Check if it's Plus plan
    if (planId === "price_1SORQLCnVR8qOLc4qTCiLhEO") {
      return "plus";
    }
    // Check if it's Pro plan
    if (planId === "price_1SUWOVCnVR8qOLc4fufct1ZX") {
      return "pro";
    }

    return null;
  };

  const currentTier = getCurrentTier();

  return (
    <div className="space-y-6 overflow-auto">
      <div>
        <h2 className="text-2xl font-bold text-white">Subscription Plan</h2>
        <p className="text-sm text-slate-400 mt-1">
          Manage your subscription and billing
        </p>
      </div>

      {/* Success Message */}
      {testProps.checkoutSuccess && (
        <div className="p-3 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-sm">
          {testProps.checkoutSuccess}
        </div>
      )}

      {/* Error Message */}
      {testProps.checkoutError && (
        <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
          {testProps.checkoutError}
        </div>
      )}

      {/* Current Plan Status */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white">Current Plan</h3>

        {/* Loading State */}
        {testProps.isLoadingAccount && (
          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 flex items-center justify-center">
            <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
          </div>
        )}

        {/* Error State */}
        {testProps.accountError && !testProps.isLoadingAccount && (
          <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/50">
            <p className="text-red-400 text-sm">{testProps.accountError}</p>
          </div>
        )}

        {/* Free Plan Card */}
        {!testProps.isLoadingAccount &&
          (!testProps.userAccountData?.subscription_status ||
            testProps.userAccountData.subscription_status !== "active") && (
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-base font-semibold text-white">
                      Free (BYOK)
                    </h4>
                    <span className="px-2 py-0.5 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
                      Current
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm">
                    Bring Your Own API Key
                  </p>
                </div>
              </div>
            </div>
          )}

        {/* Active Subscription Card (if active) */}
        {!testProps.isLoadingAccount &&
          testProps.userAccountData?.subscription_status === "active" && (
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 rounded-lg p-4 border border-green-500/30">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-base font-semibold text-white">
                      {currentTier === "plus"
                        ? "Plus Plan"
                        : currentTier === "pro"
                        ? "Pro Plan"
                        : testProps.userAccountData.subscription_name ||
                          "Active Subscription"}
                    </h4>
                    <span className="px-2 py-0.5 text-xs font-medium bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                      Active
                    </span>
                  </div>
                  <p className="text-lg font-bold text-white">
                    {currentTier === "plus"
                      ? "$20"
                      : currentTier === "pro"
                      ? "$40"
                      : "—"}
                    <span className="text-sm font-normal text-slate-400">
                      /month
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                {testProps.userAccountData.subscription_created_at && (
                  <div>
                    <span className="text-slate-500">Since:</span>{" "}
                    {new Date(
                      testProps.userAccountData.subscription_created_at
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
      </div>

      {/* Manage Subscription Button - Show if user has active subscription */}
      {testProps.userAccountData?.subscription_status === "active" && (
        <button
          onClick={handleManageSubscription}
          disabled={testProps.isCheckingOut}
          className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-2.5 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
        >
          {testProps.isCheckingOut && (
            <Loader2 className="w-4 h-4 animate-spin" />
          )}
          <span>
            {testProps.isCheckingOut ? "Opening..." : "Manage Subscription"}
          </span>
        </button>
      )}

      {/* Subscription Plans */}
      {testProps.userAccountData?.subscription_status === "active" ? (
        // User has active subscription - show only upgrade option
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-white">
            {currentTier === "plus" ? "Upgrade Available" : "Your Plan"}
          </h3>

          {currentTier === "plus" ? (
            // User is on Plus - show Pro upgrade option
            <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/5 rounded-lg p-4 border border-purple-500/30">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-base font-semibold text-white mb-1">
                    Pro Plan
                  </h4>
                  <p className="text-2xl font-bold text-white">
                    $40
                    <span className="text-sm font-normal text-slate-400">
                      /month
                    </span>
                  </p>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-1.5 mb-4">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm">
                    Higher message limit
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm">
                    All Plus features included
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm">
                    Premium support
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm">
                    Early access to new features
                  </span>
                </li>
              </ul>

              {/* Upgrade Button */}
              <button
                onClick={() => handleUpdateSubscription("pro")}
                disabled={testProps.isCheckingOut}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              >
                {testProps.isCheckingOut && (
                  <Loader2 className="w-4 h-4 animate-spin" />
                )}
                <span>
                  {testProps.isCheckingOut ? "Upgrading..." : "Upgrade to Pro"}
                </span>
              </button>
            </div>
          ) : (
            // User is on Pro - no upgrade available
            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 text-center">
              <p className="text-slate-400 text-sm">
                You're on the highest tier! 🎉
              </p>
            </div>
          )}
        </div>
      ) : (
        // User has no active subscription - show both plans
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-white">
            Available Plans
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Plus Plan Card */}
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/5 rounded-lg p-4 border border-blue-500/30 relative">
              {/* Recommended badge */}
              <div className="absolute -top-2 right-4 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500 text-white">
                Recommended
              </div>

              <div className="mb-3">
                <h4 className="text-base font-semibold text-white mb-1">
                  Plus Plan
                </h4>
                <p className="text-2xl font-bold text-white">
                  $20
                  <span className="text-sm font-normal text-slate-400">
                    /month
                  </span>
                </p>
              </div>

              {/* Features List */}
              <ul className="space-y-1.5 mb-4">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm">
                    Managed API access
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm">
                    Priority support
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm">
                    Advanced features
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm">
                    Automatic updates
                  </span>
                </li>
              </ul>

              {/* Subscribe Button */}
              <button
                onClick={() => handleSubscribe("plus")}
                disabled={testProps.isCheckingOut}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              >
                {testProps.isCheckingOut && (
                  <Loader2 className="w-4 h-4 animate-spin" />
                )}
                <span>
                  {testProps.isCheckingOut
                    ? "Processing..."
                    : "Subscribe to Plus"}
                </span>
              </button>
            </div>

            {/* Pro Plan Card */}
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <div className="mb-3">
                <h4 className="text-base font-semibold text-white mb-1">
                  Pro Plan
                </h4>
                <p className="text-2xl font-bold text-white">
                  $40
                  <span className="text-sm font-normal text-slate-400">
                    /month
                  </span>
                </p>
              </div>

              {/* Features List */}
              <ul className="space-y-1.5 mb-4">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm">
                    Higher message limit
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm">
                    All Plus features
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm">
                    Premium support
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm">
                    Early access to features
                  </span>
                </li>
              </ul>

              {/* Subscribe Button */}
              <button
                onClick={() => handleSubscribe("pro")}
                disabled={testProps.isCheckingOut}
                className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-2.5 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              >
                {testProps.isCheckingOut && (
                  <Loader2 className="w-4 h-4 animate-spin" />
                )}
                <span>
                  {testProps.isCheckingOut
                    ? "Processing..."
                    : "Subscribe to Pro"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pt-2 border-t border-slate-700/50">
        <p className="text-xs text-slate-500 text-center">
          {testProps.userAccountData?.subscription_status === "active"
            ? "Use 'Manage Subscription' to update payment, view invoices, or cancel"
            : "Cancel anytime. No questions asked."}
        </p>
      </div>
    </div>
  );
}
