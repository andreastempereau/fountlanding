import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function FAQPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    document.body.classList.add("twilight");

    return () => {
      document.body.classList.remove("twilight");
    };
  }, []);

  const faqData = [
    {
      question: "How does Fount protect my privacy?",
      answer:
        "Fount is privacy-first by design. We only store email addresses for account verification if you sign up for a subscription. You maintain complete control over your information. You can choose your AI model based on your specific privacy requirements; run models locally on your device, use verifiably private models through Tinfoil, or connect to cloud providers!",
    },
    {
      question: "Is Fount free to use?",
      answer:
        "Yes! Users can download the application and use their own api keys.",
    },
  ];

  const toggleQuestion = (index: number) => {
    setOpenQuestionIndex(openQuestionIndex === index ? null : index);
  };

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
        {/* FAQ Content */}
        <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-8 lg:px-24 py-12 sm:py-16">
          {/* Header */}
          <div className="mb-12 sm:mb-16 text-center">
            <h1
              className="text-3xl sm:text-5xl lg:text-6xl italic text-[var(--dark)] mb-4 sm:mb-6 px-4"
              style={{ lineHeight: "1.2" }}
            >
              Frequently Asked Questions
            </h1>
          </div>

          {/* FAQ Items */}
          <div className="space-y-3 sm:space-y-4 max-w-4xl mx-auto">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 overflow-hidden transition-all hover:shadow-lg"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 text-left flex justify-between items-center transition-all"
                  style={{ color: "var(--dark)" }}
                >
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-medium pr-4 sm:pr-8">{faq.question}</h3>
                  <svg
                    className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 transition-transform duration-300 ${
                      openQuestionIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openQuestionIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6">
                    <p className="text-base sm:text-lg text-white leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-12 sm:mt-16 text-center px-4">
            <div className="inline-block px-4 sm:px-6 lg:px-8 py-4 sm:py-6 rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 max-w-2xl">
              <h3 className="text-xl sm:text-2xl font-medium mb-2 sm:mb-3 text-[var(--dark)]">
                Still have questions?
              </h3>
              <p className="text-base sm:text-lg text-white mb-3 sm:mb-4">
                Join our community for support and discussions
              </p>
              <a
                href="https://discord.gg/h6JY84yZvU"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-semibold rounded-lg transition-all hover:opacity-80"
                style={{
                  backgroundColor: "var(--dark)",
                  color: "var(--light)",
                }}
              >
                Join Discord Community
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
