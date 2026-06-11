import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaPhone, FaEnvelope, FaLock, FaCity } from 'react-icons/fa';
import useAuth from '../hooks/useAuth.js';

export default function Register() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    city: 'Kathmandu',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(formData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark to-secondary flex items-center justify-center py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-center mb-2 text-dark">Create Account</h2>
          <p className="text-center text-gray-600 mb-8">Join Monstrec Rentals today</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name */}
            <div>
              <label className="block font-semibold mb-2">First Name</label>
              <div className="flex items-center gap-2 border-2 border-gray-300 rounded-lg p-3 focus-within:border-primary">
                <FaUser className="text-primary" />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className="flex-1 outline-none"
                  required
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label className="block font-semibold mb-2">Last Name</label>
              <div className="flex items-center gap-2 border-2 border-gray-300 rounded-lg p-3 focus-within:border-primary">
                <FaUser className="text-primary" />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="flex-1 outline-none"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block font-semibold mb-2">Email</label>
              <div className="flex items-center gap-2 border-2 border-gray-300 rounded-lg p-3 focus-within:border-primary">
                <FaEnvelope className="text-primary" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="flex-1 outline-none"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block font-semibold mb-2">Phone</label>
              <div className="flex items-center gap-2 border-2 border-gray-300 rounded-lg p-3 focus-within:border-primary">
                <FaPhone className="text-primary" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+977-98XXXXXXXX"
                  className="flex-1 outline-none"
                  required
                />
              </div>
            </div>

            {/* City */}
            <div>
              <label className="block font-semibold mb-2">City</label>
              <div className="flex items-center gap-2 border-2 border-gray-300 rounded-lg p-3 focus-within:border-primary">
                <FaCity className="text-primary" />
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="flex-1 outline-none"
                >
                  <option>Kathmandu</option>
                  <option>Pokhara</option>
                  <option>Lalitpur</option>
                  <option>Bhaktapur</option>
                </select>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block font-semibold mb-2">Password</label>
              <div className="flex items-center gap-2 border-2 border-gray-300 rounded-lg p-3 focus-within:border-primary">
                <FaLock className="text-primary" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="flex-1 outline-none"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-accent transition disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Register'}
            </motion.button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-bold hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
