import api from './api';

export const initiatePayment = async (paymentData) => {
  const response = await api.post('/payments/initiate', paymentData);
  return response.data;
};

export const getPaymentStatus = async (paymentId) => {
  const response = await api.get(`/payments/status/${paymentId}`);
  return response.data;
};
