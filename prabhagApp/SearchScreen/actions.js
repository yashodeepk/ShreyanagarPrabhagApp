export const INIT = 'boilerplate/LoginScreen/INIT';
export function initAction(data) {
  return {
    type: INIT,
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