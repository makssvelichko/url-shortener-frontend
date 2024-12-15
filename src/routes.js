import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import ShortenURL from './pages/ShortenURL';
import AllUrlPage from './pages/AllUrlPage';
import { initializeUsers } from './services/authService';


const AppRoutes = () => {
  useEffect(() => {
    initializeUsers();
  }, []);
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/shorten" element={<ShortenURL />} />
      <Route path="/all-urls" element={<AllUrlPage />} />
    </Routes>
  );
};

export default AppRoutes;
