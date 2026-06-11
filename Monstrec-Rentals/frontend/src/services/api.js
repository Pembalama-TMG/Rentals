import apiClient from './apiClient.js';

// Auth services
export const authAPI = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
  getProfile: () => apiClient.get('/auth/profile'),
  updateProfile: (data) => apiClient.put('/auth/profile', data),
  changePassword: (data) => apiClient.put('/auth/change-password', data),
};

// Vehicle services
export const vehicleAPI = {
  getAllVehicles: (params) => apiClient.get('/vehicles', { params }),
  getVehicleById: (id) => apiClient.get(`/vehicles/${id}`),
  createVehicle: (data) => apiClient.post('/vehicles', data),
  updateVehicle: (id, data) => apiClient.put(`/vehicles/${id}`, data),
  deleteVehicle: (id) => apiClient.delete(`/vehicles/${id}`),
  getVehicleStats: () => apiClient.get('/vehicles/stats'),
};

// Booking services
export const bookingAPI = {
  getAllBookings: (params) => apiClient.get('/bookings', { params }),
  getBookingById: (id) => apiClient.get(`/bookings/${id}`),
  createBooking: (data) => apiClient.post('/bookings', data),
  updateBookingStatus: (id, data) => apiClient.put(`/bookings/${id}/status`, data),
  cancelBooking: (id, data) => apiClient.put(`/bookings/${id}/cancel`, data),
  completeBooking: (id) => apiClient.put(`/bookings/${id}/complete`, {}),
};

// Payment services
export const paymentAPI = {
  createPayment: (data) => apiClient.post('/payments', data),
  getPayments: () => apiClient.get('/payments'),
  getUserPayments: () => apiClient.get('/payments/user/payments'),
  verifyPayment: (data) => apiClient.post('/payments/verify', data),
  refundPayment: (id, data) => apiClient.post(`/payments/${id}/refund`, data),
  getPaymentStats: () => apiClient.get('/payments/stats'),
};

// User services
export const userAPI = {
  getAllUsers: (params) => apiClient.get('/users', { params }),
  getUserById: (id) => apiClient.get(`/users/${id}`),
  updateUser: (id, data) => apiClient.put(`/users/${id}`, data),
  deleteUser: (id) => apiClient.delete(`/users/${id}`),
  getUserStats: () => apiClient.get('/users/stats'),
  getUserBookingHistory: (id) => apiClient.get(`/users/${id}/bookings`),
};

// Analytics services
export const analyticsAPI = {
  getDashboardStats: () => apiClient.get('/analytics/dashboard'),
  getMonthlyReport: (params) => apiClient.get('/analytics/monthly', { params }),
  getDailyRevenue: () => apiClient.get('/analytics/daily-revenue'),
  getPopularRoutes: () => apiClient.get('/analytics/popular-routes'),
  getVehiclePerformance: () => apiClient.get('/analytics/vehicle-performance'),
};

export default apiClient;
