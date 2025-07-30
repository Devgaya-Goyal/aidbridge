import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import HelpRequest from './pages/HelpRequest';
import Volunteer from './pages/Volunteer';
import NGODirectory from './pages/NGODirectory';
import NGOLogin from './pages/NGOLogin';
import VolunteerSignup from './components/VolunteerSignup';
import VolunteerLogin from './components/VolunteerLogin';
import IdentityVerification from './components/IdentityVerification';
import FirebaseTest from './components/FirebaseTest';
import VolunteerDashboard from './pages/VolunteerDashboard';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/help-request" element={<HelpRequest />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/ngo-directory" element={<NGODirectory />} />
              <Route path="/ngo-login" element={<NGOLogin />} />
              <Route path="/volunteer/signup" element={<VolunteerSignup />} />
              <Route path="/volunteer/login" element={<VolunteerLogin />} />
              <Route path="/volunteer/verify" element={<IdentityVerification />} />
              <Route path="/firebase-test" element={<FirebaseTest />} />
              <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />
              <Route path="/volunteer/interests" element={<VolunteerDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;