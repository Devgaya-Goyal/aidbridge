import React, { useState } from 'react';
import { Building, Mail, Phone, MapPin, User, Lock, CheckCircle, Clock } from 'lucide-react';
import { authService } from '../services/firebase';
import { useNavigate } from 'react-router-dom';

type FormStep = 'main' | 'login' | 'signup' | 'verification' | 'identity' | 'dashboard';

const NGOLogin: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<FormStep>('main');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    orgName: '',
    founderName: '',
    location: '',
    mobile: '',
    verificationCode: ''
  });
  const [showVolunteerForm, setShowVolunteerForm] = useState(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await authService.loginNGO(formData.email, formData.password);
      
      if (result.success && result.user) {
        // Get NGO data to check if approved
        const ngoData = await authService.getNGOData(result.user.uid);
        
        if (ngoData) {
          if (ngoData.isApproved) {
            setCurrentStep('dashboard');
          } else {
            setError('Your NGO account is pending approval. Please wait for admin verification.');
          }
        } else {
          setError('NGO data not found. Please contact support.');
        }
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const ngoData = {
        orgName: formData.orgName,
        founderName: formData.founderName,
        email: formData.email,
        mobile: formData.mobile,
        location: formData.location
      };

      const result = await authService.registerNGO(formData.email, formData.password, ngoData);
      
      if (result.success) {
        setCurrentStep('verification');
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('identity');
  };

  const handleVolunteerRequest = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Volunteer request submitted successfully! We will connect you with available volunteers.');
    setShowVolunteerForm(false);
  };

  // Show main NGO page (similar to volunteer page)
  if (currentStep === 'main') {
    return (
      <div style={{ backgroundColor: '#FAEC78' }} className="min-h-screen">
        {/* Header Navigation */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Building className="w-6 h-6 text-orange-600" />
                <span className="text-lg font-semibold text-gray-800">NGO Portal</span>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setCurrentStep('login')}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => setCurrentStep('signup')}
                  className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left: About Section */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                Join Our Mission
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                AidBridge connects compassionate NGOs with animals and communities that need immediate assistance. 
                Your organization's expertise and resources can make a real difference in the lives of those who can't speak for themselves.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">24/7 support for emergency situations</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Flexible partnership options</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Network of verified organizations</span>
                </div>
              </div>
              {/* Add prominent Sign In/Sign Up buttons for non-logged-in users */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  onClick={() => setCurrentStep('login')}
                  className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg text-center hover:bg-indigo-700 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setCurrentStep('signup')}
                  className="w-full sm:w-auto bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg text-center hover:bg-emerald-700 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            </div>

            {/* Right: Image */}
            <div className="flex justify-center lg:justify-end">
              <img
                src="https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="NGOs helping animals"
                className="hero-image w-full max-w-md lg:max-w-lg h-80 lg:h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <button
              onClick={() => setShowVolunteerForm(true)}
              className="btn-primary inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Building className="w-6 h-6 mr-3" />
              Request Volunteer Help
            </button>
            <button
              onClick={() => navigate('/help-request')}
              className="btn-secondary inline-flex items-center justify-center px-8 py-4 bg-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Mail className="w-6 h-6 mr-3" />
              Submit Help Request
            </button>
          </div>
        </div>

        {/* Volunteer Request Form Modal */}
        {showVolunteerForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Request Volunteer Help</h2>
                  <button
                    onClick={() => setShowVolunteerForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleVolunteerRequest} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type of Help Needed
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Animal Rescue Operation</option>
                      <option>Transportation Help</option>
                      <option>Veterinary Care</option>
                      <option>Feeding Program</option>
                      <option>Event Support</option>
                      <option>Emergency Response</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Address or area"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Urgency Level
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option>Low - Within a week</option>
                        <option>Medium - Within 2-3 days</option>
                        <option>High - Within 24 hours</option>
                        <option>Critical - Immediate</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe the situation and what kind of help you need..."
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Volunteers Needed
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="How many volunteers do you need?"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Submit Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Show login form
  if (currentStep === 'login') {
    return (
      <div style={{ backgroundColor: '#FAEC78' }} className="min-h-screen py-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">NGO Login</h2>
              <p className="text-gray-600">Access your organization dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@organization.org"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="text-center mt-6">
              <button
                onClick={() => setCurrentStep('signup')}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                New to our platform? Register your NGO
              </button>
            </div>

            <div className="text-center mt-4">
              <button 
                onClick={() => setCurrentStep('main')}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Back to NGO Portal
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show signup form
  if (currentStep === 'signup') {
    return (
      <div style={{ backgroundColor: '#FAEC78' }} className="min-h-screen py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Register Your NGO</h2>
              <p className="text-gray-600">Join our network of verified organizations</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="orgName" className="block text-sm font-medium text-gray-700 mb-2">
                    <Building className="w-4 h-4 inline mr-1" />
                    Organization Name
                  </label>
                  <input
                    type="text"
                    id="orgName"
                    name="orgName"
                    value={formData.orgName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={loading}
                  />
                </div>
                <div>
                  <label htmlFor="founderName" className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    Founder Name
                  </label>
                  <input
                    type="text"
                    id="founderName"
                    name="founderName"
                    value={formData.founderName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="City, State, Country"
                  required
                  disabled={loading}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={loading}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  <Lock className="w-4 h-4 inline mr-1" />
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                {loading ? 'Registering...' : 'Register Organization'}
              </button>
            </form>

            <div className="text-center mt-6">
              <button
                onClick={() => setCurrentStep('login')}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Already have an account? Sign in
              </button>
            </div>

            <div className="text-center mt-4">
              <button 
                onClick={() => setCurrentStep('main')}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Back to NGO Portal
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Keep the rest of the existing forms (verification, identity, dashboard) as they were
  if (currentStep === 'verification') {
    return (
      <div style={{ backgroundColor: '#FAEC78' }} className="min-h-screen py-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Check Your Email</h2>
              <p className="text-gray-600">
                We've sent a verification code to your email address. Please enter it below to continue.
              </p>
            </div>

            <form onSubmit={handleVerification} className="space-y-6">
              <div>
                <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  id="verificationCode"
                  name="verificationCode"
                  value={formData.verificationCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-center text-2xl tracking-widest"
                  placeholder="000000"
                  maxLength={6}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Verify Email
              </button>
            </form>

            <div className="text-center mt-4">
              <button className="text-blue-600 hover:text-blue-800 text-sm">
                Resend verification code
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'identity') {
    return (
      <div style={{ backgroundColor: '#FAEC78' }} className="min-h-screen py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Verifying Your Identity</h2>
            <p className="text-gray-600 mb-8">
              We're currently reviewing your organization's information to ensure authenticity. 
              This process typically takes 24-48 hours.
            </p>
            
            <img
              src="https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="NGO verification process"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg mb-8"
            />

            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">What happens next?</h3>
              <ul className="text-blue-700 text-left space-y-2">
                <li>• Document verification by our team</li>
                <li>• Background check of organization</li>
                <li>• Phone verification call</li>
                <li>• Account activation via email</li>
              </ul>
            </div>

            <button
              onClick={() => setCurrentStep('dashboard')}
              className="bg-blue-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Continue to Dashboard Preview
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard remains the same
  if (currentStep === 'dashboard') {
    return (
      <div style={{ backgroundColor: '#FAEC78' }} className="min-h-screen py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Header */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                <Building className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Welcome, {formData.orgName || 'Your Organization'}</h1>
                <p className="text-gray-600">NGO Dashboard - Manage your impact</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <h3 className="text-2xl font-bold text-blue-600">24</h3>
                <p className="text-blue-800">Active Volunteers</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <h3 className="text-2xl font-bold text-green-600">156</h3>
                <p className="text-green-800">Animals Helped</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <h3 className="text-2xl font-bold text-purple-600">$12,450</h3>
                <p className="text-purple-800">Funds Raised</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Need Help?</h2>
              <p className="text-gray-600 mb-6">
                Request volunteers for your animal rescue operations, events, or emergency situations.
              </p>
              <button
                onClick={() => setShowVolunteerForm(true)}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Request Volunteer Help
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">NGO Network</h2>
              <p className="text-gray-600 mb-6">
                Connect with other NGOs, share resources, and collaborate on larger rescue operations.
              </p>
              <button className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors">
                Browse NGO Directory
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default NGOLogin;