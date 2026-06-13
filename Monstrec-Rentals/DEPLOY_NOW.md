# Monstrec Rentals - Vercel Deployment Quick Start

## 📋 What's New

Your project is now ready for production deployment on Vercel! New files added:

- **`vercel.json`** - Frontend deployment configuration
- **`backend/vercel.json`** - Backend deployment configuration  
- **`VERCEL_DEPLOYMENT.md`** - Quick deployment guide
- **`DEPLOYMENT_GUIDE.md`** - Detailed step-by-step instructions
- **`DEPLOYMENT_CHECKLIST.md`** - QA and testing checklist
- **`.env.example`** & **`frontend/.env.example`** - Environment variable templates
- **Updated `frontend/vite.config.js`** - Production build optimization

---

## 🚀 30-Minute Deployment

### 1. **Prepare** (5 minutes)
```bash
# Ensure everything is committed
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. **Setup Services** (10 minutes)
Create free accounts:
- [MongoDB Atlas](https://mongodb.com/cloud/atlas) - Get connection string
- [Cloudinary](https://cloudinary.com) - Get Cloud Name & API keys
- [Vercel](https://vercel.com) - Connect GitHub

### 3. **Deploy Backend** (5 minutes)
1. Vercel Dashboard → "New Project" → Import GitHub
2. Root Directory: `backend`
3. Add environment variables (see below)
4. Deploy!

### 4. **Deploy Frontend** (5 minutes)
1. Create another Vercel project
2. Root Directory: `frontend`
3. Set `VITE_API_BASE_URL` to your backend URL
4. Deploy!

### 5. **Verify** (5 minutes)
```
✓ Backend: https://your-backend.vercel.app/api/health
✓ Frontend: https://your-frontend.vercel.app
```

---

## 📝 Required Environment Variables

### Backend
```
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/monstrec
JWT_SECRET=generate_random_string_here
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=gmail_app_password
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
```

### Frontend
```
VITE_API_BASE_URL=https://your-backend.vercel.app/api
```

---

## 📖 Full Documentation

- **Quick Start**: Read [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
- **Detailed Steps**: Read [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Testing Checklist**: Read [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

---

## ✅ Local Testing Before Deployment

```bash
# Backend
cd backend
npm install
# Create .env file with local MongoDB
npm run dev

# Frontend (in another terminal)
cd frontend
npm install
npm run dev
```

Test:
- [ ] Login/Register works
- [ ] Can view vehicles
- [ ] Can create bookings
- [ ] Can upload images
- [ ] Can view dashboards

---

## 🔍 Verify Deployment

**Backend Health Check:**
```bash
curl https://your-backend.vercel.app/api/health
# Should return: { "status": "API is running ✓" }
```

**Frontend Check:**
- Visit URL in browser
- Open DevTools → Network tab
- Make API call (login, load vehicles, etc.)
- Verify API request shows correct backend URL
- No CORS errors should appear

---

## 🚨 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot connect to API" | Check `VITE_API_BASE_URL`, verify backend deployed |
| "MongoDB connection failed" | Verify connection string, IP whitelist in Atlas |
| "Build failed" | Check Vercel logs, ensure all deps in `package.json` |
| "Images not uploading" | Verify Cloudinary credentials are correct |
| "Emails not sending" | Verify Gmail app password, check spam folder |

---

## 📦 Project Structure

```
Monstrec-Rentals/
├── backend/                    # Express server
│   ├── server.js
│   ├── package.json
│   ├── vercel.json            # ← Backend deployment config
│   ├── config/
│   ├── controllers/
│   └── ...
├── frontend/                   # React + Vite
│   ├── vite.config.js         # ← Updated with build config
│   ├── package.json
│   ├── src/
│   └── ...
├── vercel.json                # ← Frontend deployment config
├── .env.example               # ← Copy to .env
├── VERCEL_DEPLOYMENT.md       # ← Start here
├── DEPLOYMENT_GUIDE.md
└── DEPLOYMENT_CHECKLIST.md
```

---

## 💡 Key Features Enabled

✅ Production-optimized Vite build  
✅ CORS properly configured  
✅ Environment variables management  
✅ Vercel serverless ready  
✅ MongoDB Atlas compatible  
✅ Cloudinary integration ready  
✅ Email notifications ready  

---

## 📱 Next Steps

1. **Read** [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
2. **Setup** external services (MongoDB, Cloudinary)
3. **Deploy** backend to Vercel
4. **Deploy** frontend to Vercel  
5. **Test** all features
6. **Monitor** with Vercel Analytics

---

## 🆘 Need Help?

- Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed steps
- Review [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for common issues
- Check Vercel documentation: https://vercel.com/docs
- Run verification script: `check-deployment.bat` (Windows) or `check-deployment.sh` (Mac/Linux)

---

**Ready to deploy?** → [Start with VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
