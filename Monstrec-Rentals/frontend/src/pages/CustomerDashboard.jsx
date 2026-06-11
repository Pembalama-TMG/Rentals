import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaClipboardList, FaHistory, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import useAuth from '../hooks/useAuth.js';
import { bookingAPI } from '../services/api.js';
import toast from 'react-hot-toast';

export default function CustomerDashboard({ tab = 'bookings' }) {
  const { user, logout, updateProfile, getProfile } = useAuth();
  const [activeTab, setActiveTab] = useState(tab);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(user);

  useEffect(() => {
    if (activeTab === 'bookings') {
      fetchBookings();
    }
  }, [activeTab]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await bookingAPI.getAllBookings();
      setBookings(data.bookings);
    } catch (error) {
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      await updateProfile(profileData);
      toast.success('Profile updated!');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen bg-light py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">👤</div>
                <h3 className="font-bold">{user?.firstName} {user?.lastName}</h3>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>

              <nav className="space-y-2">
                {[
                  { id: 'bookings', label: 'My Bookings', icon: <FaClipboardList /> },
                  { id: 'history', label: 'Rental History', icon: <FaHistory /> },
                  { id: 'profile', label: 'Profile', icon: <FaUserCircle /> },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      activeTab === item.id
                        ? 'bg-primary text-white'
                        : 'text-dark hover:bg-light'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="w-full mt-6 flex items-center gap-2 bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition"
              >
                <FaSignOutAlt /> Logout
              </motion.button>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            {activeTab === 'bookings' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6">My Bookings</h2>
                {loading ? (
                  <p>Loading...</p>
                ) : bookings.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking._id} className="border rounded-lg p-4 hover:shadow-md transition">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold">{booking.vehicleId?.name}</h3>
                            <p className="text-sm text-gray-600">{booking.bookingId}</p>
                            <p className="text-sm">Status: <span className="font-bold">{booking.status}</span></p>
                          </div>
                          <p className="text-xl font-bold text-primary">NPR {booking.totalCost}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No bookings yet.</p>
                )}
              </div>
            )}

            {activeTab === 'history' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6">Rental History</h2>
                <p className="text-gray-600">Your past rentals will appear here.</p>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6">Update Profile</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={profileData?.firstName || ''}
                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                    className="w-full p-3 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={profileData?.lastName || ''}
                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                    className="w-full p-3 border rounded-lg"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={profileData?.email || ''}
                    disabled
                    className="w-full p-3 border rounded-lg bg-gray-100"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={profileData?.phone || ''}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="w-full p-3 border rounded-lg"
                  />
                  <button
                    onClick={handleProfileUpdate}
                    className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-accent transition"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
