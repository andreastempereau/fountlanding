import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    // Add animation-ready class after component mounts
    document.body.classList.add("twilight");

    // Trigger animations after a short delay
    requestAnimationFrame(() => {
      setIsLoaded(true);
    });

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("twilight");
    };
  }, []);

  // Log session ID for debugging (you can use this to fetch user email)
  useEffect(() => {
    if (sessionId) {
      console.log("Stripe session ID:", sessionId);
      // TODO: Fetch user email using session ID if needed
      // Example: fetchUserEmail(sessionId);
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen scroll-smooth">
      {/* Simplified background - same as landing page */}
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

      <div className="w-full relative flex flex-col items-center justify-center min-h-screen px-4">
        <div
          className={`max-w-2xl mx-auto relative z-10 text-center transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Success Icon */}
          <div className="mb-8 flex justify-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: "var(--accent-gold)",
              }}
            >
              <svg
                className="w-12 h-12"
                style={{ color: "var(--dawn)" }}
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
            </div>
          </div>

          {/* Success Message */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-6"
            style={{ color: "var(--dark)" }}
          >
            Purchase Successful!
          </h1>

          <p
            className="text-lg sm:text-xl mb-8"
            style={{ color: "var(--text-muted)" }}
          >
            Thank you for your purchase. Your license key has been sent to your
            email.
          </p>

          <div
            className="p-6 rounded-lg mb-8"
            style={{
              backgroundColor: "var(--card-bg)",
              border: "1px solid var(--card-border)",
            }}
          >
            <h2
              className="text-xl font-semibold mb-3"
              style={{ color: "var(--dark)" }}
            >
              What's Next?
            </h2>
            <ul
              className="text-left space-y-2"
              style={{ color: "var(--text-muted)" }}
            >
              <li className="flex items-start gap-2">
                <span style={{ color: "var(--accent-gold)" }}>1.</span>
                <span>Check your email for your license key</span>
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: "var(--accent-gold)" }}>2.</span>
                <span>Download Fount if you haven't already</span>
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: "var(--accent-gold)" }}>3.</span>
                <span>Enter your license key during setup</span>
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: "var(--accent-gold)" }}>4.</span>
                <span>Start exploring your private AI workspace</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/#download"
              className="px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 inline-block"
              style={{
                backgroundColor: "var(--btn-primary-bg)",
                color: "var(--btn-primary-text)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--btn-primary-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--btn-primary-bg)";
              }}
            >
              Download Fount
            </Link>
            <Link
              to="/"
              className="px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 inline-block"
              style={{
                border: "1px solid var(--btn-outline-border)",
                color: "var(--dark)",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--btn-outline-hover-bg)";
                e.currentTarget.style.borderColor = "var(--dark)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.borderColor = "var(--btn-outline-border)";
              }}
            >
              Return Home
            </Link>
          </div>

          {/* {sessionId && (
            <p
              className="mt-8 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              Order ID: {sessionId.slice(0, 20)}...
            </p>
          )} */}
        </div>
      </div>

      <div
        className={`transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "300ms" }}
      >
        <Footer />
      </div>
    </div>
  );
}
