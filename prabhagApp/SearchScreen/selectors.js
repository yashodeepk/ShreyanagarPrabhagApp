import { createSelector } from 'reselect';
import { initialState } from "./reducer";

const selectSearchDomain = state =>
  state.get('searchScreenKey', initialState);

export const getSearchTermData = () => 
  createSelector(
    selectSearchDomain, 
    subState => subState.get('searchTermData')
  )

export const getModalData = () => 
  createSelector(
    selectSearchDomain, 
    subState => subState.get('modalData')
  )

  export const getLoaderValue = () => 
  createSelector(
    selectSearchDomain, 
    subState => subState.get('loader')
  )
