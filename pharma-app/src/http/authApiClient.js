import axios from 'axios';

const authApiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Save tokens from login or refresh requests to LS
authApiClient.interceptors.response.use(
  (response) => {
    response.data?.data?.tokens?.access?.token && saveTokens(response.data.data.tokens); // login
    response.data?.data?.access?.token && saveTokens(response.data.data); // refresh

    return response;
  },
  (error) => Promise.reject(error)
);

export const saveTokens = (tokens) => {
  localStorage.setItem('token', tokens.access.token);
  localStorage.setItem('refreshToken', tokens.refresh.token);
  localStorage.setItem('expires', tokens.refresh.expires);
};

export default authApiClient;
