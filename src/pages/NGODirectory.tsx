import React, { useState } from 'react';
import { Building, MapPin, Phone, Mail, Eye, DollarSign, Copy, X } from 'lucide-react';

interface NGO {
  id: number;
  name: string;
  description: string;
  location: string;
  contact: string;
  email: string;
  accountDetails: string;
  founded: string;
  volunteers: number;
}

const NGODirectory: React.FC = () => {
  const [selectedNGO, setSelectedNGO] = useState<NGO | null>(null);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [donationNGO, setDonationNGO] = useState<NGO | null>(null);

  const ngos: NGO[] = [
    {
      id: 1,
      name: "Paws & Hearts Animal Rescue",
      description: "Dedicated to rescuing abandoned and injured animals, providing medical care, and finding loving homes. We operate a 24/7 emergency response team.",
      location: "Downtown Metro Area",
      contact: "+1 (555) 123-PAWS",
      email: "contact@pawshearts.org",
      accountDetails: "Bank of America - Account: 1234567890 - Routing: 021000021",
      founded: "2018",
      volunteers: 45
    },
    {
      id: 2,
      name: "Wildlife Conservation Initiative",
      description: "Protecting local wildlife habitats and conducting rescue operations for wild animals in urban areas. Focus on rehabilitation and release programs.",
      location: "Forest Hills District",
      contact: "+1 (555) 456-WILD",
      email: "help@wildlifeconservation.org",
      accountDetails: "Wells Fargo - Account: 0987654321 - Routing: 121000248",
      founded: "2015",
      volunteers: 32
    },
    {
      id: 3,
      name: "Community Pet Care Network",
      description: "Providing free veterinary care for low-income families and managing TNR programs for feral cat colonies throughout the city.",
      location: "Riverside Community",
      contact: "+1 (555) 789-CARE",
      email: "info@petcarenetwork.org",
      accountDetails: "Chase Bank - Account: 5555666677 - Routing: 021000021",
      founded: "2020",
      volunteers: 28
    },
    {
      id: 4,
      name: "Emergency Animal Response Team",
      description: "Rapid response organization for animal emergencies, natural disasters, and large-scale rescues. Available 24/7 for critical situations.",
      location: "Central Business District",
      contact: "+1 (555) 911-HELP",
      email: "emergency@animalresponse.org",
      accountDetails: "US Bank - Account: 9999888877 - Routing: 091000019",
      founded: "2019",
      volunteers: 67
    },
    {
      id: 5,
      name: "Farm Animal Sanctuary",
      description: "Rescue and care for farm animals, providing lifetime sanctuary for animals saved from neglect and abuse. Educational programs available.",
      location: "Rural Valley Area",
      contact: "+1 (555) 555-FARM",
      email: "sanctuary@farmanimalcare.org",
      accountDetails: "PNC Bank - Account: 7777444433 - Routing: 043000096",
      founded: "2016",
      volunteers: 23
    },
    {
      id: 6,
      name: "Urban Animal Outreach",
      description: "Street outreach program providing food, medical care, and shelter for homeless animals in urban environments. Mobile clinic services.",
      location: "Industrial District",
      contact: "+1 (555) 333-HELP",
      email: "outreach@urbananimal.org",
      accountDetails: "TD Bank - Account: 2222111100 - Routing: 031201360",
      founded: "2021",
      volunteers: 41
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const openProfile = (ngo: NGO) => {
    setSelectedNGO(ngo);
  };

  const openDonationModal = (ngo: NGO) => {
    setDonationNGO(ngo);
    setShowDonationModal(true);
  };

  return (
    <div style={{ backgroundColor: '#4DFFC4' }} className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">NGO Directory</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Connect with verified organizations working tirelessly to help animals and communities in need. 
            Support their missions through volunteering or donations.
          </p>
        </div>

        {/* NGO Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ngos.map((ngo) => (
            <div key={ngo.id} className="ngo-card bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              {/* NGO Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 leading-tight">{ngo.name}</h3>
                    <p className="text-sm text-gray-600">Est. {ngo.founded}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 text-sm mb-4 line-clamp-3">{ngo.description}</p>

              {/* Info */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{ngo.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{ngo.contact}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{ngo.email}</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{ngo.volunteers}</span> active volunteers
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => openProfile(ngo)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </button>
                <button
                  onClick={() => openDonationModal(ngo)}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Donate Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* NGO Profile Modal */}
        {selectedNGO && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                      <Building className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">{selectedNGO.name}</h2>
                      <p className="text-gray-600">Founded in {selectedNGO.founded}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedNGO(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">About Us</h3>
                    <p className="text-gray-700">{selectedNGO.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <MapPin className="w-5 h-5 text-gray-500 mr-3" />
                          <span className="text-gray-700">{selectedNGO.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-5 h-5 text-gray-500 mr-3" />
                          <span className="text-gray-700">{selectedNGO.contact}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="w-5 h-5 text-gray-500 mr-3" />
                          <span className="text-gray-700">{selectedNGO.email}</span>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Quick Stats</h4>
                        <p className="text-sm text-gray-600">Active Volunteers: {selectedNGO.volunteers}</p>
                        <p className="text-sm text-gray-600">Years Active: {2025 - parseInt(selectedNGO.founded)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Donation Modal */}
        {showDonationModal && donationNGO && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Donate to {donationNGO.name}</h2>
                  <button
                    onClick={() => setShowDonationModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-700">
                    Your donation will directly support {donationNGO.name}'s mission to help animals in need.
                  </p>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-800 mb-2">Bank Account Details</h3>
                    <p className="text-sm text-gray-600 mb-2">{donationNGO.accountDetails}</p>
                    <button
                      onClick={() => copyToClipboard(donationNGO.accountDetails)}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      Copy Account Details
                    </button>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-1">Donation Instructions</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Use the account details above for bank transfer</li>
                      <li>• Include your name in the transfer reference</li>
                      <li>• Email {donationNGO.email} for donation receipt</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NGODirectory;