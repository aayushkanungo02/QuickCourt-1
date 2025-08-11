import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import OtpVerification from "./pages/auth/OtpVerification";
import UserHomePage from "./pages/user/userHomepage";
import MoreOptions from "./pages/user/moreOptions";
import VenueDetail from "./pages/user/VenueDetail";
import CourtBooking from "./pages/user/CourtBooking";
import Payment from "./pages/user/Payment";
import useAuthUser from "./hooks/useAuthuser";
import EditProfile from "./pages/user/EditProfile";
import OwnerLayout from "./pages/owner/OwnerLayout";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import Facilities from "./pages/owner/Facilities";
import ManageCourts from "./pages/owner/ManageCourts";

const App = () => {
  const { isLoading, authUser } = useAuthUser();
  if (isLoading) return <div>Loading...</div>;

  const isAuthenticated = Boolean(authUser);

  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/otp-verification" element={<OtpVerification />} />
      <Route path="/" element={<UserHomePage />} />
      <Route path="/more-options" element={<MoreOptions />} />
      <Route path="/venue/:id" element={<VenueDetail />} />
      <Route path="/venue/:id/book" element={<CourtBooking />} />
      <Route path="/payment/:id" element={<Payment />} />
      <Route path="/edit-profile" element={<EditProfile />} />

      {/* Facility Owner area */}
      <Route path="/owner" element={<OwnerLayout />}>
        <Route index element={<OwnerDashboard />} />
        <Route path="facilities" element={<Facilities />} />
        <Route path="manage-courts" element={<ManageCourts />} />
      </Route>
    </Routes>
  );
};

export default App;
