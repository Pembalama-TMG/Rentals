import mongoose from 'mongoose';

const ownerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    companyName: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    totalVehicles: {
      type: Number,
      default: 0,
    },
    totalBookings: {
      type: Number,
      default: 0,
    },
    totalEarnings: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    documents: {
      citizenshipNumber: {
        type: String,
        default: '',
      },
      citizenshipFile: {
        type: String,
        default: '',
      },
      panNumber: {
        type: String,
        default: '',
      },
      panFile: {
        type: String,
        default: '',
      },
    },
    bankDetails: {
      bankName: String,
      accountHolderName: String,
      accountNumber: String,
      routingNumber: String,
    },
    responseTime: {
      type: Number,
      default: 0, // in hours
    },
    cancellationRate: {
      type: Number,
      default: 0, // percentage
    },
    acceptanceRate: {
      type: Number,
      default: 100, // percentage
    },
    reviews: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        rating: Number,
        comment: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Owner', ownerSchema);
