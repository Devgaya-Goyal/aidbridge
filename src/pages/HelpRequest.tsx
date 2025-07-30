import React, { useState } from 'react';
import { AlertTriangle, Camera, MapPin, Phone, MessageCircle, Shield } from 'lucide-react';

const HelpRequest: React.FC = () => {
  const [formData, setFormData] = useState({
    userName: '',
    location: '',
    landmark: '',
    severity: '',
    photo: null as File | null
  });
  const [submitted, setSubmitted] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setShowChatbot(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, photo: e.target.files![0] }));
    }
  };

  const safetyTips = [
    "Stay calm and keep a safe distance from the animal",
    "Do not attempt to move severely injured animals yourself",
    "Take photos from a safe distance for our volunteers",
    "Provide fresh water if the animal appears dehydrated",
    "Contact local authorities if the situation seems dangerous"
  ];

  if (submitted) {
    return (
      <div style={{ backgroundColor: '#FF6D74' }} className="min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Message */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Help is on the way!</h2>
            <p className="text-gray-600 mb-6">We've received your request and are connecting you with nearby volunteers.</p>
            
            {/* NGO Contact */}
            <div className="bg-blue-50 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center justify-center">
                <Phone className="w-5 h-5 mr-2" />
                Emergency NGO Contact
              </h3>
              <p className="text-2xl font-bold text-blue-600">+1 (555) 123-HELP</p>
              <p className="text-sm text-gray-600">Available 24/7 for urgent cases</p>
            </div>

            {/* Severity-based suggestions */}
            {formData.severity === 'high' && (
              <div className="bg-red-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-red-800 mb-4">Immediate Action Required</h3>
                <div className="space-y-2 text-left">
                  <p className="flex items-center text-red-700">
                    <Phone className="w-4 h-4 mr-2" />
                    Fire Department: 911
                  </p>
                  <p className="flex items-center text-red-700">
                    <Phone className="w-4 h-4 mr-2" />
                    Police: 911
                  </p>
                  <p className="flex items-center text-red-700">
                    <Phone className="w-4 h-4 mr-2" />
                    Animal Control: (555) 123-ANIMAL
                  </p>
                </div>
              </div>
            )}

            {formData.severity === 'low' && (
              <div className="bg-yellow-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">Nearby Vet Clinic</h3>
                <p className="text-yellow-700">City Animal Care Center</p>
                <p className="text-sm text-yellow-600">123 Main Street • (555) 123-VETS</p>
              </div>
            )}
          </div>

          {/* Chatbot */}
          {showChatbot && (
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <div className="flex items-center mb-4">
                <MessageCircle className="w-6 h-6 text-blue-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">Safety Assistant</h3>
              </div>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {safetyTips.map((tip, index) => (
                  <div key={index} className="chatbot-message bg-blue-50 rounded-lg p-3">
                    <p className="text-sm text-gray-700">💡 {tip}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#FF6D74' }} className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Emergency Notice */}
        <div className="emergency-box bg-red-100 border-2 border-red-300 rounded-xl p-6 mb-8 text-center">
          <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
          <h2 className="text-lg font-bold text-red-800 mb-2">Emergency Notice</h2>
          <p className="text-red-700">
            If this is a life-threatening emergency, contact your local police (911) or fire department immediately. 
            Location-based emergency contacts will be displayed here.
          </p>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">Get Immediate Help</h1>
            <p className="text-xl text-white/90 mb-6">
              Report animals or communities in need. Our network of volunteers and NGOs will respond quickly.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Animal rescue"
              className="hero-image w-full max-w-md h-64 object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        {/* Help Request Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Submit Help Request</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Name */}
            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your current location"
                  required
                />
              </div>
              <div>
                <label htmlFor="landmark" className="block text-sm font-medium text-gray-700 mb-2">
                  Nearest Landmark
                </label>
                <input
                  type="text"
                  id="landmark"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nearest landmark or building"
                  required
                />
              </div>
            </div>

            {/* Photo Upload */}
            <div>
              <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-2">
                <Camera className="w-4 h-4 inline mr-1" />
                Take Live Photo
              </label>
              <input
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                This will open your camera to take a photo of the situation
              </p>
            </div>

            {/* Severity */}
            <div>
              <label htmlFor="severity" className="block text-sm font-medium text-gray-700 mb-2">
                Severity Level
              </label>
              <select
                id="severity"
                name="severity"
                value={formData.severity}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select severity level</option>
                <option value="low">Low - Minor assistance needed</option>
                <option value="medium">Medium - Requires attention</option>
                <option value="high">High - Urgent/Critical situation</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-blue-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
            >
              <AlertTriangle className="w-5 h-5 mr-2" />
              Submit Help Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HelpRequest;