import express from 'express';
import {
  getDashboardStats,
  getMonthlyReport,
  getDailyRevenue,
  getPopularRoutes,
  getVehiclePerformance,
} from '../controllers/analyticsController.js';
import authenticate, { authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/dashboard', authenticate, authorize('admin'), getDashboardStats);
router.get('/monthly', authenticate, authorize('admin'), getMonthlyReport);
router.get('/daily-revenue', authenticate, authorize('admin'), getDailyRevenue);
router.get('/popular-routes', authenticate, authorize('admin'), getPopularRoutes);
router.get('/vehicle-performance', authenticate, authorize('admin'), getVehiclePerformance);

export default router;
