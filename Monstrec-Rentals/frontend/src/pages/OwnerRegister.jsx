import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bike, Mail, Lock, User, Phone, MapPin, Home, ArrowLeft, FileText, DollarSign, MapPinIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { partnerVehicleAPI } from '../services/api.js';
import useAuth from '../hooks/useAuth.js';

const OwnerRegister = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('account'); // 'account' or 'vehicle'
  const [formData, setFormData] = useState({
    // Account info (pre-filled if logged in)
    fullName: user?.firstName ? `${user.firstName} ${user.lastName}` : '',
    email: user?.email || '',
    phone: user?.phone || '',
    // Vehicle info
    vehicleName: '',
    vehicleType: 'scooter',
    vehicleDescription: '',
    dailyRentPrice: '',
    city: 'Kathmandu',
    district: '',
    exactLocation: '',
    vehicleImage: null,
    vehicleImagePreview: null,
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate image type
      if (!['image/jpeg', 'image/jpg'].includes(file.type)) {
        toast.error('Only JPG/JPEG images are allowed');
        return;
      }
      // Validate image size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          vehicleImage: file,
          vehicleImagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
      setErrors(prev => ({ ...prev, vehicleImage: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Account validation (if not logged in)
    if (!isAuthenticated) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
      if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';
    }

    // Vehicle validation
    if (!formData.vehicleName.trim()) newErrors.vehicleName = 'Vehicle name is required';
    if (!formData.vehicleDescription.trim()) newErrors.vehicleDescription = 'Vehicle description is required';
    if (!formData.dailyRentPrice || formData.dailyRentPrice <= 0) newErrors.dailyRentPrice = 'Valid rent price is required';
    if (!formData.district.trim()) newErrors.district = 'District is required';
    if (!formData.exactLocation.trim()) newErrors.exactLocation = 'Exact location is required';
    if (!formData.vehicleImage) newErrors.vehicleImage = 'Vehicle image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!isAuthenticated) {
      toast.error('Please login first to submit a vehicle');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      // Convert image to base64
      const base64Image = formData.vehicleImagePreview;

      const vehicleData = {
        vehicleName: formData.vehicleName,
        vehicleType: formData.vehicleType,
        vehicleDescription: formData.vehicleDescription,
        dailyRentPrice: parseFloat(formData.dailyRentPrice),
        city: formData.city,
        district: formData.district,
        exactLocation: formData.exactLocation,
        vehicleImage: base64Image,
      };

      await partnerVehicleAPI.createPartnerVehicle(vehicleData);
      toast.success('Information updated. We will get back to you soon.');
      
      // Reset form
      setFormData({
        fullName: user?.firstName ? `${user.firstName} ${user.lastName}` : '',
        email: user?.email || '',
        phone: user?.phone || '',
        vehicleName: '',
        vehicleType: 'scooter',
        vehicleDescription: '',
        dailyRentPrice: '',
        city: 'Kathmandu',
        district: '',
        exactLocation: '',
        vehicleImage: null,
        vehicleImagePreview: null,
      });
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/owner/dashboard');
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit vehicle');
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

          {/* Tabs */}
          {!isAuthenticated ? (
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab('account')}
                className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                  activeTab === 'account'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Account Information
              </button>
              <button
                onClick={() => setActiveTab('vehicle')}
                className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                  activeTab === 'vehicle'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Vehicle Details
              </button>
            </div>
          ) : null}

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8">
            {(!isAuthenticated && activeTab === 'account') || isAuthenticated ? (
              <>
                {/* Account Section (only if not logged in or on account tab) */}
                {!isAuthenticated && (
                  <>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Personal Information
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.fullName
                              ? 'border-red-500'
                              : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                        />
                        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                      </div>

                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                          maxLength="10"
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.phone
                              ? 'border-red-500'
                              : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.email
                              ? 'border-red-500'
                              : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                    </div>
                  </>
                )}

                {/* Vehicle Section */}
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Bike className="w-5 h-5" />
                  Vehicle Information
                </h2>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      Vehicle Name *
                    </label>
                    <input
                      type="text"
                      name="vehicleName"
                      value={formData.vehicleName}
                      onChange={handleInputChange}
                      placeholder="e.g., Honda CB Shine"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.vehicleName
                          ? 'border-red-500'
                          : 'border-gray-300 dark:border-gray-600'
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                    {errors.vehicleName && <p className="text-red-500 text-sm mt-1">{errors.vehicleName}</p>}
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      Vehicle Type *
                    </label>
                    <select
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="scooter">Scooter</option>
                      <option value="bike">Bike</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Vehicle Description *
                    </label>
                    <textarea
                      name="vehicleDescription"
                      value={formData.vehicleDescription}
                      onChange={handleInputChange}
                      placeholder="Describe your vehicle features, condition, etc."
                      rows="3"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.vehicleDescription
                          ? 'border-red-500'
                          : 'border-gray-300 dark:border-gray-600'
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                    {errors.vehicleDescription && <p className="text-red-500 text-sm mt-1">{errors.vehicleDescription}</p>}
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Daily Rent Price (₨) *
                    </label>
                    <input
                      type="number"
                      name="dailyRentPrice"
                      value={formData.dailyRentPrice}
                      onChange={handleInputChange}
                      placeholder="Enter daily rent price"
                      min="0"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.dailyRentPrice
                          ? 'border-red-500'
                          : 'border-gray-300 dark:border-gray-600'
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                    {errors.dailyRentPrice && <p className="text-red-500 text-sm mt-1">{errors.dailyRentPrice}</p>}
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      City
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="Kathmandu">Kathmandu</option>
                      <option value="Pokhara">Pokhara</option>
                      <option value="Chitwan">Chitwan</option>
                      <option value="Lumbini">Lumbini</option>
                      <option value="Mustang">Mustang</option>
                      <option value="Butwal">Butwal</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 flex items-center gap-2">
                      <MapPinIcon className="w-4 h-4" />
                      District *
                    </label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      placeholder="Enter district name"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.district
                          ? 'border-red-500'
                          : 'border-gray-300 dark:border-gray-600'
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                    {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 flex items-center gap-2">
                      <Home className="w-4 h-4" />
                      Exact Location *
                    </label>
                    <input
                      type="text"
                      name="exactLocation"
                      value={formData.exactLocation}
                      onChange={handleInputChange}
                      placeholder="e.g., Thamel, near Garden of Dreams"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.exactLocation
                          ? 'border-red-500'
                          : 'border-gray-300 dark:border-gray-600'
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                    {errors.exactLocation && <p className="text-red-500 text-sm mt-1">{errors.exactLocation}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      Vehicle Image (JPG/JPEG only) *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg"
                        onChange={handleImageChange}
                        className="hidden"
                        id="vehicleImage"
                      />
                      <label htmlFor="vehicleImage" className="cursor-pointer">
                        {formData.vehicleImagePreview ? (
                          <div className="space-y-3">
                            <img
                              src={formData.vehicleImagePreview}
                              alt="Vehicle preview"
                              className="w-32 h-32 object-cover rounded-lg mx-auto"
                            />
                            <p className="text-sm text-gray-600 dark:text-gray-400">Click to change image</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <p className="text-gray-600 dark:text-gray-400">
                              Click to upload vehicle image
                            </p>
                            <p className="text-xs text-gray-500">JPG, JPEG • Max 5MB</p>
                          </div>
                        )}
                      </label>
                    </div>
                    {errors.vehicleImage && <p className="text-red-500 text-sm mt-1">{errors.vehicleImage}</p>}
                  </div>
                </div>
              </>
            ) : null}

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              {!isAuthenticated && activeTab === 'vehicle' && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => setActiveTab('account')}
                  className="flex-1 px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Back
                </motion.button>
              )}
              {!isAuthenticated && activeTab === 'account' && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => setActiveTab('vehicle')}
                  className="flex-1 px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
                >
                  Next
                </motion.button>
              )}
              {activeTab === 'vehicle' && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => navigate(-1)}
                    className="flex-1 px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Submitting...' : 'Submit Vehicle'}
                  </motion.button>
                </>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default OwnerRegister;
