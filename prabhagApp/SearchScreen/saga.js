import {
  select,
  takeEvery,
  put,
} from 'redux-saga/effects';
import NetworkUtils from "../utils/NetworkUtils";
const { searchUrl } = NetworkUtils
import { 
  SEARCH_TERM,
  setSearchTermData,
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

export default function* fetchData() {
  yield takeEvery(SEARCH_TERM, setSearchTermSaga);
}
