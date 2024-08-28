import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TeamMemberCard from '../components/TeamMemberCard';
import '../styles/Home.css'; // Assuming you want to style this component

const Home = () => {
  const navigate = useNavigate();

  const handleDashboardClick = () =>{
    navigate("/dashboard")
  }

  const teamMembers = [
    {
      name: 'Nithesh',
      role: 'ML Engineer',
      linkedinUrl: 'https://www.linkedin.com/in/johndoe',
      profilePicture: '/assets/profile_logo.png', // Replace with actual path
    },
    {
      name: 'Bharath P',
      role: 'MERN stack Developer',
      linkedinUrl: 'https://www.linkedin.com/in/bharath-p-datascientist/',
      profilePicture: '/assets/profile_logo.png', // Replace with actual path
    },
    {
      name: 'Dakshesh T',
      role: 'Backend Developer',
      linkedinUrl: 'https://www.linkedin.com/in/janesmith',
      profilePicture: '/assets/profile_logo.png', // Replace with actual path
    },
    {
      name: 'Netaji',
      role: 'ML Engineer',
      linkedinUrl: 'https://www.linkedin.com/in/janesmith',
      profilePicture: '/assets/profile_logo.png', // Replace with actual path
    },
    {
      name: 'Jitesh',
      role: 'FrontEnd Developer',
      linkedinUrl: 'https://www.linkedin.com/in/janesmith',
      profilePicture: '/assets/profile_logo.png', // Replace with actual path
    },
    {
      name: 'Dakshesh T',
      role: 'Backend Developer',
      linkedinUrl: 'https://www.linkedin.com/in/janesmith',
      profilePicture: '/assets/profile_logo.png', // Replace with actual path
    },
  ];

  return (
    <div className="home-container">
      <Header />
      <main className="home-main">
        <div className="home-info">
          <img className='sih-logo' src='/assets/SIH-Logo.png'></img>
          <h1 className='titletag'>Vision Vortex</h1>
          <p className='def'>An Image Recognition Chatbot</p>
          <h2>Features</h2>
          <ul>
            <li>Manage User records securely</li>
            <li>Track User's history</li>
            <li>Access and update records from anywhere</li>
            <li>Generate reports and analytics</li>
          </ul>
        </div>
        <div className="team-members-container">
      {teamMembers.map((member, index) => (
        <TeamMemberCard
          key={index}
          name={member.name}
          role={member.role}
          linkedinUrl={member.linkedinUrl}
          profilePicture={member.profilePicture}
        />
      ))}
    </div>
        <div className="home-actions">
        
          <h2>Get Started</h2>
              <Link to="/login" className="home-link">Login</Link> to access your dashboard or
              <Link to="/signup" className="home-link">Sign Up</Link> to create a new account.
        </div>
        <button className="dashboard-button" onClick={handleDashboardClick}>
            Go to Dashboard
        </button>
      </main>
      <Footer id='footer'/>
    </div>
  );
};

export default Home;
