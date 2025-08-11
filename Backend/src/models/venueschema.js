import mongoose from "mongoose";

const venueSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String },
    address: { type: String, required: true },
    shortLocation: { type: String, required: true },
    sports: [{ type: String, required: true }],
    amenities: [{ type: String }],
    startingPrice: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    photos: [{ type: String }],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Venue", venueSchema);
