import {
    select,
    takeEvery,
    put,
  } from 'redux-saga/effects';
  import NetworkUtils from "../utils/NetworkUtils";
  import { 
    setLoader,
    PROFILE_USER_UPDATE,
    GET_FAMILY_DATA,
    setFamilyData,
    setCopyFamilyData,
    setEditedFamilyData,
  } from "./actions";
import { setLoginDetails } from "../utils/asyncStorage";
import { setUserDetails } from "../MainApp/actions";
import { setMobileNumber } from '../LoginScreen/actions'

  const { 
    updateUrl,
    familyMemberUrl,
  } = NetworkUtils

  
  export function* updateSaga({ fetchFamilyData, navigation }) {
    try {
      yield put(setLoader(true))
      const payload = { "person" : fetchFamilyData}
      const response = yield updateUrl.post('/update',payload)
      if(response.status === 200 || response.status === 201){
        const emptyString = ''
        yield setLoginDetails(emptyString)
        yield setUserDetails(emptyString)
        yield setMobileNumber(emptyString)
        navigation.dispatch(NavigationActions.reset({ 
                    index: 0,
                    actions: [ NavigationActions.navigate({ routeName: 'LoginApp'})]
                }))
      }
    } catch (error) {
      console.log('error in update saga ', error)
    } finally {
      yield put(setLoader(false)) 
    }
  }

  function createStructureForEditableData(arr){
    const structureForEditedArray = []
    for(let i = 0 ; i < arr.length; i++){
        const obj = {
            "address": false,
            "bloodgroup": false,
            "businessaddress": false,
            "businessbrief": false,
            "businessjob": false,
            "dob": false,
            "dom": false,
            "education": false,
            "email": false,
            "mobileno": false,
            "name": false,
            "typeofbusiness": false,
        }
      structureForEditedArray.push(obj)
    }
    return structureForEditedArray
  }
  
  export function* getFamilyDataSaga({ data }) {
    try {
      yield put(setLoader(true))
      const response = yield familyMemberUrl.get(`/${data}`)
      const editedArr = createStructureForEditableData(response.data)
      yield put(setEditedFamilyData(editedArr))
      yield put(setFamilyData(response.data))
      yield put(setCopyFamilyData(response.data))
    } catch (error) {
      console.log('error in update saga ', error)
    } finally {
      yield put(setLoader(false)) 
    }
  }
  
  export default function* fetchData() {
    yield takeEvery(PROFILE_USER_UPDATE, updateSaga);
    yield takeEvery(GET_FAMILY_DATA, getFamilyDataSaga);
  }