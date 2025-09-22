import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import FeaturesSection from './components/FeaturesSection';
import EnterpriseSection from './components/EnterpriseSection';
import EarlyAccessSection from './components/EarlyAccessSection';
import ProductShowcase from './components/ProductShowcase';
import Footer from './components/Footer';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900">
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <main>
        <Hero />
        <ProblemSection />
        <FeaturesSection />
        <ProductShowcase />
        <EnterpriseSection />
        <EarlyAccessSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;