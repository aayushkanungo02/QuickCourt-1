import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import OtpVerification from './pages/auth/OtpVerification';
import UserHomePage from './pages/user/userHomepage';
import MoreOptions from './pages/user/moreOptions';

const App = () => {
  return (
 
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/" element={<UserHomePage />} />
        <Route path="/more-options" element={<MoreOptions />} />
        
      </Routes>
  
  );
};

export default App;
