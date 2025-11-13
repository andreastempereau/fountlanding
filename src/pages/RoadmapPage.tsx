import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CheckCircle2, Clock } from "lucide-react";

export default function RoadmapPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add("twilight");

    return () => {
      document.body.classList.remove("twilight");
    };
  }, []);

  const roadmapItems = [
    {
      title: "EPUB Support",
      description:
        "Read and annotate EPUB files directly within Fount. Take notes, highlight passages, and discuss your reading with AI.",
      status: "upcoming",
    },
    {
      title: "Memory Feature",
      description:
        "Persistent memory across conversations. Fount will remember your preferences, context, and important details from past interactions.",
      status: "upcoming",
    },
    {
      title: "Ask Tool",
      description:
        "Enhanced query capabilities with specialized tools for research, analysis, and information retrieval.",
      status: "upcoming",
    },
    {
      title: "Local Web Search",
      description:
        "Search the web privately through local processing. Get up-to-date information without compromising your privacy.",
      status: "upcoming",
    },
    {
      title: "LM Studio Integration",
      description:
        "Seamlessly connect with LM Studio to run local language models. Complete privacy with powerful AI capabilities on your own hardware.",
      status: "upcoming",
    },
    {
      title: "Excalidraw Support",
      description:
        "Create and edit diagrams, sketches, and visual ideas directly in Fount. Collaborate with AI on visual thinking and brainstorming.",
      status: "upcoming",
    },
  ];

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
        {/* Roadmap Content */}
        <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-8 lg:px-24 py-12 sm:py-16">
          {/* Header */}
          <div className="mb-12 sm:mb-16 text-center">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl italic text-[var(--dark)] mb-4 sm:mb-6"
              style={{ lineHeight: "1.2" }}
            >
              Roadmap
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-white max-w-3xl mx-auto px-4">
              Explore the upcoming features and improvements we're building for
              Fount. Our roadmap is guided by user feedback and our commitment
              to privacy-first AI.
            </p>
          </div>

          {/* Roadmap Items */}
          <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
            {roadmapItems.map((item, index) => (
              <div
                key={index}
                className="rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 p-4 sm:p-6 lg:p-8 transition-all hover:shadow-lg hover:border-slate-500"
              >
                <div className="flex items-start justify-between gap-4 sm:gap-6">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <h3 className="text-xl sm:text-2xl font-medium text-[var(--dark)]">
                        {item.title}
                      </h3>
                      {item.status === "completed" ? (
                        <span className="flex items-center gap-1 px-2 sm:px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs sm:text-sm w-fit">
                          <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          Completed
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 px-2 sm:px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs sm:text-sm w-fit">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          Upcoming
                        </span>
                      )}
                    </div>
                    <p className="text-base sm:text-lg text-white leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Community Section */}
          <div className="mt-12 sm:mt-16 text-center px-4">
            <div className="inline-block px-4 sm:px-6 lg:px-8 py-4 sm:py-6 rounded-lg backdrop-blur-sm bg-slate-900 border border-slate-600 max-w-2xl">
              <h3 className="text-xl sm:text-2xl font-medium mb-2 sm:mb-3 text-[var(--dark)]">
                Have a feature request?
              </h3>
              <p className="text-base sm:text-lg text-white mb-3 sm:mb-4">
                Join our community to share your ideas and vote on upcoming
                features
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
