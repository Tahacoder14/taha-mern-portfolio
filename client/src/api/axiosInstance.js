import axios from 'axios';

// This is the direct, explicit, and permanent connection to your live backend.
const api = axios.create({
  baseURL: 'https://taha-mern-portfolio.vercel.app/api', // <-- YOUR LIVE BACKEND URL
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
      // It's okay if this fails silently, the request will just be unauthenticated.
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;