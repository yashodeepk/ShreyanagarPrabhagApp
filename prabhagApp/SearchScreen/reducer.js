import { fromJS } from 'immutable';
import { 
  SET_SEARCH_TERM_DATA,
  SET_SINGLE_USER_DATA,
  SET_SINGLE_USER_DATA_NULL,
  SET_LOADER,
  SET_TOTAL_PAGE_NO,
  SET_MODAL_STATUS,
  SET_MODAL_INDICATOR,
} from "./actions";

export const initialState = fromJS({
  searchTermData : [],
  modalData : null,
  loader: false,
  totalPageNo: null,
  modalStatus: false,
  setModalIndicator : false,
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
    case SET_MODAL_STATUS:
      return state.set('modalStatus',immutableData)
    case SET_MODAL_INDICATOR: 
      return state.set('setModalIndicator',immutableData)
    default:
      return state;
  }
}
