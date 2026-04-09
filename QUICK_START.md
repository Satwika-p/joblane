# 🚀 Quick Start Guide

Get started with the Job Recommendation Platform in 5 minutes!

## Prerequisites

- Node.js 14+ and npm
- Python 3.8+
- MongoDB (local or MongoDB Atlas)
- Git

## Option 1: Quick Start with npm Commands

### Backend Setup (Terminal 1)

```bash
cd backend
npm install
npm run seed
npm run dev
```

Backend running on `http://localhost:5000`

### ML Service Setup (Terminal 2)

```bash
cd ml-service
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
python app.py
```

ML Service running on `http://localhost:5001`

### Frontend Setup (Terminal 3)

```bash
cd frontend
npm install
npm start
```

Frontend running on `http://localhost:3000`

## Option 2: Docker Compose (Simpler)

```bash
docker-compose up
```

That's it! All services start together.

## First Time Setup

### 1. Configure Database

Edit `backend/.env`:
```
MONGODB_URI=mongodb://localhost:27017/job-recommendation
```

### 2. Seed Sample Data

```bash
cd backend
npm run seed
```

This creates:
- 2 sample users
- 5 sample jobs

### 3. Login

Go to [http://localhost:3000](http://localhost:3000)

**Test Account:**
- Email: `john@example.com`
- Password: `password123`

## What Each Service Does

| Service | Port | Purpose |
|---------|------|---------|
| Backend | 5000 | API, Database, Auth |
| ML Service | 5001 | Job Recommendations |
| Frontend | 3000 | Web UI |
| MongoDB | 27017 | Database |

## Next Steps

1. **Explore Dashboard**: View your profile and stats
2. **Update Skills**: Add your Skills on the Profile page
3. **View Roadmap**: Check your personalized placement roadmap
4. **Get Recommendations**: See AI-powered job recommendations
5. **Save Jobs**: Bookmark interesting opportunities

## 🔧 Troubleshooting

### MongoDB Connection Error
```
Make sure MongoDB is running:
- Windows: mongod.exe
- macOS: brew services start mongodb-community
- Linux: sudo systemctl start mongod
```

### Port Already in Use
```
Change port in .env or kill process using port
lsof -i :5000  # Check what's using port 5000
```

### Module Not Found
```
Delete node_modules and package-lock.json, then npm install
```

### Python Virtual Environment Issue
```
Delete venv folder and recreate:
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate
pip install -r requirements.txt
```

## 📚 Key Features

✅ **Authentication**: Secure login with JWT  
✅ **AI Recommendations**: ML-powered job matching  
✅ **Placement Roadmap**: Year-wise learning guide  
✅ **Job Search**: Advanced filtering  
✅ **Saved Jobs**: Bookmark functionality  
✅ **Responsive UI**: Mobile-friendly  

## 📖 Full Documentation

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)
- [ML Service README](./ml-service/README.md)
- [Main README](./README.md)

## 🎯 Popular Actions

**Add Skills**
- Profile → Skills section → Type skill → Add Skill

**Get Job Recommendations**
- Jobs → Use AI Recommendations tab

**Search Jobs**
- Jobs → Use Search Jobs tab → Filter and search

**Save a Job**
- Jobs → Click bookmark icon on any job card

**View Learning Resources**
- Roadmap → Select year/branch → Click subject

## 💡 Tips

- Add multiple skills for better recommendations
- Check the placement roadmap based on your year
- Use the search filters to narrow down jobs
- Save jobs you're interested in for later

## 🆘 Need Help?

1. Check the main [README.md](./README.md)
2. Review service-specific README files
3. Check .env.example files for configuration
4. Look at error messages in terminal

## 🎉 You're All Set!

Happy job hunting! 🚀

---

*If you encounter any issues, please create an issue in the repository.*
