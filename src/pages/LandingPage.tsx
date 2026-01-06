import { useEffect, useState } from "react";
// import Hero from "../components/Hero";
import Footer from "../components/Footer";
import { getPlatform, getPlatformDisplayName } from "../utils/platform";
import AppleIcon from "../components/AppleIcon";
import WindowsIcon from "../components/WindowsIcon";
import { ArrowRight } from "lucide-react";
// import { AnthropicIcon } from "../svgs/AnthropicIcon";
// import { OpenAiIcon } from "../svgs/OpenAiIcon";
// import { XAIIcon } from "../svgs/XAIIcon";
// import { GeminiIcon } from "../svgs/GeminiIcon";
// import { DeepSeekIcon } from "../svgs/DeepSeekIcon";
// import ImageCarousel from "../components/ImageCarousel";
// import ProblemSection from "../components/ProblemSection";
// import FeaturesSection from "../components/FeaturesSection";
// import EnterpriseSection from "../components/EnterpriseSection";
// import EarlyAccessSection from "../components/EarlyAccessSection";
// import ProductShowcase from "../components/ProductShowcase";

// Placeholder values - replace with actual values
const LAMBDA_URL =
  "https://5ic50jshfh.execute-api.us-east-1.amazonaws.com/prod/checkout/create-session";
const PRICE_IDS = {
  PERPETUAL: "price_1SckvlCnVR8qOLc4wqMAKi8I",
  PLUS: "price_1SORQLCnVR8qOLc4qTCiLhEO",
  PRO: "price_1Sd5ldCnVR8qOLc4OpCpJqLI",
};

interface CreateCheckoutSessionRequest {
  price_id: string;
  success_url: string;
  cancel_url: string;
  allow_promotion_codes: boolean;
  customer_email: string;
}

export default function LandingPage() {
  const [platform, setPlatform] = useState<string>("MacOS");
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [selectedPriceId, setSelectedPriceId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showAccessCodeDialog, setShowAccessCodeDialog] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [accessCodeError, setAccessCodeError] = useState("");
  const [pendingDownloadUrl, setPendingDownloadUrl] = useState<string | null>(
    null
  );

  useEffect(() => {
    // Add animation-ready class after component mounts
    document.body.classList.add("twilight");

    // Detect platform
    const detectedPlatform = getPlatform();
    setPlatform(getPlatformDisplayName(detectedPlatform));

    // Trigger animations after a short delay
    requestAnimationFrame(() => {
      setIsLoaded(true);
    });

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("twilight");
    };
  }, []);

  const handleCheckout = (priceId: string) => {
    if (loadingPriceId) return;
    setSelectedPriceId(priceId);
    setShowEmailDialog(true);
    setEmail("");
    setEmailError("");
  };

  const handleDownloadClick = (downloadUrl: string) => {
    setPendingDownloadUrl(downloadUrl);
    setShowAccessCodeDialog(true);
    setAccessCode("");
    setAccessCodeError("");
  };

  const handleAccessCodeSubmit = () => {
    if (!accessCode.trim()) {
      setAccessCodeError("Access code is required");
      return;
    }

    if (accessCode !== "FOUNT_2025") {
      setAccessCodeError("Invalid access code");
      return;
    }

    // Access code is valid, trigger download
    if (pendingDownloadUrl) {
      window.location.href = pendingDownloadUrl;
      setShowAccessCodeDialog(false);
      setAccessCode("");
      setAccessCodeError("");
      setPendingDownloadUrl(null);
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmit = async () => {
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (!selectedPriceId) return;

    setLoadingPriceId(selectedPriceId);
    setEmailError("");

    try {
      const baseUrl = window.location.origin;
      const requestBody: CreateCheckoutSessionRequest = {
        price_id: selectedPriceId,
        success_url: `${baseUrl}/success`,
        cancel_url: baseUrl,
        allow_promotion_codes: true,
        customer_email: email,
      };

      const response = await fetch(LAMBDA_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      console.log("response", response);

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const data = await response.json();

      // Redirect to the Stripe checkout session URL
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No session URL returned");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert("Failed to start checkout. Please try again.");
      setLoadingPriceId(null);
    }
  };

  const Spinner = () => (
    <svg
      className="animate-spin h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  return (
    <div className="min-h-screen scroll-smooth">
      {/* Simplified background - removed CPU-intensive animations */}
      <div id="dappled-light">
        <div id="glow"></div>
        <div id="glow-bounce"></div>
        <div className="perspective">
          <div id="blinds">
            <div className="shutters">
              {Array.from({ length: 5 }).map((_, i) => (
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
      {/* <Header mobileMenuOpen={false} setMobileMenuOpen={() => {}} /> */}
      <div className="w-full relative flex flex-col items-center ">
        {/* Content */}
        <div
          id="download"
          className="mx-auto relative z-10 flex flex-col items-start min-h-screen pt-[10vh]"
        >
          <div
            className={`flex flex-col items-start mb-4 px-4 sm:px-8 lg:px-24 transition-all duration-700 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <div className="flex items-center gap-3 mb-2 sm:mb-3">
              <img
                src="/app-logo-bg-transparent.svg"
                alt="Fount Logo"
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
              <span
                className="text-2xl sm:text-3xl font-semibold"
                style={{ color: "var(--dark)" }}
              >
                Fount
              </span>
              <span
                className="px-2 py-0.5 text-xs font-semibold uppercase tracking-wide rounded-full"
                style={{
                  backgroundColor: "var(--accent-gold)",
                  color: "var(--dawn)",
                }}
              >
                Beta
              </span>
            </div>
            <h1
              className="text-4xl sm:text-6xl lg:text-8xl italic text-[var(--dark)]"
              style={{ lineHeight: "1.2" }}
            >
              Stay Curious
            </h1>
            <p
              className="text-base sm:text-lg lg:text-xl mt-4 sm:mt-6"
              style={{ color: "var(--text-muted)" }}
            >
              Your private research workspace—intelligent, endlessly capable.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
              {/* Mac Button */}
              <button
                onClick={() =>
                  handleDownloadClick(
                    "https://github.com/fount-labs/fount/releases/download/v0.0.4/Fount_0.0.4_aarch64.dmg"
                  )
                }
                className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg transition-all duration-200"
                style={{
                  backgroundColor:
                    platform === "MacOS"
                      ? "var(--btn-primary-bg)"
                      : "var(--dark)",
                  color:
                    platform === "MacOS"
                      ? "var(--btn-primary-text)"
                      : "var(--dawn)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    platform === "MacOS"
                      ? "var(--btn-primary-hover)"
                      : "var(--text-muted)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    platform === "MacOS"
                      ? "var(--btn-primary-bg)"
                      : "var(--dark)";
                }}
              >
                <AppleIcon color="currentColor" size="20" />
                Download for Mac
              </button>

              {/* Windows Button */}
              <button
                onClick={() =>
                  handleDownloadClick(
                    "https://github.com/fount-labs/fount/releases/download/v0.0.4/Fount_0.0.4_x64_en-US_windows.msi"
                  )
                }
                className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg transition-all duration-200"
                style={{
                  backgroundColor:
                    platform === "Windows"
                      ? "var(--btn-primary-bg)"
                      : "var(--dark)",
                  color:
                    platform === "Windows"
                      ? "var(--btn-primary-text)"
                      : "var(--dawn)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    platform === "Windows"
                      ? "var(--btn-primary-hover)"
                      : "var(--text-muted)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    platform === "Windows"
                      ? "var(--btn-primary-bg)"
                      : "var(--dark)";
                }}
              >
                <WindowsIcon color="currentColor" size="20" />
                Download for Windows
              </button>
            </div>
            <p className="mt-3 text-sm" style={{ color: "var(--text-muted)" }}>
              Requires macOS 14+ (Apple Silicon) or Windows 10+
            </p>
          </div>

          <div
            className={`flex-shrink-0 w-full px-6 transition-all duration-700 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <div className="w-full" style={{ aspectRatio: "1352/843" }}>
              <img
                src="/hero2.png"
                alt="Fount"
                className="w-full h-full object-contain"
                width="1352"
                height="843"
              />
            </div>
          </div>
        </div>

        {/* Principles Section */}
        <div
          id="features"
          className={`max-w-7xl mx-auto px-4 sm:px-8 lg:px-24 relative z-10 py-16 transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <div className="mx-auto">
            <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-8 lg:gap-0">
              <div className="flex flex-col flex-1 w-full gap-8">
                {[
                  {
                    title: "Your Data, Your Device",
                    description:
                      "Your workspace, files, and notes never leave your device.",
                  },
                  {
                    title: "Total Privacy Control",
                    description:
                      "Choose proprietary models when you want power, private models when you need confidentiality.",
                  },
                  {
                    title: "Context-Aware Intelligence",
                    description:
                      "Reference any document, get cited answers, build on past conversations.",
                  },
                ].map((principle, i) => (
                  <div key={i} className="text-left">
                    <h3
                      className="text-xl sm:text-2xl font-medium mb-3 sm:mb-4 flex items-center gap-3"
                      style={{ color: "var(--dark)" }}
                    >
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: "var(--accent-gold)" }}
                      />
                      {principle.title}
                    </h3>
                    <p
                      className="text-base sm:text-lg pl-5"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {principle.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="hidden lg:flex flex-col items-center flex-shrink-0 lg:ml-12 w-full sm:w-auto justify-center lg:justify-end">
                <img
                  src="/app-logo-5.svg"
                  alt="Fount"
                  className="w-full max-w-[250px] sm:max-w-[350px] h-auto"
                />
                <span
                  className="text-2xl font-semibold mt-4"
                  style={{ color: "var(--dark)" }}
                >
                  Fount
                </span>
                <button
                  onClick={() =>
                    handleDownloadClick(
                      platform === "Windows"
                        ? "https://github.com/fount-labs/fount/releases/download/v0.0.4/Fount_0.0.4_x64_en-US_windows.msi"
                        : "https://github.com/fount-labs/fount/releases/download/v0.0.4/Fount_0.0.4_aarch64.dmg"
                    )
                  }
                  className="mt-3 px-6 py-2 text-base font-medium rounded-lg transition-all duration-200 inline-block"
                  style={{
                    backgroundColor: "var(--btn-primary-bg)",
                    color: "var(--btn-primary-text)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--btn-primary-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--btn-primary-bg)";
                  }}
                >
                  Download Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div
          id="pricing"
          className={`max-w-7xl mx-auto px-4 sm:px-8 lg:px-24 relative z-10 py-16 transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "700ms" }}
        >
          {/* <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-medium text-center mb-4"
            style={{ color: "var(--dark)" }}
          >
            Choose Your Plan
          </h2>
          <p
            className="text-base sm:text-lg text-center mb-12 sm:mb-16 max-w-2xl mx-auto"
            style={{ color: "var(--text-muted)" }}
          >
            Own your AI workspace forever, or unlock cloud-powered capabilities
            with a subscription.
          </p> */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Perpetual License */}
            <div
              className="flex flex-col p-6 sm:p-8 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]"
              style={{
                backgroundColor: "var(--card-bg)",
                border: "1px solid var(--card-border)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--card-bg-hover)";
                e.currentTarget.style.borderColor = "var(--card-border-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--card-bg)";
                e.currentTarget.style.borderColor = "var(--card-border)";
              }}
            >
              <div className="mb-6">
                <h3
                  className="text-xl sm:text-2xl font-semibold mb-2"
                  style={{ color: "var(--dark)" }}
                >
                  Perpetual License
                </h3>
                <p
                  className="text-sm uppercase tracking-wide font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  Bring Your Own Keys
                </p>
              </div>

              <div className="mb-6">
                <span
                  className="text-4xl sm:text-5xl font-bold"
                  style={{ color: "var(--dark)" }}
                >
                  $50
                </span>
                <span
                  className="text-base ml-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  one-time
                </span>
              </div>

              <ul className="flex-1 space-y-4 mb-8">
                {[
                  "Full feature access with your own API keys",
                  "Lifetime access to latest features & updates",
                  "Grounded LLM responses with citations",
                  "Local workspace indexing for semantic search",
                  "Latest open-source embedding models + MLX support",
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 mt-0.5 flex-shrink-0"
                      style={{ color: "var(--check-color)" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span
                      className="text-sm sm:text-base"
                      style={{ color: "var(--dark)" }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-3 sm:py-4 px-6 text-base font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                style={{
                  border: "1px solid var(--btn-outline-border)",
                  color: "var(--dark)",
                  backgroundColor: "transparent",
                  opacity:
                    loadingPriceId && loadingPriceId !== PRICE_IDS.PERPETUAL
                      ? 0.5
                      : 1,
                }}
                onMouseEnter={(e) => {
                  if (!loadingPriceId) {
                    e.currentTarget.style.backgroundColor =
                      "var(--btn-outline-hover-bg)";
                    e.currentTarget.style.borderColor = "var(--dark)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor =
                    "var(--btn-outline-border)";
                }}
                onClick={() => handleCheckout(PRICE_IDS.PERPETUAL)}
                disabled={loadingPriceId !== null}
              >
                {loadingPriceId === PRICE_IDS.PERPETUAL && <Spinner />}
                {loadingPriceId === PRICE_IDS.PERPETUAL
                  ? "Processing..."
                  : "Get Perpetual License"}
              </button>
            </div>

            {/* Plus Subscription - Featured */}
            <div
              className="flex flex-col p-6 sm:p-8 rounded-2xl backdrop-blur-sm relative transition-all duration-300 hover:scale-[1.02]"
              style={{
                backgroundColor: "var(--card-featured-bg)",
                border: "2px solid var(--card-featured-border)",
              }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span
                  className="px-4 py-1 text-xs font-semibold uppercase tracking-wide rounded-full"
                  style={{
                    backgroundColor: "var(--accent-gold)",
                    color: "var(--dawn)",
                  }}
                >
                  Popular
                </span>
              </div>

              <div className="mb-6">
                <h3
                  className="text-xl sm:text-2xl font-semibold mb-2"
                  style={{ color: "var(--dark)" }}
                >
                  Plus
                </h3>
                <p
                  className="text-sm uppercase tracking-wide font-medium"
                  style={{ color: "var(--accent-gold)" }}
                >
                  Cloud-Enhanced
                </p>
              </div>

              <div className="mb-6">
                <span
                  className="text-4xl sm:text-5xl font-bold"
                  style={{ color: "var(--dark)" }}
                >
                  $20
                </span>
                <span
                  className="text-base ml-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  /month
                </span>
              </div>

              <ul className="flex-1 space-y-4 mb-8">
                {[
                  "Everything in Perpetual License",
                  "Provisioned API access to TEE models",
                  "Access to premium cloud models",
                  "No API key management required",
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 mt-0.5 flex-shrink-0"
                      style={{ color: "var(--accent-gold)" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span
                      className="text-sm sm:text-base"
                      style={{ color: "var(--dark)" }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-3 sm:py-4 px-6 text-base font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                style={{
                  backgroundColor: "var(--btn-primary-bg)",
                  color: "var(--btn-primary-text)",
                  opacity:
                    loadingPriceId && loadingPriceId !== PRICE_IDS.PLUS
                      ? 0.5
                      : 1,
                }}
                onMouseEnter={(e) => {
                  if (!loadingPriceId) {
                    e.currentTarget.style.backgroundColor =
                      "var(--btn-primary-hover)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--btn-primary-bg)";
                }}
                onClick={() => handleCheckout(PRICE_IDS.PLUS)}
                disabled={loadingPriceId !== null}
              >
                {loadingPriceId === PRICE_IDS.PLUS && <Spinner />}
                {loadingPriceId === PRICE_IDS.PLUS
                  ? "Processing..."
                  : "Get Plus"}
              </button>
            </div>

            {/* Pro Subscription */}
            <div
              className="flex flex-col p-6 sm:p-8 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]"
              style={{
                backgroundColor: "var(--card-bg)",
                border: "1px solid var(--card-border)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--card-bg-hover)";
                e.currentTarget.style.borderColor = "var(--card-border-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--card-bg)";
                e.currentTarget.style.borderColor = "var(--card-border)";
              }}
            >
              <div className="mb-6">
                <h3
                  className="text-xl sm:text-2xl font-semibold mb-2"
                  style={{ color: "var(--dark)" }}
                >
                  Pro
                </h3>
                <p
                  className="text-sm uppercase tracking-wide font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  Power User
                </p>
              </div>

              <div className="mb-6">
                <span
                  className="text-4xl sm:text-5xl font-bold"
                  style={{ color: "var(--dark)" }}
                >
                  $40
                </span>
                <span
                  className="text-base ml-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  /month
                </span>
              </div>

              <ul className="flex-1 space-y-4 mb-8">
                {[
                  "Everything in Plus",
                  "Expanded API usage limits",
                  "Priority access to new features",
                  "Best for heavy daily usage",
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 mt-0.5 flex-shrink-0"
                      style={{ color: "var(--check-color)" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span
                      className="text-sm sm:text-base"
                      style={{ color: "var(--dark)" }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-3 sm:py-4 px-6 text-base font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                style={{
                  border: "1px solid var(--btn-outline-border)",
                  color: "var(--dark)",
                  backgroundColor: "transparent",
                  opacity:
                    loadingPriceId && loadingPriceId !== PRICE_IDS.PRO
                      ? 0.5
                      : 1,
                }}
                onMouseEnter={(e) => {
                  if (!loadingPriceId) {
                    e.currentTarget.style.backgroundColor =
                      "var(--btn-outline-hover-bg)";
                    e.currentTarget.style.borderColor = "var(--dark)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor =
                    "var(--btn-outline-border)";
                }}
                onClick={() => handleCheckout(PRICE_IDS.PRO)}
                disabled={loadingPriceId !== null}
              >
                {loadingPriceId === PRICE_IDS.PRO && <Spinner />}
                {loadingPriceId === PRICE_IDS.PRO ? "Processing..." : "Get Pro"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "900ms" }}
      >
        <Footer />
      </div>

      {/* Email Dialog Modal */}
      {showEmailDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={() => {
            if (!loadingPriceId) {
              setShowEmailDialog(false);
            }
          }}
        >
          <div
            className="w-full max-w-md p-6 sm:p-8 rounded-2xl"
            style={{
              backgroundColor: "var(--dawn)",
              border: "2px solid var(--card-border)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              className="text-xl sm:text-2xl font-semibold mb-2"
              style={{ color: "var(--dark)" }}
            >
              Enter your email
            </h3>
            <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
              We'll send your license key and receipt to this address.
            </p>

            <div className="flex items-stretch gap-2">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !loadingPriceId) {
                      handleEmailSubmit();
                    }
                  }}
                  placeholder="your@email.com"
                  disabled={loadingPriceId !== null}
                  className="w-full px-4 py-3 rounded-lg text-base transition-all duration-200 outline-none"
                  style={{
                    backgroundColor: "var(--dawn)",
                    border: `1px solid ${
                      emailError ? "#ef4444" : "var(--card-border)"
                    }`,
                    color: "var(--dark)",
                  }}
                  autoFocus
                />
                {emailError && (
                  <p className="text-sm mt-2" style={{ color: "#ef4444" }}>
                    {emailError}
                  </p>
                )}
              </div>

              <button
                onClick={handleEmailSubmit}
                disabled={loadingPriceId !== null}
                className="px-4 py-3 rounded-lg text-lg font-semibold transition-all duration-200 flex items-center justify-center"
                style={{
                  backgroundColor: "var(--btn-primary-bg)",
                  color: "var(--btn-primary-text)",
                  minWidth: "56px",
                  opacity: loadingPriceId ? 0.5 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!loadingPriceId) {
                    e.currentTarget.style.backgroundColor =
                      "var(--btn-primary-hover)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--btn-primary-bg)";
                }}
              >
                {loadingPriceId ? (
                  <Spinner />
                ) : (
                  <ArrowRight className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Access Code Dialog Modal */}
      {showAccessCodeDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={() => {
            setShowAccessCodeDialog(false);
          }}
        >
          <div
            className="w-full max-w-md p-6 sm:p-8 rounded-2xl"
            style={{
              backgroundColor: "var(--dawn)",
              border: "2px solid var(--card-border)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              className="text-xl sm:text-2xl font-semibold mb-2"
              style={{ color: "var(--dark)" }}
            >
              Enter Access Code
            </h3>
            <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
              Please enter your access code to download Fount.
            </p>

            <div className="flex items-stretch gap-2">
              <div className="flex-1">
                <input
                  type="text"
                  value={accessCode}
                  onChange={(e) => {
                    setAccessCode(e.target.value);
                    setAccessCodeError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAccessCodeSubmit();
                    }
                  }}
                  placeholder="Enter access code"
                  className="w-full px-4 py-3 rounded-lg text-base transition-all duration-200 outline-none"
                  style={{
                    backgroundColor: "var(--dawn)",
                    border: `1px solid ${
                      accessCodeError ? "#ef4444" : "var(--card-border)"
                    }`,
                    color: "var(--dark)",
                  }}
                  autoFocus
                />
                {accessCodeError && (
                  <p className="text-sm mt-2" style={{ color: "#ef4444" }}>
                    {accessCodeError}
                  </p>
                )}
              </div>

              <button
                onClick={handleAccessCodeSubmit}
                className="px-4 py-3 rounded-lg text-lg font-semibold transition-all duration-200 flex items-center justify-center"
                style={{
                  backgroundColor: "var(--btn-primary-bg)",
                  color: "var(--btn-primary-text)",
                  minWidth: "56px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--btn-primary-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--btn-primary-bg)";
                }}
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
