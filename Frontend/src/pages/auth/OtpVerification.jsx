import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { axiosInstance } from "@/lib/axios";
import { useNavigate, Link } from "react-router-dom";

export default function OtpVerification() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post("/auth/verify-otp", { otp });
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await axiosInstance.post("/auth/resend-otp");
      alert("OTP resent successfully!");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Side - Image */}
       {/* Left side - Image */}
     <div className="hidden md:flex flex-1 bg-gray-100 border-r border-gray-300 h-screen overflow-hidden">
  <img
    src="/login.jpg"
    alt="Sign Up Illustration"
    className="w-full h-full object-cover"
  />
</div>



      {/* Right Side - OTP Form */}
      <div className="flex flex-1 items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md space-y-5"
        >
          <h2 className="text-2xl font-bold text-center">OTP Verification</h2>

          <p className="mt-6 text-gray-700 text-sm text-center px-4">
          Enter the OTP sent to your registered email to verify your account.
        </p>

          <div className="space-y-2">
            <Label htmlFor="otp">Enter OTP</Label>
            <Input
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              placeholder="Enter 6-digit OTP"
              className="text-center tracking-widest font-semibold"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>

          <div className="text-sm text-center text-gray-600 space-y-2">
            <p>
              Didn’t receive the OTP?{" "}
              <button
                type="button"
                onClick={handleResend}
                className="text-blue-500 hover:underline font-medium"
              >
                Resend OTP
              </button>
            </p>
            <p>
              Entered wrong email?{" "}
              <Link
                to="/signup"
                className="text-blue-500 hover:underline font-medium"
              >
                Change Email
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
