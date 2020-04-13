import { fromJS } from 'immutable';
import { 
  SET_SEARCH_TERM_DATA
} from "./actions";

export const initialState = fromJS({
  searchTermData : [],
});

export default function appReducer(state = initialState, action) {
  const immutableData = fromJS(action.data);
  switch (action.type) {
    case SET_SEARCH_TERM_DATA: 
      return state.set('searchTermData',immutableData)
    default:
      return state;
  }
}
