export const SET_LOADER_PROFILE_SCREEN = 'boilerplate/LoginScreen/SET_LOADER';
export function setLoader(data) {
  return {
    type: SET_LOADER_PROFILE_SCREEN,
    data,
  };
}

export const PROFILE_USER_UPDATE = 'boilerplate/LoginScreen/PROFILE_USER_UPDATE'
export function updateUserProfile(data){
  console.log('in the action ', data)
  return {
    type : PROFILE_USER_UPDATE,
    data,
  }
}