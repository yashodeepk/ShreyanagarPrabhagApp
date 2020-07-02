import { fromJS } from 'immutable';
import {
  SET_LOADER_FEED
} from "./actions";
const initialState = fromJS({
  data:[],
  loader: false,
});

export default function appReducer(state = initialState, action) {
  const immutableData = fromJS(action.data);
  switch (action.type) {
    case SET_LOADER_FEED:
      return state.set('loader',immutableData)
    default:
      return state;
  }
}
