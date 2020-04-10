import { fromJS } from 'immutable';

import {
  SET_MOBILE_NUMBER,
  LOGIN_STATUS_CALL_LOADER,
} from './actions';

const initialState = fromJS({
  mobileNumber: '',
  isLoginStatusLoading: false,
});

export default function appReducer(state = initialState, action) {
  const immutableData = fromJS(action.data);
  switch (action.type) {
    case SET_MOBILE_NUMBER: 
      return state.set('mobileNumber',immutableData)
    case LOGIN_STATUS_CALL_LOADER:
      return state.set('isLoginStatusLoading', immutableData);
    default:
      return state;
  }
}
