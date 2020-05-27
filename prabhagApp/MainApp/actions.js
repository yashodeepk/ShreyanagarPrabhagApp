export const INIT = 'boilerplate/MainApp/INIT';
export function initAction(data) {
  return {
    type: INIT,
    data,
  };
}

export const SET_USER_DETAILS = 'boilerplate/MainApp/SET_USER_DETAILS';
export function setUserDetails(data) {
  return {
    type: SET_USER_DETAILS,
    data,
  };
}

export const SET_USER_VERIFICATION_ID = 'boilerplate/MainApp/SET_USER_VERIFICATION_ID';
export function setVerificationId(data) {
  return {
    type: SET_USER_VERIFICATION_ID,
    data,
  };
}
