import { createSelector } from 'reselect';

const selectGlobal = state => state.get('login');

export const fetchAppData = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('appData'),
  );