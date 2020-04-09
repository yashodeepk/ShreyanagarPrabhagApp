import {
  INIT
} from './constants';

export function initAction(data) {
  return {
    type: INIT,
    data,
  };
}
