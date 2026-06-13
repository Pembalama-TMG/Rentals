import Vehicle from '../models/Vehicle.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';

// Get All Vehicles
export const getAllVehicles = async (req, res, next) => {
  try {
    const { type, brand, available } = req.query;
    const filter = {};

    if (type) filter.type = type;
    if (brand) filter.brand = brand;
    if (available !== undefined) filter.availability = available === 'true';

    const vehicles = await Vehicle.find(filter).sort({ createdAt: -1 });
    res.json({
      count: vehicles.length,
      vehicles,
    });
  } catch (error) {
    next(error);
  }
};

// Get Vehicle by ID
export const getVehicleById = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json({ vehicle });
  } catch (error) {
    next(error);
  }
};

// Create Vehicle (Admin only)
export const createVehicle = async (req, res, next) => {
  try {
    const {
      name,
      brand,
      type,
      model,
      year,
      pricePerKm,
      dailyRate,
      description,
      licensePlate,
      registrationNumber,
      insuranceExpiry,
      engineNumber,
      chassisNumber,
    } = req.body;

    // Check if license plate exists
    const existingVehicle = await Vehicle.findOne({ licensePlate });
    if (existingVehicle) {
      return res.status(400).json({ message: 'License plate already exists' });
    }

    let imageUrl = 'https://via.placeholder.com/300x200?text=Vehicle';

    // Upload image if provided
    if (req.file) {
      try {
        const result = await uploadToCloudinary(req.file.buffer, 'vehicles');
        imageUrl = result.secure_url;
      } catch (error) {
        console.error('Image upload failed:', error);
      }
    }

    const vehicle = await Vehicle.create({
      name,
      brand,
      type,
      model,
      year,
      pricePerKm: pricePerKm || 20,
      dailyRate,
      description,
      licensePlate,
      registrationNumber,
      insuranceExpiry,
      engineNumber,
      chassisNumber,
      image: imageUrl,
    });

    res.status(201).json({
      message: 'Vehicle created successfully',
      vehicle,
    });
  } catch (error) {
    next(error);
  }
};

// Update Vehicle (Admin only)
export const updateVehicle = async (req, res, next) => {
  try {
    let vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    const { name, brand, type, model, year, pricePerKm, dailyRate, description, availability } =
      req.body;

    let imageUrl = vehicle.image;

    // Upload new image if provided
    if (req.file) {
      try {
        const result = await uploadToCloudinary(req.file.buffer, 'vehicles');
        imageUrl = result.secure_url;
      } catch (error) {
        console.error('Image upload failed:', error);
      }
    }

    // Build update object with only provided fields
    const updateData = { image: imageUrl };
    
    if (name !== undefined) updateData.name = name;
    if (brand !== undefined) updateData.brand = brand;
    if (type !== undefined) updateData.type = type;
    if (model !== undefined) updateData.model = model;
    if (year !== undefined) updateData.year = year;
    if (pricePerKm !== undefined) updateData.pricePerKm = pricePerKm;
    if (dailyRate !== undefined) updateData.dailyRate = dailyRate;
    if (description !== undefined) updateData.description = description;
    if (availability !== undefined) updateData.availability = availability;

    vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Vehicle updated successfully',
      vehicle,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Vehicle (Admin only)
export const deleteVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Get Vehicle Statistics
export const getVehicleStats = async (req, res, next) => {
  try {
    const totalVehicles = await Vehicle.countDocuments();
    const availableVehicles = await Vehicle.countDocuments({ availability: true });
    const scooters = await Vehicle.countDocuments({ type: 'scooter' });
    const bikes = await Vehicle.countDocuments({ type: 'bike' });

    res.json({
      totalVehicles,
      availableVehicles,
      unavailableVehicles: totalVehicles - availableVehicles,
      scooters,
      bikes,
    });
  } catch (error) {
    next(error);
  }
};
