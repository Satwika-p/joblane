// backend/controllers/jobController.js
const Job = require('../models/Job');
const axios = require('axios');
const { asyncHandler } = require('../utils/errorHandler');

/**
 * Get Job Recommendations based on user skills
 */
exports.getRecommendations = asyncHandler(async (req, res) => {
  const { skills } = req.body;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;

  if (!skills || !Array.isArray(skills) || skills.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Please provide user skills',
    });
  }

  try {
    // Call ML service for recommendations
    const mlResponse = await axios.post(`${process.env.ML_SERVICE_URL}/api/recommend`, {
      skills,
      top_n: limit,
    });

    if (!mlResponse.data.success) {
      throw new Error('ML service error');
    }

    // Fetch job details from database
    const jobIds = mlResponse.data.recommendations; // List of job IDs with scores
    
    const jobs = await Promise.all(
      jobIds.map(async (rec) => {
        const job = await Job.findById(rec.jobId);
        if (job) {
          return {
            ...job.toObject(),
            matchScore: rec.score,
          };
        }
        return null;
      })
    );

    const filteredJobs = jobs.filter((job) => job !== null);

    res.status(200).json({
      success: true,
      jobs: filteredJobs,
      pagination: {
        page,
        limit,
        total: filteredJobs.length,
      },
    });
  } catch (error) {
    console.error('Error getting recommendations:', error.message);

    // Fallback: Return jobs based on skill matching
    const jobsWithSkills = await Job.find({
      skillsRequired: { $in: skills },
    })
      .limit(limit)
      .sort({ postedDate: -1 });

    res.status(200).json({
      success: true,
      message: 'Using fallback recommendations',
      jobs: jobsWithSkills,
      pagination: {
        page,
        limit,
        total: jobsWithSkills.length,
      },
    });
  }
});

/**
 * Search and Filter Jobs
 */
exports.searchJobs = asyncHandler(async (req, res) => {
  const { keyword, location, jobType, skill, page = 1, limit = 10 } = req.query;

  const filter = {};

  if (keyword) {
    filter.$or = [
      { title: { $regex: keyword, $options: 'i' } },
      { company: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } },
    ];
  }

  if (location) {
    filter.location = { $regex: location, $options: 'i' };
  }

  if (jobType) {
    filter.jobType = jobType;
  }

  if (skill) {
    filter.skillsRequired = { $in: [skill] };
  }

  const skip = (page - 1) * limit;

  const jobs = await Job.find(filter)
    .skip(skip)
    .limit(parseInt(limit))
    .sort({ postedDate: -1 });

  const total = await Job.countDocuments(filter);

  res.status(200).json({
    success: true,
    jobs,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit),
    },
  });
});

/**
 * Get Single Job
 */
exports.getJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: 'Job not found',
    });
  }

  res.status(200).json({
    success: true,
    job,
  });
});

/**
 * Get All Jobs (Admin only)
 */
exports.getAllJobs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const jobs = await Job.find()
    .skip(skip)
    .limit(limit)
    .sort({ postedDate: -1 });

  const total = await Job.countDocuments();

  res.status(200).json({
    success: true,
    jobs,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
});
