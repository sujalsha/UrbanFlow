// src/components/forms/PaymentForm.jsx
import React, { useState } from 'react';
import Button from '../common/Button';
import '../../assets/styles/colors.css';


const PaymentForm = ({ onSubmit }) => {
  const [paymentData, setPaymentData] = useState({ cardNumber: '', expiryDate: '', cvv: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(paymentData);
  };

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <h2>Payment Details</h2>
      <label>Card Number</label>
      <input type="text" name="cardNumber" value={paymentData.cardNumber} onChange={handleChange} required />
      
      <label>Expiry Date</label>
      <input type="text" name="expiryDate" value={paymentData.expiryDate} onChange={handleChange} required />
      
      <label>CVV</label>
      <input type="password" name="cvv" value={paymentData.cvv} onChange={handleChange} required />
      
      <Button type="submit">Pay Now</Button>
    </form>
  );
};

export default PaymentForm;
