import React from 'react';
import AuthForm from '../components/AuthForm';
import { signup } from '../services/authService';

const SignupPage = () => {
  const handleSignup = async (formData) => {
    try {
      const { email, password } = formData;
      await signup( email, password);
      alert('Signup successful! You can now login.');
    } catch (error) {
      console.error(error);
      alert('Error during signup!');
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <AuthForm onSubmit={handleSignup} title="Signup" />
    </div>
  );
};

export default SignupPage;
