# ML Service - Job Recommendation Engine

This is the Machine Learning microservice for the Job Recommendation Platform. It provides AI-powered job recommendations based on user skills using TF-IDF vectorization and cosine similarity.

## 🤖 Features

- **TF-IDF Vectorization**: Converts text into numerical vectors
- **Cosine Similarity Matching**: Finds the most relevant jobs
- **Real-time Recommendations**: Fast response times using scikit-learn
- **Scalable Architecture**: Can be deployed independently

## 📋 Requirements

- Python 3.8+
- Flask 2.3+
- scikit-learn 1.3+
- numpy, pandas
- CORS support

## 🚀 Installation

1. Create virtual environment:
```bash
python -m venv venv
```

2. Activate virtual environment:
```bash
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

## 🏃 Running the Service

```bash
python app.py
```

The service will start on `http://localhost:5001`

## 📊 API Endpoints

### Health Check
- `GET /api/health` - Check if service is running

### Recommendations
- `POST /api/recommend` - Get job recommendations
  - Request body: `{ "skills": ["Python", "React"], "top_n": 20 }`
  - Returns: List of top N jobs with match scores

### Jobs
- `GET /api/jobs` - Get all loaded jobs
- `POST /api/jobs/seed` - Seed sample jobs

### Training
- `POST /api/train` - Train the model with current data

## 🔄 How It Works

1. **Data Loading**: Sample jobs are loaded into memory
2. **Vectorization**: Job descriptions are converted to TF-IDF vectors
3. **User Request**: User skills arrive as a request
4. **Similarity Calculation**: Cosine similarity computed between user and jobs
5. **Ranking**: Jobs sorted by similarity score
6. **Response**: Top N recommendations returned to backend

## 🧠 Machine Learning Details

### TF-IDF (Term Frequency-Inverse Document Frequency)
- Vectorizes text into numerical features
- Weights common words less than rare words
- Better representation than simple word counts

### Cosine Similarity
- Measures angle between vectors in N-dimensional space
- Range: 0 (no similarity) to 1 (perfect match)
- Formula: cos(θ) = (A·B) / (||A|| * ||B||)

## 📈 Performance Optimization

- Vectorizer is trained once at startup
- Similarity calculations are fast (< 100ms)
- In-memory storage for quick access
- Can handle 1000s of jobs efficiently

## 🔌 Integration with Backend

The backend calls `/api/recommend` with user skills:

```javascript
const response = await axios.post('http://localhost:5001/api/recommend', {
  skills: ['Python', 'Django', 'REST API'],
  top_n: 20
});
```

Response format:
```json
{
  "success": true,
  "recommendations": [
    {
      "jobId": "job_1",
      "score": 0.85,
      "job": { "title": "...", "company": "..." }
    }
  ],
  "count": 20
}
```

## 🚀 Deployment

### Heroku
1. Create `Procfile`:
```
web: gunicorn app:app
```

2. Deploy:
```bash
git push heroku main
```

### Railway
1. Connect GitHub repo
2. Set environment variables
3. Deploy

### Docker
```dockerfile
FROM python:3.9
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```

## 📝 Sample Jobs Data

The service includes sample jobs for:
- Python Developer
- React Frontend Developer
- Full Stack Developer
- ML Engineer
- DevOps Engineer
- Data Scientist
- Mobile Developer
- Cloud AWS Developer
- QA Automation Engineer
- Backend Developer

## 🔧 Customization

### Adding More Jobs

Edit `load_sample_jobs()` in `app.py` to add more jobs from a database or API.

### Improving Recommendations

1. Use more training data
2. Add more features (experience level, salary, location)
3. Implement collaborative filtering
4. Use deep learning (BERT, embeddings)

### Scaling Up

1. Use Redis for caching
2. Async job processing with Celery
3. Load balancing with multiple instances
4. Database-backed job storage

## 📄 License

MIT License

## 🤝 Contributing

Contributions welcome! Please ensure:
- Code follows PEP 8
- Tests are included
- Documentation is updated
