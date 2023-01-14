import authApiClient from '../http/authApiClient';

export default class AuthAPIService {
  static reqToForgotPassword = (email) => authApiClient.post('/auth/forgot-password', { email });

  static reqToResetPassword = (resetPasswordToken, password) =>
    authApiClient.post('/auth/reset-password', { resetPasswordToken, password });

  static reqToLogin = (email, password) => authApiClient.post('/auth/login', { email, password });

  static refreshAccessToken = (refreshToken) =>
    authApiClient.post('/auth/refresh-tokens', { refreshToken });
}
