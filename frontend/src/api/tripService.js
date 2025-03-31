import api from './api';

export const getTrips = async () => {
  const response = await api.get('/trips');
  return response.data;
};

export const createTrip = async (tripData) => {
  const response = await api.post('/trips', tripData);
  return response.data;
};

export const deleteTrip = async (tripId) => {
  const response = await api.delete(`/trips/${tripId}`);
  return response.data;
};
