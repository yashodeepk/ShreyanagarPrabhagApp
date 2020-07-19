import { createSelector } from 'reselect';

const selectFeedDomain = state => state.get('Feed');

export const getFeedData = () => 
createSelector(selectFeedDomain, subState => 
  subState.get('data')  
)

export const getLoaderValue = () => 
createSelector(selectFeedDomain, subState => 
  subState.get('loader')  
)

export const getBirthdaysSelector = () => 
createSelector(selectFeedDomain, subState => 
  subState.get('birthdays')  
)