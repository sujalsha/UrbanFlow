import api from './api';

export const getUserProfile = async () => {
  const response = await api.get('/user/profile');
  return response.data;
};

export const updateUserProfile = async (userData) => {
  const response = await api.put('/user/profile', userData);
  return response.data;
};
