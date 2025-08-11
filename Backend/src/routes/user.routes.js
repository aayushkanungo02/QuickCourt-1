import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getVenues,
  getSingleVenue,
  createReview,
  createBooking,
  getMyBookings,
  cancelBooking,
  getMyProfile,
  updateMyProfile,
} from "../controllers/user.controllers.js";

const router = express.Router();

// Public: Venues
router.get("/venues", getVenues);
router.get("/venues/:venueId", getSingleVenue);

// Protected: Bookings and Profile
router.use(protect);
// Reviews
router.post("/venues/:venueId/reviews", createReview);
router.post("/bookings", createBooking);
router.get("/bookings", getMyBookings);
router.patch("/bookings/:bookingId/cancel", cancelBooking);
router.get("/me", getMyProfile);
router.patch("/me", updateMyProfile);

export default router;
