import axios from 'axios';
import Constants from 'expo-constants';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

// const apkLinks = {
//   beta: 'https://expo.io/artifacts/a87bae98-5300-42ff-905c-a1dad0c99659',
//   stage: 'https://expo.io/artifacts/3e2a87e5-7855-4946-a6c4-15d633f48b8d',
//   preprod: 'https://expo.io/artifacts/818ab4c0-589e-4685-a759-1311fa8dedc5',
//   notification: 'https://expo.io/artifacts/dc3b9efb-70ea-4140-90a6-b319d24e0101',
// };

const {
  manifest: { releaseChannel },
} = Constants;
const production = {
  estate: 'https://estate.stanzaliving.com',
  transformation: 'https://transformation.stanzaliving.com',
  locator: 'https://locator.stanzaliving.com',
  auth: 'https://userservice.stanzaliving.com',
  notification: 'https://erp.stanzaliving.com',
  comments: 'https://erp.stanzaliving.com',
  legal: 'https://erp.stanzaliving.com',
  design: 'https://designservice.stanzaliving.com',
};
const preprod = 'https://preproderp.stanzaliving.com';
const stage = 'https://stageerp.stanzaliving.com';
const beta = 'https://betaerp.stanzaliving.com';
const local = preprod;
const notification = preprod;

const isPROD = releaseChannel === 'production';

const baseURLEstate = {
  production: production.estate,
  stage,
  beta,
  preprod,
  notification,
  [undefined]: local,
}[releaseChannel];

const baseURLTransformationMaster = {
  production: production.transformation,
  stage,
  beta,
  preprod,
  notification,
  [undefined]: local,
}[releaseChannel];

const baseURLLocator = {
  production: production.locator,
  stage,
  beta,
  preprod,
  notification,
  [undefined]: local,
}[releaseChannel];

const baseURLAuth = {
  production: production.auth,
  stage,
  beta,
  preprod,
  notification,
  [undefined]: local,
}[releaseChannel];

const baseURLNotification = {
  production: production.notification,
  stage,
  beta,
  preprod,
  notification,
  [undefined]: local,
}[releaseChannel];

const baseURLComments = {
  production: production.comments,
  stage,
  beta,
  preprod,
  notification,
  [undefined]: local,
}[releaseChannel];

const baseURLDesign = {
  production: production.design,
  stage,
  beta,
  preprod,
  notification,
  [undefined]: local,
}[releaseChannel];

export const baseURLLegal = {
  production: production.legal,
  stage,
  beta,
  preprod,
  notification,
  [undefined]: local,
}[releaseChannel];

class NetworkUtils {
  static auth = axios.create({
    baseURL: `${baseURLAuth}/user/auth`,
    headers: {
      appEnv: !isPROD,
    },
    withCredentials: true,
  });

  // static userAcl = axios.create({
  //   baseURL: `${baseURL}/useracl/auth`,
  // });

  // static transformationmasterAcl = axios.create({
  //   baseURL : `${baseURL}/transformationmaster`,
  //   headers: {
  //     appEnv: !isPROD,
  //   },
  //   withCredentials: true,
  // })

  static locator = axios.create({
    baseURL: `${baseURLLocator}/locator`,
  });

  static transformationmaster = axios.create({
    baseURL: `${baseURLTransformationMaster}/transformationmaster`,
    headers: {
      appEnv: !isPROD,
    },
    withCredentials: true,
  });

  static estate = axios.create({
    baseURL: `${baseURLEstate}/estate`,
  });

  static design = axios.create({
    baseURL: `${baseURLDesign}/designservice`,
  });

  static notification = axios.create({
    baseURL: `${baseURLNotification}/pushnotification`,
  });

  static comments = axios.create({
    baseURL: `${baseURLComments}/comments`,
  });

  static legal = axios.create({
    baseURL: `${baseURLLegal}/legal`,
  });
}

// NetworkUtils.auth.interceptors.request.use(
//   request => (console.log({ request }), request),
// );
// NetworkUtils.auth.interceptors.response.use(
//   response => (console.log({ response }), response),
// );
// NetworkUtils.transformationmaster.interceptors.request.use(
//   request => (console.log({ request }), request),
// );
// NetworkUtils.transformationmaster.interceptors.response.use(
//   response => (console.log({ response }), response),
// );
// NetworkUtils.estate.interceptors.request.use(
//   request => (console.log({ request }), request),
// );
// NetworkUtils.estate.interceptors.response.use(
//   response => (console.log({ response }), response),
// );
// NetworkUtils.notification.interceptors.request.use(
//   request => (console.log({ request }), request),
// );
// NetworkUtils.notification.interceptors.response.use(
//   response => (console.log({ response }), response),
// );

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
