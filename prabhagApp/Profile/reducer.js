import { fromJS } from 'immutable';
import { 
    SET_LOADER_PROFILE_SCREEN
} from "./actions";

export const initialState = fromJS({
  loader: false,
});

export default function appReducer(state = initialState, action) {
  const immutableData = fromJS(action.data);
  switch (action.type) {
    case SET_LOADER_PROFILE_SCREEN: 
      return state.set('loader',immutableData)
    default:
      return state;
  }
}
