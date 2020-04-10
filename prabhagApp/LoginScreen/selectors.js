import { createSelector } from 'reselect';

const selectLoginDomain = state => state.get('login');

export const getMobileNumber = () => 
createSelector(selectLoginDomain, subState => 
  subState.get('mobileNumber')  
)

export const loginStatusCallLoader = () => 
  createSelector(selectLoginDomain, subState => 
    subState.get('isLoginStatusLoading')  
)
