import { fromJS } from 'immutable';
import { 
  SET_SEARCH_TERM_DATA,
  SET_SINGLE_USER_DATA,
  SET_SINGLE_USER_DATA_NULL,
  SET_LOADER,
  SET_TOTAL_PAGE_NO,
} from "./actions";

export const initialState = fromJS({
  searchTermData : [],
  modalData : null,
  loader: false,
  totalPageNo: null,
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
    case SET_LOADER:
      return state.set('loader',immutableData)
    case SET_TOTAL_PAGE_NO:
      return state.set('totalPageNo',immutableData)
    default:
      return state;
  }
}
