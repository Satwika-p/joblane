// frontend/src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaRoad, FaBriefcase, FaBookmark } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({
    roadmapProgress: 0,
    jobsViewed: 0,
    jobsSaved: 0,
  });

  useEffect(() => {
    // Load stats from localStorage or backend
    const savedStats = localStorage.getItem('userStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  return (
    <main className="dashboard">
      <div className="container">
        {/* Welcome Section */}
        <section className="welcome-section">
          <h1>Welcome back, {user?.name}! 👋</h1>
          <p>Your personalized job placement guidance platform</p>
        </section>

        {/* Quick Stats */}
        <section className="stats-section">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>Profile Completion</h3>
              <p className="stat-value">{user?.profileComplete ? '100%' : 'Incomplete'}</p>
              <Link to="/profile" className="stat-link">Update Profile →</Link>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎓</div>
            <div className="stat-content">
              <h3>Branch</h3>
              <p className="stat-value">{user?.branch}</p>
              <p className="stat-year">{user?.year} Year</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💼</div>
            <div className="stat-content">
              <h3>Skills Count</h3>
              <p className="stat-value">{user?.skills?.length || 0}</p>
              <Link to="/profile" className="stat-link">Manage Skills →</Link>
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="features-section">
          <h2>Get Started</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon"><FaRoad /></div>
              <h3>Placement Roadmap</h3>
              <p>Get a personalized roadmap based on your year and branch</p>
              <Link to="/roadmap" className="feature-btn">View Roadmap →</Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><FaBriefcase /></div>
              <h3>Job Recommendations</h3>
              <p>Discover jobs and internships tailored to your skills</p>
              <Link to="/recommendations" className="feature-btn">Get Recommendations →</Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><FaBookmark /></div>
              <h3>Saved Jobs</h3>
              <p>Bookmark jobs you're interested in and apply later</p>
              <Link to="/saved-jobs" className="feature-btn">View Saved Jobs →</Link>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="next-steps">
          <h2>Next Steps for Success</h2>
          <ol className="steps-list">
            <li>
              <strong>Complete Your Profile:</strong> Add your skills and interests to get better recommendations
            </li>
            <li>
              <strong>Follow the Roadmap:</strong> Use our placement roadmap to structure your learning
            </li>
            <li>
              <strong>Get Job Recommendations:</strong> Find the best opportunities based on your skills
            </li>
            <li>
              <strong>Save & Apply:</strong> Bookmark jobs you like and start applying
            </li>
          </ol>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
