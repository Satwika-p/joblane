// frontend/src/pages/JobRecommendations.js
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaBookmark, FaRegBookmark, FaSearch } from 'react-icons/fa';
import { jobAPI, userAPI } from '../services/api';
import './JobRecommendations.css';

const JobRecommendations = ({ user }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState('recommendations'); // 'recommendations' or 'search'

  const jobTypes = ['Internship', 'Full-time', 'Part-time', 'Contract'];

  useEffect(() => {
    if (activeTab === 'recommendations') {
      getRecommendations();
    }
  }, [currentPage]);

  const getRecommendations = async () => {
    if (!user?.skills || user.skills.length === 0) {
      toast.warning('Please add skills to your profile first');
      return;
    }

    setLoading(true);
    try {
      const response = await jobAPI.getRecommendations(
        user.skills,
        currentPage,
        20
      );
      if (response.data.success) {
        setJobs(response.data.jobs);
        setTotalPages(response.data.pagination.pages || 1);
      }
    } catch (error) {
      toast.error('Error fetching recommendations');
    } finally {
      setLoading(false);
    }
  };

  const searchJobs = async (page = 1) => {
    setLoading(true);
    try {
      const response = await jobAPI.searchJobs({
        keyword: searchQuery,
        location: selectedLocation,
        jobType: selectedJobType,
        page,
        limit: 20,
      });
      if (response.data.success) {
        setJobs(response.data.jobs);
        setTotalPages(response.data.pagination.pages || 1);
        setCurrentPage(page);
      }
    } catch (error) {
      toast.error('Error searching jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    searchJobs(1);
  };

  const toggleSaveJob = async (jobId) => {
    try {
      if (savedJobs.has(jobId)) {
        await userAPI.removeSavedJob(jobId);
        setSavedJobs((prev) => new Set([...prev].filter((id) => id !== jobId)));
        toast.success('Job removed from saved');
      } else {
        await userAPI.saveJob(jobId);
        setSavedJobs((prev) => new Set([...prev, jobId]));
        toast.success('Job saved successfully');
      }
    } catch (error) {
      toast.error('Error saving job');
    }
  };

  return (
    <main className="job-recommendations">
      <div className="container">
        <h1>💼 Job & Internship Recommendations</h1>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'recommendations' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('recommendations');
              setCurrentPage(1);
              getRecommendations();
            }}
          >
            AI Recommendations
          </button>
          <button
            className={`tab ${activeTab === 'search' ? 'active' : ''}`}
            onClick={() => setActiveTab('search')}
          >
            Search Jobs
          </button>
        </div>

        {/* Search Section */}
        {activeTab === 'search' && (
          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-input-group">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by job title, company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <input
              type="text"
              placeholder="Location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            />

            <select value={selectedJobType} onChange={(e) => setSelectedJobType(e.target.value)}>
              <option value="">All Job Types</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <button type="submit" className="btn-primary">
              Search
            </button>
          </form>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading jobs...</p>
          </div>
        ) : jobs.length > 0 ? (
          <>
            {/* Jobs Grid */}
            <div className="jobs-grid">
              {jobs.map((job) => (
                <div key={job._id} className="job-card">
                  <div className="job-header">
                    <div>
                      <h3>{job.title}</h3>
                      <p className="company">{job.company}</p>
                    </div>
                    <button
                      className="save-btn"
                      onClick={() => toggleSaveJob(job._id)}
                      title={savedJobs.has(job._id) ? 'Remove from saved' : 'Save job'}
                    >
                      {savedJobs.has(job._id) ? (
                        <FaBookmark />
                      ) : (
                        <FaRegBookmark />
                      )}
                    </button>
                  </div>

                  <div className="job-meta">
                    <span className="job-type">{job.jobType}</span>
                    {job.location && <span className="location">📍 {job.location}</span>}
                    {job.matchScore && (
                      <span className="match-score">
                        Match: {(job.matchScore * 100).toFixed(0)}%
                      </span>
                    )}
                  </div>

                  <p className="description">{job.description.substring(0, 150)}...</p>

                  <div className="skills-required">
                    <strong>Skills:</strong>
                    <div className="skills-tags">
                      {job.skillsRequired.slice(0, 5).map((skill) => (
                        <span key={skill} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {job.salary && (
                    <p className="salary">
                      💰 ${job.salary.min}K - ${job.salary.max}K {job.salary.currency}
                    </p>
                  )}

                  <a
                    href={job.applyLink || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="apply-btn"
                  >
                    Apply Now →
                  </a>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
              <button
                onClick={() => {
                  const newPage = currentPage - 1;
                  setCurrentPage(newPage);
                  if (activeTab === 'recommendations') {
                    getRecommendations();
                  } else {
                    searchJobs(newPage);
                  }
                }}
                disabled={currentPage === 1}
              >
                ← Previous
              </button>

              <span className="page-info">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => {
                  const newPage = currentPage + 1;
                  setCurrentPage(newPage);
                  if (activeTab === 'recommendations') {
                    getRecommendations();
                  } else {
                    searchJobs(newPage);
                  }
                }}
                disabled={currentPage === totalPages}
              >
                Next →
              </button>
            </div>
          </>
        ) : (
          <div className="no-jobs">
            <p>No jobs found. Try adjusting your filters or adding more skills.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default JobRecommendations;
