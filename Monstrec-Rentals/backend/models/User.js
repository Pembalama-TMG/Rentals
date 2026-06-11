import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please provide first name'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Please provide last name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      unique: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: 6,
      select: false,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: 'Kathmandu',
    },
    avatar: {
      type: String,
      default: 'https://ui-avatars.com/api/?name=User&background=random',
    },
    role: {
      type: String,
      enum: ['customer', 'owner', 'admin'],
      default: 'customer',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    totalRentals: {
      type: Number,
      default: 0,
    },
    totalSpent: {
      type: Number,
      default: 0,
    },
    licenseNumber: {
      type: String,
      default: '',
    },
    licenseExpiry: {
      type: Date,
      default: null,
    },
    documentVerification: {
      type: Boolean,
      default: false,
    },
    // Owner specific fields
    bankName: {
      type: String,
      default: '',
    },
    accountNumber: {
      type: String,
      default: '',
    },
    accountHolderName: {
      type: String,
      default: '',
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
    totalVehicles: {
      type: Number,
      default: 0,
    },
    ownerVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
