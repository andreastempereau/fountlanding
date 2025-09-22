import React from 'react';
import { FileText, MessageSquare, Search, Layers } from 'lucide-react';

export default function ProductShowcase() {
  return (
    <section className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            See Fount in Action
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Experience how Fount transforms your workflow with intelligent document management, 
            AI-powered analysis, and seamless knowledge building.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <FileText className="w-8 h-8 text-blue-400" />
              <h3 className="text-2xl font-bold text-white">Structured Analysis</h3>
            </div>
            <p className="text-slate-300 mb-6 text-lg">
              Transform complex documents into structured insights with AI-powered analysis. 
              Create executive summaries, due diligence scorecards, and detailed findings 
              from your financial documents and research materials.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-slate-300">Automated executive summaries</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-slate-300">Due diligence scorecards</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-slate-300">Risk assessment frameworks</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-2xl opacity-20"></div>
            <div className="relative overflow-hidden rounded-2xl border border-slate-700 shadow-2xl">
              <img 
                src="/fount5.png"
                alt="Fount structured analysis showing executive summary, due diligence scorecard, and detailed findings"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="lg:order-2">
            <div className="flex items-center space-x-3 mb-6">
              <Layers className="w-8 h-8 text-green-400" />
              <h3 className="text-2xl font-bold text-white">Knowledge Organization</h3>
            </div>
            <p className="text-slate-300 mb-6 text-lg">
              Build comprehensive knowledge bases with interconnected documents, PDFs, and notes. 
              Use wikilinks to create semantic relationships and maintain context across your entire workspace.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-slate-300">Wikilink-enhanced markdown</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-slate-300">Semantic document connections</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-slate-300">Context-aware file organization</span>
              </div>
            </div>
          </div>
          
          <div className="lg:order-1 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl blur-2xl opacity-20"></div>
            <div className="relative overflow-hidden rounded-2xl border border-slate-700 shadow-2xl">
              <img 
                src="/fount3.png"
                alt="Fount file organization system with context search and document management"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <MessageSquare className="w-8 h-8 text-purple-400" />
              <h3 className="text-2xl font-bold text-white">AI-Powered Insights</h3>
            </div>
            <p className="text-slate-300 mb-6 text-lg">
              Interact with your documents through intelligent AI analysis. Get contextual insights, 
              compare different elements, and extract data-driven conclusions from your knowledge base.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-slate-300">Contextual AI conversations</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-slate-300">Document comparison tools</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-slate-300">Data extraction and insights</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-2xl opacity-20"></div>
            <div className="relative overflow-hidden rounded-2xl border border-slate-700 shadow-2xl">
              <img 
                src="/fount4.png"
                alt="Fount AI analysis interface with intelligent content analysis and suggestions"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}