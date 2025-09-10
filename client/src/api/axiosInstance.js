// client/src/api/axiosInstance.js

import axios from 'axios';

// Create a new Axios instance. All requests will be relative to the domain
// the app is running on. In development, the proxy will forward these.
// In production, Vercel's routes will forward them.
const api = axios.create({
  baseURL: '/',
});

// This interceptor automatically attaches the auth token to every request.
api.interceptors.request.use(
  (config) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo && userInfo.token) {
        config.headers['Authorization'] = `Bearer ${userInfo.token}`;
      }
    } catch (e) {
      console.error('Could not parse user info from localStorage', e);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;