import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bike, Mail, Lock, User, Phone, MapPin, Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const OwnerRegister = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    bankName: '',
    accountNumber: '',
    accountHolderName: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      // TODO: Call API to register owner
      toast.success('Registration submitted! Waiting for approval.');
      navigate('/owner/dashboard');
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-accent p-8 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Bike className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Become a Vehicle Partner</h1>
            </div>
            <p className="text-white/90">
              Join our growing community of vehicle owners and start earning today
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8">
            {/* Personal Information Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+977..."
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    City *
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select a city</option>
                    <option value="Kathmandu">Kathmandu</option>
                    <option value="Pokhara">Pokhara</option>
                    <option value="Lalitpur">Lalitpur</option>
                    <option value="Bhaktapur">Bhaktapur</option>
                    <option value="Chitwan">Chitwan</option>
                    <option value="Butwal">Butwal</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Address
              </h2>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                rows="3"
                placeholder="Your complete address"
              />
            </div>

            {/* Bank Information Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Home className="w-5 h-5" />
                Bank Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    Bank Name *
                  </label>
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Nepal Investment Bank"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    Account Holder Name *
                  </label>
                  <input
                    type="text"
                    name="accountHolderName"
                    value={formData.accountHolderName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Name on account"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    Account Number *
                  </label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your bank account number"
                  />
                </div>
              </div>
            </div>

            {/* Password Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Security
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Register as Partner'}
            </motion.button>

            <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-primary hover:underline font-semibold"
              >
                Sign in
              </button>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default OwnerRegister;
