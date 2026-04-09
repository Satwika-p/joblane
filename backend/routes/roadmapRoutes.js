// backend/routes/roadmapRoutes.js
const express = require('express');
const { getRoadmap, getAllRoadmaps } = require('../controllers/roadmapController');

const router = express.Router();

// @route   GET /api/roadmap/all
// @desc    Get all roadmaps
// @access  Public
router.get('/all', getAllRoadmaps);

// @route   GET /api/roadmap
// @desc    Get roadmap based on year and branch
// @access  Public
router.get('/', getRoadmap);

module.exports = router;
