import Payment from '../models/Payment.js';
import Booking from '../models/Booking.js';
import { sendEmail } from '../config/email.js';

// Create Payment
export const createPayment = async (req, res, next) => {
  try {
    const { bookingId, paymentMethod } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const payment = await Payment.create({
      bookingId,
      userId: req.user.id,
      amount: booking.totalCost,
      paymentMethod,
    });

    res.status(201).json({
      message: 'Payment initiated',
      payment,
    });
  } catch (error) {
    next(error);
  }
};

// Get Payments
export const getPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find()
      .populate('bookingId')
      .populate('userId', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.json({
      count: payments.length,
      payments,
    });
  } catch (error) {
    next(error);
  }
};

// Get User Payments
export const getUserPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find({ userId: req.user.id })
      .populate('bookingId')
      .sort({ createdAt: -1 });

    res.json({
      count: payments.length,
      payments,
    });
  } catch (error) {
    next(error);
  }
};

// Verify Payment (Webhook from Payment Gateway)
export const verifyPayment = async (req, res, next) => {
  try {
    const { transactionId, paymentMethod, statusCode, statusMessage } = req.body;

    const payment = await Payment.findOneAndUpdate(
      { transactionId },
      {
        paymentStatus: statusCode === '0' ? 'completed' : 'failed',
        paymentGatewayResponse: {
          statusCode,
          statusMessage,
        },
      },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    if (payment.paymentStatus === 'completed') {
      // Update booking status to confirmed
      await Booking.findByIdAndUpdate(payment.bookingId, {
        status: 'confirmed',
        paymentStatus: 'completed',
        paymentMethod,
      });
    }

    res.json({
      message: 'Payment verified',
      payment,
    });
  } catch (error) {
    next(error);
  }
};

// Refund Payment (Admin only)
export const refundPayment = async (req, res, next) => {
  try {
    const { reason } = req.body;

    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { paymentStatus: 'failed', notes: `Refunded: ${reason}` },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json({
      message: 'Payment refunded successfully',
      payment,
    });
  } catch (error) {
    next(error);
  }
};

// Get Payment Statistics
export const getPaymentStats = async (req, res, next) => {
  try {
    const totalPayments = await Payment.countDocuments();
    const completedPayments = await Payment.countDocuments({ paymentStatus: 'completed' });
    const totalRevenue = await Payment.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const paymentsByMethod = await Payment.aggregate([
      { $group: { _id: '$paymentMethod', count: { $sum: 1 }, amount: { $sum: '$amount' } } },
    ]);

    res.json({
      totalPayments,
      completedPayments,
      totalRevenue: totalRevenue[0]?.total || 0,
      paymentsByMethod,
    });
  } catch (error) {
    next(error);
  }
};
