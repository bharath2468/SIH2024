// Footer.js
import React from 'react';
import '../styles/Footer.css'; // Import CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <h2>Created By Solution Makers</h2>
        <p>&copy; 2024 Smart India Hackathon. All rights reserved.</p>
        <p>
          <a href="/privacy-policy">Privacy Policy</a> | 
          <a href="/terms-of-service"> Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
