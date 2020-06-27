import { fromJS } from 'immutable';
import { 
    SET_LOADER_PROFILE_SCREEN,
    SET_FAMILY_DATA,
    SET_COPY_FAMILY_DATA,
    SET_EDITED_FAMILY_DATA,
    SHOW_UPDATE_BUTTON,
} from "./actions";

export const initialState = fromJS({
  loader: false,
  familyMemberData : [],
  copyOfFamilyData : [],
  editedArrayStructure : [],
  showUpdateButton : false,
});

export default function appReducer(state = initialState, action) {
  const immutableData = fromJS(action.data);
  switch (action.type) {
    case SET_LOADER_PROFILE_SCREEN: 
      return state.set('loader',immutableData);
    case SET_FAMILY_DATA: 
      return state.set('familyMemberData', immutableData);
    case SET_COPY_FAMILY_DATA: 
      return state.set('copyOfFamilyData',immutableData)
    case SET_EDITED_FAMILY_DATA: 
      return state.set('editedArrayStructure',immutableData)
    case SHOW_UPDATE_BUTTON:
      return state.set('showUpdateButton',immutableData) 
    default:
      return state;
  }
}
