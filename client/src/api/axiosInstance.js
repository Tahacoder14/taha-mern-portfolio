import axios from 'axios';

// This is the key: The baseURL points to the ROOT of your live backend deployment.
// It should NOT contain /api.
const baseURL = process.env.REACT_APP_BACKEND_API || 'http://localhost:5000';

const api = axios.create({
  baseURL: baseURL,
});

// The interceptor remains the same and is perfect.
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