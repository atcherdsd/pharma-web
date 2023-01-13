import RequestAPI from '../services/auth.api.service';
import ContextAPI from '../services/context.api.service';
import ResourceAPI from '../services/resource.api.service';
import { enumReqType } from '../helpers/EnumReqType';
export default function requestSwitch(body, type) {
  switch (type) {
    case enumReqType.restorePassword:
      return RequestAPI.reqToForgotPassword(body);
    case enumReqType.resetPassword:
      return RequestAPI.reqToResetPassword(body);
    case enumReqType.login:
      return RequestAPI.reqToLogin(body);
    case enumReqType.getContext:
      return ContextAPI.getContext();
    case enumReqType.postContext:
      return ContextAPI.postContext(body);
    case enumReqType.getCountry:
      return ResourceAPI.getCountry();
  }
}
