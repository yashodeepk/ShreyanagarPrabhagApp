import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

export const fetchAppData = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('appData'),
  );