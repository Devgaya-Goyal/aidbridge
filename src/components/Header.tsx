import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-400 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-800">AIDBRIDGE</span>
              <span className="text-xs text-gray-600">Bridging help together</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-teal-600 bg-teal-50' 
                  : 'text-gray-700 hover:text-teal-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/help-request"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/help-request') 
                  ? 'text-red-600 bg-red-50' 
                  : 'text-gray-700 hover:text-red-600'
              }`}
            >
              Get Help
            </Link>
            <Link
              to="/volunteer"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/volunteer') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Volunteer
            </Link>
            <Link
              to="/ngo-login"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/ngo-login') 
                  ? 'text-orange-600 bg-orange-50' 
                  : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              NGO
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-gray-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;