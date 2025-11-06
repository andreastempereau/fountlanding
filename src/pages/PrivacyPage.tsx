import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PrivacyPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add("twilight");

    return () => {
      document.body.classList.remove("twilight");
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ scrollbarWidth: "none" }}>
      {/* Same background as LandingPage */}
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

      <div className="w-full relative">
        {/* Privacy Content */}
        <div className="max-w-[1000px] mx-auto relative z-10 px-24 py-16">
          {/* Header */}
          <div className="mb-12">
            <h1
              className="text-6xl italic text-[var(--dark)] mb-4"
              style={{ lineHeight: "1.2" }}
            >
              Privacy Policy
            </h1>
            <p className="text-lg text-white">Last Updated: November 2025</p>
          </div>

          {/* Privacy Content */}
          <div className="prose prose-lg prose-invert max-w-none">
            <div className="space-y-8">
              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  1. Introduction
                </h2>
                <p className="text-white leading-relaxed">
                  Zekiel Dee (“we,” “us,” or “our”) operates Fount and its
                  related website (collectively, the “Service”). This Privacy
                  Policy explains how we collect, use, and protect your personal
                  information when you use the Service. By using Fount, you
                  agree to the terms described here.
                </p>
              </section>
              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  2. Information We Collect
                </h2>
                <p className="text-white leading-relaxed">
                  We collect only the information necessary to operate and
                  provide the Service: Account Information: Email address and
                  password (stored securely as a cryptographic hash). Payment
                  Information: Billing details handled by our payment processor
                  (Stripe). We never see or store your full credit card number.
                  We do not track personal behavior or location, and we do not
                  sell user data to anyone.
                </p>
              </section>
              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  3. How We Use Your Information
                </h2>
                <p className="text-white leading-relaxed">
                  We use the information we collect to: Create and maintain your
                  user account. Process and manage your subscription through
                  Stripe. Provide customer support and communicate about updates
                  or service issues. Maintain and improve our software’s
                  functionality and security.
                </p>
              </section>
              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  4. How We Share Your Information
                </h2>
                <p className="text-white leading-relaxed">
                  We share your information only when necessary to operate the
                  Service: Stripe: For secure payment processing. AWS: For
                  managing logins and subscriptions. Legal Requirements: If
                  required by law, regulation, or court order. We do not sell,
                  rent, or otherwise disclose personal information to marketers
                  or advertisers.
                </p>
              </section>
              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  5. Data Retention
                </h2>
                <p className="text-white leading-relaxed">
                  We keep your data only as long as your account remains active
                  or as needed to comply with legal obligations (e.g., tax and
                  accounting records). When you delete your account, we remove
                  your personal information from our systems within a reasonable
                  period, except for records we are legally required to retain.
                </p>
              </section>
              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  6. Security
                </h2>
                <p className="text-white leading-relaxed">
                  We take reasonable measures to protect your personal
                  information from unauthorized access, disclosure, alteration,
                  or destruction. Passwords are stored using secure,
                  industry-standard hashing algorithms. No system is completely
                  secure, but we continuously review and improve our security
                  practices.
                </p>
              </section>
              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  7. Your Rights
                </h2>
                <p className="text-white leading-relaxed">
                  You may: Access, correct, or delete your account information.
                  Request that we delete your account and associated data.
                  Withdraw consent where applicable (for example, unsubscribing
                  from emails). To exercise these rights, contact us at
                  support@fount.sh. If you are located in the European Union,
                  you have additional rights under the General Data Protection
                  Regulation (GDPR), including the right to lodge a complaint
                  with your local data protection authority.
                </p>
              </section>
              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  8. Children’s Privacy
                </h2>
                <p className="text-white leading-relaxed">
                  Our Service is not directed to children under 13, and we do
                  not knowingly collect data from them. If we learn that a child
                  under 13 has provided personal information, we will delete it
                  immediately.
                </p>
              </section>
              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  9. Changes to This Policy
                </h2>
                <p className="text-white leading-relaxed">
                  We may update this Privacy Policy from time to time. The “Last
                  Updated” date at the top of this page reflects the most recent
                  version. By continuing to use the Service after changes take
                  effect, you agree to the updated policy.
                </p>
              </section>
              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  10. Contact Us
                </h2>
                <p className="text-white leading-relaxed">
                  If you have questions or concerns about this Privacy Policy or
                  our data practices, contact us at: Zekiel Dee Email:
                  support@fount.sh Address: Los Angeles, CA, 90001 USA
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
