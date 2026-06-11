import express from 'express';
import {
  createPayment,
  getPayments,
  getUserPayments,
  verifyPayment,
  refundPayment,
  getPaymentStats,
} from '../controllers/paymentController.js';
import authenticate, { authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, createPayment);
router.get('/', authenticate, authorize('admin'), getPayments);
router.get('/user/payments', authenticate, getUserPayments);
router.post('/verify', verifyPayment);
router.post('/:id/refund', authenticate, authorize('admin'), refundPayment);
router.get('/stats', authenticate, authorize('admin'), getPaymentStats);

export default router;
