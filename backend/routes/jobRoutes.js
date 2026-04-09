// backend/routes/jobRoutes.js
const express = require('express');
const { getRecommendations, searchJobs, getJob, getAllJobs } = require('../controllers/jobController');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/jobs/recommendations
// @desc    Get job recommendations based on user skills
// @access  Private
router.post('/recommendations', auth, getRecommendations);

// @route   GET /api/jobs/search
// @desc    Search and filter jobs
// @access  Public
router.get('/search', searchJobs);

// @route   GET /api/jobs/:id
// @desc    Get single job
// @access  Public
router.get('/:id', getJob);

// @route   GET /api/jobs
// @desc    Get all jobs
// @access  Public
router.get('/', getAllJobs);

module.exports = router;
