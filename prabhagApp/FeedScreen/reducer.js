import { fromJS } from 'immutable';
import {
  SET_LOADER_FEED,
  SET_FEED,
  SET_BIRTHDAY,
} from "./actions";
const initialState = fromJS({
  data:[],
  loader: false,
  birthdays : [],
});

export default function appReducer(state = initialState, action) {
  const immutableData = action.data;
  switch (action.type) {
    case SET_LOADER_FEED:
      return state.set('loader',immutableData)
    case SET_FEED:
      return state.set('data',immutableData)
    case SET_BIRTHDAY:
      return state.set('birthdays',immutableData)
    default:
      return state;
  }
}
