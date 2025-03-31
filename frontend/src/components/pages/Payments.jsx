// src/components/pages/Payments.jsx
import React from 'react';
import Sidebar from '../layout/Sidebar';
import PaymentForm from '../forms/PaymentForm';
import '../../assets/styles/colors.css';


const Payments = () => {
  const handlePayment = (data) => {
    console.log('Payment Submitted:', data);
    alert('Payment Successful!');
  };

  return (
    <div className="payments-container">
      <Sidebar />
      <main>
        <h1>Payments</h1>
        <p>Enter your payment details below.</p>
        <PaymentForm onSubmit={handlePayment} />
      </main>
    </div>
  );
};

export default Payments;
