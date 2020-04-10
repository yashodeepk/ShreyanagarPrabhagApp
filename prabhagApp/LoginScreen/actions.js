export const INIT = 'boilerplate/LoginScreen/INIT';
export function initAction(data) {
  return {
    type: INIT,
    data,
  };
}

export const SET_MOBILE_NUMBER = 'boilerplate/LoginScreen/SET_MOBILE_NUMBER';
export function setMobileNumber(data) {
  return {
    type: SET_MOBILE_NUMBER,
    data,
  };
}

export const LOGIN_ACTION = 'boilerplate/LoginScreen/LOGIN_ACTION';
export function loginAction(data) {
  return {
    type: LOGIN_ACTION,
    data,
  };
}

export const LOGIN_STATUS_CALL_LOADER = 'boilerplate/LoginScreen/LOGIN_STATUS_CALL_LOADER';
export function setLoginStatus(data) {
  return {
    type: LOGIN_STATUS_CALL_LOADER,
    data,
  };
}



