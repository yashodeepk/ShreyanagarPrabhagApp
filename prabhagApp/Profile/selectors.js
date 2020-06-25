import { createSelector } from 'reselect';
import { initialState } from "./reducer";

const selectSearchDomain = state =>
  state.get('profileScreenKey', initialState);

export const getLoaderValue = () => 
  createSelector(
    selectSearchDomain, 
    subState => subState.get('loader')
  )


export const fetchFamilyData = () => 
  createSelector(
    selectSearchDomain, 
    subState => subState.get('familyMemberData')
  )