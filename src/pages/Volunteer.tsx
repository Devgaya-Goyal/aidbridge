import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Heart, DollarSign, CheckCircle, Clock, MapPin, Building } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Volunteer: React.FC = () => {
  const { currentUser, volunteerData, logout } = useAuth();
  const [showTasks, setShowTasks] = useState(false);
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/volunteer');
  };

  // If user just logged in, redirect to dashboard
  React.useEffect(() => {
    if (currentUser && window.location.pathname === '/volunteer/login') {
      navigate('/volunteer/dashboard');
    }
  }, [currentUser, navigate]);

  const groundTasks = [
    {
      id: 1,
      title: "Injured Stray Dog Rescue",
      location: "Downtown Park, Main Street",
      urgency: "High",
      description: "Small dog with injured leg needs immediate medical attention and transport to vet clinic.",
      timePosted: "15 minutes ago",
      volunteers: 2
    },
    {
      id: 2,
      title: "Feed Stray Cats Colony",
      location: "Industrial Area, Block 5",
      urgency: "Medium",
      description: "Daily feeding required for colony of 8 cats. Food supplies will be provided.",
      timePosted: "2 hours ago",
      volunteers: 1
    },
    {
      id: 3,
      title: "Bird Nest Relocation",
      location: "Residential Complex, Oak Street",
      urgency: "Low",
      description: "Bird nest needs safe relocation due to construction work. Requires experienced handler.",
      timePosted: "1 day ago",
      volunteers: 0
    },
    {
      id: 4,
      title: "Animal Shelter Cleaning",
      location: "City Animal Shelter",
      urgency: "Medium",
      description: "Weekend volunteer activity to clean and maintain shelter facilities.",
      timePosted: "3 hours ago",
      volunteers: 5
    }
  ];

  const handleTaskAccept = (taskId: number) => {
    setSelectedTask(taskId);
  };

  return (
    <div style={{ backgroundColor: '#F5F5DC' }} className="min-h-screen">
      {/* Header Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-blue-600" />
              <span className="text-lg font-semibold text-gray-800">Volunteer Portal</span>
            </div>
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {volunteerData?.name || currentUser.displayName || currentUser.email}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link
                  to="/volunteer/login"
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/volunteer/signup"
                  className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
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
              AidBridge connects compassionate volunteers with animals and communities that need immediate assistance. 
              Your time, skills, and kindness can make a real difference in the lives of those who can't speak for themselves.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-gray-700">24/7 support for emergency situations</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-gray-700">Flexible volunteering options</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-gray-700">Community of like-minded people</span>
              </div>
            </div>
            {/* Add prominent Sign In/Sign Up buttons for non-logged-in users */}
            {!currentUser && (
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Link
                  to="/volunteer/login"
                  className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg text-center hover:bg-indigo-700 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/volunteer/signup"
                  className="w-full sm:w-auto bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg text-center hover:bg-emerald-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
            {/* Show welcome message for logged-in users */}
            {currentUser && (
              <div className="pt-6">
                <span className="text-xl font-semibold text-gray-800">Welcome, {volunteerData?.name || currentUser.email || 'Volunteer'}!</span>
              </div>
            )}
          </div>

          {/* Right: Image */}
          <div className="flex justify-center lg:justify-end">
            <img
              src="https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Volunteers helping animals"
              className="hero-image w-full max-w-md lg:max-w-lg h-80 lg:h-96 object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        {/* Action Buttons */}
        {!showTasks && (
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <button
              onClick={() => setShowTasks(true)}
              className="btn-primary inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Users className="w-6 h-6 mr-3" />
              Help with Ground Services
            </button>
            <Link
              to="/ngo-directory"
              className="btn-secondary inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <DollarSign className="w-6 h-6 mr-3" />
              Help by Funding
            </Link>
            <Link
              to="/ngo-directory"
              className="btn-secondary inline-flex items-center justify-center px-8 py-4 bg-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Building className="w-6 h-6 mr-3" />
              NGO Directory
            </Link>
          </div>
        )}

        {/* Task List */}
        {showTasks && (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Available Tasks</h2>
              <span className="text-sm text-gray-600">{groundTasks.length} tasks available</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {groundTasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`border rounded-xl p-6 transition-all duration-200 ${
                    selectedTask === task.id 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:shadow-lg hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      task.urgency === 'High' ? 'bg-red-100 text-red-800' :
                      task.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.urgency}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {task.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {task.timePosted}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      {task.volunteers} volunteers already helping
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm mb-4">{task.description}</p>

                  {selectedTask === task.id ? (
                    <div className="bg-green-100 border border-green-300 rounded-lg p-3 text-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mx-auto mb-1" />
                      <span className="text-green-800 font-medium">Task Accepted!</span>
                      <p className="text-green-700 text-xs mt-1">You'll receive further instructions via email</p>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleTaskAccept(task.id)}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Accept Task
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => setShowTasks(false)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back to options
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Volunteer;