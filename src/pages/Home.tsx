import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Users, Building } from 'lucide-react';
import Chatbot from '../components/Chatbot';

const Home: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#00FF8F' }} className="min-h-screen">
      <Chatbot />
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 leading-tight">
                We help the unheard.
              </h1>
              <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed">
                AidBridge connects those who care with those who can't speak.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Link
                to="/help-request"
                className="btn-primary w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-red-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
              >
                <Heart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Need Help?
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/volunteer"
                  className="btn-secondary inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Want to be a Volunteer
                </Link>

                <Link
                  to="/ngo-login"
                  className="btn-secondary inline-flex items-center justify-center px-6 py-3 bg-purple-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <Building className="w-5 h-5 mr-2" />
                  Register as an NGO
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="hero-image relative">
              <img
                src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Animals in nature - representing those who need our help"
                className="w-full max-w-md lg:max-w-lg h-80 lg:h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How We Bridge the Gap</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Connecting compassionate hearts with animals and communities that need immediate assistance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-red-50 border-2 border-red-100">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Emergency Help</h3>
              <p className="text-gray-600">Quick response system for urgent animal rescue and care situations</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-blue-50 border-2 border-blue-100">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Volunteer Network</h3>
              <p className="text-gray-600">Community of caring volunteers ready to help on ground or through funding</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-purple-50 border-2 border-purple-100">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">NGO Partnership</h3>
              <p className="text-gray-600">Verified organizations working together for maximum impact</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;