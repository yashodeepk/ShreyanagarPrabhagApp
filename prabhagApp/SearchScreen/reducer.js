import { fromJS } from 'immutable';
import { 
  SET_SEARCH_TERM_DATA,
  SET_SINGLE_USER_DATA,
  SET_SINGLE_USER_DATA_NULL,
} from "./actions";

export const initialState = fromJS({
  searchTermData : [],
  modalData : null,
});

export default function appReducer(state = initialState, action) {
  const immutableData = fromJS(action.data);
  switch (action.type) {
    case SET_SEARCH_TERM_DATA: 
      return state.set('searchTermData',immutableData)
    case SET_SINGLE_USER_DATA: 
      return state.set('modalData',immutableData)
    case SET_SINGLE_USER_DATA_NULL:
      return state.set('modalData',null)
    default:
      return state;
  }
}
