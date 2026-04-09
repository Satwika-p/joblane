// backend/controllers/userController.js
const User = require('../models/User');
const SavedJob = require('../models/SavedJob');
const { asyncHandler } = require('../utils/errorHandler');

/**
 * Update User Profile
 */
exports.updateProfile = asyncHandler(async (req, res) => {
  const { name, branch, year, skills, interests } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      name,
      branch,
      year,
      skills,
      interests,
      profileComplete: true,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    user,
  });
});

/**
 * Add Skills to User
 */
exports.addSkills = asyncHandler(async (req, res) => {
  const { skills } = req.body;

  if (!skills || !Array.isArray(skills)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide skills as an array',
    });
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $addToSet: { skills: { $each: skills } } },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: 'Skills added successfully',
    user,
  });
});

/**
 * Remove Skill from User
 */
exports.removeSkill = asyncHandler(async (req, res) => {
  const { skill } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $pull: { skills: skill } },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: 'Skill removed successfully',
    user,
  });
});

/**
 * Save Job for User
 */
exports.saveJob = asyncHandler(async (req, res) => {
  const { jobId } = req.body;

  const savedJob = await SavedJob.findOneAndUpdate(
    { user: req.user.id, job: jobId },
    { user: req.user.id, job: jobId },
    { upsert: true, new: true }
  );

  res.status(200).json({
    success: true,
    message: 'Job saved successfully',
    savedJob,
  });
});

/**
 * Get Saved Jobs for User
 */
exports.getSavedJobs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const savedJobs = await SavedJob.find({ user: req.user.id })
    .populate('job')
    .skip(skip)
    .limit(limit)
    .sort({ savedAt: -1 });

  const total = await SavedJob.countDocuments({ user: req.user.id });

  res.status(200).json({
    success: true,
    savedJobs,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
    },
  });
});

/**
 * Remove Saved Job
 */
exports.removeSavedJob = asyncHandler(async (req, res) => {
  const { jobId } = req.params;

  await SavedJob.findOneAndDelete({
    user: req.user.id,
    job: jobId,
  });

  res.status(200).json({
    success: true,
    message: 'Job removed from saved list',
  });
});
