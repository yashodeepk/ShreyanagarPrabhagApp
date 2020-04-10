export const INIT = 'boilerplate/MainApp/INIT';
export function initAction(data) {
  return {
    type: INIT,
    data,
  };
}

export const SET_MOBILE_NUMBER = 'boilerplate/MainApp/SET_MOBILE_NUMBER';
export function setMobileNumber(data) {
  return {
    type: SET_MOBILE_NUMBER,
    data,
  };
}

export const LOGIN_ACTION = 'boilerplate/MainApp/LOGIN_ACTION';
export function loginAction(navigation) {
  return {
    type: LOGIN_ACTION,
    navigation
  };
}

export const LOGIN_STATUS_CALL_LOADER = 'boilerplate/MainApp/LOGIN_STATUS_CALL_LOADER';
export function setLoginStatus(data) {
  return {
    type: LOGIN_STATUS_CALL_LOADER,
    data,
  };
}



