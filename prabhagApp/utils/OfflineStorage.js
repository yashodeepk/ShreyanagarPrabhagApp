import { AsyncStorage } from 'react-native';

export default class OfflineStorage {
  static async getAllKeys() {
    return AsyncStorage.getAllKeys();
  }

  static async removeKeys(keysArray) {
    return AsyncStorage.multiRemove(keysArray);
  }

  // ========================= common for all properties ============================================ //

  static async setPropertyList(value) {
    AsyncStorage.setItem('propertyList', JSON.stringify(value));
  }

  static async getPropertyList() {
    return JSON.parse(await AsyncStorage.getItem('propertyList'));
  }

  static async setQuestionData(value) {
    AsyncStorage.setItem('questionData', JSON.stringify(value));
  }

  static async getQuestionData() {
    return JSON.parse(await AsyncStorage.getItem('questionData'));
  }

  static async setOfflinePropertyTempIds(tempIdArray) {
    AsyncStorage.setItem(`offlinePropertyTempIds`, JSON.stringify(tempIdArray));
  }

  static async getOfflinePropertyTempIds() {
    return JSON.parse(await AsyncStorage.getItem(`offlinePropertyTempIds`));
  }

  // ========================== dependent on particular property =========================================== //

  static async setPropertyAnswersDiff(id, answers) {
    AsyncStorage.setItem(`${id}_answersDiff`, JSON.stringify(answers));
  }

  static async getPropertyAnswersDiff(id) {
    return JSON.parse(await AsyncStorage.getItem(`${id}_answersDiff`));
  }

  static async setPropertyAnswersFromServerCached(id, answers) {
    AsyncStorage.setItem(`${id}_answersServer`, JSON.stringify(answers));
  }

  static async getPropertyAnswersServerCached(id) {
    return JSON.parse(await AsyncStorage.getItem(`${id}_answersServer`));
  }

  static async setPropertyImageToUploadData(id, value) {
    AsyncStorage.setItem(`${id}_imageData`, JSON.stringify(value));
  }

  static async getPropertyImageToUploadData(id) {
    return JSON.parse(await AsyncStorage.getItem(`${id}_imageData`));
  }

  static async setPropertyUnfilledData(id, data) {
    AsyncStorage.setItem(`${id}_unfilledData`, JSON.stringify(data));
  }

  static async getPropertyUnfilledData(id) {
    return JSON.parse(await AsyncStorage.getItem(`${id}_unfilledData`));
  }

  static async setOfflineNewPropertyCardData(id, cardData) {
    AsyncStorage.setItem(`${id}_propertyCard`, JSON.stringify(cardData));
  }

  static async getOfflineNewPropertyCardData(id) {
    return JSON.parse(await AsyncStorage.getItem(`${id}_propertyCard`));
  }

  // ===================================================================== //

  static async setLoginMobileNumber(value) {
    await AsyncStorage.setItem('@loginNumber', value);
  }

  static async getLoginMobileNumber() {
    return AsyncStorage.getItem('@loginNumber');
  }

  static async setUuid(value) {
    await AsyncStorage.setItem('@uuid', value);
  }

  static async getUuid() {
    return AsyncStorage.getItem('@uuid');
  }

  static async setUserType(value) {
    await AsyncStorage.setItem('@userType', value);
  }

  static async getUserType() {
    return AsyncStorage.getItem('@userType');
  }
}
