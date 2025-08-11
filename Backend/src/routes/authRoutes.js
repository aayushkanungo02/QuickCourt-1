import express from "express";
import { signup, verifyOtp, login, logout } from "../controllers/authControllers.js";
import upload from "../middleware/upload.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", upload.single("avatar"), signup);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.post("/logout", logout);

// Example protected route to get current user profile
router.get("/me", protect, (req, res) => {
  return res.json({ success: true, user: req.user });
});

export default router;
