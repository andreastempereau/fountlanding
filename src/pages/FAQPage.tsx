import { useEffect, useState } from "react";
import Header from "../components/Header";

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
      question: "What is Fount?",
      answer:
        "Fount is a personal AI workspace designed to keep your private thoughts secure. It combines powerful AI capabilities with privacy-first design, allowing you to work with AI models while keeping your data on your device.",
    },
    {
      question: "How does Fount protect my privacy?",
      answer:
        "Your data stays on your device. Fount doesn't use cloud storage or track your usage. You have full control over your information, and you can choose to use local models, verifiably private models, or cloud providers based on your privacy needs.",
    },
    {
      question: "What AI models can I use with Fount?",
      answer:
        "Fount supports multiple AI models including cloud providers (Anthropic, OpenAI, xAI, Google Gemini), verifiably private models (DeepSeek R1, DeepSeek V3.1 Terminus, GPT-OSS 120B), and local models (coming soon). You can switch between them based on your needs.",
    },
    {
      question: "What platforms does Fount support?",
      answer:
        "Fount is available for macOS, Windows, and Linux. You can download the appropriate version for your operating system from our Download page.",
    },
    {
      question: "Is Fount free to use?",
      answer:
        "Fount offers both free and premium plans. Check our Pricing page for detailed information about features available in each tier.",
    },
    {
      question: "Can I use Fount offline?",
      answer:
        "Yes! When using local models (coming soon), you'll be able to use Fount completely offline. Even with cloud providers, your documents and data remain stored locally on your device.",
    },
    {
      question: "What file types does Fount support?",
      answer:
        "Fount supports PDFs, Markdown files, and webpages. You can highlight and extract specific sections from these documents for context-aware AI interactions.",
    },
    {
      question: "How do I get started with Fount?",
      answer:
        "Simply download Fount for your platform, create an account, and you're ready to go! You can start adding documents, selecting context, and chatting with AI models right away.",
    },
  ];

  const toggleQuestion = (index: number) => {
    setOpenQuestionIndex(openQuestionIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen">
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
        <div className="max-w-[1400px] mx-auto relative z-10 px-24 py-16">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1
              className="text-6xl italic text-[var(--dark)] mb-6"
              style={{ lineHeight: "1.2" }}
            >
              Frequently Asked Questions
            </h1>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4 max-w-4xl mx-auto">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 overflow-hidden transition-all hover:shadow-lg"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center transition-all"
                  style={{ color: "var(--dark)" }}
                >
                  <h3 className="text-2xl font-medium pr-8">{faq.question}</h3>
                  <svg
                    className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${
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
                  <div className="px-8 pb-6">
                    <p className="text-lg text-white leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center">
            <div className="inline-block px-8 py-6 rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600">
              <h3 className="text-2xl font-medium mb-3 text-[var(--dark)]">
                Still have questions?
              </h3>
              <p className="text-lg text-white mb-4">
                Join our community for support and discussions
              </p>
              <a
                href="https://discord.gg/h6JY84yZvU"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 text-lg font-semibold rounded-lg transition-all hover:opacity-80"
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
    </div>
  );
}
