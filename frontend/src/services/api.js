import axios from 'axios';

// Create an Axios instance with the base URL of your backend
const api = axios.create({
  baseURL: 'http://localhost:8080', // adjust if your backend URL is different
});

// Optionally, attach interceptors to add authentication headers if a token is available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sessionToken'); // or use a context/state management solution
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
