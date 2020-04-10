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


