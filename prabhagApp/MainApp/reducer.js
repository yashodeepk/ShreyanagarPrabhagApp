import { fromJS } from 'immutable';

import {
  SET_USER_DETAILS,
} from './actions';

const initialState = fromJS({
  loggedInUser: null,
});

export default function appReducer(state = initialState, action) {
  const immutableData = fromJS(action.data);
  switch (action.type) {
    case SET_USER_DETAILS: 
      return state.set('loggedInUser', immutableData)
    default:
      return state;
  }
}
