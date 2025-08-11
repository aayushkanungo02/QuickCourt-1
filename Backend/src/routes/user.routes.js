import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getVenues,
  getSingleVenue,
  createBooking,
  getMyBookings,
  cancelBooking,
  getMyProfile,
  updateMyProfile,
} from "../controllers/user.controllers.js";

const router = express.Router();

// Apply protect middleware to all user routes
router.use(protect);

// Venues
router.get("/venues", getVenues);
router.get("/venues/:venueId", getSingleVenue);

// Bookings
router.post("/bookings", createBooking);
router.get("/bookings", getMyBookings);
router.patch("/bookings/:bookingId/cancel", cancelBooking);

// Profile
router.get("/me", getMyProfile);
router.patch("/me", updateMyProfile);

export default router;
