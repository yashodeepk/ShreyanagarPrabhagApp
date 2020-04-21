import {
  select,
  takeEvery,
  put,
} from 'redux-saga/effects';
import NetworkUtils from "../utils/NetworkUtils";
const { 
  searchUrl,
  userUrl,
} = NetworkUtils
import { 
  SEARCH_TERM,
  setSearchTermData,
  GET_SINGLE_USER_DATA,
  setSingleUserData,
} from "./actions";


export function* setSearchTermSaga({ data }) {
  try {
    const response = yield searchUrl.get(`/${data}`);
    if (response.status === 200 || response.status === 201) {
        yield put(setSearchTermData(response.data))
    }
  } catch (error) {
    console.log('error in login ', error)
  }
}

export function* getSingleUserDataSaga({ data }) {
  try {
    const response = yield userUrl.get(`/${data}`);
    if (response.status === 200 || response.status === 201) {
      yield put(setSingleUserData(response.data))
    }
  } catch (error) {
      console.log('error in getSingleUserDataSaga ', error)
  }
}


export default function* fetchData() {
  yield takeEvery(SEARCH_TERM, setSearchTermSaga);
  yield takeEvery(GET_SINGLE_USER_DATA, getSingleUserDataSaga);
}
