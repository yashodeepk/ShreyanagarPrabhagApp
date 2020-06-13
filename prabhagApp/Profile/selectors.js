import { createSelector } from 'reselect';
import { initialState } from "./reducer";

const selectSearchDomain = state =>
  state.get('searchScreenKey', initialState);

export const getLoaderValue = () => 
  createSelector(
    selectSearchDomain, 
    subState => subState.get('loader')
  )