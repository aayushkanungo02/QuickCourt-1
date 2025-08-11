import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getQuote,
  createPaymentSession,
  confirmPayment,
} from "../controllers/payments.controllers.js";

const router = express.Router();

// Protect all payment routes
router.use(protect);

// Get price quote for a court and time range
router.get("/quote", getQuote);

// Create a (mock) payment session
router.post("/session", createPaymentSession);

// Confirm payment and create booking
router.post("/confirm", confirmPayment);

export default router;
