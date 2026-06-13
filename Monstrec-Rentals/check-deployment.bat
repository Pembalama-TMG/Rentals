@echo off
REM Monstrec Rentals - Deployment Preparation Script (Windows)
REM This script helps you prepare your project for deployment to Vercel

echo =========================================
echo Monstrec Rentals - Deployment Checker
echo =========================================
echo.

REM Check if git is initialized
if not exist ".git" (
    echo [FAILED] Git is not initialized
    echo Run: git init
    exit /b 1
) else (
    echo [OK] Git is initialized
)

REM Check backend
echo.
echo Checking Backend...
if not exist "backend\node_modules" (
    echo [WARNING] backend\node_modules not found
    echo Run: cd backend ^&^& npm install
) else (
    echo [OK] Backend dependencies installed
)

if not exist "backend\.env" (
    echo [WARNING] backend\.env not found (copy from .env.example)
    echo Run: copy backend\.env.example backend\.env
) else (
    echo [OK] Backend .env exists
)

if not exist "backend\vercel.json" (
    echo [FAILED] backend\vercel.json not found
    exit /b 1
) else (
    echo [OK] Backend vercel.json exists
)

REM Check frontend
echo.
echo Checking Frontend...
if not exist "frontend\node_modules" (
    echo [WARNING] frontend\node_modules not found
    echo Run: cd frontend ^&^& npm install
) else (
    echo [OK] Frontend dependencies installed
)

if not exist "frontend\.env.local" (
    echo [WARNING] frontend\.env.local not found (copy from .env.example)
    echo Run: copy frontend\.env.example frontend\.env.local
) else (
    echo [OK] Frontend .env.local exists
)

if not exist "frontend\dist" (
    echo [WARNING] frontend\dist not found
    echo Run: cd frontend ^&^& npm run build
) else (
    echo [OK] Frontend built successfully
)

REM Check root vercel.json
if not exist "vercel.json" (
    echo [FAILED] Root vercel.json not found
    exit /b 1
) else (
    echo [OK] Root vercel.json exists
)

echo.
echo =========================================
echo [SUCCESS] All checks passed!
echo =========================================
echo.
echo Next steps:
echo 1. Set all environment variables in Vercel
echo 2. Connect MongoDB Atlas
echo 3. Setup Cloudinary
echo 4. Deploy backend first
echo 5. Deploy frontend with backend URL
echo.
echo See VERCEL_DEPLOYMENT.md for details
pause
