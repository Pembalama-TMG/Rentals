# Vercel Deployment - Troubleshooting Guide

## Build Issues

### Error: "Build failed with exit code 1"

**Cause**: Missing dependencies or syntax errors

**Solution**:
1. Check error logs in Vercel dashboard
2. Run locally: `npm run build` in both frontend and backend
3. Ensure `package-lock.json` is committed
4. Install any missing packages

---

### Error: "Cannot find module 'X'"

**Cause**: Dependency not installed or listed in package.json

**Solution**:
```bash
# Install the missing package
npm install package-name

# Commit the change
git add package.json package-lock.json
git commit -m "Add missing dependency"
git push
```

---

### Error: "Port 3000/5000 already in use"

**This is normal on Vercel** - Don't change the port listening, Vercel assigns ports dynamically.

---

## Runtime Issues

### Error: "Cannot connect to API / 503 Service Unavailable"

**Cause**: Backend not deployed or URL incorrect

**Solution**:
1. Verify backend URL: Visit `https://your-backend.vercel.app/api/health`
2. Should return: `{ "status": "API is running ✓" }`
3. Check frontend env var: `VITE_API_BASE_URL` is correct
4. Check CORS: Backend should have `FRONTEND_URL` environment variable

---

### Error: "CORS Error: Access denied"

**Message**: `Access to XMLHttpRequest at 'https://backend.vercel.app/api/...' from origin 'https://frontend.vercel.app' has been blocked by CORS policy`

**Cause**: CORS not properly configured

**Solution**:
1. Backend `server.js` has CORS config:
   ```javascript
   cors({ origin: process.env.FRONTEND_URL })
   ```
2. Ensure in Vercel backend settings:
   ```
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
3. If still failing, verify it's the exact URL (check for typos)

---

### Error: "TypeError: Cannot read property 'X' of undefined"

**Cause**: Environment variable not set

**Solution**:
1. Check Vercel Dashboard → Settings → Environment Variables
2. Ensure all required variables are set
3. Redeploy after adding variables:
   - Click "Redeploy" or push new commit to GitHub

---

## Database Issues

### Error: "Failed to connect to MongoDB"

**Cause**: Connection string wrong or IP not whitelisted

**Solution**:
1. Verify `MONGO_URI` format:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/monstrec?retryWrites=true&w=majority
   ```
   - Username and password must be URL encoded
   - Database name is after the last `/`

2. Check IP Whitelist in MongoDB Atlas:
   - Go to Security → Network Access
   - Add `0.0.0.0/0` (allow all) or specific Vercel IPs
   - For production, use IP ranges: https://vercel.com/docs/concepts/projects/environment-variables

3. Verify database user exists and password is correct

4. Test connection locally first:
   ```bash
   cd backend
   # Create .env with MONGO_URI
   node -e "import('./config/database.js').then(db => db.default())"
   ```

---

### Error: "MongoDB connection timeout"

**Cause**: Network issue or too many connections

**Solution**:
1. Check MongoDB Atlas status page
2. Verify internet connection
3. Reduce connection pool size in code if needed
4. Wait a few minutes and retry

---

### Error: "MongooseError: Authentication failed"

**Cause**: Password incorrect or user doesn't exist

**Solution**:
1. Verify password character-by-character
2. Check if password has special characters (must be URL encoded)
3. Verify username exists in MongoDB Atlas
4. Try resetting password in MongoDB Atlas

**Special characters in password**:
- `@` → `%40`
- `:` → `%3A`
- `#` → `%23`
- `?` → `%3F`
- `/` → `%2F`

---

## Frontend Issues

### Error: "Blank page / Not loading"

**Cause**: Build error or wrong configuration

**Solution**:
1. Check browser console for errors (F12)
2. Check Vercel build logs
3. Verify `vite.config.js` has proper build config
4. Test build locally: `npm run build && npm run preview`

---

### Error: "Module not found / Component not loading"

**Cause**: Import path incorrect or file not found

**Solution**:
1. Check exact file paths (case-sensitive)
2. Verify all imports exist
3. Run locally to verify builds
4. Check if all dependencies in package.json

---

### Error: "VITE_API_BASE_URL is undefined"

**Cause**: Environment variable not loaded

**Solution**:
1. Verify in Vercel Dashboard → Environment Variables:
   ```
   VITE_API_BASE_URL=https://your-backend.vercel.app/api
   ```
2. Must start with `VITE_` for Vite to expose it
3. Check `frontend/src/services/apiClient.js`:
   ```javascript
   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
   ```

---

## Email Issues

### Error: "Failed to send email / Email timeout"

**Cause**: Gmail credentials wrong or 2FA not setup

**Solution**:
1. Verify Gmail 2-Factor Authentication enabled:
   - Go to myaccount.google.com → Security
   - Enable 2-Step Verification

2. Generate App Password:
   - Go to Security → App passwords
   - Select "Mail" and "Windows Computer"
   - Copy 16-character password

3. Verify in Vercel env vars:
   ```
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_16_char_app_password
   ```

4. Test locally first:
   - Create `.env` with correct values
   - Try sending test email

---

### Error: "Emails going to spam"

**Solution**:
1. Check Gmail spam folder
2. Setup SPF/DKIM records (if using custom domain)
3. For production, use email service (SendGrid, Mailgun, etc.)

---

## Image Upload Issues

### Error: "Image upload fails / 413 Payload too large"

**Cause**: File size too large

**Solution**:
1. Check in `backend/server.js`:
   ```javascript
   app.use(express.json({ limit: '50mb' }));
   ```
2. Reduce file size or increase limit
3. Use Cloudinary image optimization

---

### Error: "Cloudinary upload fails / Invalid credentials"

**Cause**: Cloudinary keys wrong

**Solution**:
1. Verify in Vercel env vars:
   ```
   CLOUDINARY_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
2. Get from Cloudinary Dashboard → Settings → API Keys
3. Don't confuse Cloud Name with account name
4. Test locally with `.env` first

---

## Performance Issues

### Issue: "Slow loading / High latency"

**Solution**:
1. **Frontend**:
   - Check Vercel Analytics for regional latency
   - Enable caching in `vercel.json`
   - Use CDN (Cloudinary for images)
   - Optimize bundle size

2. **Backend**:
   - Check database query performance
   - Add indexes to MongoDB
   - Cache frequently accessed data
   - Monitor Vercel compute time

3. **Database**:
   - Use MongoDB Atlas M2+ tier for production
   - Check connection pool size
   - Ensure queries use indexes

---

## SSL/HTTPS Issues

### Error: "Mixed content blocked / Unsafe content"

**Cause**: Backend is HTTP, frontend is HTTPS

**Solution**:
1. Vercel automatically provides HTTPS
2. Ensure `VITE_API_BASE_URL` uses `https://`
3. Check backend also uses HTTPS (Vercel auto-provides)

---

### Error: "Certificate error / Untrusted certificate"

**This shouldn't happen on Vercel** - they provide free SSL certificates. If it does:
1. Clear browser cache and cookies
2. Try in incognito/private mode
3. Check if URL is correct

---

## Deployment Issues

### Error: "Build succeeds but deployment fails"

**Cause**: Runtime error after build

**Solution**:
1. Check backend logs in Vercel Logs tab
2. Look for MongoDB connection errors
3. Verify all environment variables are set
4. Check for unhandled exceptions

---

### Error: "Cannot redeploy / Deployment stuck"

**Cause**: Previous deployment still running

**Solution**:
1. Go to Deployments tab
2. Cancel running deployment
3. Redeploy

---

## Security Issues

### Warning: "Secrets exposed in logs"

**Solution**:
1. Never commit `.env` files
2. Check `.gitignore` includes `.env`
3. Use Vercel Environment Variables instead
4. Rotate any exposed secrets

---

### Issue: "API key in frontend code"

**Solution**:
1. Move sensitive keys to backend
2. Create backend endpoint that frontend calls
3. Backend calls external API with key
4. Return data to frontend

---

## Testing Deployment

### Verification Checklist

```bash
# 1. Check backend health
curl https://your-backend.vercel.app/api/health
# Should return: { "status": "API is running ✓" }

# 2. Check frontend loads
curl https://your-frontend.vercel.app
# Should return HTML

# 3. Test API call
curl https://your-backend.vercel.app/api/vehicles
# Should return vehicle data (or empty array)

# 4. Check logs
# Vercel Dashboard → your-project → Deployments → Logs
```

---

## Getting Help

### Log Access

1. **Frontend Logs**: Vercel Dashboard → frontend-project → Deployments → Click deployment → Logs
2. **Backend Logs**: Vercel Dashboard → backend-project → Deployments → Click deployment → Logs
3. **Database Logs**: MongoDB Atlas → Cluster → Logs

### Debug Mode

Add to backend `.env` for verbose logging:
```
DEBUG=*
LOG_LEVEL=debug
```

### Support Resources

- Vercel Docs: https://vercel.com/docs
- Vercel Community: https://github.com/vercel/community
- MongoDB Docs: https://docs.mongodb.com
- Express Docs: https://expressjs.com
- React Docs: https://react.dev

---

## Quick Fix Checklist

- [ ] Check environment variables in Vercel Dashboard
- [ ] Verify backend is deployed and health endpoint works
- [ ] Check frontend `VITE_API_BASE_URL` is correct
- [ ] Verify MongoDB connection string
- [ ] Check `.gitignore` excludes `.env` files
- [ ] Ensure all `package.json` dependencies are correct
- [ ] Check for console errors (DevTools F12)
- [ ] Verify Cloudinary and email credentials
- [ ] Clear browser cache and reload
- [ ] Check Vercel logs for specific errors

---

**Still stuck?** → Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) or [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
