import api from './api';

const adminService = {
  addRoute: async (data) => {
    // data: { id, name, mode, origin, destination }
    const response = await api.post('/api/admin/addRoute', data);
    return response.data;
  },

  updateRoute: async (routeId, data) => {
    // data: { id, name, mode, origin, destination }
    const response = await api.put(`/api/admin/updateRoute/${routeId}`, data);
    return response.data;
  },

  deleteRoute: async (routeId) => {
    const response = await api.delete(`/api/admin/deleteRoute/${routeId}`);
    return response.data;
  },

  addStop: async (routeId, data) => {
    // data: { id, name, latitude, longitude }
    const response = await api.post(`/api/admin/addStop/${routeId}`, data);
    return response.data;
  },

  deleteStop: async (stopId) => {
    const response = await api.delete(`/api/admin/deleteStop/${stopId}`);
    return response.data;
  },
};

export default adminService;
