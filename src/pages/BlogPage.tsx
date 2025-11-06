import { useEffect, useState } from "react";
import Header from "../components/Header";

export default function BlogPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add("twilight");

    return () => {
      document.body.classList.remove("twilight");
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Background effects */}
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
        <div className="max-w-[1440px] mx-auto relative z-10 px-24 pt-[10vh] pb-16">
          {/* Page Title */}
          <div className="mb-12">
            <h1
              className="text-6xl font-bold mb-4"
              style={{ color: "var(--dark)" }}
            >
              Blog
            </h1>
            <p className="text-xl" style={{ color: "var(--dark)" }}>
              Thoughts and updates from the Fount team
            </p>
          </div>

          {/* Articles Grid */}
          <div className="flex flex-col gap-8">
            {/* Placeholder Article */}
            <article className="bg-slate-900 border border-slate-600 rounded-lg p-8 hover:shadow-lg transition-all">
              <div className="flex flex-col gap-4">
                {/* Date */}
                <time
                  className="text-sm font-medium"
                  style={{ color: "var(--dark)" }}
                >
                  January 15, 2025
                </time>

                {/* Title */}
                <h2
                  className="text-3xl font-semibold"
                  style={{ color: "var(--dark)" }}
                >
                  Introducing Fount: Your Personal AI Workspace
                </h2>

                {/* Excerpt */}
                <p className="text-lg text-white leading-relaxed">
                  We're excited to announce the launch of Fount, a new kind of
                  AI workspace built with privacy at its core. In a world where
                  your conversations and data are constantly being analyzed,
                  Fount gives you complete control over your information while
                  providing access to the most powerful AI models available.
                </p>

                {/* Read More Button */}
                <div className="mt-4">
                  <button
                    className="px-6 py-3 text-base font-semibold rounded-lg transition-all hover:opacity-80"
                    style={{
                      backgroundColor: "var(--dark)",
                      color: "var(--light)",
                    }}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </article>

            <article className="bg-slate-900 border border-slate-600 rounded-lg p-8 hover:shadow-lg transition-all">
              <div className="flex flex-col gap-4">
                {/* Date */}
                <time
                  className="text-sm font-medium"
                  style={{ color: "var(--dark)" }}
                >
                  January 15, 2025
                </time>

                {/* Title */}
                <h2
                  className="text-3xl font-semibold"
                  style={{ color: "var(--dark)" }}
                >
                  Introducing Fount: Your Personal AI Workspace
                </h2>

                {/* Excerpt */}
                <p className="text-lg text-white leading-relaxed">
                  We're excited to announce the launch of Fount, a new kind of
                  AI workspace built with privacy at its core. In a world where
                  your conversations and data are constantly being analyzed,
                  Fount gives you complete control over your information while
                  providing access to the most powerful AI models available.
                </p>

                {/* Read More Button */}
                <div className="mt-4">
                  <button
                    className="px-6 py-3 text-base font-semibold rounded-lg transition-all hover:opacity-80"
                    style={{
                      backgroundColor: "var(--dark)",
                      color: "var(--light)",
                    }}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
