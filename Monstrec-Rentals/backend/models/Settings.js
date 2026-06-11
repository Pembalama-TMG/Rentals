import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: 'Monstrec Rentals',
    },
    companyEmail: {
      type: String,
      default: 'info@monstrec.com',
    },
    companyPhone: {
      type: String,
      default: '+977-1-4123456',
    },
    companyAddress: {
      type: String,
      default: 'Kathmandu, Nepal',
    },
    companyLogo: {
      type: String,
      default: '',
    },
    scooterPricePerKm: {
      type: Number,
      default: 20,
    },
    scooterDailyRate: {
      type: Number,
      default: 1000,
    },
    bikePricePerKm: {
      type: Number,
      default: 20,
    },
    bikeDailyRate: {
      type: Number,
      default: 1500,
    },
    bookingValidityDays: {
      type: Number,
      default: 30,
    },
    cancellationPenaltyPercent: {
      type: Number,
      default: 10,
    },
    taxPercent: {
      type: Number,
      default: 13,
    },
    socialLinks: {
      facebook: String,
      instagram: String,
      twitter: String,
      youtube: String,
    },
    operatingHours: {
      monday: { open: String, close: String },
      tuesday: { open: String, close: String },
      wednesday: { open: String, close: String },
      thursday: { open: String, close: String },
      friday: { open: String, close: String },
      saturday: { open: String, close: String },
      sunday: { open: String, close: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model('Settings', settingsSchema);
