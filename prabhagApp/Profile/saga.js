import {
    select,
    takeEvery,
    put,
  } from 'redux-saga/effects';
  import NetworkUtils from "../utils/NetworkUtils";
  import { 
    setLoader,
    PROFILE_USER_UPDATE,
  } from "./actions";

  const { 
    updateUrl,
  } = NetworkUtils

  
  export function* updateSaga({ data }) {
    try {
      yield put(setLoader(true))
      console.log('data is in updateSaga' , data)
      const payload = {...data}
      const response = yield updateUrl.post('/updatedata',payload)
      console.log('response is , ', response.data)
    } catch (error) {
      console.log('error in update saga ', error)
    } finally {
      yield put(setLoader(false)) 
    }
  }
  
  
  
  export default function* fetchData() {
    yield takeEvery(PROFILE_USER_UPDATE, updateSaga);
  }
  