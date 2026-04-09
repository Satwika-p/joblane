// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import RoadmapPage from './pages/RoadmapPage';
import JobRecommendations from './pages/JobRecommendations';
import SavedJobs from './pages/SavedJobs';
import ProfilePage from './pages/ProfilePage';

// Components
import Navbar from './components/Navbar';

import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleLogin = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="App">
      {isAuthenticated && <Navbar user={user} onLogout={handleLogout} />}
      
      <Routes>
        {/* Public Routes */}
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/register" element={<RegisterPage onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            {/* Private Routes */}
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/roadmap" element={<RoadmapPage user={user} />} />
            <Route path="/recommendations" element={<JobRecommendations user={user} />} />
            <Route path="/saved-jobs" element={<SavedJobs user={user} />} />
            <Route path="/profile" element={<ProfilePage user={user} setUser={setUser} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
