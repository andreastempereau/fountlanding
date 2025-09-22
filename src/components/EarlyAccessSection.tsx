import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';

export default function EarlyAccessSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // Here you would typically send the email to your backend
    }
  };

  return (
    <section id="early-access" className="py-20 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join the Private Beta
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Be among the first to experience truly private AI workspace. 
            We're launching to select organizations and individuals this month.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all flex items-center justify-center group"
              >
                Join Waitlist
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        ) : (
          <div className="max-w-lg mx-auto bg-green-500/10 border border-green-500/20 rounded-lg p-8">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">You're on the list!</h3>
            <p className="text-slate-300">
              We'll reach out soon with early access details and updates on our progress.
            </p>
          </div>
        )}

        <div className="mt-12 grid sm:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-2xl font-bold text-white mb-2">Q1 2026</div>
            <div className="text-slate-400">Public Beta Launch</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white mb-2">100%</div>
            <div className="text-slate-400">Local Data Control</div>
          </div>
        </div>
      </div>
    </section>
  );
}