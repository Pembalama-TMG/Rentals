#!/bin/bash
# Monstrec Rentals - Deployment Preparation Script
# This script helps you prepare your project for deployment to Vercel

set -e

echo "========================================="
echo "Monstrec Rentals - Deployment Checker"
echo "========================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git is not initialized"
    echo "Run: git init"
    exit 1
else
    echo "✅ Git is initialized"
fi

# Check backend
echo ""
echo "Checking Backend..."
if [ ! -d "backend/node_modules" ]; then
    echo "⚠️  backend/node_modules not found"
    echo "Run: cd backend && npm install"
else
    echo "✅ Backend dependencies installed"
fi

if [ ! -f "backend/.env" ]; then
    echo "⚠️  backend/.env not found (copy from .env.example)"
    echo "Run: cp backend/.env.example backend/.env"
else
    echo "✅ Backend .env exists"
fi

if [ ! -f "backend/vercel.json" ]; then
    echo "❌ backend/vercel.json not found"
    exit 1
else
    echo "✅ Backend vercel.json exists"
fi

# Check frontend
echo ""
echo "Checking Frontend..."
if [ ! -d "frontend/node_modules" ]; then
    echo "⚠️  frontend/node_modules not found"
    echo "Run: cd frontend && npm install"
else
    echo "✅ Frontend dependencies installed"
fi

if [ ! -f "frontend/.env.local" ]; then
    echo "⚠️  frontend/.env.local not found (copy from .env.example)"
    echo "Run: cp frontend/.env.example frontend/.env.local"
else
    echo "✅ Frontend .env.local exists"
fi

if [ ! -f "frontend/dist" ]; then
    echo "⚠️  frontend/dist not found"
    echo "Run: cd frontend && npm run build"
else
    echo "✅ Frontend built successfully"
fi

# Check root vercel.json
if [ ! -f "vercel.json" ]; then
    echo "❌ Root vercel.json not found"
    exit 1
else
    echo "✅ Root vercel.json exists"
fi

echo ""
echo "========================================="
echo "✅ All checks passed!"
echo "========================================="
echo ""
echo "Next steps:"
echo "1. Set all environment variables in Vercel"
echo "2. Connect MongoDB Atlas"
echo "3. Setup Cloudinary"
echo "4. Deploy backend first"
echo "5. Deploy frontend with backend URL"
echo ""
echo "See VERCEL_DEPLOYMENT.md for details"
