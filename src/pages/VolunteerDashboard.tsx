import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const VolunteerDashboard: React.FC = () => {
  const { currentUser, volunteerData } = useAuth();

  // Example previous helps (replace with real data if available)
  const previousHelps: { title: string; date: string; description: string }[] = [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col items-center py-10 px-2">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Welcome, {volunteerData?.name || currentUser?.email || 'Volunteer'}!</h1>
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* User Details Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Your Details</h2>
          <div className="text-gray-700 space-y-2">
            <div><span className="font-medium">Name:</span> {volunteerData?.name || '-'}</div>
            <div><span className="font-medium">Email:</span> {currentUser?.email || '-'}</div>
            <div><span className="font-medium">Mobile:</span> {volunteerData?.mobile || '-'}</div>
            <div><span className="font-medium">Location:</span> {volunteerData?.location || '-'}</div>
            <div><span className="font-medium">City:</span> {volunteerData?.city || '-'}</div>
          </div>
        </div>
        {/* Previous Helps Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-green-700">Previous Helps</h2>
          {previousHelps.length === 0 ? (
            <div className="text-gray-500">You haven't helped yet. Start helping to see your impact here!</div>
          ) : (
            <ul className="space-y-2">
              {previousHelps.map((help, idx) => (
                <li key={idx} className="border-b pb-2">
                  <div className="font-medium">{help.title}</div>
                  <div className="text-xs text-gray-400">{help.date}</div>
                  <div className="text-sm">{help.description}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Interests Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-purple-700">Your Interests</h2>
          <div className="text-gray-500">No interests set. Update your profile to add interests.</div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard; 