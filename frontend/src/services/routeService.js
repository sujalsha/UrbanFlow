import api from './api';

const routeService = {
  findBestRoute: async (originLat, originLon, destLat, destLon) => {
    const response = await api.get('/api/routes/find', {
      params: { originLat, originLon, destLat, destLon },
    });
    return response.data;
  },

  getMultiModalRoute: async (originLat, originLon, destLat, destLon) => {
    const response = await api.get('/api/routes/multimodal', {
      params: { originLat, originLon, destLat, destLon },
    });
    return response.data;
  },

  getLiveETA: async (stopId) => {
    const response = await api.get(`/api/routes/liveETA/${stopId}`);
    return response.data;
  },
};

export default routeService;
