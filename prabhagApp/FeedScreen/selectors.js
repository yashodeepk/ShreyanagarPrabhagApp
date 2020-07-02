import { createSelector } from 'reselect';

const selectFeedDomain = state => state.get('Feed');

export const getMobileNumber = () => 
createSelector(selectFeedDomain, subState => 
  subState.get('data')  
)

export const getLoaderValue = () => 
createSelector(selectFeedDomain, subState => 
  subState.get('loader')  
)