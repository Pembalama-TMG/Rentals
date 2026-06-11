import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserStats,
  getUserBookingHistory,
} from '../controllers/userController.js';
import authenticate, { authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, authorize('admin'), getAllUsers);
router.get('/stats', authenticate, authorize('admin'), getUserStats);
router.get('/:id', authenticate, getUserById);
router.get('/:id/bookings', authenticate, getUserBookingHistory);
router.put('/:id', authenticate, authorize('admin'), updateUser);
router.delete('/:id', authenticate, authorize('admin'), deleteUser);

export default router;
