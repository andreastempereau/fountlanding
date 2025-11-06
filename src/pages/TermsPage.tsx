import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TermsPage() {
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
        {/* Terms Content */}
        <div className="max-w-[1000px] mx-auto relative z-10 px-24 py-16">
          {/* Header */}
          <div className="mb-12">
            <h1
              className="text-6xl italic text-[var(--dark)] mb-4"
              style={{ lineHeight: "1.2" }}
            >
              Terms of Service
            </h1>
            <p className="text-lg text-white">Last Updated: November 2025</p>
          </div>

          {/* Terms Content */}
          <div className="prose prose-lg prose-invert max-w-none">
            <div className="space-y-8">
              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  1. Introduction
                </h2>
                <p className="text-white leading-relaxed">
                  Welcome to Fount! This document (“Agreement”) governs your use
                  of our software and related services. By downloading,
                  installing, or using Fount (the “Software”), you agree to
                  these terms. If you do not agree, do not install or use the
                  Software. Zekiel Dee, operating as a sole proprietorship based
                  in CA, owns and provides this Software.
                </p>
              </section>
              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  2. License Grant
                </h2>
                <p className="text-white leading-relaxed mb-4">
                  You are granted a limited, non-exclusive, non-transferable,
                  revocable license to install and use one copy of the Software
                  on your personal computer for your own use. You may not:
                  Modify, reverse engineer, decompile, or disassemble the
                  Software. Share, sublicense, or redistribute the Software
                  without written permission. Circumvent license or subscription
                  mechanisms. All rights not expressly granted are reserved by
                  Zekiel Dee.{" "}
                </p>
              </section>
              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  2. License Grant
                </h2>
                <p className="text-white leading-relaxed mb-4">
                  You are granted a limited, non-exclusive, non-transferable,
                  revocable license to install and use one copy of the Software
                  on your personal computer for your own use. You may not:
                  Modify, reverse engineer, decompile, or disassemble the
                  Software. Share, sublicense, or redistribute the Software
                  without written permission. Circumvent license or subscription
                  mechanisms. All rights not expressly granted are reserved by
                  Zekiel Dee.{" "}
                </p>
              </section>
              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  3. Subscriptions and Payments
                </h2>
                <p className="text-white leading-relaxed mb-4">
                  Access to premium features requires an active paid
                  subscription ($20 per month) processed securely via Stripe.
                  Subscriptions automatically renew each month unless canceled.
                  You can cancel at any time from your account settings.
                  Cancellation stops future charges but does not refund previous
                  payments unless otherwise stated below. Refund Policy All
                  subscription payments are non-refundable. When you cancel your
                  subscription, you will retain access to premium features until
                  the end of your current billing period, after which your
                  subscription will not renew. No partial refunds or credits are
                  provided for unused time or features.
                </p>
              </section>
              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  4. Account and Security
                </h2>
                <p className="text-white leading-relaxed mb-4">
                  To access premium features, you must create an account with
                  your email and password. You are responsible for keeping your
                  login credentials secure and for all activity under your
                  account. If you believe your account has been compromised,
                  contact us immediately at support@fount.sh
                </p>
              </section>
              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  5. Privacy
                </h2>
                <p className="text-white leading-relaxed mb-4">
                  We collect only the information needed to operate your account
                  — namely your email address, hashed password, and subscription
                  details via Stripe. All payment information is handled by
                  Stripe; we never see or store your credit card data. For full
                  details, please see our Privacy Policy.
                </p>
              </section>
              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  6. Intellectual Property
                </h2>
                <p className="text-white leading-relaxed mb-4">
                  The Software, including all content, design, and code, is
                  owned by Zekiel Dee. This Agreement does not transfer
                  ownership. All trademarks, logos, and third-party libraries
                  remain the property of their respective owners.
                </p>
              </section>
              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  7. Acceptable Use
                </h2>
                <p className="text-white leading-relaxed mb-4">
                  You agree not to use the Software for any unlawful purpose or
                  to disrupt, damage, or interfere with servers, networks, or
                  other users.
                </p>
              </section>
              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  8. Termination
                </h2>
                <p className="text-white leading-relaxed mb-4">
                  We may suspend or terminate your account or license at any
                  time for violation of this Agreement, non-payment, or
                  fraudulent activity. Upon termination, you must stop using the
                  Software and uninstall all copies from your devices.
                </p>
              </section>
              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  9. Disclaimer of Warranties
                </h2>
                <p className="text-white leading-relaxed mb-4">
                  The Software is provided “as is” and “as available.” To the
                  maximum extent permitted by law, Zekiel Dee disclaims all
                  warranties, express or implied, including but not limited to
                  warranties of merchantability, fitness for a particular
                  purpose, or non-infringement. We make no guarantee that the
                  Software will be uninterrupted, error-free, or free of harmful
                  components.
                </p>
              </section>
              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  10. Limitation of Liability
                </h2>
                <p className="text-white leading-relaxed mb-4">
                  To the fullest extent permitted by law, Zekiel Dee will not be
                  liable for any indirect, incidental, or consequential damages,
                  including lost profits, data loss, or business interruption.
                  In no event shall our total liability exceed the amount you
                  paid to us in the past twelve (12) months.
                </p>
              </section>
              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  11. Governing Law
                </h2>
                <p className="text-white leading-relaxed mb-4">
                  This Agreement is governed by the laws of the State of
                  California, without regard to its conflict of law principles.
                  Any disputes will be handled in the courts of the United
                  States of America, California, unless otherwise required by
                  applicable law.
                </p>
              </section>
              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  12. Changes to This Agreement
                </h2>
                <p className="text-white leading-relaxed mb-4">
                  We may update these terms occasionally. When we do, we’ll
                  update the “Last Updated” date at the top of this page.
                  Continued use of the Software after changes means you accept
                  the revised terms.{" "}
                </p>
              </section>
              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  13. Contact Information{" "}
                </h2>
                <p className="text-white leading-relaxed mb-4">
                  For questions, legal notices, or support, contact: Zekiel Dee
                  <br />
                  Email: support@fount.sh
                  <br />
                  Address: Los Angeles, CA, 90001 USA
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
