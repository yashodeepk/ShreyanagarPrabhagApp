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
