// src/pages/Landing.jsx
import React from 'react';
import { Link } from 'react-router-dom';
//import './Landing.css'; // Import a CSS file for styling (see note below)

const Landing = () => {
  return (
    <div className="landing-container">
      <h1 className="landing-title">Welcome to Citymapper</h1>
      <div className="landing-buttons">
        <Link to="/login" className="btn btn-primary">Login</Link>
        <Link to="/signup" className="btn btn-secondary">Sign Up</Link>
      </div>
    </div>
  );
};

export default Landing;
