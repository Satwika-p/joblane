#!/bin/bash
# generate-env.sh - Generate environment files from templates

echo "🔧 Setting up environment files..."

# Backend
if [ ! -f backend/.env ]; then
  echo "Creating backend/.env from template..."
  cp backend/.env.example backend/.env
  echo "✅ Created backend/.env"
  echo "   ⚠️  Please update with your MongoDB URI and JWT_SECRET"
else
  echo "ℹ️  backend/.env already exists"
fi

# Frontend
if [ ! -f frontend/.env ]; then
  echo "Creating frontend/.env from template..."
  cp frontend/.env.example frontend/.env
  echo "✅ Created frontend/.env"
else
  echo "ℹ️  frontend/.env already exists"
fi

# ML Service
if [ ! -f ml-service/.env ]; then
  echo "Creating ml-service/.env (if you need one)..."
  echo "FLASK_ENV=development" > ml-service/.env
  echo "✅ Created ml-service/.env"
else
  echo "ℹ️  ml-service/.env already exists"
fi

echo ""
echo "✅ Environment files setup complete!"
echo ""
echo "Next steps:"
echo "1. Update backend/.env with your MongoDB URI"
echo "2. Generate a strong JWT_SECRET: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\""
echo "3. Run: npm install in each directory"
echo "4. Run: npm run seed (in backend) to add sample data"
echo ""
