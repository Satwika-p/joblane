// frontend/src/components/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaRoad, FaBriefcase, FaBookmark, FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ user, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container container">
        <div className="nav-brand">
          <Link to="/" className="brand-name">
            💼 Job Recommendation Platform
          </Link>
        </div>

        <button
          className="menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              <FaHome /> Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/roadmap" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              <FaRoad /> Roadmap
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/recommendations" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              <FaBriefcase /> Jobs
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/saved-jobs" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              <FaBookmark /> Saved
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              <FaUser /> Profile
            </Link>
          </li>
          <li className="nav-item">
            <button onClick={handleLogout} className="nav-link logout-btn">
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>

        <div className="nav-user">
          {user && <span className="user-name">👋 {user.name}</span>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
