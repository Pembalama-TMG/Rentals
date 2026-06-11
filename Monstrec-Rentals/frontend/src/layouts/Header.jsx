import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Sun, Moon } from 'lucide-react';
import useAuth from '../hooks/useAuth.js';
import { useTheme } from '../context/ThemeContext.jsx';
import { useState } from 'react';

export default function Header() {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <header className="bg-dark dark:bg-gray-800 text-white shadow-lg sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-2xl">
          <motion.div
            whileHover={{ rotate: 10 }}
            className="bg-primary p-2 rounded-lg"
          >
            🛴
          </motion.div>
          <span className="text-primary">Monstrec</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 items-center">
          <Link to="/" className="hover:text-primary transition">
            Home
          </Link>
          <Link to="/vehicles" className="hover:text-primary transition">
            Browse Vehicles
          </Link>
          <Link to="/gallery" className="hover:text-primary transition">
            Gallery
          </Link>
          <Link to="/pricing" className="hover:text-primary transition">
            Pricing
          </Link>
          <Link to="/about" className="hover:text-primary transition">
            About
          </Link>
        </nav>

        {/* Auth Buttons / User Menu */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-300" />
            )}
          </motion.button>

          {isAuthenticated ? (
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {isAdmin ? (
                <Link
                  to="/admin/dashboard"
                  className="bg-primary px-4 py-2 rounded-lg hover:bg-accent transition"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/customer/bookings"
                  className="bg-primary px-4 py-2 rounded-lg hover:bg-accent transition"
                >
                  My Bookings
                </Link>
              )}
              <div className="flex items-center gap-2">
                <FaUser className="text-primary" />
                <span>{user?.firstName}</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-400 hover:text-red-300 transition"
              >
                <FaSignOutAlt /> Logout
              </motion.button>
            </motion.div>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="border border-primary px-4 py-2 rounded-lg hover:bg-primary transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-primary px-4 py-2 rounded-lg hover:bg-accent transition"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-xl"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: menuOpen ? 'auto' : 0,
          opacity: menuOpen ? 1 : 0,
        }}
        className="md:hidden bg-secondary dark:bg-gray-700 overflow-hidden transition-colors duration-300"
      >
        <nav className="flex flex-col gap-4 p-4">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/vehicles" onClick={() => setMenuOpen(false)}>
            Browse Vehicles
          </Link>
          <Link to="/gallery" onClick={() => setMenuOpen(false)}>
            Gallery
          </Link>
          <Link to="/pricing" onClick={() => setMenuOpen(false)}>
            Pricing
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
        </nav>
      </motion.div>
    </header>
  );
}
