// frontend/src/pages/SavedJobs.js
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';
import { userAPI } from '../services/api';
import './SavedJobs.css';

const SavedJobs = ({ user }) => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchSavedJobs(currentPage);
  }, [currentPage]);

  const fetchSavedJobs = async (page) => {
    setLoading(true);
    try {
      const response = await userAPI.getSavedJobs(page, 10);
      if (response.data.success) {
        setSavedJobs(response.data.savedJobs);
        setTotalPages(response.data.pagination.pages || 1);
      }
    } catch (error) {
      toast.error('Error fetching saved jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (jobId) => {
    try {
      await userAPI.removeSavedJob(jobId);
      setSavedJobs((prev) => prev.filter((job) => job.job._id !== jobId));
      toast.success('Job removed');
    } catch (error) {
      toast.error('Error removing job');
    }
  };

  return (
    <main className="saved-jobs-page">
      <div className="container">
        <h1>📌 Saved Jobs</h1>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading saved jobs...</p>
          </div>
        ) : savedJobs.length > 0 ? (
          <>
            <div className="saved-jobs-list">
              {savedJobs.map((savedJob) => (
                <div key={savedJob._id} className="saved-job-item">
                  <div className="job-info">
                    <h3>{savedJob.job.title}</h3>
                    <p className="company">{savedJob.job.company}</p>
                    <div className="meta">
                      <span className="job-type">{savedJob.job.jobType}</span>
                      {savedJob.job.location && (
                        <span className="location">📍 {savedJob.job.location}</span>
                      )}
                      <span className="saved-date">
                        Saved: {new Date(savedJob.savedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="description">{savedJob.job.description.substring(0, 100)}...</p>
                    <a
                      href={savedJob.job.applyLink || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="apply-btn"
                    >
                      Apply Now →
                    </a>
                  </div>
                  <button
                    onClick={() => handleRemove(savedJob.job._id)}
                    className="remove-btn"
                    title="Remove from saved"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ← Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="no-saved-jobs">
            <p>No saved jobs yet. Start exploring job recommendations!</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default SavedJobs;
