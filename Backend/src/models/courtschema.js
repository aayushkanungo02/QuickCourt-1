import mongoose from "mongoose";

const courtSchema = new mongoose.Schema(
  {
    venueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Venue",
      required: true,
    },
    name: { type: String, required: true },
    sportType: { type: String, required: true },
    pricePerHour: { type: Number, required: true },
    operatingHours: {
      start: { type: String, required: true }, // "HH:mm"
      end: { type: String, required: true },
    },
    availability: [
      {
        date: { type: String }, // "YYYY-MM-DD"
        slots: [
          {
            time: { type: String }, // "HH:mm"
            isBooked: { type: Boolean, default: false },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Court", courtSchema);
