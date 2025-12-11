import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Hero from "../components/Hero";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getPlatform, getPlatformDisplayName } from "../utils/platform";
// import { AnthropicIcon } from "../svgs/AnthropicIcon";
// import { OpenAiIcon } from "../svgs/OpenAiIcon";
// import { XAIIcon } from "../svgs/XAIIcon";
// import { GeminiIcon } from "../svgs/GeminiIcon";
// import { DeepSeekIcon } from "../svgs/DeepSeekIcon";
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
        <div className="mx-auto relative z-10 flex flex-col items-start min-h-screen pt-[10vh]">
          <div className="flex flex-col items-start mb-4 px-4 sm:px-8 lg:px-24">
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
            <img src="/hero2.svg" alt="Fount" className="w-full px-6 h-auto" />
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
      </div>

      <Footer />
    </div>
  );
}
