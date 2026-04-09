// backend/models/Job.js
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide job title'],
      trim: true,
    },
    company: {
      type: String,
      required: [true, 'Please provide company name'],
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    skillsRequired: [String],
    location: String,
    jobType: {
      type: String,
      enum: ['Internship', 'Full-time', 'Part-time', 'Contract'],
      default: 'Full-time',
    },
    experience: String,
    salary: {
      min: Number,
      max: Number,
      currency: { type: String, default: 'USD' },
    },
    applyLink: String,
    postedDate: {
      type: Date,
      default: Date.now,
    },
    source: String,
    matchScore: Number, // Calculated by ML model
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Job', jobSchema);
