export const SET_LOADER_PROFILE_SCREEN = 'boilerplate/LoginScreen/SET_LOADER';
export function setLoader(data) {
  return {
    type: SET_LOADER_PROFILE_SCREEN,
    data,
  };
}

export const PROFILE_USER_UPDATE = 'boilerplate/LoginScreen/PROFILE_USER_UPDATE'
export function updateUserProfile(data){
  return {
    type : PROFILE_USER_UPDATE,
    data,
  }
}


export const GET_FAMILY_DATA = 'boilerplate/LoginScreen/GET_FAMILY_DATA'
export function getFamilyData(data){
  return {
    type : GET_FAMILY_DATA,
    data,
  }
}

export const SET_FAMILY_DATA = 'boilerplate/LoginScreen/SET_FAMILY_DATA'
export function setFamilyData(data){
  return {
    type : SET_FAMILY_DATA,
    data,
  }
}

export const SET_COPY_FAMILY_DATA = 'boilerplate/LoginScreen/SET_COPY_FAMILY_DATA'
export function setCopyFamilyData(data){
  return {
    type : SET_COPY_FAMILY_DATA,
    data,
  }
}

export const SET_EDITED_FAMILY_DATA = 'boilerplate/LoginScreen/SET_EDITED_FAMILY_DATA'
export function setEditedFamilyData(data){
  return {
    type : SET_EDITED_FAMILY_DATA,
    data,
  }
}