import React from 'react';
import AuthForm from '../components/AuthForm';

const SignupPage = () => {
  const handleSuccess = () => {
    // Redirect to OTP verification page or show success message
    window.location.href = '/otp-verification';
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <AuthForm isSignup={true} onSuccess={handleSuccess} />
    </div>
  );
};

export default SignupPage;
