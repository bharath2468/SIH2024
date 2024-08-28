// TeamMemberCard.js
import React from 'react';
import '../styles/TeamMemberCard.css'; // Import the CSS file for styling

const TeamMemberCard = ({ name, role, linkedinUrl, profilePicture }) => {
  return (
    <div className="team-member-card">
      <img src={profilePicture} alt={`${name}'s profile`} className="profile-picture" />
      <h3 className="name">{name}</h3>
      <p className="role">{role}</p>
      <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="linkedin-button">
        View LinkedIn
      </a>
    </div>
  );
};

export default TeamMemberCard;
