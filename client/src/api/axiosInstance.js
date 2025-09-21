/**
 * @fileoverview axiosInstance.js
 * A centralized, intelligent Axios instance for all frontend API calls.
 * It automatically handles the base URL for different environments and attaches
 * the user's auth token to every request.
 */
import axios from 'axios';

// This logic determines the correct backend URL.
// In Vercel, it will use the environment variable.
// In local development, it will be an empty string, allowing the proxy to work.
const baseURL = process.env.REACT_APP_BACKEND_API || "";

const api = axios.create({
  baseURL: baseURL,
});

// This interceptor is the key to authenticated requests.
// It runs before every single request sent using the 'api' instance.
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