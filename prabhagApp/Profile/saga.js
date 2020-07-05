import {
    takeEvery,
    put,
    call,
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
import { Alert } from "react-native";

  const { 
    updateUrl,
    familyMemberUrl,
  } = NetworkUtils

  
  export function* updateSaga({ data }) {
    try {
      const { fetchFamilyData, callback } = data
      yield put(setLoader(true))
      const payload = { "person" : fetchFamilyData}
      const response = yield updateUrl.post('/update',payload)
      if(response.status === 200 || response.status === 201){
        yield call(callback)
      }
    } catch (error) {
      console.log('error in update saga ', error)
      Alert.alert('SomeThing went wrong ', error)
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