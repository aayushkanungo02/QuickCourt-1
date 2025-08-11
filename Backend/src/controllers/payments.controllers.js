import mongoose from "mongoose";
import { Court } from "../models/courtSchema.js";
import { Booking } from "../models/bookingschema.js";

const toDate = (value) => (value instanceof Date ? value : new Date(value));

const computeDurationHours = (start, end) => {
  const ms = end.getTime() - start.getTime();
  return ms / (1000 * 60 * 60);
};

// GET price quote for a court and time range
export const getQuote = async (req, res) => {
  try {
    const { courtId, startTime, endTime } = req.query;

    if (!courtId || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: "courtId, startTime and endTime are required",
      });
    }

    if (!mongoose.isValidObjectId(courtId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid courtId" });
    }

    const court = await Court.findById(courtId).exec();
    if (!court) {
      return res
        .status(404)
        .json({ success: false, message: "Court not found" });
    }

    const start = toDate(startTime);
    const end = toDate(endTime);
    const durationHours = computeDurationHours(start, end);
    if (!Number.isFinite(durationHours) || durationHours <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "End time must be after start time" });
    }

    const amount = durationHours * court.pricePerHour;

    return res.status(200).json({
      success: true,
      message: "Quote computed successfully",
      data: { amount, currency: "INR", durationHours },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to compute quote",
    });
  }
};

// Create a mock payment session (no external gateway)
export const createPaymentSession = async (req, res) => {
  try {
    const { courtId, startTime, endTime } = req.body;

    if (!courtId || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: "courtId, startTime and endTime are required",
      });
    }

    if (!mongoose.isValidObjectId(courtId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid courtId" });
    }

    const court = await Court.findById(courtId).exec();
    if (!court) {
      return res
        .status(404)
        .json({ success: false, message: "Court not found" });
    }

    const start = toDate(startTime);
    const end = toDate(endTime);
    const durationHours = computeDurationHours(start, end);
    if (!Number.isFinite(durationHours) || durationHours <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "End time must be after start time" });
    }

    // basic overlap check before creating session (advisory; final check happens on confirm)
    const overlapping = await Booking.findOne({
      courtId,
      status: "confirmed",
      startTime: { $lt: end },
      endTime: { $gt: start },
    }).exec();
    if (overlapping) {
      return res
        .status(409)
        .json({ success: false, message: "Time slot is already booked" });
    }

    const amount = durationHours * court.pricePerHour;
    const sessionId = `mock_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2)}`;
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    return res.status(201).json({
      success: true,
      message: "Payment session created",
      data: {
        sessionId,
        amount,
        currency: "INR",
        courtId,
        startTime: start,
        endTime: end,
        expiresAt,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create payment session",
    });
  }
};

// Confirm a mock payment and create the booking
export const confirmPayment = async (req, res) => {
  try {
    const { sessionId, courtId, startTime, endTime, paymentReference } =
      req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!sessionId || !courtId || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: "sessionId, courtId, startTime and endTime are required",
      });
    }

    if (!mongoose.isValidObjectId(courtId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid courtId" });
    }

    const court = await Court.findById(courtId).exec();
    if (!court) {
      return res
        .status(404)
        .json({ success: false, message: "Court not found" });
    }

    const start = toDate(startTime);
    const end = toDate(endTime);
    const durationHours = computeDurationHours(start, end);
    if (!Number.isFinite(durationHours) || durationHours <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "End time must be after start time" });
    }

    // final overlap check
    const overlapping = await Booking.findOne({
      courtId,
      status: "confirmed",
      startTime: { $lt: end },
      endTime: { $gt: start },
    }).exec();
    if (overlapping) {
      return res
        .status(409)
        .json({ success: false, message: "Time slot is already booked" });
    }

    const totalPrice = durationHours * court.pricePerHour;

    // Simulate successful payment confirmation
    const booking = await Booking.create({
      userId,
      facilityId: court.facilityId,
      courtId,
      startTime: start,
      endTime: end,
      totalPrice,
      status: "confirmed",
    });

    return res.status(201).json({
      success: true,
      message: "Payment confirmed and booking created",
      data: {
        booking,
        payment: { sessionId, paymentReference: paymentReference || sessionId },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to confirm payment",
    });
  }
};
