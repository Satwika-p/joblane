@echo off
REM setup.bat - Generate environment files for Windows

echo 🔧 Setting up environment files...

REM Backend
if not exist backend\.env (
  echo Creating backend\.env from template...
  copy backend\.env.example backend\.env
  echo ✅ Created backend\.env
  echo    ⚠️  Please update with your MongoDB URI and JWT_SECRET
) else (
  echo ℹ️  backend\.env already exists
)

REM Frontend
if not exist frontend\.env (
  echo Creating frontend\.env from template...
  copy frontend\.env.example frontend\.env
  echo ✅ Created frontend\.env
) else (
  echo ℹ️  frontend\.env already exists
)

echo.
echo ✅ Environment files setup complete!
echo.
echo Next steps:
echo 1. Update backend\.env with your MongoDB URI
echo 2. Generate a strong JWT_SECRET
echo 3. Run: npm install in each directory
echo 4. Run: npm run seed (in backend) to add sample data
echo.
pause
