import PartnerVehicle from '../models/PartnerVehicle.js';
import User from '../models/User.js';

// Get All Partner Vehicles (with filtering)
export const getAllPartnerVehicles = async (req, res, next) => {
  try {
    const { status, city, partnerId } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (city) filter.city = city;
    if (partnerId) filter.partnerId = partnerId;

    // If user is partner (owner), only show their vehicles
    if (req.user && req.user.role === 'owner') {
      filter.partnerId = req.user.id;
    }

    const vehicles = await PartnerVehicle.find(filter)
      .populate('partnerId', 'firstName lastName email phone')
      .sort({ createdAt: -1 });

    res.json({
      count: vehicles.length,
      vehicles,
    });
  } catch (error) {
    next(error);
  }
};

// Get Partner Vehicle by ID
export const getPartnerVehicleById = async (req, res, next) => {
  try {
    const vehicle = await PartnerVehicle.findById(req.params.id).populate('partnerId', 'firstName lastName email phone');

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.json({ vehicle });
  } catch (error) {
    next(error);
  }
};

// Create Partner Vehicle Submission
export const createPartnerVehicle = async (req, res, next) => {
  try {
    const {
      vehicleName,
      vehicleType,
      vehicleDescription,
      dailyRentPrice,
      city,
      district,
      exactLocation,
      vehicleImage,
    } = req.body;

    // Validate required fields
    if (
      !vehicleName ||
      !vehicleType ||
      !vehicleDescription ||
      !dailyRentPrice ||
      !city ||
      !district ||
      !exactLocation ||
      !vehicleImage
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Get user details
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate daily rent price
    if (dailyRentPrice <= 0) {
      return res.status(400).json({ message: 'Daily rent price must be greater than 0' });
    }

    // Create partner vehicle
    const partnerVehicle = await PartnerVehicle.create({
      partnerId: req.user.id,
      vehicleName,
      vehicleType,
      vehicleDescription,
      dailyRentPrice,
      city,
      district,
      exactLocation,
      vehicleImage,
      partnerFullName: `${user.firstName} ${user.lastName}`,
      partnerPhone: user.phone,
      partnerEmail: user.email,
      status: 'pending',
    });

    res.status(201).json({
      message: 'Vehicle submitted for approval',
      vehicle: partnerVehicle,
    });
  } catch (error) {
    next(error);
  }
};

// Update Partner Vehicle (only owner can update)
export const updatePartnerVehicle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const vehicle = await PartnerVehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    // Check ownership
    if (vehicle.partnerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this vehicle' });
    }

    // Don't allow updates if already approved or rejected
    if (vehicle.status !== 'pending') {
      return res.status(400).json({ message: `Cannot update ${vehicle.status} vehicle` });
    }

    // Update allowed fields
    const allowedUpdates = [
      'vehicleName',
      'vehicleType',
      'vehicleDescription',
      'dailyRentPrice',
      'city',
      'district',
      'exactLocation',
      'vehicleImage',
    ];
    const updates = Object.keys(req.body)
      .filter((key) => allowedUpdates.includes(key))
      .reduce((obj, key) => {
        obj[key] = req.body[key];
        return obj;
      }, {});

    Object.assign(vehicle, updates);
    await vehicle.save();

    res.json({
      message: 'Vehicle updated successfully',
      vehicle,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Partner Vehicle (only owner can delete, and only if pending)
export const deletePartnerVehicle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const vehicle = await PartnerVehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    // Check ownership
    if (vehicle.partnerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this vehicle' });
    }

    // Only allow deletion if pending
    if (vehicle.status !== 'pending') {
      return res.status(400).json({ message: `Cannot delete ${vehicle.status} vehicle` });
    }

    await PartnerVehicle.findByIdAndDelete(id);

    res.json({
      message: 'Vehicle deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Approve Partner Vehicle (admin only)
export const approvePartnerVehicle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { adminNotes } = req.body;

    const vehicle = await PartnerVehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    if (vehicle.status !== 'pending') {
      return res.status(400).json({ message: `Vehicle is already ${vehicle.status}` });
    }

    vehicle.status = 'approved';
    vehicle.approvalDate = new Date();
    if (adminNotes) {
      vehicle.adminNotes = adminNotes;
    }

    await vehicle.save();

    res.json({
      message: 'Vehicle approved successfully',
      vehicle,
    });
  } catch (error) {
    next(error);
  }
};

// Reject Partner Vehicle (admin only)
export const rejectPartnerVehicle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rejectionReason, adminNotes } = req.body;

    if (!rejectionReason) {
      return res.status(400).json({ message: 'Rejection reason is required' });
    }

    const vehicle = await PartnerVehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    if (vehicle.status !== 'pending') {
      return res.status(400).json({ message: `Vehicle is already ${vehicle.status}` });
    }

    vehicle.status = 'rejected';
    vehicle.rejectionReason = rejectionReason;
    vehicle.rejectionDate = new Date();
    if (adminNotes) {
      vehicle.adminNotes = adminNotes;
    }

    await vehicle.save();

    res.json({
      message: 'Vehicle rejected successfully',
      vehicle,
    });
  } catch (error) {
    next(error);
  }
};

// Get Partner's Vehicles
export const getPartnerVehicles = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = { partnerId: req.user.id };

    if (status) filter.status = status;

    const vehicles = await PartnerVehicle.find(filter).sort({ createdAt: -1 });

    res.json({
      count: vehicles.length,
      vehicles,
    });
  } catch (error) {
    next(error);
  }
};

// Get Pending Vehicles (admin only)
export const getPendingVehicles = async (req, res, next) => {
  try {
    const vehicles = await PartnerVehicle.find({ status: 'pending' })
      .populate('partnerId', 'firstName lastName email phone')
      .sort({ createdAt: -1 });

    res.json({
      count: vehicles.length,
      vehicles,
    });
  } catch (error) {
    next(error);
  }
};

// Get Approved Vehicles (for rental listings)
export const getApprovedVehicles = async (req, res, next) => {
  try {
    const { city, vehicleType, search } = req.query;
    const filter = { status: 'approved' };

    if (city) filter.city = city;
    if (vehicleType) filter.vehicleType = vehicleType;
    if (search) {
      filter.$or = [
        { vehicleName: { $regex: search, $options: 'i' } },
        { vehicleDescription: { $regex: search, $options: 'i' } },
      ];
    }

    const vehicles = await PartnerVehicle.find(filter)
      .populate('partnerId', 'firstName lastName phone')
      .sort({ createdAt: -1 });

    res.json({
      count: vehicles.length,
      vehicles,
    });
  } catch (error) {
    next(error);
  }
};
