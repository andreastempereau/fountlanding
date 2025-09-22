import React from 'react';
import { Building2, Shield, Users, TrendingUp } from 'lucide-react';

export default function EnterpriseSection() {
  return (
    <section id="enterprise" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pricing
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Designed specifically for firms and individuals that can't compromise on data security. 
            Get the AI capabilities your team needs without the compliance headaches.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-700">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <Building2 className="w-8 h-8 text-blue-400" />
              <h3 className="text-2xl font-bold text-white">Choose Your Plan</h3>
            </div>

            <div className="space-y-6">
              <div className="border border-slate-600 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-2">Personal</h4>
                <div className="text-3xl font-bold text-white mb-4">Free</div>
                <ul className="space-y-2 text-slate-300">
                  <li>• Cloud Model AI processing</li>
                  <li>• Access to full knowledge base</li>
                  <li>• Personal workspace</li>
                </ul>
              </div>

              <div className="border border-blue-500 rounded-lg p-6 bg-blue-500/10">
                <h4 className="text-lg font-semibold text-white mb-2">Pro</h4>
                <div className="text-3xl font-bold text-white mb-4">$20<span className="text-lg text-slate-400">/month</span></div>
                <ul className="space-y-2 text-slate-300">
                  <li>• Advanced features</li>
                  <li>• Team collaboration</li>
                  <li>• Priority support</li>
                  <li>• TEE cloud processing</li>
                  <li>• Full-private usage</li>
                </ul>
              </div>

              <div className="border border-slate-600 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-2">Enterprise</h4>
                <div className="text-3xl font-bold text-white mb-4">Custom</div>
                 <ul className="space-y-2 text-slate-300">
                  <li>• Additional private interface</li>
                  <li>• 24/7 support</li>
                  <li>• Personalized features</li>
                </ul>
                <button className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg transition-colors mt-4">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}