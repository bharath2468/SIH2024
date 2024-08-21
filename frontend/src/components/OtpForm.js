import React, { useState } from 'react';
import { verifyOtp } from '../api/authService';

const OtpForm = ({ userId, onSuccess }) => {
  const [otp, setOtp] = useState('');

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await verifyOtp(userId, otp);
      onSuccess();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>OTP</label>
        <input type="text" value={otp} onChange={handleChange} />
      </div>
      <button type="submit">Verify OTP</button>
    </form>
  );
};

export default OtpForm;
