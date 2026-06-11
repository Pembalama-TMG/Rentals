# 🛴 Monstrec Rentals - Scooter & Bike Rental Management System

A modern, responsive, and fully functional MERN stack application for managing scooter and bike rentals in Nepal.

![Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-ISC-blue)
![Node Version](https://img.shields.io/badge/node-v18+-green)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Features Overview](#features-overview)
- [Default Credentials](#default-credentials)
- [Contributing](#contributing)

## ✨ Features

### Customer Features
- ✅ User authentication (Register/Login)
- ✅ Browse scooters and bikes with filters
- ✅ Detailed vehicle information with images
- ✅ Book vehicles for per-km or full-day rental
- ✅ Automatic cost calculation with taxes
- ✅ View booking status and history
- ✅ Secure online payments (eSewa/Khalti)
- ✅ Profile management
- ✅ Responsive design

### Admin Features
- ✅ Dashboard with analytics
- ✅ Vehicle management (CRUD)
- ✅ Booking management (approve/reject/complete)
- ✅ Customer management
- ✅ Revenue reports and charts
- ✅ Popular vehicle analytics
- ✅ Monthly/Daily revenue tracking
- ✅ Role-based access control

### General Features
- ✅ JWT authentication
- ✅ Password encryption with bcrypt
- ✅ MongoDB database
- ✅ Modern UI with Tailwind CSS
- ✅ Smooth animations with Framer Motion
- ✅ Toast notifications
- ✅ Mobile responsive
- ✅ Dark mode compatible
- ✅ Production-ready code

## 🛠 Tech Stack

### Frontend
- **React.js** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Redux Toolkit** - State management
- **React Router** - Routing
- **Axios** - HTTP client
- **React Icons** - Icons
- **React Hot Toast** - Notifications
- **Recharts** - Charts

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB Atlas** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **Multer** - File uploads
- **Cloudinary** - Image storage
- **Nodemailer** - Email service
- **Helmet** - Security

## 📦 Installation

### Prerequisites
- Node.js (v18+)
- npm or yarn
- MongoDB Atlas account
- Git

### Step 1: Clone the Repository

```bash
cd Monstrec-Rentals
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## ⚙️ Configuration

### Backend Setup

1. **Create `.env` file in the backend directory:**

```env
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGO_URI=mongodb+srv://pembalopchantmg_db_user:Cancerjuly%408@cluster0.ygyton9.mongodb.net/?appName=Cluster0

# JWT Secrets
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Cloudinary (optional - for image uploads)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email Configuration (optional)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Frontend URL
FRONTEND_URL=http://localhost:5173

# API Base URL
API_BASE_URL=http://localhost:5000
```

### Frontend Setup

1. **Create `.env` file in the frontend directory:**

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Monstrec Rentals
VITE_ESEWA_MERCHANT_CODE=MONSTREC
VITE_KHALTI_PUBLIC_KEY=your_khalti_public_key_here
```

2. **Configure Tailwind CSS** (already done)

## 🚀 Running the Application

### Development Mode

#### Terminal 1: Start Backend Server

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:5000`

#### Terminal 2: Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

### Seed Database with Sample Data

```bash
cd backend
npm run seed
```

This will create:
- 1 Admin user
- 3 Customer users
- 6 Vehicles
- Sample bookings

## 📚 API Documentation

### Authentication Endpoints

#### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+977-9841234567",
  "city": "Kathmandu"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Profile
```
GET /api/auth/profile
Authorization: Bearer <token>
```

### Vehicle Endpoints

#### Get All Vehicles
```
GET /api/vehicles
GET /api/vehicles?type=scooter&brand=Honda
```

#### Get Vehicle by ID
```
GET /api/vehicles/:id
```

#### Create Vehicle (Admin)
```
POST /api/vehicles
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data

{
  "name": "Honda Activa",
  "brand": "Honda",
  "type": "scooter",
  ...
}
```

### Booking Endpoints

#### Create Booking
```
POST /api/bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "vehicleId": "...",
  "startDate": "2024-06-15",
  "endDate": "2024-06-16",
  "rentalType": "fullDay",
  "pickupLocation": "Kathmandu",
  "dropoffLocation": "Thamel"
}
```

#### Get All Bookings
```
GET /api/bookings
Authorization: Bearer <token>
```

## 📁 Project Structure

```
Monstrec-Rentals/
│
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── email.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Vehicle.js
│   │   ├── Booking.js
│   │   ├── Payment.js
│   │   ├── Analytics.js
│   │   └── Settings.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── vehicleRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── userRoutes.js
│   │   └── analyticsRoutes.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── vehicleController.js
│   │   ├── bookingController.js
│   │   ├── paymentController.js
│   │   ├── userController.js
│   │   └── analyticsController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── upload.js
│   ├── utils/
│   │   ├── jwt.js
│   │   ├── cloudinary.js
│   │   ├── helpers.js
│   │   └── seedData.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── VehicleCard.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── LoadingSkeleton.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Vehicles.jsx
│   │   │   ├── VehicleDetail.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Pricing.jsx
│   │   │   ├── About.jsx
│   │   │   ├── CustomerDashboard.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── layouts/
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   ├── redux/
│   │   │   ├── store.js
│   │   │   └── slices/
│   │   │       ├── authSlice.js
│   │   │       ├── vehicleSlice.js
│   │   │       └── bookingSlice.js
│   │   ├── services/
│   │   │   ├── apiClient.js
│   │   │   └── api.js
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useVehicles.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env
│
└── README.md
```

## 🎯 Features Overview

### Pricing System (Nepal)
- **Scooter**: NPR 20/km or NPR 1000/day
- **Bike**: NPR 20/km or NPR 1500/day
- **Tax**: 13% VAT included
- **Cancellation Fee**: 10% if cancelled within 24 hours

### Vehicle Management
- Multiple vehicle types (Scooter, Bike)
- Multiple brands (Honda, Yamaha, TVS, Hero, Suzuki, Bajaj)
- Vehicle images and detailed specs
- Availability tracking
- Ratings and reviews

### Booking System
- Per-km and full-day rental options
- Automatic cost calculation
- Booking status tracking
- Payment integration ready
- Cancellation with refund calculation

### Analytics
- Total bookings and revenue
- Monthly/daily revenue reports
- Popular vehicles
- Customer statistics
- Vehicle performance metrics

## 🔐 Default Credentials

Use these for testing after seeding the database:

### Admin User
- **Email**: `admin@monstrec.com`
- **Password**: `Admin@123`
- Access: Admin Dashboard

### Customer User
- **Email**: `ramesh@example.com`
- **Password**: `Password@123`
- Access: Customer Dashboard

## 📝 Environmental Variables

### Required Variables
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `FRONTEND_URL` - Frontend URL for CORS

### Optional Variables
- `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` - For image uploads
- `EMAIL_USER`, `EMAIL_PASSWORD` - For email notifications
- `ESEWA_*`, `KHALTI_*` - For payment integration

## 🔒 Security Features

- JWT authentication
- Password hashing with bcryptjs
- Role-based access control (RBAC)
- Input validation
- CORS protection
- Helmet security headers
- Environment variables for sensitive data

## 🎨 UI/UX Features

- Modern gradient backgrounds
- Smooth animations with Framer Motion
- Responsive grid layouts
- Loading skeletons
- Toast notifications
- Hover effects and transitions
- Mobile-first design
- Accessible components

## 📱 Responsive Design

- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+
- Full screen: 1280px+

## 🐛 Common Issues & Solutions

### MongoDB Connection Error
- Verify MongoDB Atlas connection string
- Check IP address whitelisting
- Ensure network connectivity

### Port Already in Use
- Backend: Change PORT in `.env`
- Frontend: Vite will auto-select next port

### CORS Error
- Check `FRONTEND_URL` in backend `.env`
- Verify frontend URL matches

### Image Upload Not Working
- Set up Cloudinary account
- Add credentials to `.env`
- Or remove image upload feature

## 📞 Support

For issues and questions:
- Email: info@monstrec.com
- Phone: +977-1-4123456
- Address: Thamel, Kathmandu, Nepal

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Push to the branch
5. Open a Pull Request

---

Made with ❤️ for Nepal 🇳🇵

**Monstrec Rentals © 2024**
