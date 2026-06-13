# Monstrec Rentals - Vercel Deployment

## Quick Start Deployment

### Option 1: Deploy Everything (Recommended for Beginners)

Deploy both frontend and backend to Vercel with these simple steps:

#### Step 1: Setup Services
1. Create free accounts:
   - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Database
   - [Cloudinary](https://cloudinary.com) - Image hosting
   - [Vercel](https://vercel.com) - Hosting

#### Step 2: Get Connection Strings

**MongoDB URI:**
1. Create a cluster in MongoDB Atlas
2. Add a database user
3. Click "Connect" → "Connect your application"
4. Copy the connection string

**Cloudinary Keys:**
1. Get from your Cloudinary dashboard

#### Step 3: Deploy Backend

```bash
# Push to GitHub
git add .
git commit -m "Deploy to Vercel"
git push origin main
```

1. Go to [vercel.com](https://vercel.com/dashboard)
2. Click "New Project" → Import your GitHub repo
3. Select `backend` as root directory
4. Add environment variables:
   - `MONGO_URI` → Your MongoDB connection string
   - `JWT_SECRET` → Generate a random string
   - `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
   - `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASSWORD`
   - `NODE_ENV` → `production`
5. Deploy!

**Save your backend URL**: `https://your-backend.vercel.app`

#### Step 4: Deploy Frontend

1. Create another Vercel project for frontend
2. Select `frontend` as root directory
3. Add environment variables:
   - `VITE_API_BASE_URL` → `https://your-backend.vercel.app/api`
4. Deploy!

**Your app is now live!** 🎉

---

### Option 2: Deploy Backend to Alternative Service

If you prefer not to use Vercel's serverless for backend, deploy to:
- **Railway.app** (recommended - $5/month credit)
- **Render.com** (free tier available)
- **Heroku** (paid - $7+/month)

Then use that backend URL in frontend environment variables.

---

## Environment Variables Reference

### Backend (.env)
```env
# MongoDB
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/monstrec

# JWT
JWT_SECRET=your_random_secret_key_123

# Email (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Cloudinary
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS
FRONTEND_URL=https://your-frontend.vercel.app

# General
NODE_ENV=production
PORT=5000
```

### Frontend (.env.local)
```env
# For development
VITE_API_BASE_URL=http://localhost:5000/api

# For production (after backend deployment)
VITE_API_BASE_URL=https://your-backend.vercel.app/api
```

---

## Verify Your Deployment

1. **Test Backend**
   - Visit: `https://your-backend.vercel.app/api/health`
   - Should return: `{ "status": "API is running ✓" }`

2. **Test Frontend**
   - Visit your frontend URL
   - Open DevTools → Network tab
   - Test login/register to verify API connection

3. **Check Logs**
   - Backend: Vercel Dashboard → Logs tab
   - Frontend: Vercel Dashboard → Deployments

---

## Troubleshooting

### "Cannot connect to API"
- Check `VITE_API_BASE_URL` in frontend environment variables
- Verify backend is deployed and health check works
- Check CORS: backend should have `FRONTEND_URL` set

### "MongoDB connection failed"
- Verify `MONGO_URI` is correct
- Check IP whitelist in MongoDB Atlas (allow all for testing: 0.0.0.0/0)
- Ensure database user password matches URI

### "Image upload fails"
- Verify Cloudinary credentials
- Check Cloudinary account isn't in read-only mode

### Build fails on Vercel
- Ensure `package-lock.json` is committed
- Check Node version compatibility (default is LTS)
- Review build logs in Vercel dashboard

---

## After Deployment

1. **Test all features** - Create accounts, book vehicles, upload images
2. **Monitor** - Check Vercel analytics and logs regularly
3. **Update** - Push changes to GitHub, Vercel auto-deploys
4. **Scale** - Upgrade MongoDB/Vercel plans as traffic grows

---

## File Structure for Vercel

```
.
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── vercel.json          ← Backend config
│   └── ...
├── frontend/
│   ├── vite.config.js       ← Updated with build config
│   ├── package.json
│   └── ...
├── vercel.json              ← Frontend config
├── .env.example
├── .gitignore
└── DEPLOYMENT_GUIDE.md
```

---

## Additional Resources

- [Vercel Docs](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
- [Cloudinary Docs](https://cloudinary.com/documentation)

---

**Questions?** Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed steps.
