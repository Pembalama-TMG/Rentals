import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import useAuth from '../hooks/useAuth.js';

export default function Login() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData.email, formData.password);
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
          <h2 className="text-3xl font-bold text-center mb-2 text-dark">Welcome Back</h2>
          <p className="text-center text-gray-600 mb-8">Login to your Monstrec account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
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
              {loading ? 'Logging in...' : 'Login'}
            </motion.button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary font-bold hover:underline">
                Register here
              </Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-light rounded-lg">
            <p className="font-semibold text-sm mb-2">Demo Credentials:</p>
            <p className="text-sm">Email: admin@monstrec.com</p>
            <p className="text-sm">Password: Admin@123</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
