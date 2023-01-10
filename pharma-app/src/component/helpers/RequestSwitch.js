import RequestAPI from '../../services/requestAPI';

export default function requestSwitch(body, type) {
  switch (type) {
    case 'restorePassword':
      return RequestAPI.reqToForgotPassword(body);
    case 'resetPassword':
      return RequestAPI.reqToResetPassword(body);
    case 'login':
      return RequestAPI.reqToLogin(body);
  }
}
