import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

export const fetchLoggedInUserData = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('loggedInUser'),
  );

export const fetchVerificationId = () => 
  createSelector(
    selectGlobal,
    globalState => globalState.get('verificationId')
  );