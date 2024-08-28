import React, { useState } from 'react';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';
import '../styles/signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '', // Add confirmPassword field to state
  });

  const { email, password, confirmPassword } = formData;
  const navigate = useNavigate();

  // Handle input changes
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      await authService.signup({ email, password });
      alert('User registered successfully!');
      navigate('/', { replace: true });
    } catch (error) {
      alert('Error registering user!');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 id="h2">Sign up</h2>
        <h2 id="create">Create your account</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              className="form-input"
            /><br />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
              className="form-input"
            /><br />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="confirmPassword" // Use confirmPassword as the name
              value={confirmPassword}
              onChange={onChange}
              placeholder="Confirm your password"
              className="form-input"
            /><br />
          </div>
          <button type="submit" className="btn-submit">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
