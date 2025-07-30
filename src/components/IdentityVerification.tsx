import React from 'react';
import { Shield, CheckCircle } from 'lucide-react';

const IdentityVerification: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield className="w-10 h-10 text-green-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Verifying identity</h2>
        
        <div className="mb-6">
          <img
            src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt="Verification in progress"
            className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
          />
        </div>
        
        <div className="space-y-4 mb-8">
          <p className="text-gray-600 leading-relaxed">
            We're verifying your identity to ensure the safety and trust of our community. 
            This process helps us maintain a secure environment for both volunteers and those in need.
          </p>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2 text-blue-700">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Email verification completed</span>
            </div>
          </div>
        </div>
        
        <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
          How would you like to help?
        </button>
        
        <div className="mt-4 text-sm text-gray-500">
          This verification process typically takes 24-48 hours
        </div>
      </div>
    </div>
  );
};

export default IdentityVerification; 