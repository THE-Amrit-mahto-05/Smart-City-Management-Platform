import axios from 'axios';

// Create an Axios instance with base URL and defaults
const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Send cookies or authentication headers (adjust based on your backend)
});

// Request interceptor to add JWT token from localStorage (if any)
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor for global error handling (optional)
axiosClient.interceptors.response.use(
  response => response,
  error => {
    // You can handle 401 Unauthorized globally here if you want
    // For example: redirect to login on 401, clear token, etc.
    return Promise.reject(error);
  }
);

export default axiosClient;
