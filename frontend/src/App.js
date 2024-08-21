import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import OtpVerificationPage from './pages/OtpVerificationPage';
import './styles/main.css'; // Import your CSS file

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<AuthForm isSignup={true} />} />
          <Route path="/login" element={<AuthForm isSignup={false} />} />
          <Route path="/otp-verification" element={<OtpVerificationPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App; // Ensure this line is present
