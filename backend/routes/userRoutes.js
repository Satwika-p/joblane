// backend/routes/userRoutes.js
const express = require('express');
const {
  updateProfile,
  addSkills,
  removeSkill,
  saveJob,
  getSavedJobs,
  removeSavedJob,
} = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(auth);

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', updateProfile);

// @route   POST /api/users/skills
// @desc    Add skills to user
// @access  Private
router.post('/skills', addSkills);

// @route   DELETE /api/users/skills
// @desc    Remove skill from user
// @access  Private
router.delete('/skills', removeSkill);

// @route   POST /api/users/saved-jobs
// @desc    Save a job
// @access  Private
router.post('/saved-jobs', saveJob);

// @route   GET /api/users/saved-jobs
// @desc    Get all saved jobs
// @access  Private
router.get('/saved-jobs', getSavedJobs);

// @route   DELETE /api/users/saved-jobs/:jobId
// @desc    Remove saved job
// @access  Private
router.delete('/saved-jobs/:jobId', removeSavedJob);

module.exports = router;
