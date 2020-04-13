import { fromJS } from 'immutable';

const initialState = fromJS({
  data:[],
});

export default function appReducer(state = initialState, action) {
  const immutableData = fromJS(action.data);
  switch (action.type) {
    default:
      return state;
  }
}
