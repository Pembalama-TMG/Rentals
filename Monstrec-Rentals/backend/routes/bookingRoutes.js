import express from 'express';
import {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBookingStatus,
  cancelBooking,
  completeBooking,
} from '../controllers/bookingController.js';
import authenticate, { authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, getAllBookings);
router.get('/:id', authenticate, getBookingById);
router.post('/', authenticate, createBooking);
router.put('/:id/status', authenticate, authorize('admin'), updateBookingStatus);
router.put('/:id/cancel', authenticate, cancelBooking);
router.put('/:id/complete', authenticate, authorize('admin'), completeBooking);

export default router;
