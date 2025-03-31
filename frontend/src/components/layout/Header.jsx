// src/components/layout/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/colors.css';


const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="logo">UrbanFlow</Link>
      <nav>
        <Link to="/search">Search</Link>
        <Link to="/trips">Trips</Link>
        <Link to="/payments">Payments</Link>
        <Link to="/notifications">Notifications</Link>
        <Link to="/profile">Profile</Link>
      </nav>
    </header>
  );
};

export default Header;
