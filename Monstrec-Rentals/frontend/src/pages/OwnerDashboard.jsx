import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Bike, 
  BookOpen, 
  TrendingUp, 
  Star, 
  Settings,
  Plus,
  Eye,
  CheckCircle,
  XCircle
} from 'lucide-react';
import OptimizedImage from '../components/OptimizedImage.jsx';
import ImageUpload from '../components/ImageUpload.jsx';

const OwnerDashboard = ({ tab = 'overview' }) => {
  const [activeTab, setActiveTab] = useState(tab);
  const [vehicleImages, setVehicleImages] = useState({});
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      name: 'Honda Dio',
      type: 'Scooter',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      images: [],
      status: 'Available',
      earnings: '₨5,400',
      bookings: 12,
    },
  ]);

  const [bookingRequests, setBookingRequests] = useState([
    {
      id: 1,
      customerName: 'Raj Kumar',
      vehicle: 'Honda Dio',
      dates: '2024-06-15 to 2024-06-17',
      status: 'Pending',
      amount: '₨3,000',
    },
  ]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'vehicles', label: 'My Vehicles', icon: Bike },
    { id: 'bookings', label: 'Booking Requests', icon: BookOpen },
    { id: 'earnings', label: 'Earnings', icon: TrendingUp },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderOverview = () => (
    <div className="grid md:grid-cols-4 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-6 rounded-xl border border-blue-200 dark:border-blue-700"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Active Vehicles</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">1</p>
          </div>
          <Bike className="w-10 h-10 text-blue-600 dark:text-blue-400" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-6 rounded-xl border border-green-200 dark:border-green-700"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Total Earnings</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">₨52,400</p>
          </div>
          <TrendingUp className="w-10 h-10 text-green-600 dark:text-green-400" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 p-6 rounded-xl border border-purple-200 dark:border-purple-700"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Total Bookings</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">12</p>
          </div>
          <BookOpen className="w-10 h-10 text-purple-600 dark:text-purple-400" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 p-6 rounded-xl border border-amber-200 dark:border-amber-700"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Rating</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">4.8⭐</p>
          </div>
          <Star className="w-10 h-10 text-amber-600 dark:text-amber-400" />
        </div>
      </motion.div>
    </div>
  );

  const handleVehicleImagesChange = (vehicleId, images) => {
    setVehicleImages(prev => ({
      ...prev,
      [vehicleId]: images
    }));
  };

  const renderVehicles = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">My Vehicles</h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Vehicle
        </motion.button>
      </div>

      <div className="space-y-8">
        {vehicles.map((vehicle, index) => (
          <motion.div
            key={vehicle.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow p-6"
          >
            {/* Vehicle Info */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {/* Main Image */}
              <div className="md:col-span-1">
                <div className="h-56 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-600 mb-4">
                  <OptimizedImage
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full"
                    objectFit="cover"
                    animate={true}
                  />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{vehicle.name}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{vehicle.type}</p>
              </div>

              {/* Stats */}
              <div className="md:col-span-2">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg">
                    <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">Status</p>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">{vehicle.status}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg">
                    <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">Earnings</p>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">{vehicle.earnings}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg">
                    <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">Bookings</p>
                    <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{vehicle.bookings}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 text-gray-900 dark:text-white py-2 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button className="flex-1 bg-primary hover:opacity-90 text-white py-2 rounded-lg transition-opacity">
                    Edit
                  </button>
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
              <ImageUpload
                onImagesChange={(images) => handleVehicleImagesChange(vehicle.id, images)}
                maxImages={10}
                existingImages={vehicle.images || []}
                onRemoveImage={(imageUrl) => {
                  setVehicles(prev => prev.map(v => 
                    v.id === vehicle.id 
                      ? { ...v, images: v.images.filter(img => img !== imageUrl) }
                      : v
                  ));
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderBookings = () => (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Booking Requests</h3>
      <div className="space-y-4">
        {bookingRequests.map((booking, index) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">{booking.customerName}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{booking.vehicle}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">{booking.dates}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{booking.amount}</p>
                <p className={`text-sm font-semibold mt-2 ${booking.status === 'Pending' ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'}`}>
                  {booking.status}
                </p>
              </div>
            </div>
            {booking.status === 'Pending' && (
              <div className="flex gap-3 mt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors"
                >
                  <CheckCircle className="w-5 h-5" />
                  Approve
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                  Reject
                </motion.button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderEarnings = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary to-accent p-8 rounded-xl text-white">
        <p className="text-lg opacity-90 mb-2">Total Earnings</p>
        <p className="text-4xl font-bold">₨52,400</p>
        <p className="text-white/80 mt-4">+₨2,400 this month</p>
      </div>

      <div className="bg-white dark:bg-gray-700 p-6 rounded-xl">
        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Earnings Breakdown</h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">June 2024</span>
            <span className="font-semibold text-gray-900 dark:text-white">₨2,400</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">May 2024</span>
            <span className="font-semibold text-gray-900 dark:text-white">₨3,800</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">April 2024</span>
            <span className="font-semibold text-gray-900 dark:text-white">₨2,200</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReviews = () => (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Customer Reviews</h3>
      <div className="space-y-4">
        {[1, 2, 3].map((index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">Raj Kumar</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">5 days ago</p>
              </div>
              <div className="text-amber-500">⭐⭐⭐⭐⭐</div>
            </div>
            <p className="text-gray-700 dark:text-gray-300">Great service! The bike was in excellent condition and the owner was very helpful.</p>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="max-w-2xl">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Account Settings</h3>
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl">
          <h4 className="font-bold text-gray-900 dark:text-white mb-4">Profile Information</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 dark:text-gray-400 text-sm mb-2">Full Name</label>
              <input
                type="text"
                defaultValue="Pemba Lopsang"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-gray-600 dark:text-gray-400 text-sm mb-2">Email</label>
              <input
                type="email"
                defaultValue="pemba@example.com"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button className="bg-primary hover:opacity-90 text-white font-semibold py-2 px-6 rounded-lg transition-opacity">
              Save Changes
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl">
          <h4 className="font-bold text-gray-900 dark:text-white mb-4">Bank Information</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 dark:text-gray-400 text-sm mb-2">Bank Name</label>
              <input
                type="text"
                defaultValue="Nepal Investment Bank"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button className="bg-primary hover:opacity-90 text-white font-semibold py-2 px-6 rounded-lg transition-opacity">
              Update Bank Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'vehicles':
        return renderVehicles();
      case 'bookings':
        return renderBookings();
      case 'earnings':
        return renderEarnings();
      case 'reviews':
        return renderReviews();
      case 'settings':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Vehicle Partner Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your vehicles, bookings, and earnings
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          {tabs.map((tabItem) => {
            const Icon = tabItem.icon;
            return (
              <motion.button
                key={tabItem.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tabItem.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === tabItem.id
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tabItem.label}
              </motion.button>
            );
          })}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
