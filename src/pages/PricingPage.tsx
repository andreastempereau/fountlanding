import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Check } from "lucide-react";

export default function PricingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isYearly, setIsYearly] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Add twilight theme class on mount
    document.body.classList.add("twilight");

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("twilight");
    };
  }, []);

  const freFeatures = [
    "Bring Your Own API Key",
    "Full privacy & local storage",
    "All core features included",
    "Community support",
  ];

  const paidFeatures = [
    "Managed API access",
    "No API key setup required",
    "Priority support",
    "Advanced features",
    "Automatic updates",
  ];

  return (
    <div className="min-h-screen">
      {/* Background effects matching DownloadPage */}
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

      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <div className="max-w-[1400px] mx-auto px-12 py-16 z-10 relative">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1
            className="text-5xl font-light tracking-tight mb-4"
            style={{ color: "var(--dark)" }}
          >
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl font-light" style={{ color: "var(--dark)" }}>
            Choose the plan that works best for you
          </p>
        </div>

        {/* Monthly/Yearly Toggle */}
        <div className="flex flex-col justify-center items-center gap-4 mb-12">
          <div className="flex flex-row items-center gap-2">
            <span
              className={`text-lg font-light transition-opacity ${
                !isYearly ? "opacity-100" : "opacity-50"
              }`}
              style={{ color: "var(--dark)" }}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-0 focus:ring-offset-0"
              style={{
                backgroundColor: isYearly ? "var(--dark)" : "var(--light)",
              }}
              aria-label="Toggle between monthly and yearly pricing"
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white border-2 border-gray-200 transition-transform ${
                  isYearly ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-lg font-light transition-opacity ${
                isYearly ? "opacity-100" : "opacity-50"
              }`}
              style={{ color: "var(--dark)" }}
            >
              Yearly
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Free (BYOK) Plan */}
          <div
            className="rounded-2xl shadow-lg p-8 border-2 border-gray-200 flex flex-col"
            style={{
              backgroundColor: "var(--dark)",
              borderColor: "var(--dark)",
            }}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-light mb-2">Free (BYOK)</h2>
            </div>

            <ul className="space-y-3 mb-8 flex-grow">
              {freFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-base font-light">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => navigate("/download")}
              className="w-full px-6 py-3 text-base font-semibold rounded-lg transition-all hover:opacity-80 shadow-md"
              style={{
                backgroundColor: "var(--light)",
                color: "var(--dark)",
              }}
            >
              Download
            </button>
          </div>

          {/* Paid Plan */}
          <div
            className="rounded-2xl shadow-xl p-8 flex flex-col relative border-2"
            style={{
              backgroundColor: "var(--dark)",
              borderColor: "var(--dark)",
            }}
          >
            {/* Popular badge */}
            <div
              className="absolute top-0 right-8 transform -translate-y-1/2 px-4 py-1 rounded-full text-sm font-medium"
              style={{
                backgroundColor: "var(--light)",
                color: "var(--dark)",
              }}
            >
              Popular
            </div>

            <div className="mb-6">
              <h2
                className="text-2xl font-light mb-2"
                style={{ color: "var(--light)" }}
              >
                Pro
              </h2>
              <div className="flex items-baseline gap-2">
                <span
                  className="text-5xl font-light tracking-tight"
                  style={{ color: "var(--light)" }}
                >
                  ${isYearly ? "16" : "20"}
                </span>
                <span
                  className="font-light"
                  style={{ color: "var(--light)", opacity: 0.7 }}
                >
                  /month
                </span>
              </div>
              {isYearly && (
                <p
                  className="text-sm font-light mt-2"
                  style={{ color: "var(--light)", opacity: 0.7 }}
                >
                  Billed annually at $192/year
                </p>
              )}
            </div>

            <ul className="space-y-3 mb-8 flex-grow">
              {paidFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    style={{ color: "var(--light)" }}
                  />
                  <span
                    className="text-base font-light"
                    style={{ color: "var(--light)" }}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => navigate("/dashboard")}
              className="w-full px-6 py-3 text-base font-semibold rounded-lg transition-all hover:opacity-80 shadow-md"
              style={{
                backgroundColor: "var(--light)",
                color: "var(--dark)",
              }}
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Additional info section */}
        <div className="max-w-3xl mx-auto mt-16 text-center">
          <p className="text-base font-light" style={{ color: "var(--dark)" }}>
            All plans include access to our AI workspace platform.{" "}
            <br className="hidden md:block" />
            Upgrade, downgrade, or cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
