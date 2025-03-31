import api from './api';

const transitService = {
  getModes: async () => {
    const response = await api.get('/api/transit/modes');
    return response.data;
  },

  getRoutes: async () => {
    const response = await api.get('/api/transit/routes');
    return response.data;
  },

  getStops: async (routeId) => {
    const response = await api.get(`/api/transit/stops/${routeId}`);
    return response.data;
  },

  getSchedule: async (stopId) => {
    const response = await api.get(`/api/transit/schedule/${stopId}`);
    return response.data;
  },
};

export default transitService;
