import mongoose from "mongoose";
const paymentSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    stripePaymentIntentId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "inr" },
    status: {
      type: String,
      enum: ["requires_payment_method", "succeeded", "failed"],
      default: "requires_payment_method",
    },
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);