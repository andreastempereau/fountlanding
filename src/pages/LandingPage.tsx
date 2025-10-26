import { useEffect } from "react";
// import Hero from "../components/Hero";
import Header from "../components/Header";
// import ProblemSection from "../components/ProblemSection";
// import FeaturesSection from "../components/FeaturesSection";
// import EnterpriseSection from "../components/EnterpriseSection";
// import EarlyAccessSection from "../components/EarlyAccessSection";
// import ProductShowcase from "../components/ProductShowcase";
// import Footer from "../components/Footer";

export default function LandingPage() {
  useEffect(() => {
    // Add animation-ready class after component mounts
    document.body.classList.add("animation-ready");

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("animation-ready");
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
        <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col items-start min-h-screen px-24 pt-[10vh]">
          <div className="flex flex-col items-start mb-12">
            <h1
              className="text-8xl italic bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
              style={{ lineHeight: "1.2" }}
            >
              Stay Curious
            </h1>
            <p
              className="text-xl mt-6"
              style={{
                color: "var(--dark)",
              }}
            >
              The personal AI workspace for your private thoughts
            </p>
            <button
              className="mt-8 px-8 py-4 text-lg font-semibold rounded-lg transition-all hover:opacity-80"
              style={{
                backgroundColor: "var(--dark)",
                color: "var(--light)",
              }}
            >
              Get Fount on MacOS
            </button>
          </div>
          <div className="flex-shrink-0">
            <img src="/fount11.png" alt="Fount" className="w-[1000px] h-auto" />
          </div>
        </div>

        {/* Principles Section */}
        <div className="max-w-[1400px] mx-auto px-24 relative z-10 py-16">
          <div className="mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-8 flex-1">
                <div className="text-left">
                  <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Privacy of Mind
                  </h3>
                  <p
                    className="text-lg"
                    style={{
                      color: "var(--dark)",
                    }}
                  >
                    All conversations, embeddings, and memories are stored
                    locally.
                  </p>
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Model-Agnostic
                  </h3>
                  <p
                    className="text-lg"
                    style={{
                      color: "var(--dark)",
                    }}
                  >
                    Fount supports TEE protected LLM models, local models, or
                    cloud models.
                  </p>
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Context-aware Personalization
                  </h3>
                  <p
                    className="text-lg"
                    style={{
                      color: "var(--dark)",
                    }}
                  >
                    Fount enables powerful, context-aware queries over your
                    personal documents.
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0 ml-12">
                <img
                  src="/app-logo-5.svg"
                  alt="Fount"
                  className="w-[350px] h-auto"
                />
                <h2 className="text-center mt-2 text-3xl text-gray-700">
                  Download Now
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
