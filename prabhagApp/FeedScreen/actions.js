
export const INIT = 'boilerplate/LoginScreen/INIT';
export function initAction(data) {
  return {
    type: INIT,
    data,
  };
}

export const UPLOAD_IMAGE = 'boilerplate/LoginScreen/UPLOAD_IMAGE';
export function uploadImage(data) {
  return {
    type: UPLOAD_IMAGE,
    data,
  };
}

export const SET_LOADER_FEED = 'boilerplate/LoginScreen/SET_LOADER_FEED';
export function setLoaderFeed(data) {
  return {
    type: SET_LOADER_FEED,
    data,
  };
}

export const GET_FEED = 'boilerplate/LoginScreen/GET_FEED';
export function getFeed(data) {
  return {
    type: GET_FEED,
    data,
  };
}

export const SET_FEED = 'boilerplate/LoginScreen/SET_FEED';
export function setFeed(data) {
  return {
    type: SET_FEED,
    data,
  };
}

export const GET_BIRTHDAY = 'boilerplate/LoginScreen/GET_BIRTHDAY';
export function getBirthday() {
  return {
    type: GET_BIRTHDAY,
  };
}

export const SET_BIRTHDAY = 'boilerplate/LoginScreen/SET_BIRTHDAY';
export function setBirthday(data) {
  return {
    type: SET_BIRTHDAY,
    data
  };
}
