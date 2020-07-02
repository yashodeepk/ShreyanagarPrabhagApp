import {
  select,
  takeEvery,
  put,
  call,
} from 'redux-saga/effects';
import { 
  UPLOAD_IMAGE,
  setLoaderFeed,
} from "./actions";
import NetworkUtils from "../utils/NetworkUtils";
import firebase from "../utils/firebase";
const { updateUrl } = NetworkUtils


export function* uploadImageSaga({ data }) {
  try {
    const { body , userInfo} = data
    yield put(setLoaderFeed(true));
    updateUrl.defaults.headers.common = {
        "Accept": "application/json",
        "Content-Type": "multipart/form-data"
    }
    const response = yield updateUrl.post(`/picture/`,body);
    if (response.status === 200 || response.status === 201) {
      updateUrl.defaults.headers.common = {
        "Accept": "application/json",
      }

      let imageRef = firebase.storage().ref(`/${response.data}`);

      const imgUrl = yield imageRef.getDownloadURL()

      const payload = {
        name				: userInfo.name || '',
        imageURL            : imgUrl,
        discription         : userInfo.title,
      } 

      const uploadFeedResponse = yield updateUrl.post(`/uploadfeed`,payload);

      if(uploadFeedResponse.status === 200){
         yield call(userInfo.callback)
      }
    }
  } catch (error) {
    console.log('error in login ', error)
    alert('something went wrong please try again')
  }finally{
    yield put(setLoaderFeed(false));
  }
}

export default function* fetchData() {
  yield takeEvery(UPLOAD_IMAGE, uploadImageSaga);
}
