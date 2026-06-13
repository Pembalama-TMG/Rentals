# Vercel Deployment Guide

This guide will help you deploy both the frontend and backend of the Monstrec Rentals MERN application to Vercel.

## Prerequisites

- GitHub account with the repository pushed
- Vercel account (free at https://vercel.com)
- MongoDB Atlas account for database hosting (https://www.mongodb.com/cloud/atlas)
- Cloudinary account for image hosting (https://cloudinary.com)

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Vercel Frontend                      │
│  (React/Vite - Serverless, auto-scaling)               │
└─────────────────┬───────────────────────────────────────┘
                  │ HTTPS API Calls
                  ▼
┌─────────────────────────────────────────────────────────┐
│                    Vercel Backend                       │
│  (Node.js/Express - Serverless Functions)              │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
        ┌─────────────────────┐
        │   MongoDB Atlas     │
        │    (Database)       │
        └─────────────────────┘
```

---

## Step 1: Prepare Your Repository

### 1.1 Push your code to GitHub

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 1.2 Create environment files locally for testing

**Frontend** - Create `frontend/.env.local`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

**Backend** - Create `backend/.env`:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/monstrec?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
PORT=5000
```

---

## Step 2: Deploy Backend to Vercel

### 2.1 Login to Vercel and Create a New Project

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Select the root directory (Monstrec-Rentals)

### 2.2 Configure Backend Project

1. **Project Name**: `monstrec-backend` (or your preference)
2. **Framework**: Node.js
3. **Root Directory**: Select `backend`
4. **Build Command**: `npm install` (or leave empty - Vercel auto-detects)
5. **Output Directory**: Leave empty
6. **Install Command**: `npm install`

### 2.3 Add Environment Variables

In the Vercel dashboard, go to Settings → Environment Variables and add:

```
MONGO_URI = your_mongodb_connection_string
JWT_SECRET = your_jwt_secret_key
EMAIL_HOST = smtp.gmail.com
EMAIL_PORT = 587
EMAIL_USER = your_email@gmail.com
EMAIL_PASSWORD = your_app_password
CLOUDINARY_NAME = your_cloudinary_name
CLOUDINARY_API_KEY = your_api_key
CLOUDINARY_API_SECRET = your_api_secret
FRONTEND_URL = (leave empty for now, update after frontend deployment)
NODE_ENV = production
```

### 2.4 Deploy

Click "Deploy" and wait for completion. After deployment, you'll get a URL like:
```
https://monstrec-backend.vercel.app
```

**Save this URL** - you'll need it for the frontend.

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Create a New Frontend Project

1. In Vercel dashboard, click "New Project"
2. Import the same GitHub repository
3. **Project Name**: `monstrec-frontend` (or your preference)

### 3.2 Configure Frontend Project

1. **Framework Preset**: Vite
2. **Root Directory**: Select `frontend`
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Install Command**: `npm install`

### 3.3 Add Environment Variables

Add in Environment Variables:

```
VITE_API_BASE_URL = https://monstrec-backend.vercel.app/api
```

(Replace with your actual backend URL from Step 2.4)

### 3.4 Deploy

Click "Deploy" and wait for completion.

---

## Step 4: Update Backend Environment Variable

After frontend deployment:

1. Go to your backend project settings in Vercel
2. Go to Settings → Environment Variables
3. Update `FRONTEND_URL`:
   ```
   FRONTEND_URL = https://your-frontend-project.vercel.app
   ```
4. This triggers a redeployment automatically

---

## Step 5: Setup MongoDB Atlas

### 5.1 Create MongoDB Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with password
4. Whitelist Vercel IP (or allow all: `0.0.0.0/0`)

### 5.2 Get Connection String

1. Click "Connect"
2. Choose "Connect your application"
3. Copy the MongoDB URI
4. Replace `<password>` with your database password
5. Use this as your `MONGO_URI` environment variable

**Format**:
```
mongodb+srv://username:password@cluster.mongodb.net/monstrec?retryWrites=true&w=majority
```

---

## Step 6: Setup Cloudinary (for image uploads)

1. Sign up at [Cloudinary](https://cloudinary.com)
2. Go to Dashboard
3. Copy your:
   - Cloud Name
   - API Key
   - API Secret
4. Add these to your backend environment variables in Vercel

---

## Step 7: Setup Email (Nodemailer with Gmail)

### 7.1 Enable Gmail App Password

1. Go to [Google Account](https://myaccount.google.com)
2. Enable 2-Factor Authentication
3. Go to Security → App passwords
4. Select Mail and Device
5. Copy the 16-character password
6. Use this as `EMAIL_PASSWORD` in Vercel environment variables

---

## Step 8: Test Your Deployment

### 8.1 Test Backend Health Check

Visit:
```
https://your-backend-project.vercel.app/api/health
```

You should see:
```json
{ "status": "API is running ✓" }
```

### 8.2 Test Frontend

Visit your frontend URL and test:
- Load the home page
- Check API calls in Network tab (browser DevTools)
- Test login/register functions

### 8.3 Check Logs

In Vercel dashboard:
- Frontend project → Logs tab to see build logs
- Backend project → Logs tab to see runtime logs

---

## Troubleshooting

### CORS Issues

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**: The CORS configuration in `backend/server.js` should automatically handle this:
```javascript
cors({ origin: process.env.FRONTEND_URL })
```

Make sure `FRONTEND_URL` environment variable is set correctly in Vercel.

### API Connection Issues

**Error**: `Cannot connect to API` or `Failed to fetch`

**Solution**:
1. Verify backend is deployed and running
2. Check `VITE_API_BASE_URL` is correct in frontend environment
3. Check backend URL is accessible in browser
4. Check browser console for exact error

### Database Connection Issues

**Error**: `Failed to connect to MongoDB`

**Solution**:
1. Verify `MONGO_URI` is correct
2. Check IP whitelist in MongoDB Atlas (allow `0.0.0.0/0` for testing)
3. Check database user password is correct
4. Verify network connectivity

### Build Failures

Check Vercel build logs:
1. Go to Deployments tab
2. Click on the failed deployment
3. See "Build" tab for error messages

Common issues:
- Missing dependencies: Run `npm install` locally and commit `package-lock.json`
- Environment variables: Ensure all required variables are set
- Node version: Ensure compatibility with dependencies

---

## Production Checklist

- [ ] All environment variables set in Vercel
- [ ] MongoDB connection tested
- [ ] Cloudinary account connected
- [ ] Email service configured
- [ ] CORS properly configured
- [ ] Frontend URL correct in backend env vars
- [ ] Backend URL correct in frontend env vars
- [ ] Health endpoint returns `{ status: 'API is running ✓' }`
- [ ] Can login/register with test account
- [ ] Image uploads work
- [ ] Booking functionality works
- [ ] No console errors in browser

---

## Scaling & Performance

For production usage:

1. **MongoDB Atlas**: Use a paid tier for better performance
2. **Cloudinary**: Optimize image delivery with Cloudinary CDN
3. **Vercel**: Monitor bandwidth and compute usage in dashboard
4. **Analytics**: Check "Analytics" tab in Vercel for traffic insights

---

## Domain Setup (Optional)

To use a custom domain:

1. In Vercel Dashboard → Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `FRONTEND_URL` in backend environment if changed

---

## Rolling Back

To rollback to a previous deployment:

1. Go to Deployments tab
2. Find the previous stable deployment
3. Click "..." menu → Promote to Production

---

## Support Links

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com)
- [Cloudinary Docs](https://cloudinary.com/documentation)
- [Express CORS](https://www.npmjs.com/package/cors)

