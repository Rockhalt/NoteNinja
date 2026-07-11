import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page mounts as the default entrance */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Both paths now point cleanly to your Auth page */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} /> 
        
        {/* Protected Dashboard Workspace */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Catch-all fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}