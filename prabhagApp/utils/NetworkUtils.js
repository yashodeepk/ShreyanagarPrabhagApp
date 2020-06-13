import axios from 'axios';

const baseURL = 'https://us-central1-todo-bca74.cloudfunctions.net/app'

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

  static updateUrl = axios.create({
    baseURL: `${baseURL}/api`
  })
}

// NetworkUtils.auth.interceptors.request.use(
//   request => (console.log({ request }), request),
// );

export default NetworkUtils;