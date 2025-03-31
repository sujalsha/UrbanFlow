// src/pages/Payments/Payments.jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import FormInput from '../../components/FormInput';
import CustomButton from '../../components/CustomButton';
import Loader from '../../components/Loader';
import ErrorAlert from '../../components/ErrorAlert';
import paymentService from '../../services/paymentService';

const Payments = () => {
  const [checkoutData, setCheckoutData] = useState({ userId: '', amount: '', currency: 'USD' });
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckoutChange = (e) => {
    setCheckoutData({ ...checkoutData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    setError('');
    setLoading(true);
    try {
      const result = await paymentService.checkoutPayment({
        userId: checkoutData.userId,
        amount: parseFloat(checkoutData.amount),
        currency: checkoutData.currency,
      });
      console.log('Payment checkout successful:', result);
      fetchPaymentHistory(checkoutData.userId);
    } catch (err) {
      console.error('Payment checkout error:', err);
      setError(err.response?.data || 'Payment checkout failed');
    } finally {
      setLoading(false);
    }
  };

  const fetchPaymentHistory = async (userId) => {
    if (!userId) return;
    try {
      const history = await paymentService.getPaymentHistory(userId);
      setPaymentHistory(history);
    } catch (err) {
      console.error('Error fetching payment history:', err);
      setError('Failed to fetch payment history');
    }
  };

  useEffect(() => {
    if (checkoutData.userId) {
      fetchPaymentHistory(checkoutData.userId);
    }
  }, [checkoutData.userId]);

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" sx={{ color: '#003366', marginBottom: '1rem' }}>
        Payments
      </Typography>

      {error && <ErrorAlert message={error} />}

      <Box sx={{ marginBottom: '2rem' }}>
        <Typography variant="h6" sx={{ marginBottom: '1rem' }}>
          Payment Checkout
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <FormInput
              name="userId"
              label="User ID"
              value={checkoutData.userId}
              onChange={handleCheckoutChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormInput
              name="amount"
              label="Amount"
              type="number"
              value={checkoutData.amount}
              onChange={handleCheckoutChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormInput
              name="currency"
              label="Currency"
              value={checkoutData.currency}
              onChange={handleCheckoutChange}
            />
          </Grid>
        </Grid>
        <Box sx={{ marginTop: '1rem' }}>
          <CustomButton onClick={handleCheckout}>Checkout Payment</CustomButton>
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" sx={{ marginBottom: '1rem' }}>
          Payment History
        </Typography>
        {loading ? (
          <Loader />
        ) : (
          paymentHistory.length > 0 ? (
            paymentHistory.map((payment) => (
              <Box
                key={payment.id}
                sx={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}
              >
                <Typography>ID: {payment.id}</Typography>
                <Typography>
                  Amount: {payment.amount} {payment.currency}
                </Typography>
                <Typography>Status: {payment.status}</Typography>
                <Typography>Transaction: {payment.transactionId}</Typography>
                <Typography>
                  Date: {new Date(payment.createdAt).toLocaleString()}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography>No payment history available.</Typography>
          )
        )}
      </Box>
    </Box>
  );
};

export default Payments;
