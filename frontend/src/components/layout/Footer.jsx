// src/components/layout/Footer.jsx
import React from 'react';
import '../../assets/styles/colors.css';


const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} UrbanFlow. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
