import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Hero from "../components/Hero";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getPlatform, getPlatformDisplayName } from "../utils/platform";
import { AnthropicIcon } from "../svgs/AnthropicIcon";
import { OpenAiIcon } from "../svgs/OpenAiIcon";
import { XAIIcon } from "../svgs/XAIIcon";
import { GeminiIcon } from "../svgs/GeminiIcon";
import { DeepSeekIcon } from "../svgs/DeepSeekIcon";
// import ImageCarousel from "../components/ImageCarousel";
// import ProblemSection from "../components/ProblemSection";
// import FeaturesSection from "../components/FeaturesSection";
// import EnterpriseSection from "../components/EnterpriseSection";
// import EarlyAccessSection from "../components/EarlyAccessSection";
// import ProductShowcase from "../components/ProductShowcase";

export default function LandingPage() {
  const [platform, setPlatform] = useState<string>("MacOS");
  const navigate = useNavigate();

  useEffect(() => {
    // Add animation-ready class after component mounts
    // document.body.classList.add("animation-ready");
    document.body.classList.add("twilight");

    // Detect platform
    const detectedPlatform = getPlatform();
    setPlatform(getPlatformDisplayName(detectedPlatform));

    // Cleanup on unmount
    return () => {
      // document.body.classList.remove("animation-ready");
      document.body.classList.remove("twilight");
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Simplified background - removed CPU-intensive animations */}
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
      <Header mobileMenuOpen={false} setMobileMenuOpen={() => {}} />
      <div className="w-full relative">
        {/* Content */}
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-start min-h-screen px-4 sm:px-8 lg:px-24 pt-[10vh]">
          <div className="flex flex-col items-start mb-12">
            <h1
              className="text-4xl sm:text-6xl lg:text-8xl italic text-[var(--dark)]"
              style={{ lineHeight: "1.2" }}
            >
              Stay Curious
            </h1>
            <p
              className="text-base sm:text-lg lg:text-xl mt-4 sm:mt-6"
              style={{
                color: "var(--dark)",
              }}
            >
              Your private AI workspace—context-aware, completely secure.
            </p>
            <button
              className="mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg transition-all hover:opacity-80"
              style={{
                backgroundColor: "var(--dark)",
                color: "var(--light)",
              }}
              onClick={() => navigate("/download")}
            >
              Get Fount for {platform}
            </button>
          </div>
          <div className="flex-shrink-0 w-full">
            <img
              src="/hero.svg"
              alt="Fount"
              className="w-full max-w-[1000px] h-auto"
            />
          </div>
        </div>

        {/* Principles Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-24 relative z-10 py-16">
          <div className="mx-auto">
            <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-8 lg:gap-0">
              <div className="flex flex-col flex-1 w-full">
                <div className="text-left">
                  <h3
                    className="text-xl sm:text-2xl font-medium mb-3 sm:mb-4"
                    style={{ color: "var(--dark)" }}
                  >
                    Your Data, Your Device
                  </h3>
                  <p
                    className="text-base sm:text-lg"
                    style={{ color: "var(--dark)" }}
                  >
                    Your workspace, files, and notes never leave your device.
                  </p>
                </div>

                <hr className="my-6 sm:my-8 border-t border-[color:var(--dark)]/20 w-4/5 self-start" />

                <div className="text-left">
                  <h3
                    className="text-xl sm:text-2xl font-medium mb-3 sm:mb-4"
                    style={{ color: "var(--dark)" }}
                  >
                    Total Privacy Control
                  </h3>
                  <p
                    className="text-base sm:text-lg"
                    style={{ color: "var(--dark)" }}
                  >
                    Choose proprietary models when you want power, private
                    models when you need confidentiality.
                  </p>
                </div>

                <hr className="my-6 sm:my-8 border-t border-[color:var(--dark)]/20 w-4/5 self-start" />

                <div className="text-left">
                  <h3
                    className="text-xl sm:text-2xl font-medium mb-3 sm:mb-4"
                    style={{ color: "var(--dark)" }}
                  >
                    Context-Aware Intelligence
                  </h3>
                  <p
                    className="text-base sm:text-lg"
                    style={{ color: "var(--dark)" }}
                  >
                    Reference any document, get cited answers, build on past
                    conversations.
                  </p>
                </div>
              </div>
              <div className="hidden lg:flex flex-shrink-0 lg:ml-12 w-full sm:w-auto justify-center lg:justify-end">
                <img
                  src="/app-logo-5.svg"
                  alt="Fount"
                  className="w-full max-w-[250px] sm:max-w-[350px] h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Supported Models Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-24 relative z-10 py-16">
          <div className="w-full text-center">
            <h3 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 text-[var(--dark)]">
              Supported Models
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Section 1: Cloud Providers */}
            <div className="flex flex-col bg-slate-900 border border-slate-600 rounded-lg p-6">
              <h3
                className="text-2xl font-medium mb-6"
                style={{ color: "var(--dark)" }}
              >
                Cloud Providers
              </h3>
              <div className="flex flex-row gap-6 mb-6 items-center">
                <AnthropicIcon size="40" color="var(--dark)" />
                <OpenAiIcon size="40" color="var(--dark)" />
                <XAIIcon size="40" color="var(--dark)" />
                <GeminiIcon size="40" color="var(--dark)" />
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2">
                  <span style={{ color: "var(--dark)" }}>✓</span>
                  <p className="text-base" style={{ color: "var(--dark)" }}>
                    Top models from AI labs
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span style={{ color: "var(--dark)" }}>X</span>
                  <p className="text-base" style={{ color: "var(--dark)" }}>
                    Your conversations are not protected
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2: Verifiably Private Models */}
            <div className="flex flex-col bg-slate-900 border border-slate-600 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3
                  className="text-2xl font-medium"
                  style={{ color: "var(--dark)" }}
                >
                  Verifiably Private
                </h3>
                <a
                  href="https://tinfoil.sh/technology"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm underline hover:opacity-80 transition-opacity"
                  style={{ color: "var(--dark)" }}
                >
                  Learn More
                </a>
              </div>
              <div className="flex flex-col gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <DeepSeekIcon size="24" color="var(--dark)" />
                  <p className="text-base" style={{ color: "var(--dark)" }}>
                    DeepSeek R1
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <DeepSeekIcon size="24" color="var(--dark)" />
                  <p className="text-base" style={{ color: "var(--dark)" }}>
                    DeepSeek V3.1 Terminus
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <OpenAiIcon size="24" color="var(--dark)" />
                  <span
                    className="text-base font-medium"
                    style={{ color: "var(--dark)" }}
                  >
                    GPT-OSS 120B
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2">
                  <span style={{ color: "var(--dark)" }}>✓</span>
                  <p className="text-base" style={{ color: "var(--dark)" }}>
                    Latest open-source models
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span style={{ color: "var(--dark)" }}>✓</span>
                  <p className="text-base" style={{ color: "var(--dark)" }}>
                    Your conversations remain confidential
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3: Local Models */}
            <div className="flex flex-col bg-slate-900 border border-slate-600 rounded-lg p-6">
              <h3
                className="text-2xl font-medium mb-6"
                style={{ color: "var(--dark)" }}
              >
                Local Models
                <span className="text-base font-normal ml-2">
                  (Coming Soon)
                </span>
              </h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2">
                  <span style={{ color: "var(--dark)" }}>✓</span>
                  <p className="text-base" style={{ color: "var(--dark)" }}>
                    Local open-source models
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span style={{ color: "var(--dark)" }}>✓</span>
                  <p className="text-base" style={{ color: "var(--dark)" }}>
                    Your conversations remain confidential
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Context Selection */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-24 relative z-10 py-16">
          <div className="flex flex-col items-start gap-8 sm:gap-12">
            <div className="w-full text-center">
              <h3 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-[var(--dark)]">
                Granular Context Selection
              </h3>
              <p className="text-base sm:text-lg text-white">
                Select and highlight exactly what you need across different
                content types
              </p>
            </div>

            {/* Grid Layout */}
            <div className="flex flex-col gap-8 w-full">
              {/* Top Row: PDF and Markdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* PDF Section */}
                <div className="flex flex-col gap-4 p-6 rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-2xl font-semibold text-[var(--dark)]">
                      PDFs
                    </h4>
                  </div>
                  <p className="text-white mb-4">
                    Highlight and extract specific sections from PDF documents
                    with precision
                  </p>
                  <div className="flex flex-col gap-3">
                    <img
                      src="/context-1.png"
                      alt="PDF context selection"
                      className="w-full h-auto rounded-md shadow-md"
                    />
                    <img
                      src="/context-2.png"
                      alt="PDF highlighting"
                      className="w-full h-auto rounded-md shadow-md"
                    />
                  </div>
                </div>

                {/* Markdown Section */}
                <div className="flex flex-col gap-4 p-6 rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-2xl font-semibold text-[var(--dark)]">
                      Markdown
                    </h4>
                  </div>
                  <p className="text-white mb-4">
                    Work seamlessly with markdown files and formatted text
                    content
                  </p>
                  <img
                    src="/fount-markdown.png"
                    alt="Markdown context selection"
                    className="w-full h-auto rounded-md shadow-md"
                  />
                </div>
              </div>

              {/* Bottom Row: Webpages (Full Width) */}
              <div className="flex flex-col gap-4 p-6 rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-semibold text-[var(--dark)]">
                    Webpages
                  </h4>
                </div>
                <p className="text-white mb-4">
                  Capture relevant content from any webpage with intelligent
                  selection
                </p>
                <img
                  src="/html-drop.png"
                  alt="Webpage context selection"
                  className="w-full h-auto rounded-md shadow-md"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Web Link Conversion Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-24 relative z-10 py-16">
          <div className="flex flex-col items-start gap-8 sm:gap-12">
            <div className="w-full text-center">
              <h3 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-[var(--dark)]">
                Convert Links to Local Webpages
              </h3>
              <p className="text-base sm:text-lg text-white">
                Transform any web link into a locally stored, searchable webpage
              </p>
            </div>

            <div className="flex flex-col gap-4 p-4 sm:p-6 rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 hover:shadow-lg transition-shadow w-full">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
                <h4 className="text-xl sm:text-2xl font-semibold text-[var(--dark)]">
                  Link Conversion
                </h4>
              </div>
              <p className="text-white mb-4 text-sm sm:text-base">
                Paste any URL and instantly convert it to a local webpage
                format, preserving content and structure
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                <img
                  src="/html-original.png"
                  alt="Original webpage"
                  className="w-full sm:w-1/2 h-auto rounded-md shadow-md"
                />
                <img
                  src="/html-converted.png"
                  alt="Converted webpage"
                  className="w-full sm:w-1/2 h-auto rounded-md shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
