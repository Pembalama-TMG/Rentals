import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaChartBar,
  FaMotorcycle,
  FaClipboardList,
  FaUsers,
  FaSignOutAlt,
  FaPlus,
  FaCheck,
  FaTimes,
} from 'react-icons/fa';
import useAuth from '../hooks/useAuth.js';
import { analyticsAPI, vehicleAPI, bookingAPI, userAPI, partnerVehicleAPI } from '../services/api.js';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';

export default function AdminDashboard({ tab = 'dashboard' }) {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState(tab);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [partnerVehicles, setPartnerVehicles] = useState([]);
  const [rejectReasons, setRejectReasons] = useState({});
  const [showRejectForm, setShowRejectForm] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, [activeTab]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'dashboard') {
        const data = await analyticsAPI.getDashboardStats();
        setStats(data);
      } else if (activeTab === 'vehicles') {
        const data = await vehicleAPI.getAllVehicles();
        setVehicles(data.vehicles);
      } else if (activeTab === 'bookings') {
        const data = await bookingAPI.getAllBookings();
        setBookings(data.bookings);
      } else if (activeTab === 'customers') {
        const data = await userAPI.getAllUsers({ role: 'customer' });
        setUsers(data.users);
      } else if (activeTab === 'partner-vehicles') {
        const data = await partnerVehicleAPI.getPendingVehicles();
        setPartnerVehicles(data.vehicles);
      }
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveVehicle = async (vehicleId) => {
    try {
      await partnerVehicleAPI.approveVehicle(vehicleId, {});
      toast.success('Vehicle approved successfully!');
      loadDashboardData();
    } catch (error) {
      toast.error('Failed to approve vehicle');
    }
  };

  const handleRejectVehicle = async (vehicleId) => {
    const reason = rejectReasons[vehicleId];
    if (!reason.trim()) {
      toast.error('Please provide a rejection reason');
      return;
    }

    try {
      await partnerVehicleAPI.rejectVehicle(vehicleId, { rejectionReason: reason });
      toast.success('Vehicle rejected successfully!');
      setRejectReasons(prev => ({ ...prev, [vehicleId]: '' }));
      setShowRejectForm(null);
      loadDashboardData();
    } catch (error) {
      toast.error('Failed to reject vehicle');
    }
  };

  return (
    <div className="min-h-screen bg-light py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-6 text-primary">ADMIN PANEL</h3>
              <nav className="space-y-2">
                {[
                  { id: 'dashboard', label: 'Analytics', icon: <FaChartBar /> },
                  { id: 'partner-vehicles', label: 'Partner Requests', icon: <FaMotorcycle /> },
                  { id: 'vehicles', label: 'All Vehicles', icon: <FaMotorcycle /> },
                  { id: 'bookings', label: 'Bookings', icon: <FaClipboardList /> },
                  { id: 'customers', label: 'Customers', icon: <FaUsers /> },
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
            className="lg:col-span-4"
          >
            {/* Dashboard */}
            {activeTab === 'dashboard' && stats && (
              <div className="space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Bookings', value: stats.bookings.total, color: 'bg-blue-500' },
                    { label: 'Completed', value: stats.bookings.completed, color: 'bg-green-500' },
                    { label: 'Total Customers', value: stats.users.total, color: 'bg-purple-500' },
                    { label: 'Total Revenue', value: `NPR ${stats.revenue.total}`, color: 'bg-yellow-500' },
                  ].map((stat, i) => (
                    <div key={i} className={`${stat.color} text-white p-6 rounded-xl`}>
                      <p className="text-sm opacity-80">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                  ))}
                </div>

                {/* Charts */}
                {stats.revenue.monthly.length > 0 && (
                  <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold mb-4">Monthly Revenue</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={stats.revenue.monthly}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="_id" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="revenue" fill="#FF6B35" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            )}

            {/* Vehicles */}
            {activeTab === 'vehicles' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold">Vehicles</h2>
                  <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2">
                    <FaPlus /> Add Vehicle
                  </button>
                </div>
                {loading ? (
                  <p>Loading...</p>
                ) : vehicles.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3">Name</th>
                          <th className="text-left py-3">Type</th>
                          <th className="text-left py-3">Daily Rate</th>
                          <th className="text-left py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vehicles.map((vehicle) => (
                          <tr key={vehicle._id} className="border-b hover:bg-light">
                            <td className="py-3">{vehicle.name}</td>
                            <td>{vehicle.type}</td>
                            <td>NPR {vehicle.dailyRate}</td>
                            <td>
                              <span className={`px-3 py-1 rounded-full text-sm ${
                                vehicle.availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {vehicle.availability ? 'Available' : 'Unavailable'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>No vehicles found.</p>
                )}
              </div>
            )}

            {/* Bookings */}
            {activeTab === 'bookings' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6">Bookings</h2>
                {loading ? (
                  <p>Loading...</p>
                ) : bookings.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking._id} className="border rounded-lg p-4 hover:shadow-md transition">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-bold">{booking.vehicleId?.name}</p>
                            <p className="text-sm text-gray-600">{booking.userId?.firstName} {booking.userId?.lastName}</p>
                          </div>
                          <div>
                            <p className="font-bold">NPR {booking.totalCost}</p>
                            <p className="text-sm">{booking.status}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No bookings found.</p>
                )}
              </div>
            )}

            {/* Customers */}
            {activeTab === 'customers' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6">Customers</h2>
                {loading ? (
                  <p>Loading...</p>
                ) : users.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3">Name</th>
                          <th className="text-left py-3">Email</th>
                          <th className="text-left py-3">Phone</th>
                          <th className="text-left py-3">City</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user._id} className="border-b hover:bg-light">
                            <td className="py-3">{user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.city}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>No customers found.</p>
                )}
              </div>
            )}

            {/* Partner Vehicles - Pending Approval */}
            {activeTab === 'partner-vehicles' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Partner Vehicle Requests</h2>
                {loading ? (
                  <p>Loading...</p>
                ) : partnerVehicles.length > 0 ? (
                  <div className="space-y-4">
                    {partnerVehicles.map((vehicle) => (
                      <motion.div
                        key={vehicle._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden"
                      >
                        <div className="grid md:grid-cols-4 gap-6 p-6">
                          {/* Image */}
                          <div className="md:col-span-1">
                            <img
                              src={vehicle.vehicleImage || 'https://via.placeholder.com/300x200'}
                              alt={vehicle.vehicleName}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                          </div>

                          {/* Details */}
                          <div className="md:col-span-2">
                            <h3 className="text-2xl font-bold mb-3">{vehicle.vehicleName}</h3>
                            <div className="space-y-2 text-sm">
                              <p><strong>Type:</strong> {vehicle.vehicleType}</p>
                              <p><strong>Partner:</strong> {vehicle.partnerFullName}</p>
                              <p><strong>Phone:</strong> {vehicle.partnerPhone}</p>
                              <p><strong>Email:</strong> {vehicle.partnerEmail}</p>
                              <p><strong>Location:</strong> {vehicle.exactLocation}, {vehicle.city}</p>
                              <p><strong>Daily Rate:</strong> ₨{vehicle.dailyRentPrice}</p>
                              <p className="pt-2"><strong>Description:</strong> {vehicle.vehicleDescription}</p>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="md:col-span-1">
                            <div className="space-y-3">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleApproveVehicle(vehicle._id)}
                                className="w-full flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition"
                              >
                                <FaCheck /> Approve
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowRejectForm(showRejectForm === vehicle._id ? null : vehicle._id)}
                                className="w-full flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition"
                              >
                                <FaTimes /> Reject
                              </motion.button>

                              {/* Reject Form */}
                              {showRejectForm === vehicle._id && (
                                <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                                  <textarea
                                    value={rejectReasons[vehicle._id] || ''}
                                    onChange={(e) => setRejectReasons(prev => ({
                                      ...prev,
                                      [vehicle._id]: e.target.value
                                    }))}
                                    placeholder="Enter rejection reason..."
                                    className="w-full p-2 border border-red-300 rounded-lg text-sm mb-3"
                                    rows="3"
                                  />
                                  <button
                                    onClick={() => handleRejectVehicle(vehicle._id)}
                                    className="w-full bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 text-sm"
                                  >
                                    Confirm Rejection
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                    <p className="text-gray-500 text-lg">No pending vehicle requests</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
