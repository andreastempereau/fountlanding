import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { UserAccountData } from "../types/auth";

interface PlanTabProps {
  checkoutSuccess: string;
  checkoutError: string;
  userAccountData: UserAccountData | null;
  isLoadingAccount: boolean;
  accountError: string;
  isCheckingOut: boolean;
  handleSubscribe: () => void;
  handleManageSubscription: () => void;
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
}: PlanTabProps) {
  const [testState, setTestState] = useState<TestState>("live");

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

  return (
    <div className="space-y-5 overflow-auto">
      {/* TEST MODE CONTROLS - Remove this section in production */}
      {/* <div className="bg-yellow-500/10 border-2 border-yellow-500/50 rounded-lg p-4">
        <h3 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
          🧪 Test Mode
          <span className="text-xs text-yellow-500/80">
            (Remove this section before deploying)
          </span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {(
            [
              "live",
              "loading",
              "free-plan",
              "active-subscription",
              "canceled-subscription",
              "past-due",
              "trialing",
              "incomplete",
              "checkout-success",
              "checkout-error",
              "account-error",
              "checking-out",
            ] as TestState[]
          ).map((state) => (
            <button
              key={state}
              onClick={() => setTestState(state)}
              className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                testState === state
                  ? "bg-yellow-500 text-black"
                  : "bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30"
              }`}
            >
              {state
                .replace(/-/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())}
            </button>
          ))}
        </div>
        <p className="text-yellow-400/70 text-xs mt-3">
          Current state: <span className="font-semibold">{testState}</span>
        </p>
      </div> */}
      <h2 className="text-2xl font-bold text-white mb-3">Subscription Plan</h2>

      {/* Success Message */}
      {testProps.checkoutSuccess && (
        <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400">
          {testProps.checkoutSuccess}
        </div>
      )}

      {/* Error Message */}
      {testProps.checkoutError && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
          {testProps.checkoutError}
        </div>
      )}

      {/* Current Plan Status */}
      <div className="space-y-5">
        <h3 className="text-lg font-semibold text-white">Current Plan</h3>

        {/* Loading State */}
        {testProps.isLoadingAccount && (
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-slate-400 animate-spin" />
          </div>
        )}

        {/* Error State */}
        {testProps.accountError && !testProps.isLoadingAccount && (
          <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/50">
            <p className="text-red-400 text-sm">{testProps.accountError}</p>
          </div>
        )}

        {/* Free Plan Card */}
        {!testProps.isLoadingAccount && (
          <div
            className={`bg-slate-800 rounded-lg p-2 border-2 transition-all ${
              !testProps.userAccountData?.subscription_status ||
              testProps.userAccountData.subscription_status !== "active"
                ? "border-blue-500/50"
                : "border-slate-700"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                  Free (BYOK)
                  {(!testProps.userAccountData?.subscription_status ||
                    testProps.userAccountData.subscription_status !==
                      "active") && (
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
        {!testProps.isLoadingAccount &&
          testProps.userAccountData?.subscription_status === "active" && (
            <div className="bg-slate-800 rounded-lg p-2 border-2 border-green-500/50">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                    Pro Plan
                    <span className="px-2 py-0.5 text-xs font-medium bg-green-500 text-white rounded-full">
                      Active
                    </span>
                  </h4>
                  <p className="text-slate-400 text-sm mt-1">
                    Monthly Subscription
                  </p>
                </div>
              </div>
              <div className="mt-3 space-y-1 text-sm">
                <p className="text-slate-300">
                  <span className="text-slate-500">Status:</span>{" "}
                  <span className="font-medium text-green-400">
                    {testProps.userAccountData.subscription_status === "active"
                      ? "Active"
                      : testProps.userAccountData.subscription_status ===
                        "canceled"
                      ? "Cancelled"
                      : testProps.userAccountData.subscription_status ===
                        "past_due"
                      ? "Payment Issue"
                      : testProps.userAccountData.subscription_status ===
                        "trialing"
                      ? "Trial"
                      : testProps.userAccountData.subscription_status ===
                        "incomplete"
                      ? "Incomplete"
                      : testProps.userAccountData.subscription_status ===
                        "incomplete_expired"
                      ? "Expired"
                      : testProps.userAccountData.subscription_status ===
                        "unpaid"
                      ? "Unpaid"
                      : testProps.userAccountData.subscription_status}
                  </span>
                </p>
                {testProps.userAccountData.subscription_created_at && (
                  <p className="text-slate-400">
                    <span className="text-slate-500">Subscribed since:</span>{" "}
                    {new Date(
                      testProps.userAccountData.subscription_created_at
                    ).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          )}
      </div>

      {/* Pro Plan Card */}
      <div className="bg-slate-800 rounded-lg p-2 border-2 border-blue-500/50 relative">
        {/* Popular badge */}
        <div className="absolute top-0 right-8 transform -translate-y-1/2 px-4 py-1 rounded-full text-sm font-medium bg-blue-500 text-white">
          Recommended
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-white mb-2">Pro Plan</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white">$20</span>
            <span className="text-slate-400">/month</span>
          </div>
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
            <span className="text-slate-300">Full privacy & local storage</span>
          </li>
        </ul>

        {/* Subscribe/Manage Button */}
        <button
          onClick={() =>
            testProps.userAccountData?.subscription_status === "active"
              ? handleManageSubscription()
              : handleSubscribe()
          }
          disabled={testProps.isCheckingOut}
          className={`w-full font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
            testProps.userAccountData?.subscription_status === "active"
              ? "bg-slate-600 hover:bg-slate-500 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {testProps.isCheckingOut && (
            <Loader2 className="w-5 h-5 animate-spin" />
          )}
          <span>
            {testProps.isCheckingOut
              ? testProps.userAccountData?.subscription_status === "active"
                ? "Opening portal..."
                : "Redirecting to checkout..."
              : testProps.userAccountData?.subscription_status === "active"
              ? "Manage Subscription"
              : "Subscribe to Pro"}
          </span>
        </button>

        <p className="text-xs text-slate-400 text-center mt-4">
          {testProps.userAccountData?.subscription_status === "active"
            ? "Update payment method, view invoices, or cancel subscription"
            : "Cancel anytime. No questions asked."}
        </p>
      </div>
    </div>
  );
}
