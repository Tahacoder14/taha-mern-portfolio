// client/src/api/axiosInstance.js

import axios from 'axios';

// This logic correctly determines the backend URL.
// In Vercel, it uses the REACT_APP_BACKEND_API variable.
// In local development, it will be an empty string, allowing the proxy to work.
const baseURL = process.env.REACT_APP_BACKEND_API || "";

const api = axios.create({
  // THE FIX: Use the 'baseURL' variable instead of a hardcoded string.
  baseURL: baseURL,
});

// This interceptor automatically attaches the auth token to every request.
// This code is perfect and does not need any changes.
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