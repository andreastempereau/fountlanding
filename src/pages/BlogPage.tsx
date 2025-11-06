import { useEffect, useState } from "react";
import Header from "../components/Header";
import { CiLink } from "react-icons/ci";

interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  content: string;
  excerpt: string;
}

export default function BlogPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  // Blog posts data
  const blogPosts: BlogPost[] = [
    {
      id: "peace-of-mind-with-fount",
      title: "Peace of Mind with Fount",
      author: "Zeke",
      date: "November 6, 2025",
      excerpt:
        "There is this inevitable flywheel in AI that pushes private companies to capture increasingly more of users' private information...",
      content: `There is this inevitable flywheel in AI that pushes private companies to capture increasingly more of users' private information; the more that the model knows about the user and their singular context, the more useful it becomes. AI coding editors have seen such success in part because an entire coding project – the files, user clipboard, recent edits, project specifications, package documentation – are visible to the LLM. Similarly, AI therapists will work better the more they know about you, just like real therapists. It's clear that private companies will offer ever more seductive options for users to upload more of their life. Given no alternative, most users will consent to such an arrangement; after all, who wouldn't want a better product for free? That is the choice we've made up to now, where most users are locked into large data silos and have relinquished control of their data. It's likely that two years from now the bits you create you will not own. Your digital mindscape — your thoughts, goals, fears — will be stored in a remote data silo owned by a private company.

Dovetailing with this is how much large scale semantic analysis of data has improved. Higher quality embeddings, a falling cost of compute, and more powerful agents have led to a world where anyone can analyze hundreds of thousands of words for cents on the dollar. This seems vaguely bad, but why exactly? In this world, the weight of millions of lives rests on faith. A faith in the benevolence not just of those who hold power today, but of those who will follow, and those who will follow them, and those who will follow still. A faith in their adherence to the "common good". But what is the common good? Culture and belief are fickle; a century ago women couldn't vote and segregation laws still existed; what is considered heretical today might be considered gospel tomorrow. Now one can wax philosophical, but there are countless examples we can point to breaches of trust.

That's where Fount comes in, providing a way to leverage the power of AI without the dystopian nightmare of cognitive surveillance. Fount is a simple, AI-enhanced personal workspace that gives users ownership of their data. All processing except for the LLM inference itself is done locally; the context engine, the document processor, and the memory storage. Users can then choose models based on their own privacy requirements.

Stay Curious Friends,
Zeke`,
    },
    // Add more blog posts here
  ];

  const handleCopyLink = () => {
    if (selectedPost) {
      const url = `${window.location.origin}/blog/${selectedPost.id}`;
      navigator.clipboard.writeText(url);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

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
        <div className="max-w-[1440px] mx-auto relative z-10 px-24 pt-[5vh] pb-16">
          {selectedPost ? (
            /* Full Post View */
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="mb-8 px-4 py-2 rounded-lg transition-all hover:opacity-80"
                style={{
                  backgroundColor: "var(--dark)",
                  color: "var(--light)",
                }}
              >
                ← Back to Blog
              </button>

              {/* Post Header */}
              <article className="rounded-lg p-12">
                {/* Title */}
                <h1
                  className="text-5xl font-bold mb-6"
                  style={{ color: "var(--dark)" }}
                >
                  {selectedPost.title}
                </h1>

                {/* Meta Information */}
                <div className="flex items-center gap-6 mb-8 pb-6 border-b border-slate-600">
                  <div className="flex flex-col">
                    <span
                      className="text-sm font-medium"
                      style={{ color: "var(--dark)" }}
                    >
                      Author
                    </span>
                    <span className="text-lg text-white">
                      {selectedPost.author}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span
                      className="text-sm font-medium"
                      style={{ color: "var(--dark)" }}
                    >
                      Published
                    </span>
                    <time className="text-lg text-white">
                      {selectedPost.date}
                    </time>
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className="px-1 py-1 text-base font-semibold rounded-lg transition-all hover:opacity-80"
                    style={{
                      backgroundColor: "var(--dark)",
                      color: "var(--light)",
                    }}
                  >
                    <CiLink className="w-10 h-10" />
                  </button>
                </div>

                {/* Post Content */}
                <div className="prose prose-lg max-w-none">
                  {selectedPost.content
                    .split("\n\n")
                    .map((paragraph, index) => {
                      // Check if it's the signature (last paragraph starting with "Stay Curious")
                      if (paragraph.startsWith("Stay Curious")) {
                        return (
                          <div
                            key={index}
                            className="mt-12 pt-8 border-t border-slate-600 italic text-white"
                          >
                            {paragraph.split("\n").map((line, i) => (
                              <div key={i}>{line}</div>
                            ))}
                          </div>
                        );
                      }
                      // Regular paragraph
                      return (
                        <p
                          key={index}
                          className="text-lg text-white leading-[1.8] mb-6"
                          style={{ textAlign: "justify" }}
                        >
                          {paragraph}
                        </p>
                      );
                    })}
                </div>
              </article>
            </div>
          ) : (
            /* Blog List View */
            <div className="max-w-4xl mx-auto">
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
                {blogPosts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-slate-900 border border-slate-600 rounded-lg p-8 hover:shadow-lg transition-all"
                  >
                    <div className="flex flex-col gap-4">
                      {/* Date */}
                      <time
                        className="text-sm font-medium"
                        style={{ color: "var(--dark)" }}
                      >
                        {post.date}
                      </time>

                      {/* Title */}
                      <h2
                        className="text-3xl font-semibold"
                        style={{ color: "var(--dark)" }}
                      >
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <div className="text-lg text-white leading-relaxed">
                        <p>{post.excerpt}</p>
                      </div>

                      {/* Read More Button */}
                      <div className="mt-4">
                        <button
                          onClick={() => setSelectedPost(post)}
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
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
