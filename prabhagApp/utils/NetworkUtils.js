import axios from 'axios';

const baseURL = 'https://us-central1-todo-bca74.cloudfunctions.net/app'

// /api/paginationlist/:pageNo&:limit 
class NetworkUtils {
  static auth = axios.create({
    baseURL: `${baseURL}/api/authphone`,
  });

  static searchUrl = axios.create({
    baseURL: `${baseURL}/api/readbyname`,
  });

  static userUrl = axios.create({
    baseURL: `${baseURL}/api/read`,
  })
}

// NetworkUtils.auth.interceptors.request.use(
//   request => (console.log({ request }), request),
// );

export default NetworkUtils;