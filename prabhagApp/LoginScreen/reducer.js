import { fromJS } from 'immutable';

import {
  INIT,
} from './constants';

const initialState = fromJS({
  data : []
});

export default function appReducer(state = initialState, action) {
  const immutableData = fromJS(action.data);
  switch (action.type) {
    case INIT: 
      return state
    default:
      return state;
  }
}
