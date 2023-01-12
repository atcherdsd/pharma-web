import RequestAPI from '../services/auth.api.service';
import ContextAPI from '../services/context.api.service';
export default function requestSwitch(body, type) {
  switch (type) {
    case 'restorePassword':
      return RequestAPI.reqToForgotPassword(body);
    case 'resetPassword':
      return RequestAPI.reqToResetPassword(body);
    case 'login':
      return RequestAPI.reqToLogin(body);
    case 'getContext':
      return ContextAPI.getContext();
    case 'postContext':
      return ContextAPI.postContext(body);
  }
}
