import React from 'react';
import { FileText, Link, Search, Cpu, Users, Layers } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: FileText,
      title: 'Wikilink-Enhanced Markdown',
      description: 'Structure knowledge with interconnected markdown files that create semantic relationships between your documents, PDFs, and images.',
      color: 'blue'
    },
    {
      icon: Search,
      title: 'Intelligent Search & Retrieval',
      description: 'Full-text and semantic search powered by local SQLite and LanceDB, with Apple OCR integration for comprehensive document processing.',
      color: 'green'
    },
    {
      icon: Cpu,
      title: 'Model-Agnostic Interface',
      description: 'Use your own API keys or connect to cloud infrastructure with TEEs for private inference with models like DeepSeek-R1 and OpenAI.',
      color: 'purple'
    },
    {
      icon: Layers,
      title: 'Context Knowledge Bases',
      description: 'Build comprehensive context for both yourself and LLMs, creating exportable knowledge bases that grow with your work.',
      color: 'orange'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Collaborate on knowledge bases while maintaining privacy, with granular control over what gets shared and how.',
      color: 'teal'
    },
    {
      icon: Link,
      title: 'Local-First Architecture',
      description: 'Every conversation, memory file, and embedding stored locally on your device. Your data never leaves your control.',
      color: 'indigo'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      orange: 'from-orange-500 to-orange-600',
      teal: 'from-teal-500 to-teal-600',
      indigo: 'from-indigo-500 to-indigo-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section id="features" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Built for Knowledge Work
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Every feature designed to enhance how teams and individuals work with AI 
            while maintaining complete control over their data.
          </p>
        </div>

        {/* Full-width product roadmap showcase */}
        <div className="mb-16">
          <div className="relative w-full">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10"></div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative overflow-hidden border-t border-slate-700 shadow-2xl">
                <img 
                  src="/fount2.png"
                  alt="Fount product roadmap showing development phases and feature timeline"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 hover:border-slate-600 transition-all group">
              <div className={`w-12 h-12 bg-gradient-to-r ${getColorClasses(feature.color)} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-4">
                {feature.title}
              </h3>
              
              <p className="text-slate-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}