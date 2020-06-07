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
  setLoader,
  setTotalPageNo,
  GET_DATA_FROM_SEARCH_TERM,
} from "./actions";
import { getSearchTermData } from "./selectors";


export function* setSearchTermSaga({ data }) {
  try {
    yield put(setLoader(true))
    const payload = {
      pageNo: data.page,
      limit: data.limit,
      searchtext: data.searchTerm,
    }
    const response = yield searchUrl.post('',payload);
    if (response.status === 200 || response.status === 201) {
        const savedData = yield select(getSearchTermData())
        yield put(setSearchTermData([...savedData,...response.data.response]))
        yield put(setTotalPageNo(response.data.pagedata.totalpages))
    }
  } catch (error) {
    console.log('error in setSearchTermSaga ', error)
  }finally {
    yield put(setLoader(false))
  }
}

export function* getResultFromSearchTermSaga({ data }) {
  try {
    yield put(setLoader(true))
    const payload = {
      pageNo: data.page,
      limit: data.limit,
      searchtext: data.searchTerm,
    }
    const response = yield searchUrl.post('',payload);
    if (response.status === 200 || response.status === 201) {
        yield put(setSearchTermData(response.data.response))
        yield put(setTotalPageNo(response.data.pagedata.totalpages))
    }
  } catch (error) {
    console.log('error in setSearchTermSaga ', error)
  }finally {
    yield put(setLoader(false))
  }
}


export function* getSingleUserDataSaga({ data }) {
  try {
    yield put(setLoader(true))
    const response = yield userUrl.get(`/${data}`);
    if (response.status === 200 || response.status === 201) {
      yield put(setSingleUserData(response.data))
    }
  } catch (error) {
      console.log('error in getSingleUserDataSaga ', error)
  } finally {
    yield put(setLoader(false))
  }
}


export default function* fetchData() {
  yield takeEvery(SEARCH_TERM, setSearchTermSaga);
  yield takeEvery(GET_SINGLE_USER_DATA, getSingleUserDataSaga);
  yield takeEvery(GET_DATA_FROM_SEARCH_TERM,getResultFromSearchTermSaga)
}
