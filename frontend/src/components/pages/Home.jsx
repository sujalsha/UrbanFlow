// src/components/pages/Home.jsx
import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import '../../assets/styles/colors.css';


const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <main>
        <h1>Welcome to UrbanFlow</h1>
        <p>Your ultimate travel companion for navigating urban transportation with ease.</p>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
