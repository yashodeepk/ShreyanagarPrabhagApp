import {
  select,
  takeEvery,
  put,
} from 'redux-saga/effects';
import NetworkUtils from "../utils/NetworkUtils";
import { 
  LOGIN_ACTION,
  setMobileNumber,
  setLoginStatus,
} from "./actions";
import {
  getMobileNumber,
} from './selectors'
const { auth } = NetworkUtils


export function* loginSaga({ data }) {
  try {
    yield put(setLoginStatus(true));
    const mobileNumber = yield select(getMobileNumber());
    const response = yield auth.get(`/${mobileNumber}`);
    if (response.status === 200 || response.status === 201) {
        yield put(setMobileNumber(''))
        data.navigate('Home')
    }
  } catch (error) {
    console.log('error in login ', error)
    alert('something went wrong please try again')
  }finally{
    yield put(setLoginStatus(false));
  }
}

export default function* fetchData() {
  yield takeEvery(LOGIN_ACTION, loginSaga);
}
