import mongoose from 'mongoose';

const partnerVehicleSchema = new mongoose.Schema(
  {
    partnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Vehicle Information
    vehicleName: {
      type: String,
      required: [true, 'Vehicle name is required'],
      trim: true,
    },
    vehicleType: {
      type: String,
      enum: ['scooter', 'bike'],
      required: [true, 'Vehicle type is required'],
    },
    vehicleDescription: {
      type: String,
      required: [true, 'Vehicle description is required'],
    },
    // Pricing
    dailyRentPrice: {
      type: Number,
      required: [true, 'Daily rent price is required'],
      min: 0,
    },
    // Location Information
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    district: {
      type: String,
      required: [true, 'District is required'],
    },
    exactLocation: {
      type: String,
      required: [true, 'Exact location is required'],
    },
    // Image
    vehicleImage: {
      type: String,
      required: [true, 'Vehicle image is required'],
    },
    // Status
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    rejectionReason: {
      type: String,
      default: null,
    },
    // Partner Information for reference
    partnerFullName: {
      type: String,
      required: true,
    },
    partnerPhone: {
      type: String,
      required: true,
    },
    partnerEmail: {
      type: String,
      required: true,
    },
    // Notes
    adminNotes: {
      type: String,
      default: '',
    },
    approvalDate: {
      type: Date,
      default: null,
    },
    rejectionDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Index for faster queries
partnerVehicleSchema.index({ partnerId: 1, status: 1 });
partnerVehicleSchema.index({ city: 1, status: 1 });
partnerVehicleSchema.index({ status: 1 });

export default mongoose.model('PartnerVehicle', partnerVehicleSchema);
