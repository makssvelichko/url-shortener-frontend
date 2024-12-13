import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import { initializeUsers } from './services/authService';

const AppRoutes = () => {
  useEffect(() => {
    initializeUsers();
  }, []);
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      {/* <Route path="/login" element={<Login />} /> */}
    </Routes>
  );
};

export default AppRoutes;
