// src/api/authApi.js
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

export const loginApi = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
  return response.data;
};

export const signupApi = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
  return response.data;
};

export const logoutApi = async () => {
  const response = await axios.post(`${API_BASE_URL}/auth/logout`);
  return response.data;
};

export const getUserDataApi = async () => {
  const response = await axios.get(`${API_BASE_URL}/auth/user`);
  return response.data;
};
