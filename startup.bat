@echo off
REM startup.bat - Start all services on Windows

echo 🚀 Starting Job Recommendation Platform...

REM Navigate to backend
cd backend
echo 📦 Installing backend dependencies...
call npm install

if not exist .env (
  echo Creating backend .env file...
  copy .env.example .env
  echo ⚠️  Please update .env with your configuration
)

echo 🔧 Starting backend server...
start cmd /k "npm run dev"

REM Navigate to ml-service
cd ..\ml-service
echo 📦 Creating Python virtual environment...
python -m venv venv

echo 📦 Installing ML service dependencies...
call venv\Scripts\activate.bat
pip install -r requirements.txt

echo 🤖 Starting ML service...
start cmd /k "python app.py"

REM Navigate to frontend
cd ..\frontend
echo 📦 Installing frontend dependencies...
call npm install

if not exist .env (
  echo Creating frontend .env file...
  copy .env.example .env
)

echo 🎨 Starting frontend server...
start cmd /k "npm start"

echo.
echo ✅ All services started!
echo.
echo Services running:
echo   - Backend:    http://localhost:5000
echo   - ML Service: http://localhost:5001
echo   - Frontend:   http://localhost:3000
echo.
echo Close the command windows to stop the services
pause
