import React from 'react';
import { AlertTriangle, Lock, FileX } from 'lucide-react';

export default function ProblemSection() {
  return (
    <section className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            The Reality of AI
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Organizations and individuals face real barriers to AI adoption.
            Here's what our customers say.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Data Exposure Risk</h3>
                  <p className="text-slate-300">
                    "I think we're using a lot of AI but not for sensitive data yet because there's no guardrails... 
                    protection in the financial industry is paramount."
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileX className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Lost Context</h3>
                  <p className="text-slate-300">
                    Individuals get lost in browser-based chats and cannot reliably track what data 
                    has been uploaded or maintain context across sessions.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">No True Privacy</h3>
                  <p className="text-slate-300">
                    "We'd like to use it more... but the sensitive-data part of it is crucial. 
                    I don't know the hack around that yet."
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-slate-900 rounded-2xl p-8 border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-6">The Current Landscape</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-slate-800 rounded-lg">
                  <span className="text-slate-300">Local Runtimes</span>
                  <span className="text-red-400 text-sm">No governance or audit</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-slate-800 rounded-lg">
                  <span className="text-slate-300">Governance Suites</span>
                  <span className="text-red-400 text-sm">Cloud dashboards only</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-slate-800 rounded-lg">
                  <span className="text-slate-300">Cloud Copilots</span>
                  <span className="text-red-400 text-sm">Data leaves perimeter</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-slate-800 rounded-lg">
                  <span className="text-slate-300">Obsidian Copilot</span>
                  <span className="text-red-400 text-sm">Limited by closed-source</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">Fount</span>
                  <span className="text-green-400 text-sm">Complete solution</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}