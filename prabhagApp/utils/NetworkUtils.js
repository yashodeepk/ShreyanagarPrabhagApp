import axios from 'axios';

const baseURL = 'https://us-central1-todo-bca74.cloudfunctions.net/app'

class NetworkUtils {
  static auth = axios.create({
    baseURL: `${baseURL}/api/authphone`,
  });

  static searchUrl = axios.create({
    baseURL: `${baseURL}/api/readbyname`,
  });
}

NetworkUtils.auth.interceptors.request.use(
  request => (console.log({ request }), request),
);

export default NetworkUtils;

export async function registerForPushNotificationsAsync() {
  // const { status: existingStatus } = await Permissions.getAsync(
  //   Permissions.NOTIFICATIONS,
  // );
  // let finalStatus = existingStatus;

  // // only ask if permissions have not already been determined, because
  // // iOS won't necessarily prompt the user a second time.
  // if (existingStatus !== 'granted') {
  //   // Android remote notification permissions are granted during the app
  //   // install, so this will only ask on iOS
  //   const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //   finalStatus = status;
  // }

  // // Stop here if the user did not grant permissions
  // if (finalStatus !== 'granted') {
  //   return;
  // }

  // // Get the token that uniquely identifies this device
  // const token = await Notifications.getExpoPushTokenAsync();

  // // POST the token to your backend server from where you can retrieve it to send push notifications.

  // return NetworkUtils.notification.post('/userdevice/register', {
  //   deviceToken: token,
  //   serviceName: 'Estate',
  // });
}

export async function unregisterForPushNotificationsAsync() {
  // const token = await Notifications.getExpoPushTokenAsync();

  // return NetworkUtils.notification.post('/userdevice/unregister', {
  //   deviceToken: token,
  //   serviceName: 'Estate',
  // });
}
