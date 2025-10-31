import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { isAuthenticated } from "../utils/tokenStorage";

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

  const handleAccountClick = () => {
    if (authenticated) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  };

  return (
    <header className="w-full z-10 relative">
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
            <a
              href="#pricing"
              className="text-base font-light transition-opacity hover:opacity-60"
              style={{ color: "var(--dark)" }}
            >
              Pricing
            </a>
            <button
              onClick={handleAccountClick}
              className="text-base font-light transition-opacity hover:opacity-60"
              style={{ color: "var(--dark)" }}
            >
              Account
            </button>
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
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-white/20">
          <div className="px-12 py-6 space-y-4">
            <button
              onClick={() => navigate("/download")}
              className="block w-full text-left text-base font-light transition-opacity hover:opacity-60"
              style={{ color: "var(--dark)" }}
            >
              Download
            </button>
            <a
              href="#pricing"
              className="block text-base font-light transition-opacity hover:opacity-60"
              style={{ color: "var(--dark)" }}
            >
              Pricing
            </a>
            <button
              onClick={handleAccountClick}
              className="block w-full text-left text-base font-light transition-opacity hover:opacity-60"
              style={{ color: "var(--dark)" }}
            >
              Account
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
