import React from 'react';
import { ArrowRight, Database, Shield, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center pb-16">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              A Fully-Private AI Workspace 
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                {" "}
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-4xl mx-auto">
              A project-oriented, end-to-end private AI markdown workspace that combines the power of 
              Cursor, Obsidian, and NotebookLLM. Build context-rich knowledge bases with complete data sovereignty.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all flex items-center justify-center group">
                Join the Waitlist
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all">
                View Demo
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 text-center max-w-md mx-auto">
              <div>
                <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-sm text-slate-400">100% Local</div>
              </div>
              <div>
                <Database className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-sm text-slate-400">Zero Data Exposure</div>
              </div>
              <div>
                <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-sm text-slate-400">Model Agnostic</div>
              </div>
            </div>

        </div>
      </div>
      
      {/* Full-screen hero image */}
      <div className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10"></div>
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <div className="relative overflow-hidden border-t border-slate-700 shadow-2xl">
            <img 
              src="/fount1.png"
              alt="Fount workspace interface showing structured analysis with executive summary and due diligence scorecard"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}