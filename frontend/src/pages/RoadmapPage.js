// frontend/src/pages/RoadmapPage.js
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { roadmapAPI } from '../services/api';
import './RoadmapPage.css';

const RoadmapPage = ({ user }) => {
  const [selectedYear, setSelectedYear] = useState(user?.year || '1st');
  const [selectedBranch, setSelectedBranch] = useState(user?.branch || 'CSE');
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expandedSubject, setExpandedSubject] = useState(null);

  const years = ['1st', '2nd', '3rd', '4th'];
  const branches = ['CSE', 'ECE', 'IT', 'ME', 'CE', 'EE', 'Other'];

  useEffect(() => {
    fetchRoadmap(selectedYear, selectedBranch);
  }, [selectedYear, selectedBranch]);

  const fetchRoadmap = async (year, branch) => {
    setLoading(true);
    try {
      const response = await roadmapAPI.getRoadmap(year, branch);
      if (response.data.success) {
        setRoadmap(response.data.roadmap);
      }
    } catch (error) {
      toast.error('Error fetching roadmap');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="roadmap-page">
      <div className="container">
        <h1>📚 Placement Roadmap</h1>

        {/* Selection Controls */}
        <div className="roadmap-controls">
          <div className="control-group">
            <label>Year</label>
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year} Year
                </option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label>Branch</label>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading roadmap...</p>
          </div>
        ) : roadmap ? (
          /* Roadmap Content */
          <div className="roadmap-content">
            <h2>
              {roadmap.year} Year - {roadmap.branch} Program
            </h2>
            <div className="subjects-list">
              {roadmap.subjects.map((subject) => (
                <div key={subject.id} className="subject-card">
                  <div
                    className="subject-header"
                    onClick={() =>
                      setExpandedSubject(
                        expandedSubject === subject.id ? null : subject.id
                      )
                    }
                  >
                    <h3>{subject.name}</h3>
                    <span className={`expand-icon ${expandedSubject === subject.id ? 'open' : ''}`}>
                      ▼
                    </span>
                  </div>

                  {expandedSubject === subject.id && (
                    <div className="subject-content">
                      <p className="description">{subject.description}</p>

                      <div className="resources-section">
                        <h4>📹 Recommended Videos:</h4>
                        <ul>
                          {subject.videos.map((video, idx) => (
                            <li key={idx}>
                              <a href={video.url} target="_blank" rel="noopener noreferrer">
                                {video.title} →
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="resources-section">
                        <h4>📖 Practice Resources:</h4>
                        <ul>
                          {subject.resources.map((resource, idx) => (
                            <li key={idx}>
                              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                {resource.title} →
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="no-data">
            <p>No roadmap available for this selection</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default RoadmapPage;
