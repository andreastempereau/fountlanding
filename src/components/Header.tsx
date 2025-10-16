import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Menu, X, User } from 'lucide-react';
import { isAuthenticated } from '../utils/tokenStorage';

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Header({ mobileMenuOpen, setMobileMenuOpen }: HeaderProps) {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  const handleAccountClick = () => {
    if (authenticated) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Fount</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a>
            <a href="#privacy" className="text-slate-300 hover:text-white transition-colors">Privacy</a>
            <a href="#enterprise" className="text-slate-300 hover:text-white transition-colors">Enterprise</a>
            <a href="#early-access" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              Early Access
            </a>
            <button
              onClick={handleAccountClick}
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Account</span>
            </button>
          </nav>

          <button 
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800">
          <div className="px-4 py-4 space-y-4">
            <a href="#features" className="block text-slate-300 hover:text-white transition-colors">Features</a>
            <a href="#privacy" className="block text-slate-300 hover:text-white transition-colors">Privacy</a>
            <a href="#enterprise" className="block text-slate-300 hover:text-white transition-colors">Enterprise</a>
            <a href="#early-access" className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-center">
              Early Access
            </a>
            <button
              onClick={handleAccountClick}
              className="w-full flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Account</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}