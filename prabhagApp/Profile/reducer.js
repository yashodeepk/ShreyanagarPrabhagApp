import { fromJS } from 'immutable';
import { 
    SET_LOADER_PROFILE_SCREEN,
    SET_FAMILY_DATA,
} from "./actions";

export const initialState = fromJS({
  loader: false,
  familyMemberData : [],
});

export default function appReducer(state = initialState, action) {
  const immutableData = fromJS(action.data);
  switch (action.type) {
    case SET_LOADER_PROFILE_SCREEN: 
      return state.set('loader',immutableData);
    case SET_FAMILY_DATA: 
      return state.set('familyMemberData', immutableData);
    default:
      return state;
  }
}
