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
            <p className="text-lg text-white">Last Updated: January 2025</p>
          </div>

          {/* Terms Content */}
          <div className="prose prose-lg prose-invert max-w-none">
            <div className="space-y-8">
              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="text-white leading-relaxed">
                  By accessing or using Fount ("the Application"), you agree to
                  be bound by these Terms of Service. If you do not agree to
                  these terms, please do not use the Application.
                </p>
              </section>

              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  2. Description of Service
                </h2>
                <p className="text-white leading-relaxed mb-4">
                  Fount is a private AI workspace that provides knowledge
                  management capabilities with local data storage. The
                  Application allows you to:
                </p>
                <ul className="list-disc list-inside text-white space-y-2 ml-4">
                  <li>Store and manage your documents locally on your device</li>
                  <li>Interact with various AI models using your own API keys</li>
                  <li>Process and analyze your documents privately</li>
                  <li>
                    Access optional cloud features when you provide your own
                    credentials
                  </li>
                </ul>
              </section>

              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  3. User Responsibilities
                </h2>
                <p className="text-white leading-relaxed mb-4">
                  You are responsible for:
                </p>
                <ul className="list-disc list-inside text-white space-y-2 ml-4">
                  <li>
                    Maintaining the security of your own API keys and
                    credentials
                  </li>
                  <li>All content you create, store, or process using Fount</li>
                  <li>Backing up your data as needed</li>
                  <li>Compliance with applicable laws and regulations</li>
                  <li>
                    Any costs associated with third-party services (AI model
                    providers)
                  </li>
                </ul>
              </section>

              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  4. Privacy and Data Storage
                </h2>
                <p className="text-white leading-relaxed">
                  Fount is designed with privacy as a core principle. Your data
                  is stored locally on your device by default. When you use
                  third-party AI services, your data may be transmitted to those
                  services according to their respective privacy policies. We do
                  not collect, store, or have access to your documents or
                  conversations unless you explicitly opt-in to cloud features
                  that require such access.
                </p>
              </section>

              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  5. Intellectual Property
                </h2>
                <p className="text-white leading-relaxed">
                  The Fount application, including its design, features, and
                  functionality, is owned by Fount and protected by
                  international copyright, trademark, and other intellectual
                  property laws. You retain all rights to your content and data.
                </p>
              </section>

              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  6. Disclaimer of Warranties
                </h2>
                <p className="text-white leading-relaxed">
                  THE APPLICATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY
                  KIND, EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE
                  APPLICATION WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF
                  VIRUSES OR OTHER HARMFUL COMPONENTS.
                </p>
              </section>

              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  7. Limitation of Liability
                </h2>
                <p className="text-white leading-relaxed">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, FOUNT SHALL NOT BE
                  LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
                  OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES,
                  WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA,
                  USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
                </p>
              </section>

              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  8. Third-Party Services
                </h2>
                <p className="text-white leading-relaxed">
                  Fount integrates with third-party AI model providers. Your use
                  of these services is subject to their respective terms of
                  service and privacy policies. We are not responsible for the
                  performance, availability, or practices of third-party
                  services.
                </p>
              </section>

              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  9. Modifications to Terms
                </h2>
                <p className="text-white leading-relaxed">
                  We reserve the right to modify these Terms of Service at any
                  time. We will notify users of any material changes through the
                  Application or via email. Your continued use of the
                  Application after such modifications constitutes acceptance of
                  the updated terms.
                </p>
              </section>

              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  10. Termination
                </h2>
                <p className="text-white leading-relaxed">
                  You may stop using the Application at any time. We reserve the
                  right to suspend or terminate your access to the Application
                  for violation of these Terms of Service or for any other
                  reason at our discretion.
                </p>
              </section>

              <section className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-8">
                <h2 className="text-3xl font-semibold text-[var(--dark)] mb-4">
                  11. Contact Information
                </h2>
                <p className="text-white leading-relaxed">
                  If you have any questions about these Terms of Service, please
                  contact us at hello@fount.ai
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
