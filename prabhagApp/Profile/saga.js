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
  } from "./actions";

  const { 
    updateUrl,
    familyMemberUrl,
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
  
  export function* getFamilyDataSaga({ data }) {
    try {
      yield put(setLoader(true))
      // const response = yield familyMemberUrl.get(`/${data}`)
      const response = [
        {
          "address": "A-1,Chetana Tower New Shreyanagar Near Deogiri Bank Aurangabad 431005",
          "bloodgroup": "B+",
          "businessaddress": "",
          "businessbrief": "",
          "businessjob": "Job",
          "dob": "21/10/1964",
          "dom": "4/12/1992",
          "education": "B.Com",
          "email": "",
          "familycode": "K0504",
          "id": "K050401",
          "mobileno": 9423780305,
          "name": "Kacholia Ramesh",
          "relation": "Family Head",
          "typeofbusiness": "",
        },
        // {
        //   "address": "A-1,Chetana Tower New Shreyanagar Near Deogiri Bank Aurangabad 431005",
        //   "bloodgroup": "B+",
        //   "businessaddress": "",
        //   "businessbrief": "",
        //   "businessjob": "Kacholia Collection A-1,Chetana Tower New Shreyanagar Near Deogiri Bank Aurangabad",
        //   "dob": "24/08/1968",
        //   "dom": "4/12/1994",
        //   "education": "HSC",
        //   "email": "",
        //   "familycode": "K0504",
        //   "id": "K050402",
        //   "mobileno": 9421957588,
        //   "name": "Kacholia Aruna Ramesh",
        //   "relation": "Wife",
        //   "typeofbusiness": "",
        // },
        // {
        //   "address": "A-1,Chetana Tower New Shreyanagar Near Deogiri Bank Aurangabad 431005",
        //   "bloodgroup": "B+",
        //   "businessaddress": "",
        //   "businessbrief": "",
        //   "businessjob": "Job Bharatpay New Dehli",
        //   "dob": "10/12/1994",
        //   "dom": "",
        //   "education": "PG DIPLOMA IN DAC",
        //   "email": "",
        //   "familycode": "K0504",
        //   "id": "K050403",
        //   "mobileno": 9764376462,
        //   "name": "Kacholia Saurabh Ramesh",
        //   "relation": "Son",
        //   "typeofbusiness": "",
        // },
        // {
        //   "address": "A-1,Chetana Tower New Shreyanagar Near Deogiri Bank Aurangabad 431005",
        //   "bloodgroup": "B+",
        //   "businessaddress": "",
        //   "businessbrief": "",
        //   "businessjob": "Job Tcs Hinjewadi Pune",
        //   "dob": "21/05/1997",
        //   "dom": "",
        //   "education": "B.E. Entc",
        //   "email": "",
        //   "familycode": "K0504",
        //   "id": "K050404",
        //   "mobileno": 8275861835,
        //   "name": "Kacholia Yashodeep Ramesh",
        //   "relation": "Son",
        //   "typeofbusiness": "",
        // },
      ]      
      // yield put(setFamilyData(response.data))
      yield put(setFamilyData(response))
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