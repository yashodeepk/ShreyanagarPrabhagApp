import { fromJS } from 'immutable';

import {
  SET_USER_DETAILS,
  SET_USER_VERIFICATION_ID
} from './actions';

const initialState = fromJS({
  loggedInUser: null,
  verificationId: null,
});

export default function appReducer(state = initialState, action) {
  const immutableData = action.data
  switch (action.type) {
    case SET_USER_DETAILS: 
      return state.set('loggedInUser', immutableData)
    case SET_USER_VERIFICATION_ID:
      return state.set('verificationId', immutableData)
    default:
      return state;
  }
}
