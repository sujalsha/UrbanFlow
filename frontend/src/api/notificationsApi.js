// src/api/notificationsApi.js
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

export const fetchNotificationsApi = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/notifications/${userId}`);
  return response.data;
};

export const markNotificationAsReadApi = async (notificationId) => {
  const response = await axios.post(`${API_BASE_URL}/notifications/read/${notificationId}`);
  return response.data;
};
