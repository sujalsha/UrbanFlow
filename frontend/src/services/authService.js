import api from './api';

const authService = {
  signup: async (data) => {
    // data: { username, email, password, role }
    const response = await api.post('/api/auth/signup', data);
    return response.data;
  },

  login: async (data) => {
    // data: { username, password }
    const response = await api.post('/api/auth/login', data);
    // Save session token locally for further API calls
    localStorage.setItem('sessionToken', response.data);
    return response.data;
  },

  logout: async () => {
    const token = localStorage.getItem('sessionToken');
    const response = await api.post('/api/auth/logout', null, {
      headers: { 'X-Session-Token': token },
    });
    localStorage.removeItem('sessionToken');
    return response.data;
  },

  getProfile: async () => {
    const token = localStorage.getItem('sessionToken');
    const response = await api.get('/api/auth/profile', {
      headers: { 'X-Session-Token': token },
    });
    return response.data;
  },
};

export default authService;
