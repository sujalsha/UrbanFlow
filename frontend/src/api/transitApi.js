// src/api/transitApi.js
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

export const getRoutes = async (origin, destination) => {
  const response = await axios.get(`${API_BASE_URL}/transit/routes`, {
    params: { origin, destination },
  });
  return response.data;
};

export const getRealTimeUpdates = async (routeId) => {
  const response = await axios.get(`${API_BASE_URL}/transit/updates/${routeId}`);
  return response.data;
};
