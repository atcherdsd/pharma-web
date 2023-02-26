import axios from 'axios';
import removeUserDataFromLS from '../helpers/utils';
import AuthAPIService from '../services/new.auth.api.service';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },
});

// Add Bearer token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Request interceptor for API calls
apiClient.interceptors.request.use(
  async (config) => {
    const expires = localStorage.getItem('expires');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      removeUserDataFromLS();
      return navigateToLogin();
    }

    if (new Date(expires).getTime() - 60 < new Date().getTime()) {
      try {
        await AuthAPIService.refreshAccessToken(refreshToken);
        const token = localStorage.getItem('token');
        config.headers['Authorization'] = `Bearer ${token}`;
      } catch (err) {
        removeUserDataFromLS();
        return navigateToLogin();
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Redirect to login page on 401 response
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      navigateToLogin();
    }

    return Promise.reject(error);
  }
);

// Return response.data.data for success responses
apiClient.interceptors.response.use(
  (response) => response.data.data,
  (error) => Promise.reject(error)
);

const navigateToLogin = () => {}; //(window.location.href = '/');

export default apiClient;
