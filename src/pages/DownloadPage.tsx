import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

// Access code for downloads - change this to your desired code
const ACCESS_CODE = "FOUNT2025";
const STORAGE_KEY = "fount_download_access";

export default function DownloadPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [isAccessGranted, setIsAccessGranted] = useState(false);
  const [error, setError] = useState("");
  const [platform, setPlatform] = useState<"mac" | "windows" | "unknown">(
    "unknown"
  );
  const navigate = useNavigate();

  // Detect user's platform
  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.includes("mac")) {
      setPlatform("mac");
    } else if (userAgent.includes("win")) {
      setPlatform("windows");
    } else {
      setPlatform("unknown");
    }
  }, []);

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

  // Check localStorage on mount to see if user has already been granted access
  useEffect(() => {
    const hasAccess = localStorage.getItem(STORAGE_KEY);
    if (hasAccess === "true") {
      setIsAccessGranted(true);
    }
  }, []);

  const handleAccessCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === ACCESS_CODE) {
      setIsAccessGranted(true);
      setError("");
      // Store access in localStorage so user doesn't need to re-enter on refresh
      localStorage.setItem(STORAGE_KEY, "true");
    } else {
      setError("Invalid access code. Please try again.");
      setAccessCode("");
    }
  };

  // Show access code form if access not granted
  if (!isAccessGranted) {
    return (
      <div className="min-h-screen">
        <Header
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        <div className="max-w-[1400px] mx-auto px-12 py-16">
          <div className="max-w-md mx-auto">
            {/* Back button */}
            <button
              onClick={() => navigate("/")}
              className="mb-8 text-base font-light transition-opacity hover:opacity-60 flex items-center gap-2"
              style={{ color: "var(--dark)" }}
            >
              ← Back to Home
            </button>

            {/* Access Code Card */}
            <div className="bg-[var(--dark)] rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="text-center mb-8">
                <img
                  src="/app-logo-5.svg"
                  alt="Fount Logo"
                  className="w-24 h-24 mx-auto mb-6"
                />
                <h1
                  className="text-3xl font-light tracking-tight mb-3"
                  style={{ color: "var(--dark)" }}
                >
                  Access Code Required
                </h1>
                <p className="text-base font-light text-gray-600">
                  Enter the access code to view the downloads page
                </p>
              </div>

              <form onSubmit={handleAccessCodeSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    placeholder="Enter access code"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg tracking-wider"
                    style={{ color: "var(--dark)" }}
                    autoFocus
                  />
                  {error && (
                    <p className="text-red-500 text-sm mt-2 text-center">
                      {error}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 text-base font-semibold rounded-lg transition-all hover:opacity-80 shadow-md"
                  style={{
                    backgroundColor: "var(--dark)",
                    color: "var(--light)",
                  }}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Simplified background - removed CPU-intensive animations */}
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
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <img
              src="/app-logo-5.svg"
              alt="Fount Logo"
              className="w-32 h-32 mx-auto mb-6"
            />
            <h1
              className="text-5xl font-light tracking-tight mb-4"
              style={{ color: "var(--dark)" }}
            >
              Download Fount
            </h1>
            <p className="text-xl font-light" style={{ color: "var(--dark)" }}>
              Your personal AI workspace for private thoughts
            </p>
          </div>

          {/* System Requirements Card */}
          <div className="rounded-2xl shadow-lg p-8 mb-8 bg-[var(--dark)] text-[var(--light)]">
            <h2 className="text-2xl font-light mb-6">System Requirements</h2>
            {platform === "mac" ? (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  {/* <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div> */}
                  <div>
                    <p className="font-medium">
                      Apple Silicon (M1, M2, M3, or later)
                    </p>
                    <p className="text-sm  mt-1">
                      Fount is optimized for Apple's ARM-based processors
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  {/* <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div> */}
                  <div>
                    <p className="font-medium">macOS 14.1 (Sonoma) or later</p>
                    <p className="text-sm  mt-1">
                      Ensure your Mac is running the latest operating system
                    </p>
                  </div>
                </div>
              </div>
            ) : platform === "windows" ? (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <p
                      className="font-medium"
                      style={{ color: "var(--light)" }}
                    >
                      Windows 10 or later
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Compatible with Windows 10 and Windows 11
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <p
                      className="font-medium"
                      style={{ color: "var(--light)" }}
                    >
                      64-bit processor
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Requires a 64-bit version of Windows
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600">
                  Fount is available for macOS (Apple Silicon) and Windows 10+
                </p>
              </div>
            )}
          </div>

          {/* Download Button */}
          <div className="text-center">
            {platform === "mac" ? (
              <>
                <a
                  href="#"
                  className="inline-block px-12 py-5 text-lg font-semibold rounded-xl transition-all hover:opacity-80 shadow-lg"
                  style={{
                    backgroundColor: "var(--dark)",
                    color: "var(--light)",
                  }}
                >
                  Download for Mac
                </a>
                <p className="text-sm text-gray-500 mt-4">
                  Version 1.0.0 • Apple Silicon • macOS 14.1+
                </p>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-800 mt-3 inline-block underline"
                >
                  Download for Windows instead
                </a>
              </>
            ) : platform === "windows" ? (
              <>
                <a
                  href="#"
                  className="inline-block px-12 py-5 text-lg font-semibold rounded-xl transition-all hover:opacity-80 shadow-lg"
                  style={{
                    backgroundColor: "var(--dark)",
                    color: "var(--light)",
                  }}
                >
                  Download for Windows
                </a>
                <p className="text-sm text-gray-500 mt-4">
                  Version 1.0.0 • Windows 10+
                </p>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-800 mt-3 inline-block underline"
                >
                  Download for Mac instead
                </a>
              </>
            ) : (
              <div className="space-y-4">
                <a
                  href="#"
                  className="inline-block px-12 py-5 text-lg font-semibold rounded-xl transition-all hover:opacity-80 shadow-lg mb-4"
                  style={{
                    backgroundColor: "var(--dark)",
                    color: "var(--light)",
                  }}
                >
                  Download for Mac
                </a>
                <br />
                <a
                  href="#"
                  className="inline-block px-12 py-5 text-lg font-semibold rounded-xl transition-all hover:opacity-80 shadow-lg"
                  style={{
                    backgroundColor: "var(--dark)",
                    color: "var(--light)",
                  }}
                >
                  Download for Windows
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
