import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts
import Header from './layouts/Header.jsx';
import Footer from './layouts/Footer.jsx';

// Pages
import Home from './pages/Home.jsx';
import Vehicles from './pages/Vehicles.jsx';
import VehicleDetail from './pages/VehicleDetail.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Pricing from './pages/Pricing.jsx';
import About from './pages/About.jsx';

// Components
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LandingModal from './components/LandingModal.jsx';

// Placeholder Pages
import CustomerDashboard from './pages/CustomerDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import OwnerDashboard from './pages/OwnerDashboard.jsx';
import OwnerRegister from './pages/OwnerRegister.jsx';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <LandingModal />
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/vehicle/:id" element={<VehicleDetail />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/owner/register" element={<OwnerRegister />} />

            {/* Customer Routes */}
            <Route
              path="/customer/bookings"
              element={
                <ProtectedRoute requiredRole="customer">
                  <CustomerDashboard tab="bookings" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/history"
              element={
                <ProtectedRoute requiredRole="customer">
                  <CustomerDashboard tab="history" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/profile"
              element={
                <ProtectedRoute requiredRole="customer">
                  <CustomerDashboard tab="profile" />
                </ProtectedRoute>
              }
            />

            {/* Owner Routes */}
            <Route
              path="/owner/dashboard"
              element={
                <ProtectedRoute requiredRole="owner">
                  <OwnerDashboard tab="overview" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/owner/vehicles"
              element={
                <ProtectedRoute requiredRole="owner">
                  <OwnerDashboard tab="vehicles" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/owner/bookings"
              element={
                <ProtectedRoute requiredRole="owner">
                  <OwnerDashboard tab="bookings" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/owner/earnings"
              element={
                <ProtectedRoute requiredRole="owner">
                  <OwnerDashboard tab="earnings" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/owner/reviews"
              element={
                <ProtectedRoute requiredRole="owner">
                  <OwnerDashboard tab="reviews" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/owner/settings"
              element={
                <ProtectedRoute requiredRole="owner">
                  <OwnerDashboard tab="settings" />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard tab="dashboard" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/vehicles"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard tab="vehicles" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/bookings"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard tab="bookings" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/customers"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard tab="customers" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard tab="analytics" />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster position="top-right" />
    </Router>
  );
}
