import express from 'express';
import {
  getAllPartnerVehicles,
  getPartnerVehicleById,
  createPartnerVehicle,
  updatePartnerVehicle,
  deletePartnerVehicle,
  approvePartnerVehicle,
  rejectPartnerVehicle,
  getPartnerVehicles,
  getPendingVehicles,
  getApprovedVehicles,
} from '../controllers/partnerVehicleController.js';
import authenticate, { authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes (must be before :id route)
router.get('/approved', getApprovedVehicles);

// Protected routes
router.post('/', authenticate, createPartnerVehicle);
router.get('/', authenticate, getAllPartnerVehicles);
router.get('/my-vehicles', authenticate, getPartnerVehicles);
router.get('/pending', authenticate, authorize('admin'), getPendingVehicles);

// Routes with ID parameter (must be after specific routes)
router.get('/:id', authenticate, getPartnerVehicleById);
router.put('/:id', authenticate, updatePartnerVehicle);
router.delete('/:id', authenticate, deletePartnerVehicle);

// Admin routes
router.patch('/:id/approve', authenticate, authorize('admin'), approvePartnerVehicle);
router.patch('/:id/reject', authenticate, authorize('admin'), rejectPartnerVehicle);

export default router;
