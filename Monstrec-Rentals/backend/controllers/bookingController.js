import Booking from '../models/Booking.js';
import Vehicle from '../models/Vehicle.js';
import User from '../models/User.js';
import { calculateRentalCost } from '../utils/helpers.js';
import { sendEmail } from '../config/email.js';

// Get All Bookings
export const getAllBookings = async (req, res, next) => {
  try {
    const { status, userId } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (userId) filter.userId = userId;

    // Admins can see all, users only their own
    if (req.user.role === 'customer') {
      filter.userId = req.user.id;
    }

    const bookings = await Booking.find(filter)
      .populate('userId', 'firstName lastName email phone')
      .populate('vehicleId', 'name brand model image pricePerKm dailyRate')
      .sort({ createdAt: -1 });

    res.json({
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    next(error);
  }
};

// Get Booking by ID
export const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('userId', 'firstName lastName email phone')
      .populate('vehicleId');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check authorization
    if (req.user.role === 'customer' && booking.userId._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({ booking });
  } catch (error) {
    next(error);
  }
};

// Create Booking
export const createBooking = async (req, res, next) => {
  try {
    const { vehicleId, startDate, endDate, rentalType, distance, pickupLocation, dropoffLocation } = req.body;

    // Validate vehicle
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    if (!vehicle.availability) {
      return res.status(400).json({ message: 'Vehicle is not available' });
    }

    // Check if vehicle is already booked
    const existingBooking = await Booking.findOne({
      vehicleId,
      status: { $in: ['confirmed', 'active'] },
      startDate: { $lt: endDate },
      endDate: { $gt: startDate },
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Vehicle is already booked for these dates' });
    }

    // Calculate cost
    const baseCost = calculateRentalCost(
      startDate,
      endDate,
      vehicle.pricePerKm,
      vehicle.dailyRate,
      rentalType,
      distance
    );
    const tax = baseCost * 0.13; // 13% tax in Nepal
    const totalCost = baseCost + tax;

    // Create booking
    const booking = await Booking.create({
      userId: req.user.id,
      vehicleId,
      startDate,
      endDate,
      rentalType,
      distance: rentalType === 'perKm' ? distance : 0,
      pickupLocation,
      dropoffLocation,
      baseCost,
      totalCost,
    });

    // Send confirmation email
    const user = await User.findById(req.user.id);
    try {
      await sendEmail(
        user.email,
        'Booking Confirmation - Monstrec Rentals',
        `
        <h2>Booking Confirmed!</h2>
        <p>Booking ID: ${booking.bookingId}</p>
        <p>Vehicle: ${vehicle.name}</p>
        <p>Total Cost: NPR ${totalCost.toFixed(2)}</p>
        <p>Status: Pending Payment</p>
        `
      );
    } catch (emailError) {
      console.log('Email not sent:', emailError);
    }

    res.status(201).json({
      message: 'Booking created successfully',
      booking: await booking.populate('vehicleId', 'name brand model image'),
    });
  } catch (error) {
    next(error);
  }
};

// Update Booking Status (Admin only)
export const updateBookingStatus = async (req, res, next) => {
  try {
    const { status, adminNotes } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes },
      { new: true }
    )
      .populate('userId')
      .populate('vehicleId');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Update vehicle availability if booking is confirmed
    if (status === 'confirmed') {
      await Vehicle.findByIdAndUpdate(booking.vehicleId._id, { availability: false });
    } else if (status === 'completed' || status === 'cancelled') {
      await Vehicle.findByIdAndUpdate(booking.vehicleId._id, { availability: true });
    }

    // Send email notification
    try {
      await sendEmail(
        booking.userId.email,
        `Booking ${status.toUpperCase()} - Monstrec Rentals`,
        `<h2>Your booking has been ${status}</h2>`
      );
    } catch (emailError) {
      console.log('Email not sent:', emailError);
    }

    res.json({
      message: `Booking ${status} successfully`,
      booking,
    });
  } catch (error) {
    next(error);
  }
};

// Cancel Booking
export const cancelBooking = async (req, res, next) => {
  try {
    const { cancellationReason } = req.body;

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check authorization
    if (req.user.role === 'customer' && booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Calculate refund
    const cancellationPercent = 10; // 10% cancellation fee
    const refundAmount = booking.totalCost * (1 - cancellationPercent / 100);

    booking.status = 'cancelled';
    booking.cancellationReason = cancellationReason;
    booking.refundAmount = refundAmount;
    await booking.save();

    // Make vehicle available again
    await Vehicle.findByIdAndUpdate(booking.vehicleId, { availability: true });

    res.json({
      message: 'Booking cancelled successfully',
      refundAmount,
    });
  } catch (error) {
    next(error);
  }
};

// Complete Booking (Admin only)
export const completeBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'completed' },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Make vehicle available
    await Vehicle.findByIdAndUpdate(booking.vehicleId, { availability: true });

    res.json({
      message: 'Booking completed successfully',
      booking,
    });
  } catch (error) {
    next(error);
  }
};
