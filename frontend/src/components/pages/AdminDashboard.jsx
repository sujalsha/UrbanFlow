// src/components/pages/AdminDashboard.jsx
import React from 'react';
import Sidebar from '../layout/Sidebar';
import '../../assets/styles/colors.css';


const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <Sidebar />
      <main>
        <h1>Admin Dashboard</h1>
        <p>Welcome, Admin. Manage users, view reports, and monitor the system.</p>
      </main>
    </div>
  );
};

export default AdminDashboard;
