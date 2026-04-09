// backend/seed.js - Database seed script for sample data
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Job = require('./models/Job');

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/job-recommendation');
    console.log('✓ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Job.deleteMany({});
    console.log('✓ Cleared existing data');

    // Sample users
    const sampleUsers = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        branch: 'CSE',
        year: '3rd',
        skills: ['Python', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
        interests: ['Web Development', 'AI/ML'],
        profileComplete: true,
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        branch: 'ECE',
        year: '2nd',
        skills: ['Java', 'C++', 'AWS'],
        interests: ['Cloud Computing', 'IoT'],
        profileComplete: true,
      },
    ];

    // Sample jobs
    const sampleJobs = [
      {
        title: 'Python Developer',
        company: 'TCS India',
        description: 'Looking for an experienced Python developer with Django experience. Must have REST API knowledge. Work with India\'s leading IT company.',
        skillsRequired: ['Python', 'Django', 'PostgreSQL', 'REST API'],
        location: 'Bangalore, India',
        jobType: 'Full-time',
        experience: '2-4 years',
        salary: { min: 8, max: 15, currency: 'LPA' },
        applyLink: 'https://example.com/apply',
        source: 'TCS Careers',
      },
      {
        title: 'React Frontend Developer',
        company: 'Flipkart Tech',
        description: 'Build responsive web applications using React and modern JavaScript. Join our innovative team at Flipkart.',
        skillsRequired: ['React', 'JavaScript', 'CSS', 'HTML', 'Webpack'],
        location: 'Hyderabad, India',
        jobType: 'Full-time',
        experience: '1-3 years',
        salary: { min: 6, max: 12, currency: 'LPA' },
        applyLink: 'https://example.com/apply',
        source: 'Flipkart Careers',
      },
      {
        title: 'ML Engineer Internship',
        company: 'Google India',
        description: 'Exciting internship opportunity to work on machine learning projects. Learn from industry experts at Google.',
        skillsRequired: ['Python', 'Machine Learning', 'TensorFlow', 'Data Science'],
        location: 'Gurugram, India',
        jobType: 'Internship',
        experience: '0-1 years',
        salary: { min: 1.5, max: 2.5, currency: 'LPA' },
        applyLink: 'https://example.com/apply',
        source: 'Google Careers',
      },
      {
        title: 'Full Stack Developer',
        company: 'Zomato Tech',
        description: 'Join our growing tech team as a Full Stack Developer. Work with MERN stack in a dynamic startup environment.',
        skillsRequired: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express'],
        location: 'Delhi, India',
        jobType: 'Full-time',
        experience: '2-5 years',
        salary: { min: 10, max: 18, currency: 'LPA' },
        applyLink: 'https://example.com/apply',
        source: 'Zomato Careers',
      },
      {
        title: 'DevOps Engineer',
        company: 'Microsoft India',
        description: 'Manage cloud infrastructure and containerized applications using Kubernetes and Docker on Azure cloud.',
        skillsRequired: ['Docker', 'Kubernetes', 'AWS', 'Linux', 'CI/CD'],
        location: 'Pune, India',
        jobType: 'Full-time',
        experience: '3-6 years',
        salary: { min: 12, max: 20, currency: 'LPA' },
        applyLink: 'https://example.com/apply',
        source: 'Microsoft Careers',
      },
    ];

    // Insert sample data
    const createdUsers = await User.insertMany(sampleUsers);
    const createdJobs = await Job.insertMany(sampleJobs);

    console.log(`✓ Created ${createdUsers.length} sample users`);
    console.log(`✓ Created ${createdJobs.length} sample jobs`);

    // Output credential information
    console.log('\n=== Sample Credentials ===');
    console.log('Email: john@example.com');
    console.log('Password: password123');
    console.log('\n');

    process.exit(0);
  } catch (error) {
    console.error('✗ Seeding error:', error.message);
    process.exit(1);
  }
};

seedDatabase();
