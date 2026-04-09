#!/bin/bash
# startup.sh - Start all services

echo "🚀 Starting Job Recommendation Platform..."

# Check if MongoDB is running
echo "Checking MongoDB..."
mongosh --version > /dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "⚠️  MongoDB not found. Please install MongoDB or start it separately."
else
  echo "✓ MongoDB found"
fi

# Navigate to backend
cd backend
echo "📦 Installing backend dependencies..."
npm install

# Create .env if not exists
if [ ! -f .env ]; then
  echo "Creating backend .env file..."
  cp .env.example .env
  echo "⚠️  Please update .env with your configuration"
fi

# Start backend
echo "🔧 Starting backend server..."
npm run dev &
BACKEND_PID=$!

# Navigate to ml-service
cd ../ml-service
echo "📦 Creating Python virtual environment..."
python -m venv venv

# Activate virtual environment
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
  source venv/Scripts/activate
else
  source venv/bin/activate
fi

echo "📦 Installing ML service dependencies..."
pip install -r requirements.txt

# Start ML service
echo "🤖 Starting ML service..."
python app.py &
ML_PID=$!

# Navigate to frontend
cd ../frontend
echo "📦 Installing frontend dependencies..."
npm install

# Create .env if not exists
if [ ! -f .env ]; then
  echo "Creating frontend .env file..."
  cp .env.example .env
fi

# Start frontend
echo "🎨 Starting frontend server..."
npm start &
FRONTEND_PID=$!

echo ""
echo "✅ All services started!"
echo ""
echo "Services running:"
echo "  - Backend:    http://localhost:5000"
echo "  - ML Service: http://localhost:5001"
echo "  - Frontend:   http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Wait for any process to exit
wait $BACKEND_PID $ML_PID $FRONTEND_PID

# Kill all services if one exits
kill $BACKEND_PID $ML_PID $FRONTEND_PID
