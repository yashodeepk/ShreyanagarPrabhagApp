import {
  select,
  takeEvery,
} from 'redux-saga/effects';
import NetworkUtils from "../utils/NetworkUtils";
import { 
  LOGIN_ACTION,
} from "./actions";
import {
  getMobileNumber,
} from './selectors'
const { auth } = NetworkUtils


export function* loginSaga({ navigation }) {
  try {
    const mobileNumber = yield select(getMobileNumber());
    // const response = yield auth.post('');
    console.log('mobile number in saga ', mobileNumber)
    navigation.navigate('Home')
    // if (response.status === 200 || response.status === 201) {
    //     navigation.navigate('Home')
    // }
  } catch (error) {
    console.log('error in login ', error)
    alert('something went wrong please try again')
  }
}

export default function* fetchData() {
  yield takeEvery(LOGIN_ACTION, loginSaga);
}
