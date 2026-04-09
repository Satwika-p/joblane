# Job Recommendation Platform - MERN Stack with ML

A full-stack web application for personalized job and internship recommendations using Machine Learning, built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## 🌟 Features

### Authentication & User Management
- JWT-based authentication with secure password hashing (bcrypt)
- User registration and login system
- Profile management with skills and interests
- User data storage in MongoDB

### Placement Roadmap
- Personalized learning roadmap based on year and branch
- Comprehensive study materials for key subjects:
  - Data Structures & Algorithms (DSA)
  - Object-Oriented Programming (OOPs)
  - Computer Networks (CN)
  - Database Management Systems (DBMS)
  - Operating Systems (OS)
  - System Design
- Embedded YouTube videos and practice resources (LeetCode, CodeChef)
- Year-wise progression (1st to 4th year)

### AI-Powered Job Recommendations
- Machine Learning model using TF-IDF Vectorization and Cosine Similarity
- Personalized job recommendations based on user skills
- Top 20 internship and job role recommendations
- Match score indicating compatibility

### Job Search & Filtering
- Advanced search functionality
- Filter by location, job type, and required skills
- Pagination for better performance
- Job details with company info and salary

### Saved Jobs
- Bookmark jobs for later review
- Manage saved jobs with quick actions
- One-click apply links

### Responsive UI
- Modern, attractive interface with gradient themes
- Mobile-responsive design
- Smooth animations and transitions
- Loading states and error handling

## 📋 Project Structure

```
JOBRECCOMENDATION/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Job.js
│   │   └── SavedJob.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── jobController.js
│   │   └── roadmapController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── jobRoutes.js
│   │   └── roadmapRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── utils/
│   │   ├── jwt.js
│   │   └── errorHandler.js
│   ├── package.json
│   ├── .env.example
│   └── server.js
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── Navbar.css
│   │   ├── pages/
│   │   │   ├── LoginPage.js
│   │   │   ├── RegisterPage.js
│   │   │   ├── Dashboard.js
│   │   │   ├── RoadmapPage.js
│   │   │   ├── JobRecommendations.js
│   │   │   ├── SavedJobs.js
│   │   │   ├── ProfilePage.js
│   │   │   └── (CSS files)
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── .env.example
│
├── ml-service/
│   ├── app.py
│   ├── requirements.txt
│   ├── data/
│   └── models/
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or remote)
- Python 3.8+
- npm or yarn

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB URI and other configurations:
```
MONGODB_URI=mongodb://localhost:27017/job-recommendation
PORT=5000
JWT_SECRET=your_secret_key_here
CLIENT_URL=http://localhost:3000
ML_SERVICE_URL=http://localhost:5001
```

5. Start the backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
```

Frontend will open on `http://localhost:3000`

### ML Service Setup

1. Navigate to ml-service folder:
```bash
cd ml-service
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate virtual environment:
```bash
# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Run the Flask app:
```bash
python app.py
```

ML Service will run on `http://localhost:5001`

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Users
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/skills` - Add skills
- `DELETE /api/users/skills` - Remove skill
- `POST /api/users/saved-jobs` - Save job
- `GET /api/users/saved-jobs` - Get saved jobs
- `DELETE /api/users/saved-jobs/:jobId` - Remove saved job

### Jobs
- `POST /api/jobs/recommendations` - Get AI recommendations
- `GET /api/jobs/search` - Search jobs
- `GET /api/jobs/:id` - Get single job
- `GET /api/jobs` - Get all jobs

### Roadmap
- `GET /api/roadmap` - Get roadmap by year and branch
- `GET /api/roadmap/all` - Get all roadmaps

## 🤖 Machine Learning Model

The ML service uses:
- **TF-IDF Vectorization**: Converts job descriptions and user skills into numerical vectors
- **Cosine Similarity**: Measures similarity between user skills and job requirements
- **Recommendation Engine**: Returns top N jobs sorted by similarity score

### How it Works
1. User provides their skills
2. ML service converts skills into a vector using TF-IDF
3. Calculates cosine similarity between user vector and all job vectors
4. Returns jobs sorted by similarity score (match percentage)

## 📊 Database Schema

### Users
```javascript
{
  name: String,
  email: String,
  password: String (hashed),
  branch: String (CSE, ECE, IT, etc.),
  year: String (1st, 2nd, 3rd, 4th),
  skills: [String],
  interests: [String],
  savedJobs: [ObjectId],
  profileComplete: Boolean,
  timestamps: true
}
```

### Jobs
```javascript
{
  title: String,
  company: String,
  description: String,
  skillsRequired: [String],
  location: String,
  jobType: String (Internship, Full-time, etc.),
  experience: String,
  salary: { min, max, currency },
  applyLink: String,
  matchScore: Number,
  timestamps: true
}
```

### SavedJobs
```javascript
{
  user: ObjectId,
  job: ObjectId,
  savedAt: Date,
  timestamps: true
}
```

## 🎨 UI/UX Features

- **Modern Gradient Themes**: Purple and blue gradients for professional appearance
- **Smooth Animations**: Fade-in effects and transitions
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Loading States**: Spinners and skeletons for better UX
- **Error Handling**: User-friendly error messages with toast notifications
- **Dark Mode Ready**: Infrastructure for dark mode implementation

## 🚢 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy

### Backend (Render)
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Set environment variables
5. Deploy

### ML Service (Heroku/Railway)
1. Create account on Heroku or Railway
2. Connect GitHub repository
3. Set environment variables
4. Deploy

## 📝 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/job-recommendation
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
ML_SERVICE_URL=http://localhost:5001
CLIENT_URL=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🧪 Testing

### Backend
```bash
npm test
```

### Frontend
```bash
npm test
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For issues and questions, please open an issue on the GitHub repository.

## 🎓 Learning Resources

- [MERN Stack Tutorial](https://www.youtube.com/results?search_query=mern+stack)
- [Machine Learning with Python](https://scikit-learn.org/)
- [React Documentation](https://react.dev)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Node.js Documentation](https://nodejs.org/docs/)

---

**Made with ❤️ for students seeking placement opportunities**
