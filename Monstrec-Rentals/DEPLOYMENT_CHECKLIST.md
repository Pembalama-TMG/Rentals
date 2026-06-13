# Monstrec Rentals - Deployment Checklist

## Pre-Deployment Setup

### 1. Local Environment
- [ ] Clone repository locally
- [ ] Run `npm install` in both `backend` and `frontend`
- [ ] Create `.env` files (copy from `.env.example`)
- [ ] Test application locally with `npm run dev` (backend and frontend)
- [ ] Verify all features work locally (login, booking, payments, uploads)

### 2. External Services Setup
- [ ] Create MongoDB Atlas account and cluster
  - [ ] Create database user
  - [ ] Get connection string
  - [ ] Whitelist Vercel IP (0.0.0.0/0 for testing)
- [ ] Create Cloudinary account
  - [ ] Copy Cloud Name
  - [ ] Copy API Key
  - [ ] Copy API Secret
- [ ] Setup Gmail App Password (for email notifications)
  - [ ] Enable 2FA on Google Account
  - [ ] Generate App Password
  - [ ] Save the 16-character password

### 3. Version Control
- [ ] Create GitHub repository
- [ ] Push all code to GitHub
- [ ] Verify `.gitignore` properly excludes `.env` files
- [ ] Commit all configuration files (`.env.example`, `vercel.json`, etc.)

### 4. Vercel Account
- [ ] Create Vercel account (https://vercel.com)
- [ ] Connect GitHub account to Vercel
- [ ] Verify can import repositories

## Backend Deployment (Vercel)

### 5. Create Backend Project
- [ ] In Vercel Dashboard: Click "New Project"
- [ ] Import your GitHub repository
- [ ] Set Root Directory to `backend`
- [ ] Set Build Command: `npm install` (or leave empty)
- [ ] Set Install Command: `npm install`
- [ ] Click "Deploy"

### 6. Configure Backend Environment Variables
In Vercel Backend Project Settings → Environment Variables:
- [ ] `MONGO_URI` = MongoDB connection string
- [ ] `JWT_SECRET` = Random secure string (min 32 chars)
- [ ] `EMAIL_HOST` = `smtp.gmail.com`
- [ ] `EMAIL_PORT` = `587`
- [ ] `EMAIL_USER` = Your Gmail address
- [ ] `EMAIL_PASSWORD` = Gmail App Password (16-char)
- [ ] `CLOUDINARY_NAME` = Your Cloudinary name
- [ ] `CLOUDINARY_API_KEY` = Your API key
- [ ] `CLOUDINARY_API_SECRET` = Your API secret
- [ ] `FRONTEND_URL` = (Leave empty for now, update after frontend deployed)
- [ ] `NODE_ENV` = `production`

### 7. Test Backend Deployment
- [ ] Wait for deployment to complete
- [ ] Visit `https://your-backend.vercel.app/api/health`
- [ ] Confirm response: `{ "status": "API is running ✓" }`
- [ ] Save backend URL

### 8. Update Backend Environment
- [ ] Go to backend project settings
- [ ] Update `FRONTEND_URL` with your frontend URL (from next section)
- [ ] This triggers redeployment

## Frontend Deployment (Vercel)

### 9. Create Frontend Project
- [ ] In Vercel Dashboard: Click "New Project"
- [ ] Import your GitHub repository
- [ ] Set Root Directory to `frontend`
- [ ] Set Build Command: `npm run build`
- [ ] Set Output Directory: `dist`
- [ ] Set Install Command: `npm install`
- [ ] Click "Deploy"

### 10. Configure Frontend Environment Variables
In Vercel Frontend Project Settings → Environment Variables:
- [ ] `VITE_API_BASE_URL` = `https://your-backend.vercel.app/api`

### 11. Test Frontend Deployment
- [ ] Wait for frontend deployment to complete
- [ ] Visit frontend URL
- [ ] Open DevTools → Network tab
- [ ] Test navigation between pages
- [ ] Test login (should see API call to backend)
- [ ] Test creating account
- [ ] Test uploading images (should use Cloudinary)
- [ ] Verify no CORS errors in console

## Post-Deployment Testing

### 12. Feature Testing
- [ ] **Authentication**
  - [ ] Register new account
  - [ ] Login with credentials
  - [ ] Logout works
  - [ ] Protected routes redirect to login
- [ ] **Vehicles**
  - [ ] View all vehicles
  - [ ] Filter by location/type
  - [ ] View vehicle details
  - [ ] Owner can add vehicle
  - [ ] Owner can update vehicle
- [ ] **Bookings**
  - [ ] Create booking
  - [ ] View booking details
  - [ ] Cancel booking
  - [ ] Owner can approve/reject bookings
- [ ] **Payments**
  - [ ] Payment processing works
  - [ ] Payment confirmation appears
- [ ] **Images**
  - [ ] Images upload to Cloudinary
  - [ ] Images display correctly
  - [ ] Image optimization works
- [ ] **Email**
  - [ ] Confirmation emails sent (check spam)
  - [ ] Booking notifications sent
- [ ] **Analytics**
  - [ ] Owner dashboard shows data
  - [ ] Charts display correctly

### 13. Performance & Security
- [ ] [ ] Frontend loads in under 3 seconds
- [ ] [ ] No console errors or warnings
- [ ] [ ] No 404 errors for assets
- [ ] [ ] All external resources load (CSS, JS, images)
- [ ] [ ] HTTPS works (green lock in browser)
- [ ] [ ] CORS headers are correct (no wildcard)
- [ ] [ ] Sensitive data not exposed in frontend code

### 14. Error Handling
- [ ] Test with invalid credentials (error message shown)
- [ ] Test with network error (graceful fallback)
- [ ] Test with server error (friendly error message)
- [ ] Check logs for any unhandled exceptions

## Monitoring & Maintenance

### 15. Setup Monitoring
- [ ] Add Vercel Analytics to track traffic
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Monitor MongoDB usage
- [ ] Monitor Cloudinary usage
- [ ] Set up alerts for failures

### 16. Scaling Considerations
- [ ] Plan database scaling (upgrade MongoDB if needed)
- [ ] Monitor Vercel bandwidth
- [ ] Plan Cloudinary CDN usage
- [ ] Prepare for traffic spikes

### 17. Documentation & Handoff
- [ ] [ ] Documented all environment variables
- [ ] [ ] Created user guide for admins
- [ ] [ ] Documented backup procedures
- [ ] [ ] Documented emergency contacts

## Troubleshooting

### Common Issues & Solutions

**Issue: "Cannot connect to API"**
- [ ] Check backend is deployed and running
- [ ] Verify `VITE_API_BASE_URL` is correct
- [ ] Check CORS headers in Response tab
- [ ] Check backend logs for errors

**Issue: "MongoDB connection failed"**
- [ ] Verify connection string in `MONGO_URI`
- [ ] Check IP whitelist allows Vercel IP
- [ ] Verify database user password
- [ ] Check network connectivity in MongoDB Atlas logs

**Issue: "Image uploads fail"**
- [ ] Verify Cloudinary credentials
- [ ] Check account isn't in read-only mode
- [ ] Verify upload preset exists
- [ ] Check file size limits

**Issue: "Build fails on Vercel"**
- [ ] Check build logs in Vercel dashboard
- [ ] Verify all dependencies in package.json
- [ ] Ensure `package-lock.json` is committed
- [ ] Check Node version compatibility

**Issue: "Emails not sending"**
- [ ] Verify Gmail App Password is correct
- [ ] Check if Gmail account blocked the attempt
- [ ] Verify `EMAIL_USER` is correct
- [ ] Check spam folder

## Sign-Off

- [ ] **QA Approved**: All features tested and working
- [ ] **Performance**: Load times acceptable
- [ ] **Security**: No exposed secrets or vulnerabilities
- [ ] **Monitoring**: Alerts and logging configured
- [ ] **Documentation**: Everything documented

---

**Deployment Date**: _______________
**Deployed By**: _______________
**Notes**: _______________________________________________________________

---

For detailed instructions, see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) and [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
