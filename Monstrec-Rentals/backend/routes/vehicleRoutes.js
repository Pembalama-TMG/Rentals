import express from 'express';
import {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getVehicleStats,
} from '../controllers/vehicleController.js';
import authenticate, { authorize } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getAllVehicles);
router.get('/stats', getVehicleStats);
router.get('/:id', getVehicleById);
router.post('/', authenticate, authorize('admin'), upload.single('image'), createVehicle);
router.put('/:id', authenticate, authorize('admin'), upload.single('image'), updateVehicle);
router.delete('/:id', authenticate, authorize('admin'), deleteVehicle);

export default router;
