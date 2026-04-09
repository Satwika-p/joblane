// backend/controllers/authController.js
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const { asyncHandler } = require('../utils/errorHandler');

/**
 * User Registration
 */
exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword, branch, year } = req.body;

  // Validation
  if (!name || !email || !password || !confirmPassword || !branch || !year) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields',
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: 'Passwords do not match',
    });
  }

  // Check if user already exists
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      success: false,
      message: 'User already exists with this email',
    });
  }

  // Create user
  user = await User.create({
    name,
    email,
    password,
    branch,
    year,
  });

  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      branch: user.branch,
      year: user.year,
    },
  });
});

/**
 * User Login
 */
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide email and password',
    });
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials',
    });
  }

  // Check password
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials',
    });
  }

  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    message: 'User logged in successfully',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      branch: user.branch,
      year: user.year,
      skills: user.skills,
    },
  });
});

/**
 * Get Current User
 */
exports.getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  res.status(200).json({
    success: true,
    user,
  });
});
