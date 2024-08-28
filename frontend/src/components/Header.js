import React from 'react';
import '../styles/Header.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          setIsLoggedIn(true);
        }
      }, []);

    const handleProfileClick = () => {
        setIsMenuOpen(!isMenuOpen);
        console.log("Profile clicked!");
    };

    const handleLogout = () => {
        authService.logout();
        window.location.href = '/';
      };

    return (
        <header className="header">
            <div className="container">
                <div className="logo-navbar">
                    <div className="logo">
                        <h1 className='titlename'>Vision Vortex</h1>
                    </div>
                    <nav className='navbar'>
                        <Link to="/solution" className='nav-link'>Solution</Link>
                        <Link to="/about" className='nav-link'>About</Link>
                        <Link to="/contact" className='nav-link'>Contact</Link>
                    </nav>
                </div>
                {isLoggedIn ? (
                    <div className="profile-section">
                        <Link to="/dashboard" className="home-link">
                            <button className="btn get-started">Get started</button>
                        </Link>
                        <button onClick={handleLogout} className="btn logout">Logout</button>
                        <button className="profile-icon" onClick={handleProfileClick}>
                            <img src="/assets/profile_logo.png" alt="Profile" />
                        </button>
                    </div>
                ) : (
                    <div className='btns'>
                        <Link to="/signup" className="home-link">
                            <button className="btn sign-up">Sign Up</button>
                        </Link>
                        <Link to="/login" className="home-link">
                            <button className="btn log-in">Login</button>
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
