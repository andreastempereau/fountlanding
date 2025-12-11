import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import { features } from "../config/features";

export default function Footer() {
  return (
    <footer
      className="relative"
      style={{ borderTop: "1px solid var(--card-border)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img
                src="/app-logo-bg-transparent.svg"
                alt="Fount"
                className="w-10 h-10"
              />
              <span
                className="text-xl font-bold"
                style={{ color: "var(--dark)" }}
              >
                Fount
              </span>
            </div>
            <p className="max-w-lg mb-6" style={{ color: "var(--text-muted)" }}>
              The personal AI workspace for your private thoughts.
            </p>
            <div
              className="flex items-center space-x-6"
              style={{ color: "var(--text-muted)" }}
            >
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Los Angeles</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>support@fount.sh</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4" style={{ color: "var(--dark)" }}>
              Pages
            </h4>
            <ul className="space-y-2" style={{ color: "var(--text-muted)" }}>
              <li>
                <Link
                  to="/"
                  className="transition-colors hover:opacity-100"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--accent-gold)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-muted)")
                  }
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/download"
                  className="transition-colors"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--accent-gold)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-muted)")
                  }
                >
                  Download
                </Link>
              </li>
              {features.pricingPage && (
                <li>
                  <Link
                    to="/pricing"
                    className="transition-colors"
                    style={{ color: "var(--text-muted)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--accent-gold)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-muted)")
                    }
                  >
                    Pricing
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/blog"
                  className="transition-colors"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--accent-gold)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-muted)")
                  }
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/roadmap"
                  className="transition-colors"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--accent-gold)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-muted)")
                  }
                >
                  Roadmap
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="transition-colors"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--accent-gold)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-muted)")
                  }
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4" style={{ color: "var(--dark)" }}>
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/terms"
                  className="transition-colors"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--accent-gold)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-muted)")
                  }
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="transition-colors"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--accent-gold)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-muted)")
                  }
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
