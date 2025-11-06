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
            <p className="text-lg text-white">Last Updated: January 2025</p>
          </div>

          {/* Privacy Content */}
          <div className="prose prose-lg prose-invert max-w-none">
            <div className="space-y-8">
              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  Our Commitment to Privacy
                </h2>
                <p className="text-white leading-relaxed">
                  At Fount, privacy is not just a feature—it's our foundation.
                  This Privacy Policy explains how we handle your data when you
                  use our application. The short version: we designed Fount so
                  that we don't have access to your private data, and we intend
                  to keep it that way.
                </p>
              </section>

              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  1. Information We Don't Collect
                </h2>
                <p className="text-white leading-relaxed mb-4">
                  By design, we do not collect, store, or have access to:
                </p>
                <ul className="list-disc list-inside text-white space-y-2 ml-4">
                  <li>Your documents or files</li>
                  <li>Your conversations with AI models</li>
                  <li>Your notes or personal data</li>
                  <li>Your search queries or usage patterns</li>
                  <li>Your AI model API keys</li>
                </ul>
                <p className="text-white leading-relaxed mt-4">
                  All of this information stays on your device, locally stored
                  and under your control.
                </p>
              </section>

              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  2. Information We Do Collect
                </h2>
                <p className="text-white leading-relaxed mb-4">
                  We collect minimal information necessary to provide and
                  improve our service:
                </p>
                <ul className="list-disc list-inside text-white space-y-2 ml-4">
                  <li>
                    <strong>Account Information:</strong> If you create an
                    account, we collect your email address for authentication
                    purposes.
                  </li>
                  <li>
                    <strong>Technical Information:</strong> Basic application
                    diagnostics, error logs, and crash reports to improve
                    performance and fix bugs.
                  </li>
                  <li>
                    <strong>Usage Analytics:</strong> Anonymized statistics
                    about feature usage to help us understand how to improve the
                    application.
                  </li>
                </ul>
              </section>

              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  3. How Your Data is Stored
                </h2>
                <p className="text-white leading-relaxed mb-4">
                  <strong>Local Storage:</strong> All your documents,
                  conversations, and personal data are stored locally on your
                  device. We use industry-standard encryption to protect this
                  data at rest.
                </p>
                <p className="text-white leading-relaxed">
                  <strong>Optional Cloud Features:</strong> If you choose to use
                  cloud-based features (such as syncing across devices), your
                  data will be encrypted before transmission and stored securely
                  in your own cloud storage that you control.
                </p>
              </section>

              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  4. Third-Party Services
                </h2>
                <p className="text-white leading-relaxed mb-4">
                  When you use AI models through Fount, your queries are sent
                  directly to the AI provider you choose (e.g., OpenAI,
                  Anthropic, Google). These interactions are subject to the
                  privacy policies of those providers:
                </p>
                <ul className="list-disc list-inside text-white space-y-2 ml-4">
                  <li>
                    <strong>Cloud Providers:</strong> Your data is transmitted
                    to and processed by the AI provider according to their
                    privacy policy.
                  </li>
                  <li>
                    <strong>Verifiably Private Models:</strong> These models use
                    secure enclaves and cryptographic techniques to ensure your
                    data remains private even during processing.
                  </li>
                  <li>
                    <strong>Local Models:</strong> Processing happens entirely
                    on your device with no external data transmission.
                  </li>
                </ul>
              </section>

              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  5. Data Sharing and Disclosure
                </h2>
                <p className="text-white leading-relaxed mb-4">
                  We do not sell, rent, or share your personal information with
                  third parties, except:
                </p>
                <ul className="list-disc list-inside text-white space-y-2 ml-4">
                  <li>When you explicitly direct us to do so</li>
                  <li>
                    When required by law or to protect our legal rights
                  </li>
                  <li>
                    With service providers who help us operate the application
                    (under strict confidentiality agreements)
                  </li>
                </ul>
              </section>

              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  6. Data Security
                </h2>
                <p className="text-white leading-relaxed">
                  We implement industry-standard security measures to protect
                  your information. This includes encryption of data at rest and
                  in transit, secure authentication protocols, and regular
                  security audits. However, no method of electronic storage or
                  transmission is 100% secure, and we cannot guarantee absolute
                  security.
                </p>
              </section>

              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  7. Your Rights and Choices
                </h2>
                <p className="text-white leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-white space-y-2 ml-4">
                  <li>Access your data at any time (it's on your device)</li>
                  <li>
                    Delete your data by uninstalling the application or deleting
                    local files
                  </li>
                  <li>Export your data in standard formats</li>
                  <li>
                    Opt out of analytics and diagnostics in application settings
                  </li>
                  <li>Request deletion of your account information</li>
                </ul>
              </section>

              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  8. Children's Privacy
                </h2>
                <p className="text-white leading-relaxed">
                  Fount is not intended for use by children under the age of 13.
                  We do not knowingly collect personal information from children
                  under 13. If you believe we have inadvertently collected such
                  information, please contact us immediately.
                </p>
              </section>

              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  9. International Users
                </h2>
                <p className="text-white leading-relaxed">
                  Fount is designed for use worldwide. Since your data is stored
                  locally on your device, international data transfer regulations
                  primarily apply only when you choose to use cloud-based AI
                  services, which are subject to their own privacy policies and
                  data handling practices.
                </p>
              </section>

              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  10. Changes to This Privacy Policy
                </h2>
                <p className="text-white leading-relaxed">
                  We may update this Privacy Policy from time to time. We will
                  notify you of any material changes by posting the new Privacy
                  Policy in the application and updating the "Last Updated"
                  date. Your continued use of Fount after such changes
                  constitutes acceptance of the updated policy.
                </p>
              </section>

              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  11. Contact Us
                </h2>
                <p className="text-white leading-relaxed">
                  If you have any questions about this Privacy Policy or our
                  privacy practices, please contact us at:
                </p>
                <p className="text-white leading-relaxed mt-4">
                  Email: hello@fount.ai
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
