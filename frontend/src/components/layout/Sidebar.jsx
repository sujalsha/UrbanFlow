// src/components/layout/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/colors.css';


const Sidebar = () => {
  return (
    <aside className="sidebar">
      <Link to="/search">🔎 Search</Link>
      <Link to="/trips">🗺️ Trips</Link>
      <Link to="/payments">💳 Payments</Link>
      <Link to="/notifications">🔔 Notifications</Link>
      <Link to="/profile">👤 Profile</Link>
      <Link to="/admin">🛠️ Admin</Link>
    </aside>
  );
};

export default Sidebar;
