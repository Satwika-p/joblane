# Backend - Job Recommendation API

Node.js and Express.js backend for the Job Recommendation Platform with MongoDB, JWT authentication, and ML integration.

## 🏗️ Architecture

- **Server Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT + bcrypt
- **ML Integration**: RESTful API calls to Flask service
- **Validation**: express-validator
- **Security**: helmet, CORS

## 📋 Features

- User authentication with JWT tokens
- Secure password hashing with bcrypt
- RESTful API endpoints
- MongoDB database integration
- Error handling middleware
- CORS configuration
- Request logging

## 🚀 Quick Start

### Installation

```bash
cd backend
npm install
```

### Environment Setup

Create `.env` file:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```
MONGODB_URI=mongodb://localhost:27017/job-recommendation
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key_here_change_in_production
JWT_EXPIRE=7d
ML_SERVICE_URL=http://localhost:5001
CLIENT_URL=http://localhost:3000
```

### Database Setup

#### Option 1: Local MongoDB

Install MongoDB and start the service:
```bash
# Windows
mongod

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

#### Option 2: MongoDB Atlas

1. Create account at https://www.mongodb.com/cloud
2. Create cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### Seed Sample Data

```bash
npm run seed
```

This creates sample users and jobs in the database.

### Start Development Server

```bash
npm run dev
```

The server will run on `http://localhost:5000`

## 📚 Database Schema

### Users Collection

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  branch: String,
  year: String,
  skills: [String],
  interests: [String],
  savedJobs: [ObjectId], // References to Job._id
  profileComplete: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Jobs Collection

```javascript
{
  _id: ObjectId,
  title: String,
  company: String,
  description: String,
  skillsRequired: [String],
  location: String,
  jobType: String,
  experience: String,
  salary: {
    min: Number,
    max: Number,
    currency: String
  },
  applyLink: String,
  postedDate: Date,
  source: String,
  matchScore: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### SavedJobs Collection

```javascript
{
  _id: ObjectId,
  user: ObjectId, // FK to User._id
  job: ObjectId, // FK to Job._id
  savedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
// Unique constraint on (user, job) pair
```

## 🔌 API Endpoints

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "branch": "CSE",
  "year": "3rd"
}

Response: { success: true, token: "...", user: {...} }
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: { success: true, token: "...", user: {...} }
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>

Response: { success: true, user: {...} }
```

### User Endpoints

#### Update Profile
```
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe",
  "branch": "CSE",
  "year": "4th",
  "skills": ["Python", "React"],
  "interests": ["Web Dev", "AI"]
}

Response: { success: true, user: {...} }
```

#### Add Skills
```
POST /api/users/skills
Authorization: Bearer <token>
Content-Type: application/json

{
  "skills": ["Python", "JavaScript", "React"]
}

Response: { success: true, user: {...} }
```

#### Remove Skill
```
DELETE /api/users/skills
Authorization: Bearer <token>
Content-Type: application/json

{
  "skill": "Python"
}

Response: { success: true, user: {...} }
```

#### Save Job
```
POST /api/users/saved-jobs
Authorization: Bearer <token>
Content-Type: application/json

{
  "jobId": "507f1f77bcf86cd799439011"
}

Response: { success: true, savedJob: {...} }
```

#### Get Saved Jobs
```
GET /api/users/saved-jobs?page=1&limit=10
Authorization: Bearer <token>

Response: { 
  success: true, 
  savedJobs: [...], 
  pagination: { total: 25, page: 1, pages: 3 } 
}
```

#### Remove Saved Job
```
DELETE /api/users/saved-jobs/507f1f77bcf86cd799439011
Authorization: Bearer <token>

Response: { success: true, message: "Job removed" }
```

### Job Endpoints

#### Get AI Recommendations
```
POST /api/jobs/recommendations?page=1&limit=20
Authorization: Bearer <token>
Content-Type: application/json

{
  "skills": ["Python", "React", "Node.js"]
}

Response: { 
  success: true, 
  jobs: [...],
  pagination: { page: 1, limit: 20, total: 45 }
}
```

#### Search Jobs
```
GET /api/jobs/search?keyword=python&location=bangalore&jobType=Internship&page=1&limit=20

Response: { 
  success: true, 
  jobs: [...],
  pagination: { page: 1, limit: 20, total: 12, pages: 1 }
}
```

#### Get Single Job
```
GET /api/jobs/507f1f77bcf86cd799439011

Response: { success: true, job: {...} }
```

#### Get All Jobs
```
GET /api/jobs?page=1&limit=20

Response: { 
  success: true, 
  jobs: [...],
  pagination: { page: 1, limit: 20, total: 100, pages: 5 }
}
```

### Roadmap Endpoints

#### Get Roadmap
```
GET /api/roadmap?year=3rd&branch=CSE

Response: { 
  success: true, 
  roadmap: {
    year: "3rd",
    branch: "CSE",
    subjects: [...]
  }
}
```

#### Get All Roadmaps
```
GET /api/roadmap/all

Response: { 
  success: true, 
  roadmaps: {
    "1st": { CSE: {...}, ECE: {...} },
    "2nd": {...},
    ...
  }
}
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. User registers or logs in
2. Server returns JWT token
3. Client stores token (localStorage)
4. Client sends token in `Authorization: Bearer <token>` header
5. Server verifies token and processes request

### Token Payload

```javascript
{
  id: "user_id",
  iat: 1234567890,
  exp: 1234654290 // Expires in 7 days
}
```

## 🛡️ Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Tokens**: Secure, expiring tokens
- **CORS**: Cross-origin requests controlled
- **Helmet**: HTTP security headers
- **Input Validation**: express-validator
- **Error Handling**: No sensitive info leaked

## 📊 Middleware Flow

```
Request
  ↓
CORS Middleware
  ↓
Body Parser (JSON)
  ↓
Request Logger
  ↓
Route Handler
  ├─ Auth Middleware (if protected)
  ├─ Validation
  ├─ Business Logic
  └─ Response
  ↓
Error Handler
  ↓
Response
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage
```

## 📝 File Structure

```
backend/
├── config/
│   └── database.js         # MongoDB connection
├── models/
│   ├── User.js
│   ├── Job.js
│   └── SavedJob.js
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── jobController.js
│   └── roadmapController.js
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── jobRoutes.js
│   └── roadmapRoutes.js
├── middleware/
│   └── auth.js             # JWT verification
├── utils/
│   ├── jwt.js              # Token generation
│   └── errorHandler.js
├── seed.js                 # Database seeding
├── server.js               # App entry point
├── package.json
└── .env.example
```

## 🚀 Deployment

### Render

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect repository
4. Set environment variables:
   ```
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-secret>
   ML_SERVICE_URL=https://<ml-service-url>
   CLIENT_URL=https://<frontend-url>
   ```
5. Deploy

### Railway

1. Create account on Railway
2. Connect GitHub repo
3. Add environment variables
4. Deploy

## 🔧 Environment Variables

Required environment variables:

```
MONGODB_URI          # MongoDB connection string
PORT                 # Server port (default: 5000)
NODE_ENV             # development/production
JWT_SECRET           # Secret for JWT signing
JWT_EXPIRE           # Token expiration (default: 7d)
ML_SERVICE_URL       # ML service endpoint
CLIENT_URL           # Frontend URL for CORS
```

## 📞 Error Handling

Common error responses:

```javascript
// 400 - Bad Request
{ success: false, message: "Invalid input" }

// 401 - Unauthorized
{ success: false, message: "Token invalid or expired" }

// 404 - Not Found
{ success: false, message: "Resource not found" }

// 500 - Server Error
{ success: false, message: "Internal server error" }
```

## 🎯 Best Practices

- ✅ Always include error handling
- ✅ Validate all inputs
- ✅ Use proper HTTP status codes
- ✅ Set appropriate CORS rules
- ✅ Secure sensitive data
- ✅ Log important events
- ✅ Use environment variables
- ✅ Keep routes organized

## 📚 Resources

- [Express.js Documentation](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [JWT Introduction](https://jwt.io/introduction)
- [bcryptjs NPM](https://www.npmjs.com/package/bcryptjs)

---

**Happy coding! 🚀**
