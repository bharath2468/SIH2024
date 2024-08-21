import React, { useState } from 'react';
import axios from 'axios';

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState(''); // Assuming you get the email somehow, like from props or state
  const [message, setMessage] = useState('');

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
      setMessage(response.data.message);

      if (response.status === 200) {
        // OTP verified successfully, redirect or take further action
        // For example, navigate to the login page or dashboard
      }
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Server error');
    }
  };

  return (
    <form onSubmit={handleOtpSubmit}>
      <div>
        <label>Enter OTP</label>
        <input type="text" value={otp} onChange={handleOtpChange} />
      </div>
      <button type="submit">Verify OTP</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default OtpVerification;
