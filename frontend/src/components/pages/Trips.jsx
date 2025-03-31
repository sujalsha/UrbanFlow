// src/components/pages/Trips.jsx
import React from 'react';
import Sidebar from '../layout/Sidebar';
import '../../assets/styles/colors.css';


const Trips = () => {
  return (
    <div className="trips-container">
      <Sidebar />
      <main>
        <h1>Your Trips</h1>
        <p>Here you can view your past and upcoming trips.</p>
      </main>
    </div>
  );
};

export default Trips;
