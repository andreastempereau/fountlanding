import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Check } from "lucide-react";
import { features } from "../config/features";

export default function PricingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    "Core features included",
    "Community support",
  ];

  const plusFeatures = [
    "MLX support for blazing fast workspace indexing",
    "Memory engine",
    "Provisioned access to top cloud models",
    "Provisioned access to privacy-preserving models",
  ];

  const proFeatures = ["Everything in Plus", "Expanded usage"];

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

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 z-10 relative">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-3 sm:mb-4"
            style={{ color: "var(--dark)" }}
          >
            Simple, Transparent Pricing
          </h1>
          <p
            className="text-lg sm:text-xl font-light"
            style={{ color: "var(--dark)" }}
          >
            Choose the plan that works best for you
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Free (BYOK) Plan */}
          <div
            className="rounded-2xl shadow-lg p-6 sm:p-8 border-2 border-gray-200 flex flex-col"
            style={{
              backgroundColor: "var(--dark)",
              borderColor: "var(--dark)",
            }}
          >
            <div className="mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-light mb-2">
                Free (BYOK)
              </h2>
            </div>

            <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 flex-grow">
              {freFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 sm:gap-3">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-light">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => navigate("/download")}
              className="w-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold rounded-lg transition-all hover:opacity-80 shadow-md"
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
            className="rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col relative border-2"
            style={{
              backgroundColor: "var(--dark)",
              borderColor: "var(--dark)",
            }}
          >
            {/* Popular badge */}
            <div
              className="absolute top-0 right-4 sm:right-8 transform -translate-y-1/2 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium"
              style={{
                backgroundColor: "var(--light)",
                color: "var(--dark)",
              }}
            >
              Popular
            </div>

            <div className="mb-4 sm:mb-6">
              <h2
                className="text-xl sm:text-2xl font-light mb-2"
                style={{ color: "var(--light)" }}
              >
                Plus
              </h2>
              <div className="flex items-baseline gap-2">
                <span
                  className="text-4xl sm:text-5xl font-light tracking-tight"
                  style={{ color: "var(--light)" }}
                >
                  $20
                </span>
                <span
                  className="text-sm sm:text-base font-light"
                  style={{ color: "var(--light)", opacity: 0.7 }}
                >
                  /month
                </span>
              </div>
            </div>

            <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 flex-grow">
              {plusFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 sm:gap-3">
                  <Check
                    className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5"
                    style={{ color: "var(--light)" }}
                  />
                  <span
                    className="text-sm sm:text-base font-light"
                    style={{ color: "var(--light)" }}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {features.dashboard ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="w-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold rounded-lg transition-all hover:opacity-80 shadow-md"
                style={{
                  backgroundColor: "var(--light)",
                  color: "var(--dark)",
                }}
              >
                Subscribe
              </button>
            ) : (
              <div
                className="w-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-light text-center rounded-lg"
                style={{
                  backgroundColor: "var(--light)",
                  color: "var(--dark)",
                  opacity: 0.6,
                }}
              >
                Coming Soon
              </div>
            )}
          </div>

          {/* Pro Plan */}
          <div
            className="rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col border-2"
            style={{
              backgroundColor: "var(--dark)",
              borderColor: "var(--dark)",
            }}
          >
            <div className="mb-4 sm:mb-6">
              <h2
                className="text-xl sm:text-2xl font-light mb-2"
                style={{ color: "var(--light)" }}
              >
                Pro
              </h2>
              <div className="flex items-baseline gap-2">
                <span
                  className="text-4xl sm:text-5xl font-light tracking-tight"
                  style={{ color: "var(--light)" }}
                >
                  $40
                </span>
                <span
                  className="text-sm sm:text-base font-light"
                  style={{ color: "var(--light)", opacity: 0.7 }}
                >
                  /month
                </span>
              </div>
            </div>

            <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 flex-grow">
              {proFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 sm:gap-3">
                  <Check
                    className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5"
                    style={{ color: "var(--light)" }}
                  />
                  <span
                    className="text-sm sm:text-base font-light"
                    style={{ color: "var(--light)" }}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {features.dashboard ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="w-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold rounded-lg transition-all hover:opacity-80 shadow-md"
                style={{
                  backgroundColor: "var(--light)",
                  color: "var(--dark)",
                }}
              >
                Subscribe
              </button>
            ) : (
              <div
                className="w-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-light text-center rounded-lg"
                style={{
                  backgroundColor: "var(--light)",
                  color: "var(--dark)",
                  opacity: 0.6,
                }}
              >
                Coming Soon
              </div>
            )}
          </div>
        </div>

        {/* Additional info section */}
        <div className="max-w-3xl mx-auto mt-12 sm:mt-16 text-center px-4">
          <p
            className="text-sm sm:text-base font-light"
            style={{ color: "var(--dark)" }}
          >
            All plans include access to our AI workspace platform.{" "}
            <br className="hidden md:block" />
            Upgrade, downgrade, or cancel anytime.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
