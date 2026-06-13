import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide vehicle name'],
      trim: true,
    },
    brand: {
      type: String,
      enum: ['Honda', 'Yamaha', 'TVS', 'Hero', 'Suzuki', 'Bajaj', 'Royal Enfield', 'KTM', 'Piaggio', 'Aprilia'],
      required: true,
    },
    type: {
      type: String,
      enum: ['scooter', 'bike'],
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/300x200?text=Vehicle',
    },
    images: [String],
    pricePerKm: {
      type: Number,
      default: 20,
    },
    dailyRate: {
      type: Number,
      required: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      default: '',
    },
    licensePlate: {
      type: String,
      unique: true,
      required: true,
    },
    registrationNumber: {
      type: String,
      unique: true,
      required: true,
    },
    insuranceExpiry: {
      type: Date,
      required: true,
    },
    mileage: {
      type: Number,
      default: 0,
    },
    engineNumber: {
      type: String,
      unique: true,
    },
    chassisNumber: {
      type: String,
      unique: true,
    },
    condition: {
      type: String,
      enum: ['excellent', 'good', 'fair'],
      default: 'good',
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
      min: 0,
      max: 5,
      default: 4.5,
    },
    reviews: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        rating: Number,
        comment: String,
        date: Date,
      },
    ],
    serviceHistory: [
      {
        date: Date,
        description: String,
        cost: Number,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Vehicle', vehicleSchema);
