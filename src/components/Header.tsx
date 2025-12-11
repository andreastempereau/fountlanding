import { useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { isAuthenticated } from "../utils/tokenStorage";
import { features } from "../config/features";
import { useState, useRef, useEffect } from "react";

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Header({
  mobileMenuOpen,
  setMobileMenuOpen,
}: HeaderProps) {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  const [learnDropdownOpen, setLearnDropdownOpen] = useState(false);
  const [mobileLearnOpen, setMobileLearnOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleAccountClick = () => {
    // Don't navigate if features are disabled
    if (!features.auth && !features.dashboard) {
      return;
    }

    if (authenticated && features.dashboard) {
      navigate("/dashboard");
    } else if (features.auth) {
      navigate("/auth");
    }
  };

  // Hide account button if both auth and dashboard features are disabled
  const showAccountButton = features.auth || features.dashboard;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setLearnDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full z-50 sticky top-0 backdrop-blur-md bg-gradient-to-b from-[var(--dawn)]/80 via-[var(--dawn)]/60 to-transparent transition-all duration-300 border-b border-white/5">
      <div className="max-w-[1400px] mx-auto px-12">
        <div className="flex justify-between items-center py-6">
          {/* Left: Logo */}
          <button
            className="flex items-center space-x-2 transition-opacity hover:opacity-60"
            onClick={() => navigate("/")}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
            aria-label="Go to home"
          >
            <img
              src="/app-logo-bg-transparent.svg"
              alt="Fount Logo"
              className="w-10 h-10"
            />
            <span
              className="text-2xl font-light tracking-tight"
              style={{ color: "var(--dark)" }}
            >
              Fount
            </span>
          </button>

          {/* Right: Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => navigate("/download")}
              className="text-base font-light transition-opacity hover:opacity-60"
              style={{ color: "var(--dark)" }}
            >
              Download
            </button>
            {features.pricingPage && (
              <button
                onClick={() => navigate("/pricing")}
                className="text-base font-light transition-opacity hover:opacity-60"
                style={{ color: "var(--dark)" }}
              >
                Pricing
              </button>
            )}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setLearnDropdownOpen(!learnDropdownOpen)}
                className="text-base font-light transition-opacity hover:opacity-60 flex items-center space-x-1"
                style={{ color: "var(--dark)" }}
              >
                <span>Learn</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${learnDropdownOpen ? "rotate-180" : ""
                    }`}
                />
              </button>
              {learnDropdownOpen && (
                <div className="absolute top-full mt-2 left-0 bg-slate-900 rounded-md shadow-lg border border-slate-600 min-w-[160px]">
                  <button
                    onClick={() => {
                      navigate("/blog");
                      setLearnDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-base font-light hover:bg-slate-800 transition-colors rounded-md rounded-b-none"
                    style={{ color: "var(--dark)" }}
                  >
                    Blog
                  </button>
                  <button
                    onClick={() => {
                      navigate("/roadmap");
                      setLearnDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-base font-light hover:bg-slate-800 transition-colors rounded-md rounded-t-none"
                    style={{ color: "var(--dark)" }}
                  >
                    Roadmap
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={() => navigate("/faq")}
              className="text-base font-light transition-opacity hover:opacity-60"
              style={{ color: "var(--dark)" }}
            >
              FAQ
            </button>
            <a
              href="https://discord.gg/UmWDZbB6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-light transition-opacity hover:opacity-60"
              style={{ color: "var(--dark)" }}
            >
              Community
            </a>
            {showAccountButton && (
              <button
                onClick={handleAccountClick}
                className="text-base font-light transition-opacity hover:opacity-60"
                style={{ color: "var(--dark)" }}
              >
                Account
              </button>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden transition-opacity hover:opacity-60"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ color: "var(--dark)" }}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--dawn)]/95 backdrop-blur-md border-t border-white/10">
          <div className="px-12 py-6 space-y-4">
            <button
              onClick={() => navigate("/download")}
              className="block w-full text-left text-base font-light transition-opacity hover:opacity-60"
              style={{ color: "var(--dark)" }}
            >
              Download
            </button>
            {features.pricingPage && (
              <button
                onClick={() => navigate("/pricing")}
                className="block w-full text-left text-base font-light transition-opacity hover:opacity-60"
                style={{ color: "var(--dark)" }}
              >
                Pricing
              </button>
            )}
            <div>
              <button
                onClick={() => setMobileLearnOpen(!mobileLearnOpen)}
                className="flex items-center justify-between w-full text-left text-base font-light transition-opacity hover:opacity-60"
                style={{ color: "var(--dark)" }}
              >
                <span>Learn</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${mobileLearnOpen ? "rotate-180" : ""
                    }`}
                />
              </button>
              {mobileLearnOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  <button
                    onClick={() => {
                      navigate("/blog");
                      setMobileMenuOpen(false);
                      setMobileLearnOpen(false);
                    }}
                    className="block w-full text-left text-base font-light transition-opacity hover:opacity-60"
                    style={{ color: "var(--dark)" }}
                  >
                    Blog
                  </button>
                  <button
                    onClick={() => {
                      navigate("/roadmap");
                      setMobileMenuOpen(false);
                      setMobileLearnOpen(false);
                    }}
                    className="block w-full text-left text-base font-light transition-opacity hover:opacity-60"
                    style={{ color: "var(--dark)" }}
                  >
                    Roadmap
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={() => navigate("/faq")}
              className="block w-full text-left text-base font-light transition-opacity hover:opacity-60"
              style={{ color: "var(--dark)" }}
            >
              FAQ
            </button>
            <a
              href="https://discord.gg/h6JY84yZvU"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-left text-base font-light transition-opacity hover:opacity-60"
              style={{ color: "var(--dark)" }}
            >
              Community
            </a>
            {showAccountButton && (
              <button
                onClick={handleAccountClick}
                className="block w-full text-left text-base font-light transition-opacity hover:opacity-60"
                style={{ color: "var(--dark)" }}
              >
                Account
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
