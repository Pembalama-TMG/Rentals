import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    totalBookings: {
      type: Number,
      default: 0,
    },
    completedBookings: {
      type: Number,
      default: 0,
    },
    cancelledBookings: {
      type: Number,
      default: 0,
    },
    totalRevenue: {
      type: Number,
      default: 0,
    },
    averageRentalPrice: {
      type: Number,
      default: 0,
    },
    totalCustomers: {
      type: Number,
      default: 0,
    },
    totalVehicles: {
      type: Number,
      default: 0,
    },
    availableVehicles: {
      type: Number,
      default: 0,
    },
    vehicleTypeBreakdown: {
      scooter: {
        type: Number,
        default: 0,
      },
      bike: {
        type: Number,
        default: 0,
      },
    },
    popularvehicles: [
      {
        vehicleId: mongoose.Schema.Types.ObjectId,
        bookings: Number,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Analytics', analyticsSchema);
