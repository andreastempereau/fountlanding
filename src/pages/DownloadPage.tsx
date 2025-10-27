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
  const navigate = useNavigate();

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
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

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
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
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
                    <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <div className="max-w-[1400px] mx-auto px-12 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => navigate("/")}
            className="mb-8 text-base font-light transition-opacity hover:opacity-60 flex items-center gap-2"
            style={{ color: "var(--dark)" }}
          >
            ← Back to Home
          </button>

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
            <p
              className="text-xl font-light"
              style={{ color: "var(--dark)" }}
            >
              Your personal AI workspace for private thoughts
            </p>
          </div>

          {/* System Requirements Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
            <h2
              className="text-2xl font-light mb-6"
              style={{ color: "var(--dark)" }}
            >
              System Requirements
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium" style={{ color: "var(--dark)" }}>
                    Apple Silicon (M1, M2, M3, or later)
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Fount is optimized for Apple's ARM-based processors
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium" style={{ color: "var(--dark)" }}>
                    macOS 14.1 (Sonoma) or later
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Ensure your Mac is running the latest operating system
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="text-center">
            <a
              href="#"
              className="inline-block px-12 py-5 text-lg font-semibold rounded-xl transition-all hover:opacity-80 shadow-lg"
              style={{
                backgroundColor: "var(--dark)",
                color: "var(--light)",
              }}
            >
              Download Fount.dmg
            </a>
            <p className="text-sm text-gray-500 mt-4">
              Version 1.0.0 • Apple Silicon • macOS 14.1+
            </p>
          </div>

          {/* Installation Instructions */}
          <div className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h3
              className="text-lg font-medium mb-4"
              style={{ color: "var(--dark)" }}
            >
              Installation Instructions
            </h3>
            <ol className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="font-semibold">1.</span>
                <span>Download the Fount.dmg file</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold">2.</span>
                <span>Open the downloaded file to mount the disk image</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold">3.</span>
                <span>Drag the Fount app to your Applications folder</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold">4.</span>
                <span>Launch Fount from your Applications folder</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
