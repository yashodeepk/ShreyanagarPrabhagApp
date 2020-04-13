import { createSelector } from 'reselect';
import { initialState } from "./reducer";

const selectSearchDomain = state =>
  state.get('searchScreenKey', initialState);

export const getSearchTermData = () => 
  createSelector(
    selectSearchDomain, 
    subState => subState.get('searchTermData')
  )
