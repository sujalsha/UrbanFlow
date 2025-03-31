// src/api/paymentApi.js
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

export const initiatePayment = async (paymentData) => {
  const response = await axios.post(`${API_BASE_URL}/payments/initiate`, paymentData);
  return response.data;
};

export const verifyPayment = async (paymentId) => {
  const response = await axios.get(`${API_BASE_URL}/payments/verify/${paymentId}`);
  return response.data;
};
