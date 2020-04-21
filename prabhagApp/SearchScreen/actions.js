export const SET_LOADER = 'boilerplate/LoginScreen/SET_LOADER';
export function setLoader(data) {
  return {
    type: SET_LOADER,
    data,
  };
}

export const SEARCH_TERM = 'boilerplate/LoginScreen/SEARCH_TERM';
export function searchTermAction(data) {
  return {
    type: SEARCH_TERM,
    data,
  };
}

export const SET_SEARCH_TERM_DATA = 'boilerplate/LoginScreen/SET_SEARCH_TERM_DATA';
export function setSearchTermData(data) {
  return {
    type: SET_SEARCH_TERM_DATA,
    data,
  };
}

export const GET_SINGLE_USER_DATA = 'boilerplate/LoginScreen/GET_SINGLE_USER_DATA';
export function getSingleUserData(data) {
  return {
    type: GET_SINGLE_USER_DATA,
    data,
  };
}

export const SET_SINGLE_USER_DATA = 'boilerplate/LoginScreen/SET_SINGLE_USER_DATA';
export function setSingleUserData(data) {
  return {
    type: SET_SINGLE_USER_DATA,
    data,
  };
}

export const SET_SINGLE_USER_DATA_NULL = 'boilerplate/LoginScreen/SET_SINGLE_USER_DATA_NULL';
export function setSingleUserDataNull(data) {
  return {
    type: SET_SINGLE_USER_DATA_NULL,
    data,
  };
}