/**
 * @fileoverview axiosInstance.js
 * A centralized Axios instance for making API calls to the backend.
 *
 * This instance is configured with an interceptor that automatically attaches the
 * user's JWT token to the Authorization header of every outgoing request. This
 * simplifies API calls from components and ensures all protected routes are
 * accessed correctly.
 *
 * The baseURL is intentionally left relative ('/') to work seamlessly with both
 * the local development proxy and Vercel's production routing.
 */

import axios from 'axios';

// Create a new Axios instance with a relative baseURL.
const api = axios.create({
  baseURL: '/',
});

/**
 * Axios Request Interceptor
 * This function runs before any request is sent from the frontend.
 */
api.interceptors.request.use(
  (config) => {
    try {
      // Attempt to retrieve the user's information from browser localStorage.
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));

      // If the user info and a token exist, add the token to the request headers.
      if (userInfo && userInfo.token) {
        config.headers['Authorization'] = `Bearer ${userInfo.token}`;
      }
    } catch (e) {
      // This catch block handles cases where localStorage might be corrupted or empty.
      console.error('Could not parse user info from localStorage or token is missing.', e);
    }
    
    // Return the modified config object for the request to proceed.
    return config;
  },
  (error) => {
    // Handle any errors that occur during the request setup.
    return Promise.reject(error);
  }
);

export default api;