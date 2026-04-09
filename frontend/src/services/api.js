// frontend/src/services/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me'),
};

// User API calls
export const userAPI = {
  updateProfile: (userData) => api.put('/users/profile', userData),
  addSkills: (skills) => api.post('/users/skills', { skills }),
  removeSkill: (skill) => api.delete('/users/skills', { data: { skill } }),
  saveJob: (jobId) => api.post('/users/saved-jobs', { jobId }),
  getSavedJobs: (page = 1, limit = 10) => 
    api.get(`/users/saved-jobs?page=${page}&limit=${limit}`),
  removeSavedJob: (jobId) => api.delete(`/users/saved-jobs/${jobId}`),
};

// Job API calls
export const jobAPI = {
  getRecommendations: (skills,page = 1, limit = 20) =>
    api.post('/jobs/recommendations', { skills }, { params: { page, limit } }),
  searchJobs: (params) => api.get('/jobs/search', { params }),
  getJob: (id) => api.get(`/jobs/${id}`),
  getAllJobs: (page = 1, limit = 20) =>
    api.get(`/jobs?page=${page}&limit=${limit}`),
};

// Roadmap API calls
export const roadmapAPI = {
  getRoadmap: (year, branch) =>
    api.get(`/roadmap?year=${year}&branch=${branch}`),
  getAllRoadmaps: () => api.get('/roadmap/all'),
};

export default api;
