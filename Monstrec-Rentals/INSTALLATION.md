# 🚀 Installation & Setup Guide

## Complete Step-by-Step Installation Instructions

### Prerequisites
Before you begin, make sure you have:
- **Node.js** v18+ ([Download](https://nodejs.org/))
- **npm** or **yarn**
- **Git** ([Download](https://git-scm.com/))
- **MongoDB Atlas Account** ([Sign up free](https://www.mongodb.com/cloud/atlas))
- **Text Editor/IDE** (VS Code recommended)

## Part 1: Backend Setup

### Step 1.1: Navigate to Backend Directory
```bash
cd Monstrec-Rentals/backend
```

### Step 1.2: Install Dependencies
```bash
npm install
```

This will install all required packages including:
- Express.js for server
- Mongoose for MongoDB
- JWT for authentication
- And more...

### Step 1.3: Create Environment File
Create a `.env` file in the backend directory:

```bash
# Windows
type nul > .env

# Mac/Linux
touch .env
```

### Step 1.4: Configure Environment Variables
Edit `.env` and add your MongoDB connection string:

```env
PORT=5000
NODE_ENV=development

# MongoDB Connection (Already provided)
MONGO_URI=mongodb+srv://pembalopchantmg_db_user:Cancerjuly%408@cluster0.ygyton9.mongodb.net/?appName=Cluster0

# JWT Configuration
JWT_SECRET=monstrec_super_secret_key_change_in_production
JWT_EXPIRE=7d

# Frontend URL for CORS
FRONTEND_URL=http://localhost:5173

# API Base URL
API_BASE_URL=http://localhost:5000
```

### Step 1.5: Start Backend Server
```bash
npm run dev
```

You should see:
```
✓ Server running on http://localhost:5000
✓ MongoDB Connected
```

## Part 2: Frontend Setup

### Step 2.1: Open New Terminal & Navigate to Frontend
```bash
cd Monstrec-Rentals/frontend
```

### Step 2.2: Install Dependencies
```bash
npm install
```

This will install:
- React & React DOM
- Vite for fast development
- Tailwind CSS for styling
- Framer Motion for animations
- And more...

### Step 2.3: Create Environment File
```bash
# Windows
type nul > .env

# Mac/Linux
touch .env
```

### Step 2.4: Configure Environment Variables
Edit `.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Monstrec Rentals
VITE_ESEWA_MERCHANT_CODE=MONSTREC
VITE_KHALTI_PUBLIC_KEY=your_khalti_public_key_here
```

### Step 2.5: Start Frontend Server
```bash
npm run dev
```

You should see:
```
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

## Part 3: Seed Database

### Step 3.1: Open Terminal in Backend Directory
```bash
cd Monstrec-Rentals/backend
```

### Step 3.2: Run Seed Command
```bash
npm run seed
```

This creates:
- 1 Admin User
- 3 Customer Users
- 6 Sample Vehicles
- 2 Sample Bookings
- Sample Payment Records

### Step 3.3: Check Console Output
You should see:
```
✓ Connected to database. Seeding data...
✓ Admin user created
✓ Customer users created
✓ Vehicles created
✓ Bookings created
✓ Payments created
✓ Settings created
✓ All seed data created successfully!

📋 Credentials:
Admin Email: admin@monstrec.com
Admin Password: Admin@123

Customer Email: ramesh@example.com
Customer Password: Password@123
```

## Part 4: Access the Application

### Open Your Browser
```
http://localhost:5173
```

### Homepage
You'll see the Monstrec Rentals homepage with:
- Hero section
- Popular vehicles
- Features showcase

### Navigation
- **Home**: Main landing page
- **Browse Vehicles**: View all scooters and bikes
- **Pricing**: See rental rates
- **About**: Company information
- **Login/Register**: Create account or login

## Testing the Application

### Test as Customer
1. Click **Register**
2. Fill in your details:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Password: Password@123
   - Phone: +977-9841234567
   - City: Kathmandu
3. Submit to create account
4. Browse vehicles
5. Click on a vehicle to see details
6. Fill booking form and submit

### Test as Admin
1. Click **Login**
2. Use credentials:
   - Email: `admin@monstrec.com`
   - Password: `Admin@123`
3. You'll be redirected to Admin Dashboard
4. Explore Analytics, Vehicles, Bookings, Customers

### Or Use Pre-created Customer
1. Click **Login**
2. Use:
   - Email: `ramesh@example.com`
   - Password: `Password@123`

## Troubleshooting

### Issue: MongoDB Connection Error
**Solution:**
```
- Check connection string in .env
- Verify IP whitelist in MongoDB Atlas
- Ensure internet connection
- Try reconnecting
```

### Issue: Port 5000 or 5173 Already in Use
**Solution:**
```
# For backend, change in .env:
PORT=5001

# For frontend, Vite will auto-select next available port
```

### Issue: Module Not Found
**Solution:**
```bash
# Reinstall dependencies
cd backend
rm -rf node_modules package-lock.json
npm install

# Or for frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Issue: CORS Error
**Solution:**
```
- Check FRONTEND_URL in backend .env
- Should match exactly: http://localhost:5173
- Restart backend server
```

### Issue: Images Not Uploading
**Solution:**
```
- Cloudinary is optional
- Backend will use placeholder if not configured
- To enable: Add Cloudinary credentials to .env
```

## Build for Production

### Backend Build
```bash
cd backend
npm start
```

### Frontend Build
```bash
cd frontend
npm run build
npm run preview
```

## Development Tips

### Hot Module Replacement (HMR)
Frontend changes auto-refresh without page reload.

### API Testing
Use Postman or Insomnia:
1. Import API requests
2. Set Authorization header with token
3. Test endpoints

### Debugging
- Backend: Check console logs
- Frontend: Use browser DevTools (F12)
- Network: Check API calls in Network tab

### Database Management
- Use MongoDB Compass for visualization
- Connection: `mongodb+srv://pembalopchantmg_db_user:Cancerjuly%408@cluster0.ygyton9.mongodb.net/`

## Next Steps

1. **Customize Colors**: Edit `frontend/tailwind.config.js`
2. **Add More Vehicles**: Use Admin Panel
3. **Set Up Payments**: Configure eSewa/Khalti
4. **Deploy**: Use Vercel (frontend) + Render/Heroku (backend)

## Support

Having issues? Check:
1. Verify all .env files are correct
2. Check MongoDB connection
3. Ensure all dependencies installed
4. Check terminal for error messages
5. Clear browser cache

---

**Happy coding! 🚀**
