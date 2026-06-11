import User from '../models/User.js';
import Booking from '../models/Booking.js';
import Vehicle from '../models/Vehicle.js';

// Get All Users (Admin only)
export const getAllUsers = async (req, res, next) => {
  try {
    const { role } = req.query;
    const filter = {};

    if (role) filter.role = role;

    const users = await User.find(filter).select('-password').sort({ createdAt: -1 });

    res.json({
      count: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
};

// Get User by ID
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

// Update User (Admin only)
export const updateUser = async (req, res, next) => {
  try {
    const { firstName, lastName, role, isVerified, documentVerification } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, role, isVerified, documentVerification },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User updated successfully',
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Delete User (Admin only)
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Get User Statistics
export const getUserStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const customers = await User.countDocuments({ role: 'customer' });
    const admins = await User.countDocuments({ role: 'admin' });
    const verifiedUsers = await User.countDocuments({ isVerified: true });

    res.json({
      totalUsers,
      customers,
      admins,
      verifiedUsers,
      unverifiedUsers: totalUsers - verifiedUsers,
    });
  } catch (error) {
    next(error);
  }
};

// Get User Booking History
export const getUserBookingHistory = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.params.id })
      .populate('vehicleId', 'name brand model image')
      .sort({ createdAt: -1 });

    res.json({
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    next(error);
  }
};
