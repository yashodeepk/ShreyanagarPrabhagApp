import { fromJS } from 'immutable';

import {
  SET_MOBILE_NUMBER,
} from './actions';

const initialState = fromJS({
  mobileNumber: '',
});

export default function appReducer(state = initialState, action) {
  const immutableData = fromJS(action.data);
  switch (action.type) {
    case SET_MOBILE_NUMBER: 
      return state.set('mobileNumber',immutableData)
    default:
      return state;
  }
}
