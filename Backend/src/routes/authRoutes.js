import express from "express";
import { signup, verifyOtp, login } from "../controllers/authControllers.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/signup", upload.single("avatar"), signup);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);

export default router;
