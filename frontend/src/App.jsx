// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import pages
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import UserDashboard from './pages/Dashboard/UserDashboard';
import EmployeeDashboard from './pages/Dashboard/EmployeeDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import TransitInfo from './pages/Transit/TransitInfo';
import RoutePlanning from './pages/Transit/RoutePlanning';
import Ticketing from './pages/Ticketing/Ticketing';
import Payments from './pages/Payments/Payments';
import Preferences from './pages/Preferences/Preferences';

// You can add additional pages such as SystemStatus if needed

function App() {
  return (
    <BrowserRouter>
      {/* Common layout components such as Navbar can be added here if needed */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/transit" element={<TransitInfo />} />
        <Route path="/route-planning" element={<RoutePlanning />} />
        <Route path="/ticketing" element={<Ticketing />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
