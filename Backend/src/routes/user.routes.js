import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
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

// Public: Venues
router.get("/venues", getVenues);
router.get("/venues/:venueId", getSingleVenue);

// Protected: Bookings and Profile
router.use(protect);
router.post("/bookings", createBooking);
router.get("/bookings", getMyBookings);
router.patch("/bookings/:bookingId/cancel", cancelBooking);
router.get("/me", getMyProfile);
router.patch("/me", updateMyProfile);

// Owner: Facilities CRUD (basic create/update for UI needs)
router.get("/owner/facilities", async (req, res) => {
  try {
    const { Facility } = await import("../models/facilitySchema.js");
    const facilities = await Facility.find({ ownerId: req.user._id })
      .sort({ createdAt: -1 })
      .exec();
    return res.json({ success: true, data: facilities });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
});

router.post(
  "/owner/facilities",
  upload.array("photos", 3),
  async (req, res) => {
    try {
      const { Facility } = await import("../models/facilitySchema.js");
      const body = req.body || {};
      const name = body.name?.trim();
      const description = body.description?.trim();
      const address = body["location[address]"] ?? body.address;
      const city = body["location[city]"] ?? body.city;
      const state = body["location[state]"] ?? body.state;
      const zip = body["location[zip]"] ?? body.zip;
      const supportedSports = body.supportedSports;
      const amenities = body.amenities;

      if (!name || !description) {
        return res.status(400).json({
          success: false,
          message: "Name and description are required",
        });
      }
      if (!address || !city || !state || !zip) {
        return res.status(400).json({
          success: false,
          message: "Location address, city, state and zip are required",
        });
      }

      const photoUrls = (req.files || []).map((f) => f.path).slice(0, 3);
      let sports = [];
      try {
        if (supportedSports) {
          sports = Array.isArray(supportedSports)
            ? supportedSports
            : JSON.parse(supportedSports);
        }
      } catch {
        sports = String(supportedSports)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }
      let amen = [];
      try {
        if (amenities) {
          amen = Array.isArray(amenities) ? amenities : JSON.parse(amenities);
        }
      } catch {
        amen = String(amenities)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }

      const doc = await Facility.create({
        name,
        description,
        location: { address, city, state, zip },
        ownerId: req.user._id,
        supportedSports: sports,
        amenities: amen,
        photos: photoUrls,
        status: "approved",
      });
      return res.status(201).json({
        success: true,
        message: "Facility added successfully",
        data: doc,
      });
    } catch (e) {
      return res.status(400).json({ success: false, message: e.message });
    }
  }
);

router.put(
  "/owner/facilities/:id",
  upload.array("photos", 3),
  async (req, res) => {
    try {
      const { Facility } = await import("../models/facilitySchema.js");
      const { id } = req.params;
      const updates = {};
      if (req.body.supportedSports)
        updates.supportedSports = JSON.parse(req.body.supportedSports);
      if (req.body.amenities)
        updates.amenities = JSON.parse(req.body.amenities);
      if (req.files && req.files.length > 0)
        updates.photos = req.files.map((f) => f.path).slice(0, 3);

      const updated = await Facility.findOneAndUpdate(
        { _id: id, ownerId: req.user._id },
        { $set: updates },
        { new: true }
      ).exec();
      if (!updated)
        return res
          .status(404)
          .json({ success: false, message: "Facility not found" });
      return res.json({
        success: true,
        message: "Facility updated successfully",
        data: updated,
      });
    } catch (e) {
      return res.status(400).json({ success: false, message: e.message });
    }
  }
);

export default router;
