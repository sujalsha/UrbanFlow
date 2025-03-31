// src/components/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/colors.css';


const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go Back Home</Link>
    </div>
  );
};

export default NotFound;
