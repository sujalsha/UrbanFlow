import api from './api';

const userService = {
  addFavoriteRoute: async (userId, routeId) => {
    const response = await api.post(`/api/users/favoriteRoute/${routeId}?userId=${userId}`);
    return response.data;
  },

  getFavoriteRoutes: async (userId) => {
    const response = await api.get(`/api/users/favorites?userId=${userId}`);
    return response.data;
  },

  getUserHistory: async (userId) => {
    const response = await api.get(`/api/users/history?userId=${userId}`);
    return response.data;
  },
};

export default userService;
