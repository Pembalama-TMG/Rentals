import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      unique: true,
      required: true,
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'NPR',
    },
    paymentMethod: {
      type: String,
      enum: ['esewa', 'khalti', 'cash'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    paymentGatewayResponse: {
      transactionCode: String,
      statusCode: String,
      statusMessage: String,
    },
    receiptUrl: String,
    notes: String,
  },
  { timestamps: true }
);

// Generate Transaction ID
paymentSchema.pre('save', async function (next) {
  if (!this.transactionId) {
    this.transactionId = `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
  }
  next();
});

export default mongoose.model('Payment', paymentSchema);
