import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Linkedin, User, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer style={{ backgroundColor: '#2f4f4f' }} className="text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4 text-white">AIDBRIDGE</h3>
            <p className="text-sm leading-relaxed mb-4">
              With those who can't speak — The bridge you never had for help. 
              Connecting compassionate volunteers with animals and communities in need.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-md font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-sm hover:text-teal-400 transition-colors flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm hover:text-teal-400 transition-colors flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  User Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-md font-semibold mb-4 text-white">Contact Info</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="mailto:devagyagoyal7564@gmail.com" 
                  className="text-sm hover:text-teal-400 transition-colors flex items-center"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  devagyagoyal7564@gmail.com
                </a>
              </li>
              <li>
                <a 
                  href="https://linkedin.com/in/aidbridge" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm hover:text-teal-400 transition-colors flex items-center"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn Profile
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © 2025 AIDBRIDGE. All rights reserved. Made with ❤️ for those who can't speak.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;