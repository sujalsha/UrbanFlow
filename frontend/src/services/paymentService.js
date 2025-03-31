import api from './api';

const paymentService = {
  checkoutPayment: async (data) => {
    // data: { userId, amount, currency }
    const response = await api.post('/api/payments/checkout', data);
    return response.data;
  },

  verifyPayment: async (data) => {
    // data: { transactionId }
    const response = await api.post('/api/payments/verify', data);
    return response.data;
  },

  getPaymentHistory: async (userId) => {
    const response = await api.get(`/api/payments/history?userId=${userId}`);
    return response.data;
  },
};

export default paymentService;
