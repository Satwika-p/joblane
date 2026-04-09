// backend/controllers/roadmapController.js
const { asyncHandler } = require('../utils/errorHandler');

// Roadmap data structure
const roadmapData = {
  '1st': {
    CSE: {
      subjects: [
        {
          id: 'dsa-basics',
          name: 'Data Structures & Algorithms Basics',
          description: 'Understand fundamental data structures like arrays, linked lists, stacks, queues, and basic algorithms.',
          videos: [
            { title: 'DSA Basics', url: 'https://www.youtube.com/watch?v=rL8X2mlNHPM' },
            { title: 'Array Data Structure', url: 'https://www.youtube.com/watch?v=Vlk7GZrfmYE' },
          ],
          resources: [
            { title: 'LeetCode Easy DSA', url: 'https://leetcode.com/problemset/all/?difficulty=Easy' },
            { title: 'GeeksforGeeks DSA', url: 'https://www.geeksforgeeks.org/data-structures/' },
          ],
        },
        {
          id: 'oops-basics',
          name: 'Object-Oriented Programming',
          description: 'Master OOP concepts: classes, objects, inheritance, polymorphism, and encapsulation.',
          videos: [
            { title: 'OOP Concepts', url: 'https://www.youtube.com/watch?v=CUq0tF4ClY4' },
          ],
          resources: [
            { title: 'LeetCode OOP', url: 'https://leetcode.com' },
          ],
        },
      ],
    },
    ECE: {
      subjects: [
        {
          id: 'digital-logic',
          name: 'Digital Logic Design',
          description: 'Learn boolean algebra, logic gates, combinatorial and sequential circuits.',
          videos: [
            { title: 'Digital Logic', url: 'https://www.youtube.com/watch?v=uNvq8-O-wXE' },
          ],
          resources: [
            { title: 'Study Material', url: 'https://www.geeksforgeeks.org/digital-logic-design/' },
          ],
        },
        {
          id: 'circuit-basics',
          name: 'Circuit Theory Basics',
          description: 'Basic circuit analysis, Ohm\'s law, Kirchhoff\'s laws, and circuit solving techniques.',
          videos: [
            { title: 'Circuit Theory', url: 'https://www.youtube.com/watch?v=exNdrI7z81I' },
          ],
          resources: [
            { title: 'Circuit Analysis', url: 'https://www.geeksforgeeks.org/circuit-theory/' },
          ],
        },
      ],
    },
    IT: {
      subjects: [
        {
          id: 'programming-basics',
          name: 'Programming Basics',
          description: 'Introduction to programming, variables, control structures, and functions.',
          videos: [
            { title: 'Programming 101', url: 'https://www.youtube.com/watch?v=SzJ46YA_RaA' },
          ],
          resources: [
            { title: 'Codecademy', url: 'https://www.codecademy.com/' },
          ],
        },
      ],
    },
    ME: {
      subjects: [
        {
          id: 'mechanics-basics',
          name: 'Engineering Mechanics',
          description: 'Static and dynamics, forces, vectors, and equilibrium.',
          videos: [
            { title: 'Mechanics Basics', url: 'https://www.youtube.com/watch?v=_5HuLjVWXwU' },
          ],
          resources: [
            { title: 'Engineering Mechanics', url: 'https://www.geeksforgeeks.org/mechanical-engineering/' },
          ],
        },
      ],
    },
    CE: {
      subjects: [
        {
          id: 'surveying',
          name: 'Surveying & Measurement',
          description: 'Basic surveying techniques, measurements, and mapping.',
          videos: [
            { title: 'Surveying Basics', url: 'https://www.youtube.com/watch?v=DX4DnXWfkqc' },
          ],
          resources: [
            { title: 'Surveying Guide', url: 'https://www.geeksforgeeks.org/surveying/' },
          ],
        },
      ],
    },
    EE: {
      subjects: [
        {
          id: 'electrical-basics',
          name: 'Electrical Engineering Basics',
          description: 'DC & AC circuits, power systems fundamentals.',
          videos: [
            { title: 'Electrical Basics', url: 'https://www.youtube.com/watch?v=mc979OhvVW8' },
          ],
          resources: [
            { title: 'Electrical Concepts', url: 'https://www.geeksforgeeks.org/electrical-engineering/' },
          ],
        },
      ],
    },
    Other: {
      subjects: [
        {
          id: 'general-studies',
          name: 'General Studies & Fundamentals',
          description: 'Core concepts and fundamentals for your field.',
          videos: [
            { title: 'Learning Resources', url: 'https://www.youtube.com/' },
          ],
          resources: [
            { title: 'Educational Resources', url: 'https://www.geeksforgeeks.org/' },
          ],
        },
      ],
    },
  },
  '2nd': {
    CSE: {
      subjects: [
        {
          id: 'dsa-advanced',
          name: 'Advanced DSA',
          description: 'Tree, graph, dynamic programming, and advanced algorithms.',
          videos: [
            { title: 'Trees and Graphs', url: 'https://www.youtube.com/watch?v=A8NUt4CFqWc' },
            { title: 'Dynamic Programming', url: 'https://www.youtube.com/watch?v=oBt53YbR9Kk' },
          ],
          resources: [
            { title: 'LeetCode Medium', url: 'https://leetcode.com/problemset/all/?difficulty=Medium' },
            { title: 'InterviewBit DSA', url: 'https://www.interviewbit.com/courses/programming/' },
          ],
        },
        {
          id: 'database',
          name: 'Database Management Systems',
          description: 'SQL, relational models, normalization, and database design.',
          videos: [
            { title: 'DBMS Basics', url: 'https://www.youtube.com/watch?v=kBdlM2clWcI' },
          ],
          resources: [
            { title: 'SQL Tutorial', url: 'https://www.w3schools.com/sql/' },
          ],
        },
      ],
    },
    ECE: {
      subjects: [
        {
          id: 'analog-electronics',
          name: 'Analog Electronics',
          description: 'Transistors, amplifiers, oscillators, and analog circuit design.',
          videos: [
            { title: 'Analog Electronics', url: 'https://www.youtube.com/watch?v=_Rb1R3jVjqQ' },
          ],
          resources: [
            { title: 'Electronics Guide', url: 'https://www.geeksforgeeks.org/electronics/' },
          ],
        },
        {
          id: 'signals-systems',
          name: 'Signals and Systems',
          description: 'Signal processing, Fourier analysis, and system theory.',
          videos: [
            { title: 'Signals & Systems', url: 'https://www.youtube.com/watch?v=qZrL3xvH6s4' },
          ],
          resources: [
            { title: 'DSP Fundamentals', url: 'https://www.geeksforgeeks.org/signal-processing/' },
          ],
        },
      ],
    },
    IT: {
      subjects: [
        {
          id: 'web-basics',
          name: 'Web Development Basics',
          description: 'HTML, CSS, JavaScript fundamentals for web development.',
          videos: [
            { title: 'Web Dev Basics', url: 'https://www.youtube.com/watch?v=kDyJN7Y_ELM' },
          ],
          resources: [
            { title: 'MDN Web Docs', url: 'https://developer.mozilla.org/' },
          ],
        },
      ],
    },
    ME: {
      subjects: [
        {
          id: 'thermodynamics',
          name: 'Thermodynamics',
          description: 'Laws of thermodynamics, heat transfer, and energy conversion.',
          videos: [
            { title: 'Thermodynamics', url: 'https://www.youtube.com/watch?v=e6JQbBHw150' },
          ],
          resources: [
            { title: 'Thermodynamics Basics', url: 'https://www.geeksforgeeks.org/thermodynamics/' },
          ],
        },
      ],
    },
    CE: {
      subjects: [
        {
          id: 'structural-analysis',
          name: 'Structural Analysis',
          description: 'Analysis of structural elements, forces, and stress.',
          videos: [
            { title: 'Structural Analysis', url: 'https://www.youtube.com/watch?v=RvDDEJV6KbE' },
          ],
          resources: [
            { title: 'Structural Concepts', url: 'https://www.geeksforgeeks.org/structural-engineering/' },
          ],
        },
      ],
    },
    EE: {
      subjects: [
        {
          id: 'power-systems',
          name: 'Power Systems',
          description: 'Power generation, transmission, and distribution.',
          videos: [
            { title: 'Power Systems', url: 'https://www.youtube.com/watch?v=tORXiOYAJ8k' },
          ],
          resources: [
            { title: 'Power System Basics', url: 'https://www.geeksforgeeks.org/power-systems/' },
          ],
        },
      ],
    },
    Other: {
      subjects: [
        {
          id: 'intermediate-studies',
          name: 'Intermediate Technical Studies',
          description: 'Core advanced concepts for your field.',
          videos: [
            { title: 'Learning Resources', url: 'https://www.youtube.com/' },
          ],
          resources: [
            { title: 'Educational Resources', url: 'https://www.geeksforgeeks.org/' },
          ],
        },
      ],
    },
  },
  '3rd': {
    CSE: {
      subjects: [
        {
          id: 'system-design',
          name: 'System Design',
          description: 'Scalability, load balancing, caching, databases, and microservices.',
          videos: [
            { title: 'System Design Basics', url: 'https://www.youtube.com/watch?v=quLrc3PbDmw' },
            { title: 'Microservices', url: 'https://www.youtube.com/watch?v=qYzDHGRg5T8' },
          ],
          resources: [
            { title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer' },
          ],
        },
        {
          id: 'operating-systems',
          name: 'Operating Systems',
          description: 'Process management, threading, memory management, and file systems.',
          videos: [
            { title: 'OS Concepts', url: 'https://www.youtube.com/watch?v=26QPDBe-NB8' },
          ],
          resources: [
            { title: 'OS notes', url: 'https://www.geeksforgeeks.org/operating-system/' },
          ],
        },
      ],
    },
    ECE: {
      subjects: [
        {
          id: 'digital-electronics',
          name: 'Digital Electronics & Design',
          description: 'VLSI design, digital circuits, microprocessors, and embedded systems.',
          videos: [
            { title: 'Digital Design', url: 'https://www.youtube.com/watch?v=kZBQ4xJ36n0' },
          ],
          resources: [
            { title: 'Digital Design Guide', url: 'https://www.geeksforgeeks.org/digital-electronics/' },
          ],
        },
        {
          id: 'communication-systems',
          name: 'Communication Systems',
          description: 'Analog and digital communication, modulation, and transmission.',
          videos: [
            { title: 'Communication Systems', url: 'https://www.youtube.com/watch?v=G_OzaiZvFzM' },
          ],
          resources: [
            { title: 'Communication Basics', url: 'https://www.geeksforgeeks.org/communication-systems/' },
          ],
        },
      ],
    },
    IT: {
      subjects: [
        {
          id: 'full-stack-dev',
          name: 'Full Stack Development',
          description: 'Frontend frameworks, backend services, databases, and APIs.',
          videos: [
            { title: 'Full Stack Basics', url: 'https://www.youtube.com/watch?v=A3_-8oVoq80' },
          ],
          resources: [
            { title: 'MERN Stack', url: 'https://www.geeksforgeeks.org/mern-stack/' },
          ],
        },
      ],
    },
    ME: {
      subjects: [
        {
          id: 'design-manufacturing',
          name: 'Design & Manufacturing',
          description: 'CAD, machine design, manufacturing processes, and production.',
          videos: [
            { title: 'CAD Basics', url: 'https://www.youtube.com/watch?v=UJC22moJCF0' },
          ],
          resources: [
            { title: 'Manufacturing Guide', url: 'https://www.geeksforgeeks.org/mechanical-engineering/' },
          ],
        },
      ],
    },
    CE: {
      subjects: [
        {
          id: 'transportation-systems',
          name: 'Transportation & Infrastructure',
          description: 'Highway design, traffic engineering, and infrastructure planning.',
          videos: [
            { title: 'Transportation Engineering', url: 'https://www.youtube.com/watch?v=qJa6J8I5JNg' },
          ],
          resources: [
            { title: 'Infrastructure Guide', url: 'https://www.geeksforgeeks.org/civil-engineering/' },
          ],
        },
      ],
    },
    EE: {
      subjects: [
        {
          id: 'power-electronics',
          name: 'Power Electronics',
          description: 'Power conversion, control circuits, and power management.',
          videos: [
            { title: 'Power Electronics', url: 'https://www.youtube.com/watch?v=r1BKvP1TXRM' },
          ],
          resources: [
            { title: 'Power Electronics Guide', url: 'https://www.geeksforgeeks.org/power-electronics/' },
          ],
        },
      ],
    },
    Other: {
      subjects: [
        {
          id: 'advanced-studies',
          name: 'Advanced Technical Studies',
          description: 'Specialized and advanced concepts in your field.',
          videos: [
            { title: 'Learning Resources', url: 'https://www.youtube.com/' },
          ],
          resources: [
            { title: 'Educational Resources', url: 'https://www.geeksforgeeks.org/' },
          ],
        },
      ],
    },
  },
  '4th': {
    CSE: {
      subjects: [
        {
          id: 'projects',
          name: 'Capstone Project & Interview Prep',
          description: 'Build real-world projects, practice interviews, and system design.',
          videos: [
            { title: 'Interview Strategy', url: 'https://www.youtube.com/results?search_query=coding+interview+prep' },
          ],
          resources: [
            { title: 'LeetCode Hard', url: 'https://leetcode.com/problemset/all/?difficulty=Hard' },
            { title: 'Mock Interviews', url: 'https://www.pramp.com/' },
          ],
        },
        {
          id: 'research',
          name: 'Research & Specialization',
          description: 'Explore specialized areas like AI/ML, blockchain, or distributed systems.',
          videos: [
            { title: 'AI/ML Path', url: 'https://www.youtube.com/watch?v=_qgSvMFMK5M' },
          ],
          resources: [
            { title: 'Kaggle Competitions', url: 'https://www.kaggle.com/' },
            { title: 'Research Papers', url: 'https://arxiv.org/' },
          ],
        },
      ],
    },
    ECE: {
      subjects: [
        {
          id: 'vlsi-design',
          name: 'VLSI & Chip Design',
          description: 'Chip design, semiconductor technology, and advanced microelectronics.',
          videos: [
            { title: 'VLSI Design', url: 'https://www.youtube.com/watch?v=0Xpzp1WSVZ4' },
          ],
          resources: [
            { title: 'VLSI Guide', url: 'https://www.geeksforgeeks.org/vlsi-design/' },
          ],
        },
        {
          id: 'wireless-networks',
          name: 'Wireless Networks & IoT',
          description: 'Wireless communication, 5G, IoT systems, and embedded design.',
          videos: [
            { title: 'Wireless Networks', url: 'https://www.youtube.com/watch?v=3mNKsVDwXN0' },
          ],
          resources: [
            { title: 'IoT Basics', url: 'https://www.geeksforgeeks.org/internet-of-things/' },
          ],
        },
      ],
    },
    IT: {
      subjects: [
        {
          id: 'cloud-devops',
          name: 'Cloud & DevOps',
          description: 'Cloud platforms, containerization, CI/CD, and infrastructure automation.',
          videos: [
            { title: 'Docker & Kubernetes', url: 'https://www.youtube.com/watch?v=kBitVvAZjKc' },
          ],
          resources: [
            { title: 'AWS Learning', url: 'https://aws.amazon.com/training/' },
            { title: 'DevOps Handbook', url: 'https://www.geeksforgeeks.org/devops/' },
          ],
        },
      ],
    },
    ME: {
      subjects: [
        {
          id: 'automation-robotics',
          name: 'Automation & Robotics',
          description: 'Robotics, automation systems, and industrial control.',
          videos: [
            { title: 'Robotics Basics', url: 'https://www.youtube.com/watch?v=0qVOG8E1wAA' },
          ],
          resources: [
            { title: 'Robotics Guide', url: 'https://www.geeksforgeeks.org/robotics/' },
          ],
        },
      ],
    },
    CE: {
      subjects: [
        {
          id: 'project-management',
          name: 'Project Management & Planning',
          description: 'Project scheduling, cost estimation, and construction management.',
          videos: [
            { title: 'Project Management', url: 'https://www.youtube.com/watch?v=hVBZM_v-Qqc' },
          ],
          resources: [
            { title: 'PM Basics', url: 'https://www.geeksforgeeks.org/project-management/' },
          ],
        },
      ],
    },
    EE: {
      subjects: [
        {
          id: 'electrical-machines',
          name: 'Electrical Machines & Control',
          description: 'AC/DC machines, motor control, and automation systems.',
          videos: [
            { title: 'Electrical Machines', url: 'https://www.youtube.com/watch?v=F_N-V8PZX-U' },
          ],
          resources: [
            { title: 'Machines Guide', url: 'https://www.geeksforgeeks.org/electrical-machines/' },
          ],
        },
      ],
    },
    Other: {
      subjects: [
        {
          id: 'capstone-research',
          name: 'Capstone Project & Research',
          description: 'Final year project, specialization, and research in your domain.',
          videos: [
            { title: 'Learning Resources', url: 'https://www.youtube.com/' },
          ],
          resources: [
            { title: 'Educational Resources', url: 'https://www.geeksforgeeks.org/' },
          ],
        },
      ],
    },
  },
};

/**
 * Get Roadmap based on year and branch
 */
exports.getRoadmap = asyncHandler(async (req, res) => {
  const { year, branch } = req.query;

  if (!year || !branch) {
    return res.status(400).json({
      success: false,
      message: 'Please provide year and branch',
    });
  }

  const roadmap = roadmapData[year]?.[branch];

  if (!roadmap) {
    return res.status(404).json({
      success: false,
      message: 'Roadmap not found for the selected year and branch',
    });
  }

  res.status(200).json({
    success: true,
    roadmap: {
      year,
      branch,
      subjects: roadmap.subjects,
    },
  });
});

/**
 * Get All Available Roadmaps
 */
exports.getAllRoadmaps = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    roadmaps: roadmapData,
  });
});
