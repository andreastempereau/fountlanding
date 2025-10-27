import { useEffect } from "react";
// import Hero from "../components/Hero";
import Header from "../components/Header";
// import ImageCarousel from "../components/ImageCarousel";
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

        {/* Inline Citations Section */}
        <div className="max-w-[1400px] mx-auto px-24 relative z-10 py-16">
          <div className="flex flex-col items-start gap-8">
            <div className="flex-1">
              <h3 className="text-3xl font-semibold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Grounded Responses with Citations Linked to Your Documents
              </h3>
              <p
                className="text-lg"
                style={{
                  color: "var(--dark)",
                }}
              >
                Get grounded responses with inline citations that link directly
                to your documents. See exactly where information comes from with
                highlighted references.
              </p>
            </div>
            <img
              src="/fount-citations.png"
              alt="Fount"
              className="w-[1000px] h-auto"
            />
          </div>
        </div>

        {/* Web Link Conversion Section */}
        <div className="max-w-[1400px] mx-auto px-24 relative z-10 py-16">
          <div className="flex flex-col items-start gap-8">
            <div className="flex-1">
              <h3 className="text-3xl font-semibold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Convert Links to Local Webpages
              </h3>
              <p
                className="text-lg"
                style={{
                  color: "var(--dark)",
                }}
              >
                Seamlessly convert web links into locally stored webpages. View
                and query your saved content with the same powerful
                context-aware capabilities.
              </p>
            </div>
            <div className="flex flex-row items-start gap-8">
              <img
                src="/html-original.png"
                alt="Fount"
                className="w-1/2 h-auto"
              />
              <img
                src="/html-converted.png"
                alt="Fount"
                className="w-1/2 h-auto"
              />
            </div>
          </div>
        </div>

        {/* Context Selection */}
        <div className="max-w-[1400px] mx-auto px-24 relative z-10 py-16">
          <div className="flex flex-col items-start gap-12">
            <div className="flex-1 ">
              <h3 className="text-3xl font-semibold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Powerful Context Selection across PDFs, Markdown files, and
                Webpages
              </h3>
              <p
                className="text-lg"
                style={{
                  color: "var(--dark)",
                }}
              >
                Work with PDFs, markdown documents, and webpages as rich context
                sources. Query across multiple document types with intelligent
                search and retrieval.
              </p>
            </div>
            <div className="flex-1 flex flex-col gap-20">
              <div className="flex flex-row gap-10">
                <img
                  src="/context-1.png"
                  alt="Fount"
                  className=" w-1/3 h-auto"
                />
                <img
                  src="/context-2.png"
                  alt="Fount"
                  className="w-2/3 h-auto"
                />
              </div>

              <img src="/context-3.png" alt="Fount" className=" h-auto" />
            </div>
          </div>
        </div>

        {/* Verifiably Private AI Section */}
        <div className="max-w-[1400px] mx-auto px-24 relative z-10 py-16">
          <div className="text-center">
            <p
              className="text-lg"
              style={{
                color: "var(--dark)",
              }}
            >
              Support for verifiably private AI,{" "}
              <a
                href="https://securetee.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline transition-colors"
              >
                learn more
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
