// client/src/api/axiosInstance.js

import axios from 'axios';

// Determine the correct backend URL based on the environment
const baseURL = process.env.NODE_ENV === 'production'

const api = axios.create({
  baseURL: 'https://taha-mern-portfolio.vercel.app/', // <-- PASTE YOUR LIVE RENDER URL HERE
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
      console.error('Could not parse user info or token is missing.', e);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;