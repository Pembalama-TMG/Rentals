import Booking from '../models/Booking.js';
import Payment from '../models/Payment.js';
import Vehicle from '../models/Vehicle.js';
import User from '../models/User.js';
import Analytics from '../models/Analytics.js';

// Get Dashboard Analytics
export const getDashboardStats = async (req, res, next) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const completedBookings = await Booking.countDocuments({ status: 'completed' });
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const cancelledBookings = await Booking.countDocuments({ status: 'cancelled' });

    const totalCustomers = await User.countDocuments({ role: 'customer' });
    const totalVehicles = await Vehicle.countDocuments();
    const availableVehicles = await Vehicle.countDocuments({ availability: true });

    const totalRevenue = await Payment.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const monthlyRevenue = await Payment.aggregate([
      { $match: { paymentStatus: 'completed' } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          revenue: { $sum: '$amount' },
        },
      },
      { $sort: { _id: 1 } },
      { $limit: 12 },
    ]);

    const popularVehicles = await Booking.aggregate([
      { $group: { _id: '$vehicleId', bookings: { $sum: 1 } } },
      { $sort: { bookings: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'vehicles',
          localField: '_id',
          foreignField: '_id',
          as: 'vehicle',
        },
      },
    ]);

    res.json({
      bookings: {
        total: totalBookings,
        completed: completedBookings,
        pending: pendingBookings,
        cancelled: cancelledBookings,
      },
      users: {
        total: totalCustomers,
      },
      vehicles: {
        total: totalVehicles,
        available: availableVehicles,
      },
      revenue: {
        total: totalRevenue[0]?.total || 0,
        monthly: monthlyRevenue,
      },
      popularVehicles,
    });
  } catch (error) {
    next(error);
  }
};

// Get Monthly Report
export const getMonthlyReport = async (req, res, next) => {
  try {
    const { month, year } = req.query;

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const bookings = await Booking.find({
      createdAt: { $gte: startDate, $lte: endDate },
    });

    const payments = await Payment.find({
      createdAt: { $gte: startDate, $lte: endDate },
      paymentStatus: 'completed',
    });

    const revenue = payments.reduce((sum, payment) => sum + payment.amount, 0);
    const avgBookingValue = revenue / bookings.length || 0;

    res.json({
      month,
      year,
      totalBookings: bookings.length,
      completedBookings: bookings.filter((b) => b.status === 'completed').length,
      totalRevenue: revenue,
      avgBookingValue,
      payments: payments.length,
    });
  } catch (error) {
    next(error);
  }
};

// Get Daily Revenue
export const getDailyRevenue = async (req, res, next) => {
  try {
    const dailyRevenue = await Payment.aggregate([
      { $match: { paymentStatus: 'completed' } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          revenue: { $sum: '$amount' },
          transactions: { $sum: 1 },
        },
      },
      { $sort: { _id: -1 } },
      { $limit: 30 },
    ]);

    res.json({ dailyRevenue });
  } catch (error) {
    next(error);
  }
};

// Get Popular Routes
export const getPopularRoutes = async (req, res, next) => {
  try {
    const routes = await Booking.aggregate([
      {
        $group: {
          _id: { pickup: '$pickupLocation', dropoff: '$dropoffLocation' },
          bookings: { $sum: 1 },
        },
      },
      { $sort: { bookings: -1 } },
      { $limit: 10 },
    ]);

    res.json({ routes });
  } catch (error) {
    next(error);
  }
};

// Get Vehicle Performance
export const getVehiclePerformance = async (req, res, next) => {
  try {
    const performance = await Vehicle.aggregate([
      {
        $lookup: {
          from: 'bookings',
          localField: '_id',
          foreignField: 'vehicleId',
          as: 'bookings',
        },
      },
      {
        $project: {
          name: 1,
          brand: 1,
          type: 1,
          bookings: { $size: '$bookings' },
          rating: 1,
          totalEarnings: 1,
        },
      },
      { $sort: { bookings: -1 } },
    ]);

    res.json({ performance });
  } catch (error) {
    next(error);
  }
};
