import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      unique: true,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    rentalType: {
      type: String,
      enum: ['perKm', 'fullDay'],
      required: true,
    },
    distance: {
      type: Number,
      default: 0,
    },
    pickupLocation: {
      type: String,
      required: true,
    },
    dropoffLocation: {
      type: String,
      required: true,
    },
    baseCost: {
      type: Number,
      required: true,
    },
    totalCost: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'active', 'completed', 'cancelled', 'rejected'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['esewa', 'khalti', 'cash'],
      default: 'esewa',
    },
    notes: String,
    adminNotes: String,
    cancellationReason: String,
    refundAmount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Generate Booking ID
bookingSchema.pre('save', async function (next) {
  if (!this.bookingId) {
    const count = await mongoose.model('Booking').countDocuments();
    this.bookingId = `BK${Date.now()}${count}`;
  }
  next();
});

export default mongoose.model('Booking', bookingSchema);
