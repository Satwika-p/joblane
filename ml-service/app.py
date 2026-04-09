# ml-service/app.py
import os
import json
import pickle
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Global variables
vectorizer = None
job_vectors = None
jobs_data = []
model_loaded = False

def load_sample_jobs():
    """Load sample job data"""
    global jobs_data
    jobs_data = [
        {
            "id": "job_1",
            "title": "Python Developer",
            "company": "Tech Corp",
            "skills": ["Python", "Django", "PostgreSQL", "REST API"],
            "description": "Looking for experienced Python developer with Django and REST API experience"
        },
        {
            "id": "job_2",
            "title": "React Frontend Developer",
            "company": "Web Solutions",
            "skills": ["React", "JavaScript", "CSS", "HTML"],
            "description": "Build responsive web applications using React and modern JavaScript"
        },
        {
            "id": "job_3",
            "title": "Full Stack Developer",
            "company": "StartUp Inc",
            "skills": ["JavaScript", "React", "Node.js", "MongoDB"],
            "description": "Full stack MERN developer needed for exciting projects"
        },
        {
            "id": "job_4",
            "title": "Machine Learning Engineer",
            "company": "AI Labs",
            "skills": ["Python", "Machine Learning", "TensorFlow", "Data Science"],
            "description": "Build and deploy ML models using TensorFlow and scikit-learn"
        },
        {
            "id": "job_5",
            "title": "DevOps Engineer",
            "company": "Cloud Systems",
            "skills": ["Docker", "Kubernetes", "AWS", "Linux"],
            "description": "Manage cloud infrastructure and containerized applications"
        },
        {
            "id": "job_6",
            "title": "Data Scientist",
            "company": "Analytics Pro",
            "skills": ["Python", "Data Science", "SQL", "Pandas"],
            "description": "Analyze data and build predictive models using Python"
        },
        {
            "id": "job_7",
            "title": "Backend Developer",
            "company": "Enterprise Solutions",
            "skills": ["Java", "Spring Boot", "Microservices", "SQL"],
            "description": "Develop scalable backend services using Java and Spring Boot"
        },
        {
            "id": "job_8",
            "title": "Mobile Developer",
            "company": "Mobile First",
            "skills": ["React Native", "JavaScript", "API Integration"],
            "description": "Build cross-platform mobile applications with React Native"
        },
        {
            "id": "job_9",
            "title": "Cloud AWS Developer",
            "company": "Cloud Services",
            "skills": ["AWS", "Python", "Docker", "Serverless"],
            "description": "Develop cloud-native applications on AWS platform"
        },
        {
            "id": "job_10",
            "title": "QA Automation Engineer",
            "company": "Quality First",
            "skills": ["Python", "Selenium", "Test Automation", "API Testing"],
            "description": "Automate testing for web and API applications"
        },
    ]
    logger.info(f"Loaded {len(jobs_data)} sample jobs")

def train_recommendation_model():
    """Train the recommendation model using TF-IDF"""
    global vectorizer, job_vectors, model_loaded
    
    try:
        # Create job descriptions by combining title, company, and skills
        job_texts = []
        for job in jobs_data:
            job_text = f"{job['title']} {job['company']} {' '.join(job['skills'])} {job['description']}"
            job_texts.append(job_text)
        
        # Create TF-IDF vectorizer
        vectorizer = TfidfVectorizer(stop_words='english', max_features=1000)
        job_vectors = vectorizer.fit_transform(job_texts)
        
        model_loaded = True
        logger.info("✓ Recommendation model trained successfully")
    except Exception as e:
        logger.error(f"✗ Error training model: {str(e)}")
        model_loaded = False

def get_recommendations(user_skills, top_n=20):
    """Get job recommendations based on user skills"""
    if not model_loaded or vectorizer is None or job_vectors is None:
        logger.warning("Model not loaded, returning default recommendations")
        return [{"jobId": job["id"], "score": 0.5} for job in jobs_data[:top_n]]
    
    try:
        # Create user profile from skills
        user_text = " ".join(user_skills)
        user_vector = vectorizer.transform([user_text])
        
        # Calculate cosine similarity between user and all jobs
        similarities = cosine_similarity(user_vector, job_vectors)[0]
        
        # Get top N jobs
        top_indices = np.argsort(similarities)[::-1][:top_n]
        
        recommendations = [
            {
                "jobId": jobs_data[idx]["id"],
                "score": float(similarities[idx]),
                "job": {
                    "title": jobs_data[idx]["title"],
                    "company": jobs_data[idx]["company"],
                    "skills": jobs_data[idx]["skills"],
                }
            }
            for idx in top_indices
        ]
        
        return recommendations
    except Exception as e:
        logger.error(f"Error generating recommendations: {str(e)}")
        return []

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        "success": True,
        "message": "ML service is running",
        "model_loaded": model_loaded
    })

@app.route('/api/recommend', methods=['POST'])
def recommend():
    """Get job recommendations"""
    try:
        data = request.get_json()
        skills = data.get('skills', [])
        top_n = data.get('top_n', 20)
        
        if not skills:
            return jsonify({
                "success": False,
                "message": "Please provide user skills"
            }), 400
        
        recommendations = get_recommendations(skills, top_n)
        
        return jsonify({
            "success": True,
            "recommendations": recommendations,
            "count": len(recommendations)
        })
    except Exception as e:
        logger.error(f"Error in recommendation endpoint: {str(e)}")
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

@app.route('/api/train', methods=['POST'])
def train():
    """Train the model"""
    try:
        train_recommendation_model()
        return jsonify({
            "success": True,
            "message": "Model trained successfully"
        })
    except Exception as e:
        logger.error(f"Error training model: {str(e)}")
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

@app.route('/api/jobs/seed', methods=['POST'])
def seed_jobs():
    """Seed sample jobs"""
    try:
        load_sample_jobs()
        train_recommendation_model()
        return jsonify({
            "success": True,
            "message": f"Seeded {len(jobs_data)} jobs"
        })
    except Exception as e:
        logger.error(f"Error seeding jobs: {str(e)}")
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

@app.route('/api/jobs', methods=['GET'])
def get_jobs():
    """Get all loaded jobs"""
    return jsonify({
        "success": True,
        "jobs": jobs_data,
        "count": len(jobs_data)
    })

if __name__ == '__main__':
    # Load sample data and train model on startup
    load_sample_jobs()
    train_recommendation_model()
    
    app.run(debug=True, port=5001, host='0.0.0.0')
